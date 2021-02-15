import { MotionGrid } from "@components/Grid";
import React from "react";
import StackCard from "./StackCard";

export default function StackGrid({
  stacks = [],
  width = "350px",
  gap = "20px",
  imageSize = "200px",
}) {
  return (
    <MotionGrid width={width} gap={gap}>
      {stacks.map((stack) => (
        <MotionGrid.Item key={stack.id}>
          <StackCard stack={stack} imageSize={imageSize} style={{ height: "100%" }} />
        </MotionGrid.Item>
      ))}
    </MotionGrid>
  );
}
