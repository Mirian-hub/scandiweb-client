import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as CartGreen } from "../assets/icons/cartGreen.svg";
import {
  cartProductById,
  uncartProduct,
  cartProduct,
} from "../redux/slices/ProductsSlice";
import CustomLabel from "./CustomLabel";
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

const Card = styled.div`
  transition: 0.3s;
  width: 29%;
  margin-right: 40px;
  margin-bottom: 40px;
  opacity: ${({ inStock }) => (!inStock ? "0.5" : "1")};
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
    height: 300px;
    object-fit: cover;
    object-position: 50% 50%;
  }
  .nameAndBrand {
    font-style: normal;
    font-weight: 100;
    font-size: 18px;
    padding: 2rem 0 0.5rem 0;
    label {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
    }
  }

  .priceDiv {
    margin-bottom: 15px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
  }
`;

const CartIcon = styled(CartGreen)``;
const CartImg = styled.img`
  cursor: pointer;
`;

class ProductCard extends Component {
  render() {
    const { gallery, name, prices, inStock, id, brand } = this.props.data;
    const price = prices.find(
      (x) => x.currency.label === this.props.currency.label
    );
    const generateUniqueId = (product) => {
      let resList = [];
      product.attributes.map((att) => {
        att.items.map((item) => {
          if (item.selected) {
            resList.push(att.name);
            resList.push(item.value);
          }
        });
      });
      const finRes = resList.toString() + product.id;
      return finRes;
    };

    const onCartClick = () => {
      let product = this.props.products.products.find((p) => p.id === id);
      let productCopy = { ...product };
      const attributeItems = product.attributes.map((a) => a.items);
      const modifiedItems = attributeItems.map((item, i) => {
        const firstItem = { ...item[0] };
        const modifiedItem = { selected: true, ...firstItem };
        let itemCopy = [...item];
        itemCopy[0] = modifiedItem;
        const res = itemCopy;
        return res;
      });
      const attributes = productCopy.attributes.map((att, i) => {
        const { items, ...rest } = att;
        return { ...rest, items: modifiedItems[i] };
      });
      productCopy.attributes = attributes;
      const finalProduct = {
        ...productCopy,
        customId: generateUniqueId(productCopy),
      };
      this.props.cartProduct(finalProduct);
    };

    return (
      this.props.currency && (
        <Card inStock={inStock}>
          <div className="container">
            <div className="imgContainer">
              <Link to={`/product/${id}`}>
                <CartImg src={gallery[0]} alt=""/>
                <CustomLabel show={inStock} text={"OUT OF STOCK"} />{" "}
              </Link>

              <CartButton onClick={() => onCartClick()}>
                <CartIcon />
              </CartButton>
            </div>
            <div className="nameAndBrand">
              <label> {brand}</label>
              <label> {name}</label>
            </div>

            <div className="priceDiv">
              <label>{price.currency.symbol}</label>{" "}
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
  cartProduct,
  uncartProduct,
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
