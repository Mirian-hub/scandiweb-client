import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "./HOC/withRouter";
import { getProductAsync } from "../redux/slices/ProductsSlice";
import { connect } from "react-redux";

const PDPContainer = styled.div``;
class PDP extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        props.getProductAsync(this.props.router.params.id);
      }
  render() {
    console.log('pdp props', this.props)
    const {router} = this.props

    return <div>{this.props.products.product.id}</div>;
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
  
