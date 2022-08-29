import React, { Component } from "react";
import styled from "styled-components";

const Label = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 40;
  font-size: ${({ font }) => font ?? 28}px;
  width: 100%;
  position: absolute;
  top: ${({ fromTop }) => fromTop ?? 120}px;
  display: ${(props) => (!props.show ? "block" : "none")};
  text-decoration: none;
  color: #8d8f9a;
  background: ${({ background }) => background ?? "transparent"};
  opacity: ${({ opacity }) => opacity ?? 1};
`;

export default class CustomLabel extends Component {
  render() {
    const { show, text, top, font, background, opacity } = this.props;
    return (
      <Label
        show={show}
        fromTop={top}
        font={font}
        background={background}
        opacity={opacity}
      >
        {text}
      </Label>
    );
  }
}
