export const STACK_SELECT_FRAGMENT = `    
  id
  title
  tagline
  image
  description
  technologies(order_by: {technology: {layer: {position: asc}, category: {position: asc}}}) {
    tech_id
    stack_id
    technology {
      id
      title
      logo
      tags
      layer {
        id
        title
      }
      category {
        id
        title
      }
    }
  }
`;

export const MUTATION_INSERT_STACK = `mutation CreateStack($input: stacks_insert_input!) {
    stack: insert_stack(object: $input) {
        ${STACK_SELECT_FRAGMENT}
    }
  }
`;

export const MUTATION_UPDATE_STACK = `
mutation UpdateStack($id: Int!, $input: stacks_set_input!, $stackTech: [stack_tech_insert_input!]!) {
    delete_stack_tech(where: {stack_id: {_eq: $id}}) {
      affected_rows
    }
    insert_stack_tech(objects: $stackTech) {
      returning {
        stack_id
        tech_id
      }
    }
    stack: update_stack(pk_columns: {id: $id}, _set: $input) {
      ${STACK_SELECT_FRAGMENT}
    }
  }
`;

export const QUERY_STACK_BY_ID = `
query GetStackById($id: Int!) {
    stack(id: $id) {
        ${STACK_SELECT_FRAGMENT}
    }
}
`;
