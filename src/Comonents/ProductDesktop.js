import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

import { useDispatch, useSelector, connect } from "react-redux";
import { selectState, getProductsAsync } from "../redux/slices/ProductsSlice";

const CardsContainer = styled.div`
  width: 90%;
  margin: auto;
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  p {
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
    props.getProductsAsync();
  }

  render() {
    console.log('props', this.props)
    return (
      <CardsContainer>
        <p> Category name </p>
        <div className="content">
          {this.props.products.products.map((item, i) => (
            <ProductCard data={item} key={i} />
          ))}
        </div>
      </CardsContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});
const mapDispatchToProps = () => ({
  getProductsAsync,
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductDesktop);

