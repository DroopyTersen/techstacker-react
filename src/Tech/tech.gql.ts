const SELECT_FRAGMENT = `
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
      ${SELECT_FRAGMENT}
    }
  }
`;

export const QUERY_TECH = `
query GetTech($order: [technologies_order_by!], $limit: Int!, $where: technologies_bool_exp!) {
  technologies(order_by: $order, limit: $limit, where: $where ) {
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

export const QUERY_RECENT_TECH = `query GetRecentTech($limit:Int!) {
  technologies(order_by: {created_at: desc}, limit: $limit) {
    ${SELECT_FRAGMENT}
  }
}`;
export const QUERY_TECH_BY_ID = `query GetTechById($id:Int!) {
  technology(id:$id) {
    ${SELECT_FRAGMENT}
    description
  }
}`;
export const QUERY_FILTERED_TECH = `
query GetFilteredTech($order: [technologies_order_by!], $where: technologies_bool_exp!) {
  technologies(order_by: $order, where: $where) {
    ${SELECT_FRAGMENT}
  }
}
`;

export const QUERY_SEARCH_TECH = `
query SearchTech($search:String!) {
  technologies(order_by: { title: asc}, where: { title: { _ilike: $search }}) {
    id
    title
  }
}

`;

// {
//   "order": { "title": "asc"},
//   "where": {"category_id": { "_eq": 3}, "title": { "_like": "frame"} }
// }
