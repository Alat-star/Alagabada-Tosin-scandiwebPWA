import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import CurrencySwitch from "../components/Header/buckets/CurrencySwitch/currencySwitch.js";

export default graphql(gql`
  query {
    currencies {
      label
      symbol
    }
  }
`)(CurrencySwitch);
