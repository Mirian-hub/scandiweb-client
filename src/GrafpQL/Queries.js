import { gql } from "@apollo/client";
export const LOAD_CATEGORIES = gql`
  query {
    category {
      name
      products {
        name
        description
        id
      }
    }
  }
`;
