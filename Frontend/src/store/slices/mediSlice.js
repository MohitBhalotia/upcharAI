import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  medicines: [],
  error: null,
  loading: false,
};

const backendUrl = import.meta.env.VITE_BACKEND_URI;

export const getMedicines = createAsyncThunk(
  "medi/getMedicines",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.userId; // Get userId from auth state

      const response = await axios.post(`${backendUrl}/medicines/get-medicines`, { userId });

      return response.data.medicines;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Error fetching medicines"
      );
    }
  }
);

const mediSlice = createSlice({
  name: "medi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMedicines.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getMedicines.fulfilled, (state, action) => {
        state.error = null;
        state.medicines = action.payload;
        state.loading = false;
      })
      .addCase(getMedicines.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      });
  },
});

export default mediSlice.reducer;
