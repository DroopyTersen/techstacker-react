import { GraphQL } from "@components/GraphQL";
import { useQueryParams } from "@hooks/useQueryParams";
import React from "react";
import { useLayersAndCategories } from "../../App/AppDataProvider";
import { filterTech, getTechVariables } from "../tech.data";
import { TECH_SELECT_FRAGMENT } from "../tech.gql";
import TechFilters from "./TechFilters";
import TechGrid from "./TechGrid";
import TechTable from "./TechTable";

interface Props {
  limit?: number;
  sortKey?: string;
  sortDir?: string;
  tag?: string;
  categoryId?: string | number;
  layerId?: string | number;
  showControls?: boolean;
}

function TechResults(props: Props) {
  let queryParams = useQueryParams();

  let { layers, categories } = useLayersAndCategories();
  let Element = queryParams.get("view") === "table" ? TechTable : TechGrid;
  let textFilter = queryParams.get("filter") || "";

  let variables = getTechVariables({
    limit: props.limit || queryParams.get("limit"),
    sortKey: props.sortKey || queryParams.get("sortKey"),
    sortDir: props.sortDir || queryParams.get("sortDir"),
    tag: props.tag || queryParams.get("tag"),
    layerId: props.layerId || queryParams.get("layerId"),
    categoryId: props.categoryId || queryParams.get("categoryId"),
  });
  return (
    <>
      {props.showControls !== false && <TechFilters layers={layers} categories={categories} />}
      <GraphQL query={QUERY_TECH} variables={variables}>
        {({ data }) => (
          <>
            <Element technologies={filterTech(data?.technologies, textFilter)} />
          </>
        )}
      </GraphQL>
    </>
  );
}

export default React.memo(TechResults);

const QUERY_TECH = `query GetTech($order: [technologies_order_by!], $limit: Int!, $where: technologies_bool_exp!) {
  technologies(order_by: $order, limit: $limit, where: $where ) {
    ${TECH_SELECT_FRAGMENT}
  }
  layers(order_by: {position: asc}) {
    title
    id
  }
  categories(order_by: {position: asc}) {
    title
    id
  }
}
`;
