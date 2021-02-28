const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
  let { token, provider, user } = JSON.parse(event.body);
  if (!validateUser(user)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid user" }),
    };
  }
  if (!validateToken(token, provider)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid token" }),
    };
  }

  let hasuraUser = {
    id: user.id.toLowerCase(),
    name: user.name,
    org_id: getOrgId(user, provider),
    picture: user.picture,
    profile: user.profile,
    provider: provider,
  };

  let claims = await fillHasuraClaims(hasuraUser);
  var hasuraToken = jwt.sign(claims, process.env.JWT_SECRET, {
    noTimestamp: true,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...user,
      token: hasuraToken,
    }),
  };
};

async function fillHasuraClaims(user) {
  let hasuraUser = await ensureHasuraUser(user);
  let role = hasuraUser.role || "user";

  return {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": [role],
      "x-hasura-default-role": role,
      "x-hasura-user-id": hasuraUser.id,
      "x-hasura-org-id": hasuraUser.org_id,
    },
  };
}

async function validateToken(token, provider) {
  if (provider === "microsoft") {
    let profile = await fetchGraphProfile(token);
    return !!profile.userPrincipalName;
  } else if (provider === "auth0") {
    //https://auth0.com/docs/tokens/json-web-tokens/validate-json-web-tokens
    return validateAuth0Token(token);
  }
  throw new Error("Invalid provider");
}

function validateAuth0Token(token) {
  try {
    let secret = process.env.AUTH0_SIGNING_SECRET;
    secret = secret.replace(/\\n/g, "\n");
    let isVerified = jwt.verify(token, secret);
    return !!isVerified;
  } catch (err) {
    return false;
  }
}
function validateUser(user) {
  return user && user.id && user.name && user.profile;
}

const getOrgId = (user, provider) => {
  if (provider === "microsoft") {
    try {
      return user.profile.mail.split("@")[1].toLowerCase();
    } catch (err) {
      return "public";
    }
  }

  return "public";
};

const fetchGraphProfile = function (token) {
  const url = "https://graph.microsoft.com/v1.0/me/";
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp.json());
};

function hasuraRequest(query, variables) {
  return fetch(process.env.GRAPHQL_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  }).then((resp) => resp.json());
}

async function ensureHasuraUser(user) {
  let hasuraUser = await getHasuraUser(user.id);
  if (!hasuraUser) {
    hasuraUser = await createHasuraUser(user);
  }
  return hasuraUser;
}

async function createHasuraUser(user) {
  let { data, errors } = await hasuraRequest(MUTATION_INSERT_USER, { user });
  if (errors) {
    console.error(JSON.stringify(errors, null, 2));
  }
  return data.user;
}
async function getHasuraUser(id) {
  let { data } = await hasuraRequest(QUERY_GET_USER, { id });
  return data && data.user ? data.user : null;
}

const QUERY_GET_USER = `query GetUser($id:String!) {
    user(id:$id) {
      id
      org_id
      name
      role
      profile
      provider
    }
}`;

const MUTATION_INSERT_USER = `mutation CreateUser($user: users_insert_input!) {
    user: insert_user(object: $user) {
      id
      name
      org_id
      profile
      provider
      role
    }
  }
  `;
