import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "./HOC/withRouter";
import { getProductAsync } from "../redux/slices/ProductsSlice";
import { connect } from "react-redux";

const PDPContainer = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  .imgCollection {
    width: 10%;
    max-height: 90vh;
    overflow: auto;
    .collectionItem {
      height: 160px;
      margin-bottom: 1rem;
      display: block;
      cursor: pointer;
    }
  }
  .mainImgContainer {
    width: 60%;
    max-height: 90vh;
    overflow: auto;
    margin: 0px 3rem 0px 1rem;
  }
  .mainImg {
    width: 100%;
    height: auto;
  }
  .description {
    width: 30%;
  }
`;
const PriceContainer = styled.div`
  font-weight: 500;
  margin-top: 1rem;
  font-size: 19px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  .brandName {
    font-size: 30px;
    font-weight: 600;
  }
  .productName {
    font-size: 30px;
    margin-bottom: 3rem;
  }
  .addToCartBtn {
    background: #5ece7b;
    color: #ffffff;
    border:none ;
    width:50% ;
    padding: 1rem 1.6rem ;
    font-size:19px ;
    margin: 2rem 0rem ;
  }
  .description {
    width:100% ;
    font-size:17px ;
  }
`;
const BoxItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`;

const AttributeItem = styled.div`

    border: 2px solid #1d1f22;
    display: flex;
    margin-right: 5px;
    background: ${({ color }) => color ?? ""};
    justify-content: center;
    align-items: center;
    width: ${({ color }) => (color ? "2rem" : "4rem")};
    height: ${({ color }) => (color ? "2rem" : "3rem")};
  `

const AttributeContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 1rem;
  .attributeName {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 0.5rem;
  }
`;
const AttributeName = styled.div`
  padding-bottom: 5px;
`;

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImgSrc: null };
    props.getProductAsync(this.props.router.params.id);
  }
  render() {
    const { product } = this.props.products;

    return (
      product && (
        <PDPContainer>
          <div className="imgCollection">
            {product?.gallery.map((src, i) => (
              <img
                className="collectionItem"
                src={src}
                key={i}
                onClick={() =>
                  this.setState({
                    selectedImgSrc: src,
                  })
                }
              ></img>
            ))}
          </div>
          <div className="mainImgContainer">
            <img
              className="mainImg"
              src={this.state.selectedImgSrc ?? product?.gallery[0]}
            ></img>
          </div>
          <div className="description">
            <ItemInfo>
              <div className="brandName">{product.brand} </div>
              <div className="productName">{product.name} </div>
              {product.attributes.map((att, i) => {
                return (
                  <AttributeContainer>
                    <div className="attributeName">
                      {att.name.toUpperCase()}
                      <span>:</span>
                    </div>
                    <BoxItems>
                      {att.items.map((item, i) => (
                        <AttributeItem
                          color={
                            att.name.toLowerCase() === "color" && item.value
                          }
                        >
                          {att.name.toLowerCase() !== "color" &&
                            item.value.toUpperCase()}
                        </AttributeItem>
                      ))}
                    </BoxItems>
                  </AttributeContainer>
                );
              })}
              <PriceContainer>
                <div className="title">PRICE:</div>
                <span>{product.prices[0].currency.symbol} </span>
                <span>{product.prices[0].amount}</span>
              </PriceContainer>
            <button className="addToCartBtn"> ADD TO CART</button>
            <p className="description"> {product.description} </p>
            </ItemInfo>
          </div>
        </PDPContainer>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  products: state.products,
});
const mapDispatchToProps = () => ({
  getProductAsync,
});

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(PDP));
