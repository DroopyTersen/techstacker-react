import { GraphQL } from "@components/GraphQL";
import { MotionGrid } from "@components/Grid";
import { Row } from "@components/layout";

import React from "react";
import { useCategories } from "../App/AppDataProvider";
import CategoryCard from "./components/CategoryCard";

export const CategoriesScreen = () => {
  let categories = useCategories();

  return (
    <>
      <h1>Tech Categories</h1>
      <MotionGrid width="350px" gap="20px">
        {categories.map((category) => (
          <MotionGrid.Item key={category.id}>
            <CategoryCard category={category} imageSize="150px" style={{ height: "100%" }} />
          </MotionGrid.Item>
        ))}
      </MotionGrid>
    </>
  );
};
