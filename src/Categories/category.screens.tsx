import { GraphQL } from "@components/GraphQL";

import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppData, useCategories } from "../App/AppDataProvider";
import TechGrid from "../Tech/components/TechGrid";
import { QUERY_FILTERED_TECH } from "../Tech/tech.gql";

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
