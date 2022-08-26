import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "../components/HOC/withRouter";
import { getProductAsync, setProduct } from "../redux/slices/ProductsSlice";
import { connect } from "react-redux";
import { cartProduct } from "../redux/slices/ProductsSlice";
import parse from "html-react-parser";

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
      max-width: 100%;
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
  }
  .description {
    width: 30%;
  }
`;
const PriceContainer = styled.div`
  font-weight: 600;
  margin-top: 1rem;
  font-size: 18px;
  .title {
    padding-bottom: 0.5rem;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  .brandName {
    font-size: 24px;
    font-weight: 600;
  }
  .productName {
    font-size: 24px;
    margin-bottom: 2rem;
  }
  .description {
    width: 100%;
    max-height: 250px;
    overflow: auto;
  }
`;
const BoxItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
`;

const AttributeItem = styled.div`
  display: flex;
  margin-right: 5px;
  font-size: 14px;
  background: ${({ color, selected }) =>
    color ? color : selected ? "black" : ""};
  justify-content: center;
  align-items: center;
  width: ${({ color }) => (color ? "2rem" : "3rem")};
  height: ${({ color }) => (color ? "2rem" : "2.5rem")};
  border: ${({ color }) => (color ? "1px solid #BABFC4" : "1px solid #1d1f22")};
  outline: ${({ selected, color }) =>
    selected && color ? "3px solid #5ECE7B" : ""};
  color: ${({ color, selected }) => !color && selected && "white"};
`;

const AttributeContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 1rem;
  .attributeName {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 0.5rem;
  }
`;
const AddToCartBtn = styled.button`
  background: #5ece7b;
  color: #ffffff;
  border: none;
  width: 60%;
  padding: 1rem 1.6rem;
  font-size: 19px;
  margin: 1rem 0rem;
  cursor: pointer;
  ${({ inStock }) =>
    !inStock &&
    ` cursor: not-allowed;
    opacity: 0.5
  `}
`;

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImgSrc: null,
      productState: this.props.products.product,
      attributeSelected: false,
    };
    props.getProductAsync(this.props.router.params.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.products.product?.id !== prevProps.products.product?.id) {
      this.setState({
        productState: this.props.products.product,
      });
    }
  }
  render() {
    const product = this.state.productState;

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

    const onItemClickHandler = (e, attributeName, value) => {
      var productCopy = { ...product };
      var attributeIndex = productCopy.attributes
        .map((a) => a.id)
        .indexOf(attributeName);
      var attribute = productCopy.attributes[attributeIndex];

      var itemIndex = attribute.items.map((a) => a.id).indexOf(value);

      const itemsCopy = attribute.items.map((it, i) => {
        if (i == itemIndex) {
          return { ...it, selected: true };
        } else {
          return { ...it, selected: false };
        }
      });
      const prod = productCopy.attributes.map((it, i) => {
        if (i == attributeIndex) {
          const { items, ...rest } = it;
          return { ...rest, items: itemsCopy };
        } else {
          return { ...it };
        }
      });
      productCopy.attributes = prod;

      this.setState({
        productState: {
          ...productCopy,
          customId: generateUniqueId(productCopy),
        },
        attributeSelected: true,
      });
    };
    const price = product?.prices?.find(
      (p) => this.props.currencies.currentCurrency.label === p.currency.label
    );

    return this.props.products.status === "pending" ? (
      <> </>
    ) : (
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
              <div className="brandName">{product?.brand} </div>
              <div className="productName">{product?.name} </div>
              {product.attributes.map((att, i) => {
                return (
                  <AttributeContainer key={i}>
                    <div className="attributeName">
                      {att.name?.toUpperCase()}
                      <span>:</span>
                    </div>
                    <BoxItems>
                      {att.items.map((item, i) => (
                        <AttributeItem
                          key={i}
                          onClick={(e) =>
                            onItemClickHandler(e, att.name, item.id)
                          }
                          selected={item.selected}
                          color={
                            att.name.toLowerCase() === "color" ? item.value : ""
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
                <span>{price.currency.symbol} </span>
                <span>{price.amount}</span>
              </PriceContainer>
              <AddToCartBtn
                disabled={
                  product.inStock === false ||
                  (!this.state.attributeSelected &&
                    this.state.productState.attributes.length > 0)
                }
                className="addToCartBtn"
                inStock={product.inStock}
                onClick={() => {
                  this.props.cartProduct(
                    this.state.productState.attributes.length > 0
                      ? this.state.productState
                      : { ...this.state.productState, customId: "" }
                  );
                }}
              >
                ADD TO CART
              </AddToCartBtn>
              <div className="description">{parse(product.description)}</div>
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
  currencies: state.currencies,
});
const mapDispatchToProps = () => ({
  getProductAsync,
  cartProduct,
});

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(PDP));
