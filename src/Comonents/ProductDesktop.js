import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

import { useSelector, connect } from "react-redux";
import {
  selectState,
  getProductsAsync,
  toggleCartOverlay,
} from "../redux/slices/ProductsSlice";
import CustomModal from "./CustomModal";
import CartOverlay from "./CartOverlay";

const CardsContainer = styled.div`
  position: relative;
`;
const CardsContent = styled.div`
  width: 90%;
  margin: auto;
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .categoryP {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 42px;
    line-height: 160%;
  }
`;
export class ProductDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, category: null };
  }
  capitalizeFirstLetter = (str)  => (str && str.charAt(0).toUpperCase() + str.slice(1))
  render() {
    const { currentCategory } = this.props.categories;
    // console.log(this.props.categories)
    return (
      <CardsContainer>
        <CardsContent>
          <p
            className="categoryP"
            onClick={() =>
              this.setState({
                active: true,
              })
            }
          >
            {this.capitalizeFirstLetter(currentCategory)}
          </p>
          <div className="content">
            {this.props.products.products.map((item, i) => (
              <ProductCard
                data={item}
                key={i}
                currency={this.props.currentCurrency}
              />
            ))}
          </div>
        </CardsContent>
        <CustomModal
          active={this.props.products.cartOverlayOpen}
          hideModal={() => this.props.toggleCartOverlay(false)}
          title="Modal title goes here"
          width={"500px"}
          top={0}
          right={"7rem"}
        >
          <CartOverlay />
        </CustomModal>
      </CardsContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  currentCurrency: state.currencies.currentCurrency,
  categories: state.categories,
});
const mapDispatchToProps = () => ({
  getProductsAsync,
  toggleCartOverlay,
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductDesktop);
