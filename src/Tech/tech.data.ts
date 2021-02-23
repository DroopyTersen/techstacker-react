import { processTags } from "@components/tags";
import { Category, Layer } from "../App/AppDataProvider";
import { cachify } from "../common/cache";
import { gqlClient } from "../common/gql";
import * as gql from "./tech.gql";

export interface TechDto {
  id?: number;
  title?: string;
  category_id?: number | string;
  layer_id?: number | string;
  description?: string;
  link?: string;
  logo?: string;
  tagline?: string;
  tags?: string[];
}

export interface Tech extends TechDto {
  category: Category;
  layer: Layer;
}

export interface TechQuery {
  limit?: number | string;
  sortKey?: string;
  sortDir?: string;
  tag?: string;
  categoryId?: string | number;
  layerId?: string | number;
}

export function getTechVariables(query: TechQuery) {
  let variables: any = {
    limit: parseInt((query.limit || 100) + "", 10),
    order: [{ layer: { position: "asc" } }, { category: { position: "asc" } }, { title: "asc" }],
    // {
    //   ,
    //   category: { position: "asc" },
    //   // [query.sortKey || "title"]: query.sortDir || "asc",
    // },
    where: {},
  };
  if (query.sortKey) {
    variables.order = [{ [query.sortKey]: query.sortDir || "asc" }, ...variables.order];
  }
  if (query.tag) {
    variables.where.tags = { _contains: query.tag };
  }
  if (query.layerId) {
    variables.where.layer_id = { _eq: parseInt(query.layerId + "", 10) };
  }
  if (query.categoryId) {
    variables.where.category_id = { _eq: parseInt(query.categoryId + "", 10) };
  }
  return variables;
}

export const saveTech = async (tech: TechDto): Promise<Tech> => {
  if (!tech) {
    throw new Error("Missing Tech input");
  }
  try {
    let { id, ...input } = tech;
    if (!input.category_id) {
      input.category_id = null;
    }
    if (typeof input.tags === "string") {
      input.tags = processTags(tech.tags);
    }
    let { data, errors } = id
      ? await gqlClient.request(gql.UPDATE, { input, id })
      : await gqlClient.request(gql.INSERT, { input });

    if (errors) {
      throw errors;
    }
    if (!data?.technology) {
      throw new Error("Unable to find target Tech");
    }
    return data?.technology as Tech;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to save Tech item");
  }
};

export const searchTech = cachify(
  async (search: string): Promise<Tech[]> => {
    if (!search) return [];
    let { data } = await gqlClient.request(gql.QUERY_SEARCH_TECH, {
      search: `%${search}%`,
    });

    return data?.technologies ?? [];
  },
  { getCacheKey: (search) => `search-tech:${search}`, duration: 1000 * 60 }
);

export const filterTech = (technologies: Tech[], textFilter: string) => {
  if (!textFilter) return technologies;
  const check = (val) => (val + "").toLowerCase().includes(text);

  let text = (textFilter + "").toLowerCase();
  return technologies.filter((t) => {
    return (
      check(t.title) ||
      check(t.tagline) ||
      check(t.category.title) ||
      check(t.layer.title) ||
      (t?.tags || []).some((tag) => tag.includes(text))
    );
  });
};
