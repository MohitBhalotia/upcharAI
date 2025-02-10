import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

// Async thunk to fetch cart items
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId;
      const response = await axios.get(
        `${backendUrl}/cart/get-cart/${
          userId ? userId : import.meta.env.VITE_ADMIN_ID
        }`
      );
      return response.data.cart || []; // Ensure the cart is always an array
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

// Initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
