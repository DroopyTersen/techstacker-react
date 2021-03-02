import { GraphQL } from "@components/GraphQL";
import React from "react";
import LayersGrid from "./LayersGrid";

export const LayersScreen = () => {
  return (
    <>
      <h1>Application Layers</h1>
      <GraphQL query={LAYERS_QUERY} staleTime={600000}>
        {({ data }) => <LayersGrid layers={data?.layers} />}
      </GraphQL>
    </>
  );
};

const LAYERS_QUERY = `
query LayersScreen {
  layers(order_by: {position: asc}) {
    id
    title
    description
    image
    position
    technologies_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;
