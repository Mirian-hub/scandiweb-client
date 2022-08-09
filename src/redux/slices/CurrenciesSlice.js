import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "../../services/currencies";

const initialState = {
  status: "idle",
  currencies: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrenciesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrenciesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currencies = action.payload;
      });
  },
});

export const selectState = (state) => state.currencies;

export default CurrenciesSlice.reducer;
