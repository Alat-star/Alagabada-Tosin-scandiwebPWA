import React, { Component } from "react";
import ProductList from "../../queries/productsQuery";

class Home extends Component {
  render() {
    return (
      <>
        <ProductList />
      </>
    );
  }
}

export default Home;
