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
import { withRouter } from "./HOC/withRouter";

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
    getProductsAsync(this.props.router.location.pathname?.substring(1))
  }
  capitalizeFirstLetter = (str)  => (str && str.charAt(0).toUpperCase() + str.slice(1))
  render() {

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
            {this.capitalizeFirstLetter(this.props.categories.currentCategory)}
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

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(ProductDesktop));
