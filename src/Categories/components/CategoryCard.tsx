import Card from "@components/Card";
import React from "react";
import { Category } from "../../App/AppDataProvider";

function CategoryCard({ category, imageSize = "300px", ...rest }: CategoryCardProps) {
  return (
    <Card
      title={category.title}
      image={category.image}
      imageSize={imageSize}
      subtitle={category.description}
      url={"/categories/" + category.id}
      {...rest}
    >
      <div className="mt-2">
        <span className="label label-rounded label-secondary mr-1">
          {category.technologies_aggregate.aggregate.count}
        </span>
        technologies
      </div>
    </Card>
  );
}

export default React.memo(CategoryCard);

export interface CategoryCardProps {
  category: Category;
  [key: string]: any;
  imageSize?: string;
}
