import { useGqlQuery } from "../common/gql";

export type AggregateCount = {
  aggregate: {
    count: number;
  };
};

export interface Layer {
  id: number;
  title: string;
  description?: string;
  image?: string;
  position: number;
  technologies_aggregate: AggregateCount;
}

export interface Category {
  id: number;
  title: string;
  description?: string;
  image?: string;
  position: number;
  technologies_aggregate: AggregateCount;
}

export function useLayersAndCategories() {
  let { data } = useGqlQuery(QUERY, {}, { staleTime: 600000 });

  return {
    layers: data?.layers || [],
    categories: data?.categories || [],
  } as { layers: Layer[]; categories: Category[] };
}

export function useLayers() {
  let { layers } = useLayersAndCategories();
  return layers || [];
}

export function useCategories() {
  let { categories } = useLayersAndCategories();
  return categories || [];
}

const QUERY = `query LayersAndCategories {
  categories(order_by: {position: asc}) {
    id
    title
    description
    image
    position
    technologies_aggregate {
      aggregate {
        count
      }
    }
  }
  layers(order_by: {position: asc}) {
    id
    title
    description
    image
    position
    technologies_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;
