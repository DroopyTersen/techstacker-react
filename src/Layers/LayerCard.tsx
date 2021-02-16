import Card from "@components/Card";
import React from "react";
import { Layer } from "../App/AppDataProvider";

function LayerCard({ layer, imageSize = "300px", ...rest }: Props) {
  return (
    <Card
      title={layer.title}
      image={layer.image}
      imageSize={imageSize}
      subtitle={layer.description}
      url={`/tech?layerId=${layer.id}`}
      {...rest}
    >
      <div className="mt-2">
        <span className="label label-rounded label-secondary mr-1">
          {layer.technologies_aggregate.aggregate.count}
        </span>
        technologies
      </div>
    </Card>
  );
}

export default React.memo(LayerCard);

interface Props {
  layer: Layer;
  [key: string]: any;
  imageSize?: string;
}
