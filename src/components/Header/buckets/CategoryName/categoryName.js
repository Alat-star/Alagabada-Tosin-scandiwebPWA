import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCategory } from "../../../../slices/categoryNameSlice";
import "./categoryName.css";
import { Link } from "react-router-dom";
import getSvg from "../../../../svg/getSvg";

class CategoryName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e, index) => {
    this.props.dispatch(changeCategory(e.target.innerHTML.toLowerCase()));
    this.setState({ activeId: index });
  };

  render() {
    const {
      data: { categories, loading },
    } = this.props;

    if (loading) {
      return null
    } else {
      return categories.map(({ name }, index) => (
        <Link
          to={`/${name}`}
          className={`category_name ${
            this.state.activeId === index ? "active" : ""
          }`}
          key={index}
          onClick={(e) => this.handleClick(e, index)}
        >
          {name.toUpperCase()}
        </Link>
      ));
    }
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryName.value,
});

export default connect(mapStateToProps)(CategoryName);
