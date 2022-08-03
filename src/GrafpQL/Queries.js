import { gql } from "@apollo/client";
export const LOAD_CATEGORIES = gql`
  query {
    category {
      name
      products {
        id
        name
        inStock
        description
        gallery
        category
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
export const LOAD_PRODUCTS = gql`
  query {
    category {
      name
      products {
        id
        name
        inStock
        description
        gallery
        category
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
