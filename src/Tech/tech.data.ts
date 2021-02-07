import { Category, Layer } from "../App/AppDataProvider";
import { gqlClient } from "../common/gql";
import * as gql from "./tech.gql";

export interface TechDto {
  id?: number;
  title?: string;
  category_id?: number;
  layer_id?: number;
  description?: string;
  link?: string;
  logo?: string;
  tagline?: string;
}

export interface Tech extends TechDto {
  category: Category;
  layer: Layer;
}

export const saveTech = async (tech: TechDto): Promise<Tech> => {
  if (!tech) {
    throw new Error("Missing Tech input");
  }
  try {
    let { id, ...input } = tech;
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
