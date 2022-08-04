import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Currancy } from "../assets/icons/currancy.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { ReactComponent as Cart } from "../assets/icons/cart.svg";
const options = ["WOMEN", "MEN", "KIDS"];
const NavBar = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
  color: blue;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  li {
    float: left;
  }
`;
const NavA = styled.a`
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  color: #1d1f22;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  ${({ isactive }) =>
    isactive &&
    `
    border-bottom: 2px solid #5ECE7B;
    color: #5ECE7B
  `}
`;

export class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeId: 0 };
  }
  static propTypes = {};
  render() {
    return (
      <NavBar>
        <ul>
          {options.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                this.setState({
                  activeId: i,
                });
              }}
            >
              <NavA
                className="active"
                href="#home"
                isactive={i === this.state.activeId}
              >
                {item}
              </NavA>
            </li>
          ))}
        </ul>
        <div>
          <a href="#home">
            <Logo />
          </a>
        </div>
        <div>
          <span>
            <a href="#home">
              <Currancy />
              <ArrowDown style={{ paddingLeft: "5px" }} />
            </a>
          </span>

          <a href="#home" style={{ padding: "0px 10px", marginLeft: "15px" }}>
            <Cart />
          </a>
        </div>
      </NavBar>
    );
  }
}

export default AppBar;
