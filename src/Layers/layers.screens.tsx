import { GraphQL } from "@components/GraphQL";
import { MotionGrid } from "@components/Grid";
import { Row } from "@components/layout";

import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppData, useLayers } from "../App/AppDataProvider";
import TechGrid from "../Tech/components/TechGrid";
import { QUERY_FILTERED_TECH } from "../Tech/tech.gql";
import LayerCard from "./LayerCard";

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
      <Row alignItems="flex-start" justifyContent="space-between">
        <h1>{layer?.title}</h1>
        <Link to={"/tech/new?layerId=" + layerId} className="btn btn-primary">
          NEW TECH
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
      <GraphQL query={QUERY_FILTERED_TECH} variables={memoizedVars}>
        {({ data }) => <TechGrid technologies={data?.technologies} />}
      </GraphQL>
    </>
  );
};

export const LayersScreen = () => {
  let { layers = [], refresh } = useAppData();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <h1>Application Layers</h1>
      <MotionGrid width="270px" gap="20px">
        {layers.map((layer) => (
          <MotionGrid.Item key={layer.id}>
            <LayerCard layer={layer} imageSize="230px" style={{ height: "100%" }} />
          </MotionGrid.Item>
        ))}
      </MotionGrid>
    </>
  );
};
