import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from './slices/CategorySlice';
import ProductsReducer from './slices/ProductsSlice'
import CurrenciesReducer from './slices/CurrenciesSlice'

export const store = configureStore({
  serializableCheck: false,
  reducer: {
    products: ProductsReducer,
    categories: CategoryReducer,
    currencies: CurrenciesReducer
  }
});
