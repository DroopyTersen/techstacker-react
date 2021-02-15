// mutation CreateStack {
//     insert_stacks_one(object:{ title:"test", description:"", technologies: { data: [{ tech_id:7 }, { tech_id:6}]}}) {
//       id
//       title
//       technologies {
//         technology {
//           title
//           description
//         }
//       }
//     }
//   }

// mutation UpdateStack($id: Int!, $input: stacks_set_input!, $stackTech: [stack_tech_insert_input!]!) {
//     delete_stack_tech(where: {stack_id: {_eq: $id}}) {
//       affected_rows
//     }
//     insert_stack_tech(objects: $stackTech) {
//       returning {
//         stack_id
//         tech_id
//       }
//     }
//     stack: update_stack(pk_columns: {id: $id}, _set: $input) {
//       id
//       title
//       image
//       description
//       technologies(order_by: {technology: {layer: {position: asc}, category: {position: asc}}}) {
//         tech_id
//         technology {
//           id
//           title
//           logo
//           layer {
//             id
//             title
//           }
//           category {
//             id
//             title
//           }
//         }
//       }
//     }
//   }
// {
//     "id": 6,
//    "input": { "description": "des" },
//     "stackTech": [{ "stack_id": 6, "tech_id": 4 }]
//   }
const SELECT_FRAGMENT = `    
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

// {
//     "input": { "title": "test", "technologies": { "data": [{ "tech_id": 7 }, { "tech_id": 4}, { "tech_id": 6  }]} }
//    }
export const MUTATION_INSERT_STACK = `mutation CreateStack($input: stacks_insert_input!) {
    stack: insert_stack(object: $input) {
        ${SELECT_FRAGMENT}
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
      ${SELECT_FRAGMENT}
    }
  }
`;

export const QUERY_AVAILABLE_TECH = `
query GetAvailableTech {
    technologies(order_by: {layer: {position: asc}, category: {position: asc}, title: asc}) {
      id
      title
      logo
      tagline
      category {
        id
        title
        position
      }
      layer {
        id
        title
        position
      }
    }
  }

`;

export const QUERY_STACK_FOR_EDIT = `
query GetStackForEdit($id:Int!) {
    stack(id:$id) {
      id
      image
      title
      description
      technologies {
        tech_id
      }
    }
  }
`;

export const QUERY_RECENT_STACKS = `
query GetRecentStacks($limit: Int!) {
    stacks(order_by: {created_at: desc}, limit: $limit) {
        ${SELECT_FRAGMENT}
    }
}
`;

export const QUERY_STACK_BY_ID = `
query GetStackById($id: Int!) {
    stack(id: $id) {
        ${SELECT_FRAGMENT}
    }
}
`;

export const QUERY_STACKS_BY_TECH = `
query GetStacksByTech($techId: Int!) {
    stacks(where: {technologies: {tech_id: {_eq: $techId }}}) {
      ${SELECT_FRAGMENT}
    }
  }  
`;
