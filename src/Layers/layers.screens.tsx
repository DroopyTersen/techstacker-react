import { GraphQL } from "@components/GraphQL";

import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLayers } from "../App/AppDataProvider";
import TechGrid from "../Tech/components/TechGrid";
import { QUERY_FILTERED_TECH } from "../Tech/tech.gql";

export const LayerDetailsScreen = () => {
  let { layerId } = useParams();
  let layers = useLayers();
  let layer = layers.find((l) => l.id + "" === layerId);
  let memoizedVars = useMemo(() => {
    return {
      order: { title: "asc" },
      where: { layer_id: { _eq: layerId } },
    };
  }, [layerId]);
  return (
    <>
      <h1>{layer?.title}</h1>
      <GraphQL query={QUERY_FILTERED_TECH} variables={memoizedVars}>
        {({ data }) => <TechGrid technologies={data?.technologies} />}
      </GraphQL>
    </>
  );
};
