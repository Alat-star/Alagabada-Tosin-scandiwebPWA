import React, { Component } from "react";
import getSvg from "../../svg/getSvg";
import CategoryName from "../../queries/categoryQuery";
import Currencyswitch from "../../queries/currencyQuery";
import CartItem from "./buckets/CartItem/cartItem";
import "./header.css";
class Header extends Component {
  render() {
    return (
      <div className="header_container">
        {/* category name grid*/}

        <div className="header_grid_one">
          <div className="categoryname">
            <CategoryName />
          </div>
        </div>

        {/*Logo Grid */}
        <div className="header_grid_two">
          <img src={getSvg.logo} alt="logo" className="header_logo" />
        </div>

        {/*Cart Grid */}
        <div className="header_grid_three">
          <Currencyswitch />
          <CartItem />
        </div>
      </div>
    );
  }
}

export default Header;
