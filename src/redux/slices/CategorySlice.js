import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../services/categories";

const initialState = {
  status: "idle",
  categories: [1,2,3],
};

export const getCategoriesAsync = createAsyncThunk(
  "getCategories",
  async () => {
    const response = await getCategories();
    return response.categories;
  }
);

export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAsync.pending, (state) => {
        state.status = "loading";
        console.log('loading')
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.map(x => x.name);
        console.log('state', state.categories)
      });
  },
});

export const selectState = (state) => state.categories;

export default CategorySlice.reducer;
