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
