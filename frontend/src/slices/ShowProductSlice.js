import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: [],
  loading: false,
  error: "error",
  singleProduct: {},
};
export const getProducts = createAsyncThunk("products", async () => {
  try {
    const response = await fetch("api/products");
    console.log(response);
    const res = await response.json();
    const resWithQantity = res.map((item) => {
      return { ...item, qnty: 1 };
    });
    return resWithQantity;
  } catch (error) {
    console.log(error);
  }
});
// console.log("getProducts",getProducts());
export const getSingleProduct = createAsyncThunk(
  "singleProductDetail",
  async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const res = await response.json();
      return res[0];
    } catch (error) {
      console.log(error);
    }
  }
);
export const ShowProductSlice = createSlice({
  name: "ProductData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.Products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default ShowProductSlice.reducer;
