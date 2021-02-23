import { GraphQL } from "@components/GraphQL";
import { useQueryParams } from "@hooks/useQueryParams";
import React from "react";
import { useCategories, useLayers } from "../../App/AppDataProvider";
import { filterTech, getTechVariables } from "../tech.data";
import { QUERY_TECH } from "../tech.gql";
import TechFilters from "./TechFilters";
import TechGrid from "./TechGrid";
import TechTable from "./TechTable";

function TechResults(props: TechResultsProps) {
  let queryParams = useQueryParams();
  let layers = useLayers();
  let categories = useCategories();
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
            {/* <TechGrid technologies={data?.technologies} /> */}
          </>
        )}
      </GraphQL>
    </>
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
  showControls?: boolean;
}
