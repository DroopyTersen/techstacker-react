export const TECH_SELECT_FRAGMENT = `
    id
    title
    tagline
    link
    logo
    tags
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
      ${TECH_SELECT_FRAGMENT}
    }
  }
`;

export const UPDATE = `mutation UpdateTech($input: technologies_set_input!, $id:Int!) {
  technology:update_technology(_set: $input, pk_columns: { id: $id}) {
    ${TECH_SELECT_FRAGMENT}
  }
}
`;

export const DELETE = `mutation DeleteTech($id:Int!) {
  delete_technology(id:$id) {
    id
  }
}`;

export const QUERY_SEARCH_TECH = `
query SearchTech($search:String!) {
  technologies(order_by: { title: asc}, where: { title: { _ilike: $search }}) {
    id
    title
  }
}
`;
