import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import CategoryName from "../components/Header/buckets/CategoryName/categoryName";


export default graphql(gql`
  query {
    categories {
      name
    }
  }
`)(CategoryName);
