import Card from "@components/Card";
import React from "react";
import { Layer } from "../App/AppDataProvider";

function LayerCard({ layer, imageSize = "300px", ...rest }: Props) {
  let count = layer.technologies_aggregate.aggregate.count;
  return (
    <Card
      title={
        <div title={`${count} technologies in the ${layer.title} layer`}>
          <span>{layer.title}</span>
          <span className="ml-1 badge" data-badge={count}></span>
        </div>
      }
      image={layer.image}
      imageSize={imageSize}
      subtitle={layer.description}
      url={`/tech?layerId=${layer.id}`}
      {...rest}
    ></Card>
  );
}

export default React.memo(LayerCard);

interface Props {
  layer: Layer;
  [key: string]: any;
  imageSize?: string;
}
