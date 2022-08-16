import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { getProduct } from "../../services/product";
import { getProducts } from "../../services/products";

const initialState = {
  status: "idle",
  products: [],
  cartProducts: [],
  cartOverlayOpen: false,
  product: null,
};

export const getProductsAsync = createAsyncThunk(
  "getProducts",
  async (title) => {
    const response = await getProducts(title);
    return response.category.products;
  }
);

export const getProductAsync = createAsyncThunk("getProduct", async (id) => {
  const response = await getProduct(id);
  const res = response.product;
  return response.product;
});

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cartProductById(state, action) {
      // debugger
      const cartProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload
      );
      const product = state.products.find((p) => p.id === action.payload);
      cartProduct
        ? state.cartProducts.find((p) => p.product.id === action.payload)
            .count++
        : state.cartProducts.push({
            product: product,
            count: 1,
          });
    },
    cartProduct(state, action) {
      // debugger;
      const product = action.payload;
      const productFromState = state.products.find(
        (p) => p.id === action.payload.id
      );
      // only add to cart id same attributes...

      const productWithSameAttributesExists = () => {
        const getSelectedItemsIndexes = (attributes) => {
          // debugger;
          const res = attributes.map((a) =>
            a.items.map((item, i) => item.selected === true && i)
          );
          return res;
        };
        const productWithSameId = state.cartProducts.find(
          (p) => p.product.id === action.payload.id
        );
        if (!productWithSameId) return false;
        else {
          const selectedIndexesOld = getSelectedItemsIndexes(
            productWithSameId.product.attributes
          );
          const selectedIndexesNew = getSelectedItemsIndexes(
            product.attributes
          );
          var result = [];
          for (var i = 0; i < selectedIndexesOld.length; ++i) {
            for (var j = 0; j < selectedIndexesOld[i].length; ++j) {
              if (
                selectedIndexesOld[i][j] === selectedIndexesNew[i][j] &&
                selectedIndexesOld[i][j] !== false &&
                selectedIndexesNew[i][j] !== false
              ) {
                result.push(true);
              }
            }
          }
          if (selectedIndexesOld.length === result.length) {
            return true;
          } else return false;
        }
      };

      console.log(
        "productWithSameAttributesExists()",
        productWithSameAttributesExists()
      );

      productWithSameAttributesExists()
        ? state.cartProducts.find((p) => p.product.id === action.payload.id)
            .count++
        : state.cartProducts.push({
            product: action.payload,
            count: 1,
          });
    },
    uncartProduct(state, action) {
      // debugger
      const product = state.cartProducts.find(
        (p) => p.product.id === action.payload
      );
      if (product.count > 1) {
        state.cartProducts.find((p) => p.product.id === action.payload).count--;
      } else {
        const index = state.cartProducts
          .map((p) => p.product.id)
          .indexOf(action.payload);
        state.cartProducts.splice(index, 1);
      }
    },
    toggleCartOverlay(state, action) {
      state.cartOverlayOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      });
  },
});

export const selectState = (state) => state.products;
export const {
  cartProduct,
  cartProductById,
  uncartProduct,
  toggleCartOverlay,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
