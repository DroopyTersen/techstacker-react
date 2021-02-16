import Card from "@components/Card";
import { TagsDisplay } from "@components/tags";
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
      <div className="pb-2">
        <TagsDisplay tags={tech.tags} getLinkPath={(tag) => `/tech?tag=${tag}`} />
      </div>
      {tech.layer && (
        <Link className="btn btn-primary mr-1 mb-1" to={`/tech?layerId=${tech.layer.id}`}>
          {tech.layer.title}
        </Link>
      )}
      {tech.category && (
        <Link className="btn btn-primary mb-1" to={`/tech?categoryId=${tech.category.id}`}>
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
