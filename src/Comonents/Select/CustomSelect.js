import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";

import {
  selectState,
  getCurrenciesAsync,
} from "../../redux/slices/CurrenciesSlice";

const DropDownContainer = styled("div")`
  margin: 0 auto;
  align-items: center;
  width: 4rem
`;

const ArrowIcon = styled(ArrowDown)`
  margin-left:5px ;
  transform: ${(props) => (props.isOpen ? `rotate(180deg)` : '')};
  transition: transform .2s ease-out;
`;

const DropDownHeader = styled("div")`
  padding: 0.4em 0.5em 0.4em 1em;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  cursor: pointer;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 7rem;
`;

const DropDownList = styled("ul")`
  /* padding: 0px 1rem; */
  margin: 0;
  font-weight: 500;
  background: #ffffff;
  &:first-child {
    padding-top: 0.2em;
  }
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const ListItem = styled("li")`
  list-style: none;
  /* margin-bottom: 0.8em; */
  padding: 1rem 1rem;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: #eeeeee;
  }
  color: #1d1f22;
`;
class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, selectedOption: null };
    props.getCurrenciesAsync();
  }
  toggling = () =>
    this.setState((preState) => {
      return {
        isOpen: !preState.isOpen,
      };
    });

  onOptionClicked = (value) => () => {
    this.setState({
      selectedOption: value,
      isOpen: false,
    });
  };

  render() {
    return (
      <DropDownContainer>
        <DropDownHeader onClick={this.toggling}>
          {this.state.selectedOption?.symbol ??
            this.props.currencies.currencies[0]?.symbol}
          <ArrowIcon isOpen={this.state.isOpen} />
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {this.props.currencies.currencies.map((option) => (
                <ListItem
                  onClick={this.onOptionClicked(option)}
                  key={Math.random()}
                >
                  <div style={{ width: "40%" }}> {option.symbol} </div>{" "}
                  <div> {option.label} </div>
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});
const mapDispatchToProps = () => ({
  getCurrenciesAsync,
});

export default connect(mapStateToProps, mapDispatchToProps())(CustomSelect);