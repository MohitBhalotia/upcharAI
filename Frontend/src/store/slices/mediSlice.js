import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

const initialState = {
  medicines: [],
  loading: false,
  error: null,
  success: false,
  purchasedItems: [],
  totalBill: 0,
};

// Fetch medicines
export const getMedicines = createAsyncThunk(
  "medi/getMedicines",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId || import.meta.env.VITE_ADMIN_ID;
      const response = await axios.get(
        `${backendUrl}/medicines/get-medicines?userId=${userId}`
      );
      return response.data.medicines;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Error fetching medicines"
      );
    }
  }
);

// Buy medicines
export const buyMedicine = createAsyncThunk(
  "medi/buyMedicine",
  async ({ cart }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId||import.meta.env.VITE_ADMIN_ID;

      const response = await axios.post(
        `${backendUrl}/medicines/buy-medicine`,
        { cart, userId }
      );

      return response.data; // Contains `totalBill` and `purchasedItems`
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Error purchasing medicines"
      );
    }
  }
);

const mediSlice = createSlice({
  name: "medi",
  initialState,
  reducers: {
    resetPurchaseState: (state) => {
      state.success = false;
      state.error = null;
      state.purchasedItems = [];
      state.totalBill = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch medicines
      .addCase(getMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(getMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Buy medicines
      .addCase(buyMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(buyMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.purchasedItems = action.payload.purchasedItems;
        state.totalBill = action.payload.totalBill;
      })
      .addCase(buyMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

export const { resetPurchaseState } = mediSlice.actions;
export default mediSlice.reducer;
