import React from "react";

export function Row({
  children,
  gap = "20px",
  justifyContent = "flex-start",
  alignItems = "center",
  className,
}) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap,
        alignItems,
        justifyContent,
      }}
    >
      {children}
    </div>
  );
}
export function TwoColumn({ children }) {
  if (children.length !== 2) throw new Error("YOu must pass 2 children to GreedyTwoColumn");
  return (
    <Row alignItems="flex-start" className="mb-2">
      <div style={{ flex: "0 1 90ch" }}>{children[0]}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{children[1]}</div>
    </Row>
  );
}
