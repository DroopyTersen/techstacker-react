import useAsyncData from "@hooks/useAsyncData";
// This code changes with each app
const ENDPOINT = "https://techstacker.hasura.app/v1/graphql";
export const gqlClient = createGraphQLClient(ENDPOINT);

function createGraphQLClient(endpoint, headers = {}) {
  let request = function (query, variables = {}) {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      // spread the passed in queryOptions onto the POST body
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
  };

  return { request };
}

export default function useGraphQL(query, variables = undefined) {
  let { data: result, isLoading } = useAsyncData(gqlClient.request, [query, variables], {
    data: null,
  });
  return [
    {
      ...result,
    },
    { isLoading },
  ] as [{ data: any; errors?: Error[] }, { isLoading: Boolean }];
}
