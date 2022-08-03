import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  transition: 0.3s;
  width: 30%;
  margin-right: 40px;
  margin-bottom: 40px;
  /* max-height:350px; */
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .container {
    padding: 2px 16px;
  }

  img {
    width: 95%;
    display: block;
    margin: auto;
    margin-top: 10px;
  }
`;
 class ProductCard extends Component {
  render() {
    // this.props.getProductsAsync();
    const { gallery, name, price } = this.props.data;
    return (
      <Card>
        <img src={gallery[0]} alt="Avatar" />
        <div className="container">
          <h4>
            <b>{name}</b>
          </h4>
          <p>{price}</p>
        </div>
      </Card>
    );
  }
}

export default ProductCard;

