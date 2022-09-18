import getSvg from "../../../../svg/getSvg";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addCart } from "../../../../slices/cartSlice";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./homeProducts.css";
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      toast: false,
    };
  }

  componentDidMount() {
    const productCategory = this.props.match.params.product;
    this.props.data.refetch({ newCategory: productCategory || "all" });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCategory !== this.props.activeCategory) {
      this.props.data.refetch({ newCategory: this.props.activeCategory });
    }
  }
  handleClick(id, brand, image, attributes, prices) {
    const textindex = 0;
    this.props.dispatch(
      addCart({ id, brand, image, attributes, textindex, prices })
    );
    this.setState({ toast: true });
    setTimeout(() => {
      this.setState({ toast: false });
    }, 3000);
  }

  render() {
    const {
      data: { category, loading },
    } = this.props;

    if (loading) {
      return <img alt="suspense_loader" src={getSvg.loader} />;
    } else {
      return (
        <>
          <div className="category_Name">
            {this.props.activeCategory.toUpperCase()}
          </div>
          <div className="product_container">
            {this.state.toast ? (
              <div className="toast">Item added to cart!</div>
            ) : null}
            {category.products.map(
              (
                {
                  name,
                  gallery,
                  brand,
                  inStock,
                  id,
                  prices,
                  category,
                  attributes,
                },
                index
              ) => {
                /*filter function to get amount*/
                let getAmount = prices.filter(
                  (price) =>
                    price.currency.symbol === this.props.currency.symbol
                )[0];

                const image = gallery[0];

                return (
                  <div
                    key={index}
                    className="item_container"
                    style={{ opacity: inStock ? "1" : "0.5" }}
                  >
                    <div>
                      <img
                        src={getSvg.addtocart}
                        alt="cart_icon"
                        className="addto_cart"
                        style={{ opacity: !inStock && "0" }}
                        onClick={() =>
                          this.handleClick(
                            name,
                            brand,
                            gallery,
                            attributes,
                            prices
                          )
                        }
                      />
                    </div>

                    <Link to={`/${category}/${id}`}>
                      <div className="image_container">
                        <img
                          src={image}
                          alt={name}
                          className="product_images"
                        />
                        {!inStock && (
                          <h2 className="outof_stock">OUT OF STOCK</h2>
                        )}
                      </div>
                    </Link>
                    <h3 className="product_name">
                      {brand} {name}
                    </h3>
                    <h4>
                      {getAmount.currency.symbol}
                      {getAmount.amount}
                    </h4>
                  </div>
                );
              }
            )}
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  activeCategory: state.categoryName.value,
  currency: state.currency.activeCurrency,
});

export default connect(mapStateToProps)(withRouter(ProductList));
