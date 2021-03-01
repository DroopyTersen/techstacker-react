const fetch = require("node-fetch");

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

const QUERY_FIND_ORG_BY_DOMAIN = `query FindOrgByDomain($domain: jsonb!) {
    orgs(where: {domains: {_contains: $domain}}) {
      id
      title
    }
  }`;

module.exports = {
  fillHasuraClaims,
};
