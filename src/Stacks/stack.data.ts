import { gqlClient } from "../common/gql";
import { Tech } from "../Tech/tech.data";
import * as gql from "./stacks.gql";

export interface StackFormValues {
  id?: number;
  title?: string;
  tagline?: string;
  image?: string;
  description?: string;
  techIds?: number[];
}
export const STACK_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1534584633196-6edac9eaff29?auto=format&w=1000&q=40";
export interface Stack extends StackFormValues {
  technologies: {
    tech_id: number;
    stack_id: number;
    technology: Tech;
  }[];
}

interface InsertVariables {
  input: {
    title: string;
    tagline: string;
    image: string;
    description: string;
    technologies: { data: { tech_id: number }[] };
  };
}

interface UpdateVariables {
  id: number;
  input: {
    title: string;
    tagline: string;
    image: string;
    description: string;
  };
  stackTech: { stack_id: number; tech_id: number }[];
}

export const saveStack = async (stack: StackFormValues): Promise<Stack> => {
  if (!stack) {
    throw new Error("Missing Stack form values. Unable to save");
  }

  try {
    let { id } = stack;
    let data = id ? await _updateStack(stack) : await _insertStack(stack);

    if (!data?.stack) {
      throw new Error("Invalid Save Stack response from server.");
    }
    return data?.stack as Stack;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to Save stack item");
  }
};

const _updateStack = (stack: StackFormValues) => {
  let variables: UpdateVariables = {
    id: stack.id,
    input: {
      title: stack.title,
      tagline: stack.tagline,
      description: stack.description,
      image: stack.image,
    },
    stackTech: stack.techIds.map((tech_id) => ({ tech_id, stack_id: stack.id })),
  };

  return gqlClient.request(gql.MUTATION_UPDATE_STACK, variables);
};

const _insertStack = (stack: StackFormValues) => {
  let variables: InsertVariables = {
    input: {
      title: stack.title,
      tagline: stack.tagline,
      description: stack.description,
      image: stack.image,
      technologies: {
        data: stack.techIds.map((tech_id) => ({ tech_id })),
      },
    },
  };
  return gqlClient.request(gql.MUTATION_INSERT_STACK, variables);
};
