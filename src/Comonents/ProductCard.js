import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  transition: 0.3s;
  width: 30%;
  margin-right: 40px;
  margin-bottom: 40px;
  max-height:350px ;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .container {
    padding: 2px 16px;
  }

  img {
    width: 100%;
  }
`;
export default class ProductCard extends Component {
  //   static propTypes = { second: 'third' };
  render() {
    const { img, name, price } = this.props.data;
    return (
      <Card >
        <img src={`https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb.jpg`} alt="Avatar" />
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
