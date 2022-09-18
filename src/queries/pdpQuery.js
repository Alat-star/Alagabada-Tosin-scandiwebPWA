import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import PDP from "../pages/Products/pdp";

export default graphql(
  gql`
    query ($pdpid: String!) {
      product(id: $pdpid) {
        id
        gallery
        name
        brand
        inStock
        description
        prices {
          currency {
            symbol
            label
          }
          amount
        }
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
      }
    }
  `,
  {
    options: () => ({
      variables: { pdpid: "huarache-x-stussy-le" },
    }),
  }
)(PDP);
