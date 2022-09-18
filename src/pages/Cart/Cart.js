import React, { Component } from "react";
import { connect } from "react-redux";
import { addCart } from "../../slices/cartSlice";
import ProductAttribute from "../Products/buckets/productAttribute";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: 0,
    };
    this.handleCarouselClick = this.handleCarouselClick.bind(this);
  }

  handleCarouselClick(type) {
    this.setState((prevState) => {
      return {
        carousel:
          type === "add" ? prevState.carousel + 1 : prevState.carousel - 1,
      };
    });
  }

  render() {
    /*create global variabe*/
    window.cartPageTotal = [];
    window.cartPageAmount = 0.0;

    return (
      <>
        <div className="cartpageheader_name">CART</div>

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
            let cartAmount = prices.filter(
              (price) => price.currency.symbol === this.props.currency.symbol
            )[0];
            const amount = cartAmount.amount * quantity;
            window.cartPageTotal.push(amount);
            const cartTotAmount = window.cartTotal.reduce(function (acc, obj) {
              return acc + obj;
            }, 0);
            window.cartPageAmount = cartTotAmount.toFixed(2);

            const quandecre = attributeName;
            const id = name;
            const quandecrename = name;
            const textindex = this.props.attrop;

            return (
              <>
                <hr className="cartpage_hr" />
                <div className="cartPage_Container">
                  <div>
                    <h2 className="cartpage_name">{name}</h2>
                    <h3 className="cartpage_brand">{brand}</h3>
                    <h4 className="cartpage_amount">
                      {cartAmount.currency.symbol}
                      {cartAmount.amount}
                    </h4>
                    {attributes?.map(({ type, name, items }) => (
                      <>
                        <div className="cartpage_innerCon"></div>
                        <ProductAttribute
                          name={name}
                          item={items}
                          type={type}
                          initial={attributeName}
                        />
                      </>
                    ))}
                  </div>
                  <div className="cartpage_downCon">
                    <button
                      className="cartpage_quantityupdate"
                      onClick={() =>
                        this.props.dispatch(addCart({ textindex, id }))
                      }
                    >
                      +
                    </button>
                    <span className="cartpage_quantityContainer">
                      {quantity}
                    </span>
                    <button
                      className="cartpage_quantityupdate"
                      onClick={() =>
                        this.props.dispatch(
                          addCart({ quandecre, textindex, quandecrename })
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img
                      src={img[this.state.carousel]}
                      alt="cart_image"
                      className="cartpage_image"
                    />
                    <div className="carret_button_container">
                      <button
                       className="carret_button"
                        style={{
                          visibility:
                            this.state.carousel <= 0 ? "hidden" : "visible",
                        }}
                        onClick={() => this.handleCarouselClick("sub")}
                      >
                        {"<"}
                      </button>
                      <button
                      className="carret_button"
                        style={{
                          visibility:
                            this.state.carousel === img.length - 1
                              ? "hidden"
                              : "visible",
                        }}
                        onClick={() => this.handleCarouselClick("add")}
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        )}

        <div className="cartpage_total">
          <span className="tax_span">
            Tax 21%:{((21 / 100) * window.cartPageAmount).toFixed(2)}
          </span>
          <span className="quantity_span">Quantity:{this.props.qty}</span>
          <span className="total_span">
            Total:{this.props.currency.symbol}
            {window.cartPageAmount}
          </span>
          <button className="order_button">ORDER</button>
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
export default connect(mapStateToProps)(Cart);
