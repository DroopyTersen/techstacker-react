import usePersistedState from "@hooks/usePersistedState";
import React, { useEffect, useMemo } from "react";
import useGraphQL from "../common/gql";
import { ErrorCard } from "./errors";

export function GraphQL({
  query,
  variables = {},
  children,
  cacheKey = "",
  fallback,
}: GraphQLProps) {
  let [{ data, errors }, { isLoading }] = useGraphQL(query, variables);
  let [cachedData, setCachedData] = usePersistedState(
    cacheKey ? JSON.stringify({ key: cacheKey, variables }) : "",
    null,
    sessionStorage
  );

  useEffect(() => {
    if (data) {
      setCachedData(data);
    }
  }, [data]);

  if (errors) {
    return <ErrorCard errors={errors} />;
  }
  if (isLoading || !cachedData) {
    return fallback || <div className="m-2 p-2 loading loading-lg"></div>;
  }
  return children({ data: cachedData });
}

interface GraphQLProps {
  query: string;
  variables?: {
    [key: string]: any;
  };
  children: ({ data }) => JSX.Element;
  cacheKey?: string;
  fallback?: JSX.Element;
}
