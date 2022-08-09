import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getProducts } from '../../services/products'

const initialState = {
  status: 'idle',
  products: [],
}

export const getProductsAsync = createAsyncThunk(
  'getProducts',
  async (title) => {
    const response = await getProducts(title)
    return response.category.products
  }
)


export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
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
  },
})

export const selectState = (state) => state.products

export default ProductsSlice.reducer