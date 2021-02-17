import Card from "@components/Card";
import React from "react";
import { Category } from "../../App/AppDataProvider";

function CategoryCard({ category, imageSize = "300px", ...rest }: CategoryCardProps) {
  let count = category.technologies_aggregate.aggregate.count;
  return (
    <Card
      title={
        <div title={`${count} technologies in the ${category.title} category`}>
          <span>{category.title}</span>
          <span className="ml-1 badge" data-badge={count}></span>
        </div>
      }
      image={category.image}
      imageSize={imageSize}
      subtitle={category.description}
      url={`/tech?categoryId=${category.id}`}
      {...rest}
    ></Card>
  );
}

export default React.memo(CategoryCard);

export interface CategoryCardProps {
  category: Category;
  [key: string]: any;
  imageSize?: string;
}
