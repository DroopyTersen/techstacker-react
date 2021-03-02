import React from "react";
import { useLayers } from "../../App/AppDataProvider";
import TechGrid from "../../Tech/components/TechGrid";
import { Stack } from "../stack.data";

interface Props {
  stack: Stack;
}
export default function StackTech({ stack }: Props) {
  let layers = useLayers();

  return (
    <>
      {layers.map((layer) => {
        let layerTech = stack.technologies
          .filter((t) => t.technology.layer.id === layer.id)
          .map((t) => t.technology);

        if (!layerTech || !layerTech.length) {
          return null;
        }
        return (
          <div style={{ padding: "30px 0" }}>
            <h3 className="h4 label label-rounded label-secondary">{layer.title}</h3>
            <div className="mb-2">
              <TechGrid width="200px" imageSize="120px" gap="5px" technologies={layerTech} />
            </div>
          </div>
        );
      })}
    </>
  );
}
