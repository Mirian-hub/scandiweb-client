import { gql } from "@apollo/client";
export const LOAD_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const getLoadProductsQuery = (title) => gql`
query {
  category (input:{title: "${title}"}) {
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

export const LOAD_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
