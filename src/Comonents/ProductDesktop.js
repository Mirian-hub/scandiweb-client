import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
const mockdata = [
  {
    img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.imgacademy.com%2Fsites%2Fdefault%2Ffiles%2F2022-07%2Fimg-homepage-meta.jpg&imgrefurl=https%3A%2F%2Fwww.imgacademy.com%2F&tbnid=sQxJ7qukoOvyrM&vet=12ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ..i&docid=hFtYl-FEX25j5M&w=1600&h=1067&q=img&ved=2ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ",
    name: "apolo shor ",
    price: 2020,
  },
  {
    img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.imgacademy.com%2Fsites%2Fdefault%2Ffiles%2F2022-07%2Fimg-homepage-meta.jpg&imgrefurl=https%3A%2F%2Fwww.imgacademy.com%2F&tbnid=sQxJ7qukoOvyrM&vet=12ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ..i&docid=hFtYl-FEX25j5M&w=1600&h=1067&q=img&ved=2ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ",
    name: "apolo shor ",
    price: 2020,
  },
  {
    img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.imgacademy.com%2Fsites%2Fdefault%2Ffiles%2F2022-07%2Fimg-homepage-meta.jpg&imgrefurl=https%3A%2F%2Fwww.imgacademy.com%2F&tbnid=sQxJ7qukoOvyrM&vet=12ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ..i&docid=hFtYl-FEX25j5M&w=1600&h=1067&q=img&ved=2ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ",
    name: "apolo shor ",
    price: 2020,
  },
  {
    img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.imgacademy.com%2Fsites%2Fdefault%2Ffiles%2F2022-07%2Fimg-homepage-meta.jpg&imgrefurl=https%3A%2F%2Fwww.imgacademy.com%2F&tbnid=sQxJ7qukoOvyrM&vet=12ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ..i&docid=hFtYl-FEX25j5M&w=1600&h=1067&q=img&ved=2ahUKEwit_p7Rl6X5AhVj6rsIHci3Bx0QMygCegUIARDkAQ",
    name: "apolo shor ",
    price: 2020,
  },
];
const CardsContainer = styled.div`
  width: 90%;
  margin: auto;
  .content {
    display: flex;
    flex-wrap:wrap ;
  }
`;
export default class ProductDesktop extends Component {
  //   static propTypes = {second: third}

  render() {
    return (
      <CardsContainer>
        <h1> Category name </h1>
        <div className="content">
          {mockdata.map((item, i) => (
            <ProductCard data={item} key={i} />
          ))}
        </div>
      </CardsContainer>
    );
  }
}
