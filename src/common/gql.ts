import useAsyncData from "@hooks/useAsyncData";
import { useMemo, useState } from "react";
import { auth } from "../auth/auth";
// This code changes with each app
const ENDPOINT = "https://techstacker.hasura.app/v1/graphql";
export const gqlClient = createGraphQLClient(ENDPOINT);

function createGraphQLClient(endpoint) {
  let request = function (query, variables = {}) {
    let token = auth.hasuraToken;
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(endpoint, {
      method: "POST",
      headers,
      // spread the passed in queryOptions onto the POST body
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
  };

  return { request };
}

export default function useGraphQL(query, variables = {}) {
  let [forceRefresh, setForceRefresh] = useState(Date.now());

  let memoizedVariables = useMemo(() => {
    return variables;
  }, [JSON.stringify(variables), forceRefresh]);

  const refresh = useMemo(() => () => setForceRefresh(Date.now()), [setForceRefresh]);
  let { data: result, isLoading } = useAsyncData(gqlClient.request, [query, memoizedVariables], {
    data: null,
  });
  return [
    {
      ...result,
    },
    { isLoading, refresh },
  ] as [{ data: any; errors?: Error[] }, { isLoading: Boolean; refresh: () => void }];
}
