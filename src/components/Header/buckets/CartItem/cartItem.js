import React, { Component } from "react";
import getSvg from "../../../../svg/getSvg";
import { connect } from "react-redux";
import { addCart } from "../../../../slices/cartSlice";
import "./cartItem.css";
import ProductAttribute from "../../../../pages/Products/buckets/productAttribute";
import { Link } from "react-router-dom";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      qty: this.props.cartfil.length,
    };
    /*ref instances*/
    this.minicartRef = React.createRef();
    this.cartbuttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
  
    if (this.minicartRef.current && this.cartbuttonRef.current) {
      if (
        !this.minicartRef.current.contains(event.target) &&
        !this.cartbuttonRef.current.contains(event.target)
      ) {
        this.setState({ open: false });
        document.body.style.overflow = "scroll";
      }
    }
  }
  handleCartClick() {
    this.setState({ open: !this.state.open });
    if(this.state.open === false){
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "scroll";
    }
  }

  render() {
    /*create global variabe*/
    window.cartTotal = [];
    window.totalAmount = 0.0;
    return (
      <>
        <div>
          <div
            className="shop_cart"
            onClick={this.handleCartClick}
            ref={this.cartbuttonRef}
          >
            <div
              className="badge"
              style={{ opacity: this.props.qty <= 0 ? 0 : 1 }}
            >
              <div className="badge_text">
                {this.props.qty > 9 ? "9+" : this.props.qty}
              </div>
            </div>
            <img src={getSvg.cart} alt="cart" className="cart" />
          </div>
          <div
            className="overlay"
            style={{ display: this.state.open ? "block" : "none" }}
          >
            <div className="mini_cart" ref={this.minicartRef}>
              <p>
                <span className="bold_text">My bag</span>,{" "}
                {this.props.cartfil.length} item(s)
              </p>

              <div className="cartItem_maxcontainer">
                {this.props.cartfil.map(
                  ({
                    name,
                    quantity,
                    brand,
                    img,
                    attributes,
                    attributeName,
                    prices,
                  }) => {
                    /*filter function to get amount*/
                    let cartAmount = prices.filter(
                      (price) =>
                        price.currency.symbol === this.props.currency.symbol
                    )[0];
                    const amount = cartAmount.amount * quantity;
                    window.cartTotal.push(amount);
                    const cartTotAmount = window.cartTotal.reduce(function (
                      acc,
                      obj
                    ) {
                      return acc + obj;
                    },
                    0);
                    window.totalAmount = cartTotAmount.toFixed(2);

                    const quanincre = attributeName;
                    const quandecre = attributeName;
                    const quanincrename = name;
                    const quandecrename = name;
                    const textindex = this.props.attrop;

                    return (
                      <>
                        <div className="cartItem_Container">
                          <div>
                            <h2 className="cart_name">{name}</h2>
                            <h3 className="cart_brand">{brand}</h3>
                            <h4 className="cart_amount">
                              {cartAmount.currency.symbol}
                              {cartAmount.amount}
                            </h4>
                            {attributes?.map(({ type, name, items }) => (
                              <>
                                <div className="cartItem_innerContainer"></div>
                                <ProductAttribute
                                  name={name}
                                  item={items}
                                  type={type}
                                  initial={attributeName}
                                />
                              </>
                            ))}
                          </div>
                          <div className="item_count_container">
                            <button
                              className="item_count"
                              onClick={() =>
                                this.props.dispatch(
                                  addCart({
                                    quanincre,
                                    textindex,
                                    quanincrename,
                                  })
                                )
                              }
                            >
                              +
                            </button>
                            <div className="item_quantity">{quantity}</div>
                            <button
                              className="item_count"
                              onClick={() =>
                                this.props.dispatch(
                                  addCart({
                                    quandecre,
                                    textindex,
                                    quandecrename,
                                  })
                                )
                              }
                            >
                              -
                            </button>
                          </div>
                          <div>
                            <img
                              src={img[0]}
                              alt="cart_image"
                              className="cart_image"
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              <div className="cartItem_totalCon">
                <span>Total:</span>
                <span className="cartItem_amount">
                  {this.props.currency.symbol}
                  {window.totalAmount}
                </span>
              </div>
              <div className="cartItem_button">
                <button className="cart_button_one">
                  <Link to={"/cart"} className="cartItem_link">
                    VIEW BAG
                  </Link>
                </button>
                <button className="cart_button_two">CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.value,
  cartfil: state.cart.filt,
  currency: state.currency.activeCurrency,
  jet: state.cart.geto,
  activeCategory: state.categoryName.value,
  qty: state.cart.cartQuantity,
  attrop: state.cart.attrid,
});

export default connect(mapStateToProps)(CartItem);
