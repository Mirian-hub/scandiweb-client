import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_CATEGORIES } from "../GrafpQL/queries";
import AppBar from "./AppBar";
import ProductDesktop from "./ProductDesktop";

function Categories() {

  return (
    <>
      <div>
        <AppBar />
      </div>
      <div>
        {" "}
        <ProductDesktop />{" "}
      </div>
    </>
  );
}

export default Categories;
