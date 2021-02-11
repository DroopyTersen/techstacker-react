import React from "react";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";

function TechCard({ tech, imageSize = "300px", ...rest }: TechCardProps) {
  let LinkWrapper = tech?.id ? Link : "span";
  return (
    <div className="card" {...rest}>
      {tech.logo && (
        <LinkWrapper to={"/tech/" + tech.id}>
          <div className="card-image">
            <img
              style={{ height: imageSize, width: "100%" }}
              className="img-fit-cover img-responsive mb-2"
              src={tech.logo}
            />
          </div>
        </LinkWrapper>
      )}
      <div className="card-header">
        <LinkWrapper to={"/tech/" + tech.id}>
          <div className="card-title h4">{tech.title || "New Tech"}</div>
        </LinkWrapper>
        <div className="card-subtitle text-gray" style={{ minHeight: "50px" }}>
          {tech.tagline}
        </div>
      </div>
      <div className="card-footer">
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
      </div>
    </div>
  );
}

export default React.memo(TechCard);

export interface TechCardProps {
  tech: Tech;
  imageSize?: string;
  [key: string]: any;
}
