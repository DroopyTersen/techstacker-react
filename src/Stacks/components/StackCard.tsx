import React from "react";
import Card from "@components/Card";
import { Link } from "react-router-dom";
import { Stack, STACK_DEFAULT_IMAGE } from "../stack.data";

interface Props {
  stack: Stack;
  imageSize?: string;
  [key: string]: any;
}

function StackCard({ stack, imageSize = "300px", ...rest }: Props) {
  return (
    <Card
      title={stack.title}
      subtitle={stack.tagline}
      url={stack.id ? "/stacks/" + stack.id : ""}
      image={stack.image || STACK_DEFAULT_IMAGE}
      imageSize={imageSize}
      {...rest}
    >
      <div style={{ textAlign: "center" }}>
        {stack.technologies.map((t) => (
          <Link
            key={t.technology.id}
            className="btn btn-primary mr-1 mb-1"
            to={"/tech/" + t.technology.id}
          >
            {t.technology.title}
          </Link>
        ))}
      </div>
    </Card>
  );
}

export default React.memo(StackCard);

export const STACK_CARD_SELECT_FRAGMENT = `
  id
  title
  tagline
  image
  technologies(order_by: {technology: {layer: {position: asc}, category: {position: asc}}}) {
    technology {
      id
      title
    }
  }
`;
