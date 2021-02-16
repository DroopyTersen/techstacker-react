import { GraphQL } from "@components/GraphQL";
import { useQueryParams } from "@hooks/useQueryParams";
import React from "react";
import { getTechVariables } from "../tech.data";
import { QUERY_TECH } from "../tech.gql";
import TechGrid from "./TechGrid";

function TechResults(props: TechResultsProps) {
  let queryParams = useQueryParams();
  let variables = getTechVariables({
    limit: props.limit || queryParams.get("limit"),
    sortKey: props.sortKey || queryParams.get("sortKey"),
    sortDir: props.sortDir || queryParams.get("sortDir"),
    tag: props.tag || queryParams.get("tag"),
    layerId: props.layerId || queryParams.get("layerId"),
    categoryId: props.categoryId || queryParams.get("categoryId"),
  });
  console.log("🚀 | TechResults | variables", variables, props);
  return (
    <GraphQL query={QUERY_TECH} variables={variables}>
      {({ data }) => <TechGrid technologies={data?.technologies} />}
    </GraphQL>
  );
}

export default React.memo(TechResults);

export interface TechResultsProps {
  limit?: number;
  sortKey?: string;
  sortDir?: string;
  tag?: string;
  categoryId?: string | number;
  layerId?: string | number;
}
