import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import Productlist from "../pages/Home/buckets/homeProducts/homeProducts";

export default graphql(
  gql`
    query ($newCategory: String!) {
      category(input: { title: $newCategory }) {
        products {
          name
          gallery
          brand
          inStock
          id
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
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
  `,
  {
    options: () => ({
      variables: {
        newCategory: "all",
      },
    }),
  }
)(Productlist);
