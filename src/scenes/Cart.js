import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as MinusSquare } from "../assets/icons/minusSquare.svg";
import { ReactComponent as PlusSquare } from "../assets/icons/plusSquare.svg";
import ImageSlicer from "../components/ImageSlicer";
import {
  cartProductByCustomId,
  uncartProduct,
} from "../redux/slices/ProductsSlice";

const OverlayContainer = styled.div`
  flex-direction: column;
  width: 90%;
  margin: auto;
  padding-bottom: 4rem;
`;
const OverlayTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  padding: 2rem 0;
`;
const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 18px;
  padding: 1rem 0 0.5rem 0;
`;
const MinusSquareIcon = styled(MinusSquare)`
  height: 100%;
  cursor: pointer;
`;
const PlusSquareIcon = styled(PlusSquare)`
  cursor: pointer;
`;

const OverlayItem = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  margin: 0 0 1rem 0;
  > img {
    width: 20%;
  }
  border-top: 1px solid #e5e5e5;
`;
const ItemInfo = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  .itemBrandStrong {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
  }
  .itemBrand {
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
  }
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
  min-height: ${({ color }) => (!color ? "35px" : "")};
  border: ${({ color, selected }) =>
    color ? "1px solid #BABFC4" : "1px solid #1d1f22"};
  outline: ${({ selected, color }) =>
    selected && color ? "2px solid #5ECE7B" : ""};
  color: ${({ color, selected }) => !color && selected && "white"};
`;
const AttributeContainer = styled.div`
  margin-top: 1rem;
  width: 70%;
`;
const AttributeName = styled.div`
  padding-bottom: 5px;
  font-weight: 700;
`;
const OverlaySummary = styled.div`
  border-top: 1px solid #e5e5e5;
  padding-top: 1.5rem;
  div {
    .name {
      font-style: normal;
      font-size: 24px;
    }
    .value {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
    }
  }
`;
const Total = styled.div``;
const OrderButton = styled.button`
  margin-top: 1rem;
  width: 20%;
  padding: 1rem 0px;
  text-transform: uppercase;
  background: #5ece7b;
  color: #ffffff;
  border: none;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const testTax = 21;

export class Cart extends Component {
  cartedProductsTotalPrice = () => {
    const products = this.props.products.cartProducts;
    const currentPriceLabel = this.props.currencies.currentCurrency?.label;
    const priceList = products.map(
      (p) =>
        p.product.prices.find(
          (price) => price.currency.label === currentPriceLabel
        )?.amount * p.count
    );
    return priceList.reduce((a, b) => a + b, 0);
  };
  cartProductsCount = () => {
    const products = this.props.products.cartProducts;
    return products.map((p) => p.count).reduce((a, b) => a + b, 0);
  };
  render() {
    // const productList = this.countSameProducts();
    const { cartProductByCustomId, uncartProduct, products } = this.props;
    return (
      <OverlayContainer>
        <OverlayTitle>CART</OverlayTitle>
        {products.cartProducts.map(({ product, count }, i) => {
          const price = product.prices.find(
            (p) =>
              this.props.currencies.currentCurrency.label === p.currency.label
          );
          return (
            <OverlayItem key={i}>
              <ItemInfo>
                <div className="itemBrandStrong">{product.brand} </div>
                <div className="itemBrand">{product.name} </div>
                <ItemPrice>
                  <span>{price.currency.symbol} </span>
                  <span>{price.amount}</span>
                </ItemPrice>
                {product.attributes.map((att, i) => {
                  return (
                    <AttributeContainer key={i}>
                      <div>
                        <AttributeName>
                          {att.name?.toUpperCase()}
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
              <div style={{ width: "20%" }}>
                <ImageSlicer sources={product.gallery} />
              </div>
              {/* <img src={product.gallery[0]}></img> */}
            </OverlayItem>
          );
        })}
        <OverlaySummary>
          <Total>
            <div>
              <span className="name">Tax {testTax}% : </span>
              <span className="value">
                {this.props.currencies.currentCurrency?.symbol}
                {((this.cartedProductsTotalPrice() / testTax) * 100)?.toFixed(
                  2
                )}
              </span>
            </div>
            <div>
              <span className="name"> Quantity : </span>
              <span className="value"> {this.cartProductsCount()} </span>
            </div>
            <div>
              <span className="name">Total : </span>
              <span className="value">
                {this.props.currencies.currentCurrency?.symbol}
                {this.cartedProductsTotalPrice()?.toFixed(2)}{" "}
              </span>{" "}
            </div>
          </Total>
          <OrderButton disabled={this.cartProductsCount() === 0}>
            ORDER
          </OrderButton>
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
});

export default connect(mapStateToProps, mapDispatchToProps())(Cart);
