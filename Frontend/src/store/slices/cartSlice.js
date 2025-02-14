import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URI;
const adminId = import.meta.env.VITE_ADMIN_ID;

// Fetch cart items
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId || adminId;
      const response = await axios.get(
        `${backendUrl}/cart/get-cart?userId=${userId}`
      );
      return response.data.cart || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch cart"
      );
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId || adminId;
      const response = await axios.post(
        `${backendUrl}/cart/add-to-cart?userId=${userId}`,
        {
          cart: [cartItem],
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to add to cart"
      );
    }
  }
);

// Update cart item quantity
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ medicineId, quantity }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId || adminId;

      await axios.patch(`${backendUrl}/cart/update-cart?userId=${userId}`, {
        medicineId,
        quantity,
      });
      return { medicineId, quantity };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update cart"
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (medicineId, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId || adminId;

      await axios.delete(
        `${backendUrl}/cart/remove-from-cart/${medicineId}?userId=${userId}`
      );
      return medicineId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to remove from cart"
      );
    }
  }
);

const initialState = {
  cartItems: [],
  cartLength: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartLength = state.cartItems.length;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart; // Add the new item correctly
        state.cartLength = state.cartItems.length;
        toast.success('Medicine added to cart!')
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const { medicineId, quantity } = action.payload;
        const item = state.cartItems.find(
          (item) => item.medicineId === medicineId
        );
        if (item) {
          item.quantity = quantity;
        }
        toast.success('Cart updated!')
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.medicineId !== action.payload
        );
        state.cartLength = state.cartItems.length;
        toast.success('Medicine removed from cart')
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
