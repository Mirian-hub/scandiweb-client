import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, resolvePath } from "react-router-dom";

import { ReactComponent as CartGreen } from "../assets/icons/cartGreen.svg";
import { cartProductById, uncartProduct } from "../redux/slices/ProductsSlice";
const CartButton = styled.button`
  position: absolute;
  right: 50px;
  bottom: -50px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: none;
  transition: 0.5s;
`;

const OutOfStockP = styled.p`
  text-align: center;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 40;
  font-size: 28px;
  width: 100%;
  position: absolute;
  top: 170px;
  display: ${(props) => (!props.inStock ? "block" : "none")};
`;

const Card = styled.div`
  transition: 0.3s;
  width: 29%;
  margin-right: 40px;
  margin-bottom: 40px;
  padding: 10px;
  opacity: ${({ inStock }) => (!inStock ? "0.3" : "1")};
  &:hover ${CartButton} {
    display: ${(props) => (!props.inStock ? "none" : "block")};
  }

  .imgContainer {
    position: relative;
  }
  img {
    width: 100%;
    display: block;
    margin: auto;
    height: 400px;
    object-fit: cover;
    object-position: 50% 50%;
  }
  .nameP {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100;
    font-size: 18px;
  }
  label {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
  }
  .priceDiv {
    margin-bottom: 15px;
  }
`;

const CartIcon = styled(CartGreen)``;
const CartImg = styled.img`
  cursor: pointer;
`;

class ProductCard extends Component {
  render() {
    console.log("ProductCard", this.props);
    const { gallery, name, prices, inStock, id } = this.props.data;
    const price = prices.find(
      (x) => x.currency.label === this.props.currency.label
    );

    return (
      this.props.currency && (
        <Card inStock={inStock}>
          <div className="container">
            <div className="imgContainer">
              {inStock ? (
                <Link to={`/product/${id}`}>
                  <CartImg src={gallery[0]} />
                </Link>
              ) : (
                <CartImg src={gallery[0]} />
              )}

              <OutOfStockP inStock={inStock}> OUT OF STOCK </OutOfStockP>
              <CartButton onClick={() => this.props.cartProductById(id)}>
                <CartIcon />
              </CartButton>
            </div>

            <p className="nameP"> {name}</p>
            <div className="priceDiv">
              <label>{price.currency.label}</label>{" "}
              <label>{price.amount}</label>
            </div>
          </div>
        </Card>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});
const mapDispatchToProps = () => ({
  cartProductById,
  uncartProduct,
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
