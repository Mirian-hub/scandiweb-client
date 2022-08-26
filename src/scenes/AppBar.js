import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Cart } from "../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProductsAsync,
  toggleCartOverlay,
} from "../redux/slices/ProductsSlice";
import {
  selectState,
  getCategoriesAsync,
  setCurrentCategory,
} from "../redux/slices/CategorySlice";
import CustomSelect from "../components/CustomSelect";
import { withRouter } from "../components/HOC/withRouter";

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
  .rightSection {
    display: flex;
    align-items: center;
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

const CartContainerLink = styled(Link)`
  padding-left: 2rem;
`;
const CartContainer = styled.div`
  padding: "0px 10px";
  margin-left: "15px";
  margin-right: 15px;
  position: relative;
  cursor: pointer;
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
  checkCategoryInUri = ({ pathname, search }) => {
    if (pathname === "/category") {
      return search.substring(6);
    } else return null;
  };
  constructor(props) {
    super(props);
    this.state = { activeId: 0, active: false, selectOpen: true };
    props.getCategoriesAsync().then((res) => {
      const category = this.checkCategoryInUri(this.props.router.location);
      if (
        category &&
        res.payload.find((n) => n.name.toLowerCase() === category.toLowerCase())
      ) {
        // props.getProductsAsync(category);
        props.setCurrentCategory(category);
      } else {
        // props.getProductsAsync(res.payload[0].name);
        props.setCurrentCategory(res.payload[0].name);
      }
    });
  }
  onLinkClick = (item) => {
    this.props.setCurrentCategory(item);
    this.props.getProductsAsync(item);
  };

  static propTypes = {};

  onHomeLogoCLick = () => {
    const defaultCategory = this.props.categories.categories[0];
    this.props.getProductsAsync(defaultCategory);
    this.props.setCurrentCategory(defaultCategory);
  };

  render() {
    return (
      this.props.products &&
      this.props.categories && (
        <NavBar>
          <ul onMouseEnter={() => this.props.toggleCartOverlay(false)}>
            {this.props.categories.categories?.map((item, i) => (
              <NavBarLi
                key={i}
                onClick={() => {
                  this.setState({
                    activeId: i,
                  });
                }}
              >
                <RouterLink
                  to={`category?name=${item}`}
                  className="active"
                  isactive={
                    item?.toLowerCase() ===
                    this.props.categories.currentCategory?.toLowerCase()
                      ? 1
                      : 0
                  }
                  onClick={() => this.onLinkClick(item)}
                >
                  {item?.toUpperCase()}
                </RouterLink>
              </NavBarLi>
            ))}
          </ul>
          <div>
            <Link
              to={`/category?name=${this.props.categories.categories[0]}`}
              onClick={this.onHomeLogoCLick}
              onMouseEnter={() => this.props.toggleCartOverlay(false)}
            >
              <Logo />
            </Link>
          </div>
          <div className="rightSection">
            <CustomSelect />
            <CartContainerLink
              to="/cart"
              onClick={() => this.props.toggleCartOverlay(false)}
            >
              <CartContainer
                onMouseEnter={() => this.props.toggleCartOverlay(true)}
              >
                <Cart />
                <CartCircle>
                  {this.props.products.cartProducts
                    .map((p) => p.count)
                    .reduce((b, a) => b + a, 0)}
                </CartCircle>
              </CartContainer>
            </CartContainerLink>
          </div>
        </NavBar>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  products: state.products,
});
const mapDispatchToProps = () => ({
  getProductsAsync,
  getCategoriesAsync,
  toggleCartOverlay,
  setCurrentCategory,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(AppBar));
