import React from "react";
import { Link } from "react-router-dom";

function Card({ title, subtitle, image, url, imageSize = "300px", children, ...rest }: CardProps) {
  let LinkWrapper = url ? Link : "span";
  return (
    <div className="card" {...rest}>
      {image && (
        <LinkWrapper to={url}>
          <div className="card-image">
            <img
              style={{ height: imageSize, width: "100%" }}
              className="img-fit-cover img-responsive mb-2"
              src={image}
            />
          </div>
        </LinkWrapper>
      )}
      <div className="card-header">
        <LinkWrapper to={url}>
          <div className="card-title h4">{title}</div>
        </LinkWrapper>
        {subtitle && (
          <div className="card-subtitle text-gray" style={{ minHeight: "50px" }}>
            {subtitle}
          </div>
        )}
      </div>
      <div className="card-footer">{children}</div>
    </div>
  );
}

export default React.memo(Card);

export interface CardProps {
  title: string;
  subtitle?: string;
  url?: string;
  image?: string;
  imageSize?: string;
  [key: string]: any;
  children?: React.ReactNode;
  badgeCount?: number;
}
