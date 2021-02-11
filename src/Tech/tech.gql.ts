const SELECT_FRAGMENT = `
    id
    title
    tagline
    link
    logo
    layer_id
    layer {
        id
        title
        image
        description
    }
    category_id
    category {
        id
        title
        image
        description
    }
    created_at
    updated_at
`;

export const INSERT = `mutation InsertTech($input:technologies_insert_input!) {
    technology:insert_technology(object: $input ) {
      ${SELECT_FRAGMENT}
    }
  }
`;

export const UPDATE = `mutation UpdateTech($input: technologies_set_input!, $id:Int!) {
  technology:update_technology(_set: $input, pk_columns: { id: $id}) {
    ${SELECT_FRAGMENT}
  }
}
`;

export const DELETE = `mutation DeleteTech($id:Int!) {
  delete_technology(id:$id) {
    id
  }
}`;

export const QUERY_TECH = `query GetTech {
  technologies(order_by: {created_at: desc}) {
    ${SELECT_FRAGMENT}
  }
}`;
export const QUERY_TECH_BY_ID = `query GetTechById($id:Int!) {
  technology(id:$id) {
    ${SELECT_FRAGMENT}
    description
  }
}`;
