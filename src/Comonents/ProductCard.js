import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as CartGreen } from "../assets/icons/cartGreen.svg";

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

const OutOFStockP = styled.p`
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
  width: 30%;
  margin-right: 40px;
  margin-bottom: 40px;
  padding: 10px;
  opacity: ${(props) => (!props.inStock ? "0.5" : "1")};

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
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

class ProductCard extends Component {
  render() {
    // this.props.getProductsAsync();
    const { gallery, name, prices, inStock } = this.props.data;
    console.log("dt", this.props.data);
    return (
      <Card inStock={inStock}>
        <div className="container">
          <div className="imgContainer">
            <img src={gallery[0]} alt="Avatar" />
            <OutOFStockP inStock={inStock}> OUT OF STOCK </OutOFStockP>
            <CartButton>
              <CartGreen />
            </CartButton>
          </div>

          <p className="nameP"> {name}</p>
          <div className="priceDiv">
            <label>{prices[0].currency.symbol}</label>{" "}
            <label>{prices[0].amount}</label>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProductCard;
