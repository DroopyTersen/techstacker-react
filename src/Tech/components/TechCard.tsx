import Card from "@components/Card";
import React from "react";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";

function TechCard({ tech, imageSize = "300px", ...rest }: TechCardProps) {
  return (
    <Card
      title={tech.title}
      subtitle={tech.tagline}
      url={tech.id ? "/tech/" + tech.id : ""}
      image={tech.logo}
      imageSize={imageSize}
      {...rest}
    >
      {tech.layer && (
        <Link className="btn btn-primary mr-1 mb-1" to={"/layers/" + tech.layer.id}>
          {tech.layer.title}
        </Link>
      )}
      {tech.category && (
        <Link className="btn btn-primary mb-1" to={"/categories/" + tech.category.id}>
          {tech.category.title}
        </Link>
      )}
      {tech.link && (
        <div className="text-ellipsis">
          <a target="_blank" href={tech.link}>
            {tech.link}
          </a>
        </div>
      )}
    </Card>
  );
}

export default React.memo(TechCard);

export interface TechCardProps {
  tech: Tech;
  imageSize?: string;
  [key: string]: any;
}
