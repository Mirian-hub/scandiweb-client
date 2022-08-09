import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "../../services/currencies";

const initialState = {
  status: "idle",
  currencies: [],
  currentCurrency: null
};

export const getCurrenciesAsync = createAsyncThunk(
  "getCurrencies",
  async () => {
    const response = await getCurrencies();
    return response.currencies;
  }
);

export const CurrenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    changeCurrency (state, action) {
      state.currentCurrency = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrenciesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrenciesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currencies = action.payload;
        state.currentCurrency = action.payload[0]
      });
  },
});

export const selectState = (state) => state.currencies;
export const {changeCurrency} = CurrenciesSlice.actions
export default CurrenciesSlice.reducer;
