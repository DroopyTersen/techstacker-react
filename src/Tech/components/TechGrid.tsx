import { MotionGrid } from "@components/Grid";
import React from "react";
import TechCard from "./TechCard";

export default function TechGrid({
  technologies = [],
  width = "350px",
  gap = "20px",
  imageSize = "200px",
}) {
  return (
    <MotionGrid width={width} gap={gap}>
      {technologies.map((tech) => (
        <MotionGrid.Item key={tech.id}>
          <TechCard tech={tech} imageSize={imageSize} style={{ height: "100%" }} />
        </MotionGrid.Item>
      ))}
    </MotionGrid>
  );
}
