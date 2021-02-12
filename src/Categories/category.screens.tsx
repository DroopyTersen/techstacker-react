import { GraphQL } from "@components/GraphQL";
import { MotionGrid } from "@components/Grid";

import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppData, useCategories } from "../App/AppDataProvider";
import TechGrid from "../Tech/components/TechGrid";
import { QUERY_FILTERED_TECH } from "../Tech/tech.gql";
import CategoryCard from "./components/CategoryCard";

export const CategoryDetailsScreen = () => {
  let { categoryId } = useParams();
  let categories = useCategories();
  let category = categories.find((c) => c.id + "" === categoryId);
  let memoizedVars = useMemo(() => {
    return {
      order: { title: "asc" },
      where: { category_id: { _eq: categoryId } },
    };
  }, [categoryId]);
  return (
    <>
      <h1>{category?.title}</h1>
      <GraphQL query={QUERY_FILTERED_TECH} variables={memoizedVars}>
        {({ data }) => <TechGrid technologies={data?.technologies} />}
      </GraphQL>
    </>
  );
};

export const CategoriesScreen = () => {
  let { categories = [], refresh } = useAppData();

  useEffect(() => {
    refresh();
  }, []);

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
