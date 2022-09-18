import React, { Component } from "react";
import { addCart } from "../../../slices/cartSlice";
import "./productAttribute.css";
import { connect } from "react-redux";

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeText: this.props.initial,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ activeText: this.props.initial });
    }, 1000);
  }
  handleClick = (index) => {
    const textindex = index;

    this.setState({ activeText: textindex });

    this.props.dispatch(addCart({ textindex }));
  };
  render() {
    if (this.props.type === "text") {
      return (
        <>
          <span>{this.props.name}:</span>
          <div className="container">
            {this.props.item.map(({ value }, index) => {
              return (
                <>
                  <div key={index}>
                    <div
                      className={`text_box ${
                        this.state.activeText === index ? "active_text" : ""
                      }`}
                      onClick={() => this.handleClick(index)}
                    >
                      {value}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
    }
    if (this.props.type === "swatch")
      return (
        <>
          <span>{this.props.name}:</span>
          <div className="container">
            {this.props.item.map(({ value }, index) => {
              return (
                <>
                  <div
                    className="swatch_box"
                    style={{
                      background: value,

                      border:
                        value === "white" || value === "#FFFFFF"
                          ? `${1}px solid black`
                          : "none",
                      outlineStyle: "solid",
                      outlineColor:
                        this.state.activeText === index ? "#5ECE7B" : "#fff",
                      outlineOffset: `${2}px`,
                      outlineWidth: `${2}px`,
                    }}
                    key={index}
                    onClick={() => this.handleClick(index)}
                  ></div>
                </>
              );
            })}
          </div>
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  atttr: state.cart.attrid,
});

export default connect(mapStateToProps)(ProductAttribute);
