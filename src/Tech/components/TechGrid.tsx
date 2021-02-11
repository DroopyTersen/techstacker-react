import { MotionGrid } from "@components/Grid";
import React from "react";
import TechCard from "./TechCard";

export default function TechGrid({ technologies = [] }) {
  return (
    <MotionGrid width="350px" gap="20px">
      {technologies.map((tech) => (
        <MotionGrid.Item key={tech.id}>
          <TechCard tech={tech} imageSize="200px" style={{ height: "100%" }} />
        </MotionGrid.Item>
      ))}
    </MotionGrid>
  );
}
