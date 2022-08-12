import { isNamedType } from "graphql";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as MinusSquare } from "../assets/icons/minusSquare.svg";
import { ReactComponent as PlusSquare } from "../assets/icons/plusSquare.svg";
import { cartProduct, uncartProduct } from "../redux/slices/ProductsSlice";

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
  font-weight: 500;
  padding-bottom: 0.5rem;
`;
const MinusSquareIcon = styled(MinusSquare)`
  height: 100%;
  cursor: pointer;
`;
const PlusSquareIcon = styled(PlusSquare)`
  cursor: pointer;
`;
const OverlayStrong = styled.strong``;
const OverlaySpan = styled.span`
  font-weight: 400;
  font-size: 16px;
`;

const OverlayItem = styled.div`
  display: flex;
  margin: 3rem 0px;
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
  border: 2px solid #1d1f22;
  display: flex;
  margin-right: 5px;
  background: ${({ color }) => color ?? ""};
  justify-content: center;
  align-items: center;
  width: ${({ color }) => (color ? "25px" : "37px")};
  height: ${({ color }) => (color ? "25px" : "35px")};
`;
const AttributeContainer = styled.div`
  margin-top: 5px;
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
  > button {
    width: 48%;
    padding: 1.5rem 0px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .rightButton{
    background: #5ece7b;
    color: #ffffff;
    border:none ;
  }
  .leftButton {
    background: none;
  }
`;

export class CartOverlay extends Component {
  countSameProducts = () => {
    const products = this.props.products.cartProducts;
    const productIds = products.map((p) => p.id);
    const uniqueProducts = products.filter((p, i) => {
      return products.map((product) => product.id).indexOf(p.id) == i;
    });
    const productsCountById = uniqueProducts.map((item, i) => ({
      product: item,
      count: productIds.filter((id) => id === item.id).length,
    }));

    return productsCountById;
  };
  cartedProductsTotalPrice=()=> {
    const products = this.props.products.cartProducts;
    const currentPriceLabel = this.props.currencies.currentCurrency.label;
    const priceList = products.map(p=>p.prices.find(price => price.currency.label===currentPriceLabel)?.amount)
    return priceList.reduce((a,b)=>a+b,0);
  }
  render() {
    const productList = this.countSameProducts();
    const { cartProduct, uncartProduct } = this.props;
    return (
      <OverlayContainer>
        <OverlayTitle>
          <OverlayStrong> My Bag,</OverlayStrong>{" "}
          <OverlaySpan>
            {this.props.products.cartProducts.length}{" "}
            {this.props.products.cartProducts.length > 1 ? "imtes" : "item"}
          </OverlaySpan>
        </OverlayTitle>
        {productList.map(({ product, count }, i) => {
          const price = product.prices.find(
            (p) =>
              this.props.currencies.currentCurrency.label === p.currency.label
          );
          return (
            <OverlayItem key={i}>
              <ItemInfo>
                <ItemName>{product.name} </ItemName>
                <ItemPrice>
                  <span>{price.currency.symbol} </span>
                  <span>{price.amount}</span>
                </ItemPrice>
                {product.attributes.map((att, i) => {
                  return (
                    <AttributeContainer>
                      <div>
                        <AttributeName>
                          {att.name}
                          <span>:</span>
                        </AttributeName>
                      </div>
                      <BoxItemsContainer>
                        {att.items.map((item, i) => (
                          <BoxItem
                            color={
                              att.name.toLowerCase() === "color" && item.value
                            }
                          >
                            {att.name.toLowerCase() !== "color" &&
                              item.displayValue.toUpperCase()}
                          </BoxItem>
                        ))}
                      </BoxItemsContainer>
                    </AttributeContainer>
                  );
                })}
              </ItemInfo>
              <ItemControls>
                <div>
                  <PlusSquareIcon onClick={() => cartProduct(product.id)} width={'35px'} height={'35px'}/>
                </div>
                <div>{count} </div>
                <div>
                  <MinusSquareIcon onClick={() => uncartProduct(product.id)}  width={'35px'} height={'35px'}/>
                </div>
              </ItemControls>
              <img src={product.gallery[0]}></img>
            </OverlayItem>
          );
        })}
        <OverlaySummary>
          <Total>
            <strong>Total</strong>
            <strong><span>{this.props.currencies.currentCurrency.symbol} </span> {this.cartedProductsTotalPrice()?.toFixed(2)}</strong>
          </Total>
          <ButtonGroups>
            <button className="leftButton">View Bag</button>
            <button className="rightButton"> Chech Out </button>
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
  cartProduct,
  uncartProduct,
});

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
