const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const hasura = require("./login.hasura");

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

  let [claims, hasuraUser] = await hasura.fillHasuraClaims(user, provider);
  var hasuraToken = jwt.sign(claims, process.env.JWT_SECRET, {
    noTimestamp: true,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      user: hasuraUser,
      token: hasuraToken,
    }),
  };
};

async function validateToken(token, provider) {
  if (provider === "microsoft") {
    let profile = await fetchGraphProfile(token);
    return !!profile.userPrincipalName;
  } else if (provider === "auth0") {
    return validateAuth0Token(token);
  }
  throw new Error("Invalid provider");
}

//https://auth0.com/docs/tokens/json-web-tokens/validate-json-web-tokens
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

const fetchGraphProfile = function (token) {
  const url = "https://graph.microsoft.com/v1.0/me/";
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp.json());
};
