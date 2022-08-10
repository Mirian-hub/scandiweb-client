import React, { Component } from "react";
import styled from "styled-components";

export const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: absolute;
  top:0;
  right: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
  overflow:hidden ;
`;

export const ModalOverlay = styled.a`
  background: rgba(247, 248, 249, 0.75);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 850px;
  padding: 0 0.8rem;
  width: 100%;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
  position:absolute ;
  top:0;
  right:0 ;
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  position: relative;
`;








export default class CustomModal extends Component {
  render() {
    const { title, footer, children, active, hideModal } = this.props;

    return (
      <>
        {active && (
          <ModalBlock active={active} >
            <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
            <ModalContainer>
              <ModalBody>{children}</ModalBody>
            </ModalContainer>
          </ModalBlock>
        )}
      </>
    );
  }
}
