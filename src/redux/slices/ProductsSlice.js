import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct } from "../../services/product";
import { getProducts } from "../../services/products";

const initialState = {
  status: "idle",
  products: [],
  cartProducts: [],
  cartOverlayOpen: false,
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
  return response.product;
});

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cartProductById(state, action) {
      const cartProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload
      );
      const product = state.products.find((p) => p.id === action.payload);
      cartProduct
        ? state.cartProducts.find((p) => p.product.id === action.payload)
            .count++
        : state.cartProducts.push({
            product: { ...product, customId: product.id },
            count: 1,
          });
    },

    cartProductByCustomId(state, action) {
      state.cartProducts.find((p) => p.product.customId === action.payload).count++;
    },
    cartProduct(state, action) {
      const productFromCart = state.cartProducts.find(
        (p) => p.product.customId === action.payload.customId
      );

      productFromCart
        ? state.cartProducts.find(
            (p) => p.product.customId === action.payload.customId
          ).count++
        : state.cartProducts.push({
            product: action.payload,
            count: 1,
          });
    },
    uncartProduct(state, action) {
      const product = state.cartProducts.find(
        (p) =>
          p.product.customId === action.payload 
      );
      if (product.count > 1) {
        state.cartProducts.find((p) => p.product.customId === action.payload).count--;
      } else {
        const index = state.cartProducts
          .map((p) => p.product.customId)
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
  cartProductByCustomId,
  uncartProduct,
  toggleCartOverlay,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
