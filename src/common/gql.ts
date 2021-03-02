import { QueryClient, useMutation, useQuery, UseQueryOptions } from "react-query";
import { auth } from "../auth/auth";

const ENDPOINT = "https://techstacker.hasura.app/v1/graphql";
export const gqlClient = createGraphQLClient(ENDPOINT);
export const queryClient = new QueryClient();

function createGraphQLClient(endpoint) {
  let request = async function (query, variables = {}) {
    let token = auth.hasuraToken;
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    let resp = await fetch(endpoint, {
      method: "POST",
      headers,
      // spread the passed in queryOptions onto the POST body
      body: JSON.stringify({ query, variables }),
    });

    if (!resp.ok) {
      throw new Error(`GQL Request Error: ${resp.status} ${resp.statusText}`);
    }
    let result: GraphQLResult = await resp.json();
    if (result.errors) {
      console.log("🚀 | request | errors", result.errors);
      throw new Error(result.errors.map((e) => e.message).join(", "));
    }
    return result?.data;
  };

  return { request };
}

export interface GraphQLError {
  message: string;
  path?: (string | number)[];
  locations: any[];
}

export interface GraphQLResult<T = any> {
  data?: T;
  errors?: GraphQLError[];
}

export function useGqlQuery<T = any>(
  query: string,
  variables = {},
  options?: Partial<UseQueryOptions>
) {
  let [_, operationName] = /query ([a-zA-Z]+)/.exec(query) || [];
  return useQuery<T>(
    [operationName || query, variables],
    () => gqlClient.request(query, variables),
    {
      retry: false,
      ...(options as any),
    }
  );
}

export function useGqlMutation(query: string, variables: any = {}) {
  return useMutation(() => gqlClient.request(query, variables));
}
