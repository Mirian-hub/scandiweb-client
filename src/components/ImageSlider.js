import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../assets/icons/left-arrow.svg";
import { ReactComponent as RightArrow } from "../assets/icons/right-arrow.svg";

const SliderContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const ButtonGroups = styled.div`
  display: flex;
  position: absolute;
  justify-content: end;
  bottom: 3rem;
  width: 90%;
  margin: auto;
`;

const LeftButton = styled.button`
  cursor: pointer;
  background-color: #000000ba;
  opacity: 0.5;
  padding: 2px 10px 0px 5px;
  ${({ active }) =>
    !active &&
    `cursor: auto;
     opacity: 0.1;
     
  `}
  svg {
    &:overflow {
      opacity: 0.1;
    }
  }
`;
const RightButton = styled.button`
  cursor: pointer;
  background-color: #000000ba;
  opacity: 0.5;
  padding: 2px 5px 0px 10px;
  margin-left: 1rem;
  ${({ active }) =>
    !active &&
    `cursor: auto;
     opacity: 0.1;  
  `}
`;
const LeftArrowSvg = styled(LeftArrow)`
  width: 24px;
  height: 24px;
  &:hover {
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
`;

const RightArrowSvg = styled(RightArrow)`
  width: 24px;
  height: 24px;
  &:hover {
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
`;

export default class ImageSlicer extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  render() {
    const { source } = this.props;
    return (
      <SliderContainer>
        <Image src={source[this.state.index]} alt=""/>
        {source?.length > 1 && (
          <ButtonGroups>
            <LeftButton
              active={this.state.index > 0}
              onClick={() => {
                this.state.index > 0 &&
                  this.setState((state) => ({ index: state.index - 1 }));
              }}
            >
              <LeftArrowSvg />
            </LeftButton>

            <RightButton
              active={this.state.index + 1 < source.length}
              onClick={() => {
                this.state.index + 1 < source.length &&
                  this.setState((state) => ({ index: state.index + 1 }));
              }}
            >
              <RightArrowSvg />
            </RightButton>
          </ButtonGroups>
        )}
      </SliderContainer>
    );
  }
}
