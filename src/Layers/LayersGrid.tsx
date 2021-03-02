import { MotionGrid } from "@components/Grid";
import React from "react";
import LayerCard from "./LayerCard";

export default function LayersGrid({ layers = [] }) {
  return (
    <MotionGrid width="270px" gap="20px">
      {layers.map((layer) => (
        <MotionGrid.Item key={layer.id}>
          <LayerCard layer={layer} imageSize="230px" style={{ height: "100%" }} />
        </MotionGrid.Item>
      ))}
    </MotionGrid>
  );
}
