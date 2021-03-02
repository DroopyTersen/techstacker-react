import Card from "@components/Card";
import QueryLink from "@components/QueryLink";
import { TagsDisplay } from "@components/tags";
import React from "react";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";
import TechTags from "./TechTags";

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
        <TechTags tags={tech.tags} />
      </div>
      {tech.layer && (
        <QueryLink
          path="/tech"
          param="layerId"
          value={tech.layer.id}
          className="btn btn-primary mr-1 mb-1"
        >
          {tech.layer.title}
        </QueryLink>
      )}
      {tech.category && (
        <QueryLink
          path="/tech"
          param="categoryId"
          value={tech.category.id}
          className="btn btn-primary mr-1 mb-1"
        >
          {tech.category.title}
        </QueryLink>
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

export const TECH_CARD_SELECT_FRAGMENT = `
  id
  title
  tagline
  link
  logo
  tags
  layer {
      id
      title

  }
  category_id
  category {
      id
      title
  }
`;
