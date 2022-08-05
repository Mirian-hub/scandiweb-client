import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from './slices/CategorySlice';
import ProductsReducer from './slices/ProductsSlice'

export const store = configureStore({
  serializableCheck: false,
  reducer: {
    products: ProductsReducer,
    categories: CategorySlice
  }
});
