import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as MinusSquare } from "../assets/icons/minusSquare.svg";
import { ReactComponent as PlusSquare } from "../assets/icons/plusSquare.svg";
import {
  cartProductByCustomId,
  uncartProduct,
  toggleCartOverlay,
} from "../redux/slices/ProductsSlice";

const OverlayContainer = styled.div`
  flex-direction: column;
`;
const OverlayTitle = styled.div`
  margin-bottom: 2rem;
`;
const ItemName = styled.div`
  font-weight: 300;
  font-size: 20px;
  padding-bottom: 0.5rem;
`;
const ItemPrice = styled.div`
  font-weight: 600;
  padding-bottom: 0.5rem;
`;
const MinusSquareIcon = styled(MinusSquare)`
  height: 100%;
  cursor: pointer;
`;
const PlusSquareIcon = styled(PlusSquare)`
  cursor: pointer;
`;
const OverlayStrong = styled.strong`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;
const OverlaySpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const OverlayItem = styled.div`
  display: flex;
  margin: 4rem 0px;
  > img {
    width: 40%;
  }
`;
const ItemInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const ItemControls = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;
const BoxItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const BoxItem = styled.div`
  display: flex;
  margin-right: 5px;
  background: ${({ color, selected }) =>
    color ? color : selected ? "black" : ""};
  justify-content: center;
  align-items: center;
  width: ${({ color }) => (color ? "25px" : "45px")};
  height: ${({ color }) => (color ? "25px" : "auto")};
  min-height: ${({ color }) => (!color ? "30px" : "")};
  border: ${({ color, selected }) =>
    color ? "1px solid #BABFC4" : "1px solid #1d1f22"};
  outline: ${({ selected, color }) =>
    selected && color ? "3px solid #5ECE7B" : ""};
  color: ${({ color, selected }) => !color && selected && "white"};
`;
const AttributeContainer = styled.div`
  margin-top: 1rem;
`;
const AttributeName = styled.div`
  padding-bottom: 5px;
`;
const OverlaySummary = styled.div``;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonGroups = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2.5rem 0px 1rem 0px;
  a {
    padding: 1.5rem 0px;
    text-transform: uppercase;
    cursor: pointer;
    width: 48%;
    button {
      width: 100%;
      padding: 1.5rem 0;
      cursor: pointer;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
    }
    .leftButton {
      background-color: transparent;
      border: 1px solid #1d1f22;
    }
    .rightButton {
      background-color: #58e984;
      color: white;
      border: 1px solid #1d1f22;
    }
  }
`;

export class CartOverlay extends Component {
  cartedProductsTotalPrice = () => {
    const products = this.props.products.cartProducts;
    const currentPriceLabel = this.props.currencies.currentCurrency.label;
    const priceList = products.map(
      (p) =>
        p.product.prices.find(
          (price) => price.currency.label === currentPriceLabel
        )?.amount * p.count
    );
    return priceList.reduce((a, b) => a + b, 0);
  };
  render() {
    const { cartProductByCustomId, uncartProduct, products } = this.props;
    return (
      <OverlayContainer>
        <OverlayTitle>
          <OverlayStrong> My Bag,</OverlayStrong>{" "}
          <OverlaySpan>
            {this.props.products.cartProducts.length}{" "}
            {this.props.products.cartProducts.length > 1 ? "imtes" : "item"}
          </OverlaySpan>
        </OverlayTitle>
        {products.cartProducts.map(({ product, count }, i) => {
          const price = product.prices.find(
            (p) =>
              this.props.currencies.currentCurrency.label === p.currency.label
          );
          return (
            <OverlayItem key={i}>
              <ItemInfo>
                <ItemName>{product.brand} </ItemName>
                <ItemName>{product.name} </ItemName>
                <ItemPrice>
                  <span>{price.currency.symbol} </span>
                  <span>{price.amount}</span>
                </ItemPrice>
                {product.attributes.map((att, i) => {
                  return (
                    <AttributeContainer key={i}>
                      <div>
                        <AttributeName>
                          {att.name}
                          <span>:</span>
                        </AttributeName>
                      </div>
                      <BoxItemsContainer>
                        {att.items.map((item, i) => (
                          <BoxItem
                            key={i}
                            color={
                              att.name.toLowerCase() === "color"
                                ? item.value
                                : ""
                            }
                            selected={item.selected}
                          >
                            {att.name.toLowerCase() !== "color" &&
                              item.value.toUpperCase()}
                          </BoxItem>
                        ))}
                      </BoxItemsContainer>
                    </AttributeContainer>
                  );
                })}
              </ItemInfo>
              <ItemControls>
                <div>
                  <PlusSquareIcon
                    onClick={() => cartProductByCustomId(product.customId)}
                    width={"35px"}
                    height={"35px"}
                  />
                </div>
                <div>{count} </div>
                <div>
                  <MinusSquareIcon
                    onClick={() => uncartProduct(product.customId)}
                    width={"35px"}
                    height={"35px"}
                  />
                </div>
              </ItemControls>
              <img src={product.gallery[0]} alt="" ></img>
            </OverlayItem>
          );
        })}
        <OverlaySummary>
          <Total>
            <strong>Total</strong>
            <strong>
              <span>{this.props.currencies.currentCurrency?.symbol} </span>{" "}
              {this.cartedProductsTotalPrice()?.toFixed(2)}
            </strong>
          </Total>
          <ButtonGroups>
            <Link to="/cart">
              <button
                className="leftButton"
                onClick={() => this.props.toggleCartOverlay(false)}
              >
                VIEW BAG
              </button>
            </Link>
            <Link to="/cart">
              <button className="rightButton"> CHECK OUT </button>
            </Link>
          </ButtonGroups>
        </OverlaySummary>
      </OverlayContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  products: state.products,
  currencies: state.currencies,
});
const mapDispatchToProps = () => ({
  cartProductByCustomId,
  uncartProduct,
  toggleCartOverlay,
});

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
