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
const MinusSquareIcon = styled(MinusSquare)`
  height:100% ;
  cursor: pointer;
`;
const PlusSquareIcon = styled(PlusSquare)`
  cursor: pointer;

`;
const OverlayStrong = styled.strong``;
const OverlaySpan = styled.span``;

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
  justify-content: space-between;
`;
const ItemControls = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align:center ;
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
  render() {
    const productList = this.countSameProducts();
    const {  cartProduct, uncartProduct} = this.props
    return (
      <OverlayContainer>
        <OverlayTitle>
          {" "}
          <OverlayStrong> My Bag,</OverlayStrong>{" "}
          <OverlaySpan>
            {this.props.products.cartProducts.length}{" "}
            {this.props.products.cartProducts.length > 1 ? "imtes" : "item"}
          </OverlaySpan>{" "}
        </OverlayTitle>
        {productList.map(({ product, count }, i) => {
          const price = product.prices.find(
            (p) =>
              this.props.currencies.currentCurrency.label === p.currency.label
          );
          return (
            <OverlayItem key={i}>
              <ItemInfo>
                <div>{product.name} </div>
                <div>
                  {" "}
                  {price.currency.symbol} {price.amount}{" "}
                </div>
                <div>
                  {product.attributes.map((att, i) => {
                    return (
                      <>
                        <div> {att.name}</div>
                        <div>
                          {att.items.map((item, i) => (
                            <span>{item.displayValue}</span>
                          ))}
                        </div>{" "}
                      </>
                    );
                  })}
                </div>
                <div>4</div>{" "}
              </ItemInfo>
              <ItemControls>
                <div>
                  <PlusSquareIcon onClick={()=>cartProduct(product.id)}/>
                </div>
                <div>{count} </div>
                <div>
                  <MinusSquareIcon onClick={()=>uncartProduct(product.id)} />
                </div>
              </ItemControls>
              <img src={product.gallery[0]}></img>
            </OverlayItem>
          );
        })}
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
  uncartProduct
});

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
