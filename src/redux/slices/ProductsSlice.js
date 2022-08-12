import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProduct } from '../../services/product';
import {getProducts } from '../../services/products'

const initialState = {
  status: 'idle',
  products: [],
  cartProducts: [],
  cartOverlayOpen: false,
  product: null
}

export const getProductsAsync = createAsyncThunk(
  'getProducts',
  async (title) => {
    const response = await getProducts(title)
    return response.category.products
  }
)

export const getProductAsync = createAsyncThunk(
  'getProduct',
  async (id) => {
    const response = await getProduct(id)
    const res  = response.product
    return response.product
  }
)


export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   cartProduct(state, action) {
    const product = state.products.find(p=>p.id === action.payload)
    state.cartProducts.push(product)
   },
   uncartProduct(state, action) {
    const index  = state.cartProducts.map(p => p.id).indexOf(action.payload);
    state.cartProducts.splice(index, 1)
   },
   toggleCartOverlay (state, action) {
    state.cartOverlayOpen  = action.payload
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;  
      })
      .addCase(getProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;  
      })
  },
})

export const selectState = (state) => state.products
export const {cartProduct, uncartProduct, toggleCartOverlay} = ProductsSlice.actions
export default ProductsSlice.reducer