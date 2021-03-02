const fetch = require("node-fetch");

async function fillHasuraClaims(user, provider) {
  let userEmail = user.id.toLowerCase();
  let hasuraUser = await getHasuraUser(userEmail);

  if (!hasuraUser) {
    let lookedUpOrg = await getOrgFromEmail(userEmail);
    let newUser = {
      id: userEmail,
      name: user.name,
      profile: user.profile,
      provider: provider,
      org_id: "public",
    };
    if (lookedUpOrg) {
      newUser.org_id = lookedUpOrg.id;
    }
    hasuraUser = await createHasuraUser(newUser);
  }

  hasuraUser.role =
    hasuraUser.role || (hasuraUser.org.license === "enterprise" ? "enterprise" : "user");

  return [
    {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [hasuraUser.role],
        "x-hasura-default-role": hasuraUser.role,
        "x-hasura-user-id": hasuraUser.id,
        "x-hasura-org-id": hasuraUser.org_id,
      },
    },
    hasuraUser,
  ];
}

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

const getOrgFromEmail = async (email) => {
  try {
    let domain = email.split("@")[1].toLowerCase();
    let { data, errors } = await hasuraRequest(QUERY_FIND_ORG_BY_DOMAIN, { domain });
    return data && data.orgs && data.orgs.length ? data.orgs[0] : null;
  } catch (err) {
    return null;
  }
};

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
      org {
        license
      }
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
      org {
        license
      }
    }
  }
  `;

const QUERY_FIND_ORG_BY_DOMAIN = `query FindOrgByDomain($domain: jsonb!) {
    orgs(where: {domains: {_contains: $domain}}) {
      id
      title
    }
  }`;

module.exports = {
  fillHasuraClaims,
};
