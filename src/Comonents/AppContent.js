import React, { Component } from "react";
import Routes from "../routes";
import CartOverlay from "./CartOverlay";
import CustomModal from "./CustomModal";
import { toggleCartOverlay } from "../redux/slices/ProductsSlice";
import {connect} from 'react-redux'
import styled from "styled-components";

const Main = styled.main`
  position: relative;
`;

class AppContent extends Component {
  render() {
   
    return (
      <Main>
        <Routes />
        <CustomModal
          active={this.props.products?.cartOverlayOpen}
          hideModal={() => this.props.toggleCartOverlay(false)}
          title="Modal title goes here"
          width={"500px"}
          top={0}
          right={"7rem"}
        >
          <CartOverlay />
        </CustomModal>
      </Main>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});
const mapDispatchToProps = () => ({
  toggleCartOverlay,
});

export default connect(mapStateToProps, mapDispatchToProps())(AppContent);
