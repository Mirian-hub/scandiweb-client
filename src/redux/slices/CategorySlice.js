import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../services/categories";

const initialState = {
  status: "idle",
  categories: [],
  currentCategory: null
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
  reducers: {
    setCurrentCategory (state, action) {
      state.currentCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.map(x => x.name);
      });
  },
});

export const selectState = (state) => state.categories;
export const {setCurrentCategory} = CategorySlice.actions;
export default CategorySlice.reducer;
