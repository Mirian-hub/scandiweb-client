import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Currancy } from "../assets/icons/currancy.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { ReactComponent as Cart } from "../assets/icons/cart.svg";
import { Link, resolvePath } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { getProductsAsync, toggleCartOverlay } from "../redux/slices/ProductsSlice";
import { selectState, getCategoriesAsync } from "../redux/slices/CategorySlice";
import { resolveObjMapThunk } from "graphql";
import CustomSelect from "./Select/CustomSelect";
import CustomModal from "./CustomModal";
const options = ["WOMEN", "MEN", "KIDS"];
const selectOptions = [
  { id: 1, name: "dollar" },
  { id: 2, name: "EUR" },
  { id: 3, name: "GE" },
];
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
`;
const NavBarLi = styled.li`
  float: left;
`;
const RouterLink = styled(Link)`
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
const CartContainer = styled.a`
  padding: "0px 10px";
  margin-left: "15px";
  margin-right: 15px;
  position: relative;
`;

const CartCircle = styled.div`
  width: 20px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: white;
  background-color: black;
  position: absolute;
  top: -10px;
  right: -10px;
`;

export class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeId: 0, active: false };
    props.getCategoriesAsync().then((res) => {
      // debugger
      props.getProductsAsync(res.payload[0].name);
    });
  }
  onLinkClick = (item) => {
    this.props.getProductsAsync(item);
  };

  static propTypes = {};

  onHomeLogoCLick = () => {
    this.props.getProductsAsync(this.props.categories[0]);
    this.setState({
      activeId: 0,
    });
  };

  render() {
    console.log("app bar props", this.props);
    return (
      this.props.products &&
      this.props.categories && (
        <NavBar>
          <ul>
            {this.props.categories?.map((item, i) => (
              <NavBarLi
                key={i}
                onClick={() => {
                  this.setState({
                    activeId: i,
                  });
                }}
              >
                <RouterLink
                  to={item}
                  className="active"
                  isactive={i === this.state.activeId}
                  onClick={() => this.onLinkClick(item)}
                >
                  {item?.toUpperCase()}
                </RouterLink>
              </NavBarLi>
            ))}
          </ul>
          <div>
            <Link to="/" onClick={this.onHomeLogoCLick}>
              <Logo />
            </Link>
            
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomSelect />
            <CartContainer
              href="#home"
              onClick={() =>
               this.props.toggleCartOverlay(true)
              }
            >
              <Cart />
              <CartCircle>
                {this.props.products.cartProducts.length}{" "}
              </CartCircle>
            </CartContainer>
          </div>
        </NavBar>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  products: state.products,
});
const mapDispatchToProps = () => ({
  getProductsAsync,
  getCategoriesAsync,
  toggleCartOverlay
});

export default connect(mapStateToProps, mapDispatchToProps())(AppBar);
