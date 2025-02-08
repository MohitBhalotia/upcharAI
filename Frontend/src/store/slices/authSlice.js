// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL; // Ensure you have the correct backend URL

// Define the initial state
const initialState = {
  token: null,
  error: null,
  loading: false,
};

// Create the async thunk for handling login via QR code
export const loginWithQR = createAsyncThunk(
  "auth/loginWithQR",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login-qr`, data);
      return response.data; // Will be stored in the fulfilled action
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.msg || "Error sending data to backend"
      ); // Will be stored in the rejected action
    } 
  }
);

// Create the authSlice using createSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithQR.pending, (state) => {
        state.loading = true; // Set loading to true when the request is in progress
        state.error = null; // Clear any previous errors
      })
      .addCase(loginWithQR.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false after the request is complete
        state.token = action.payload.token; // Store the token in state if the login is successful
      })
      .addCase(loginWithQR.rejected, (state, action) => {
        state.loading = false; // Set loading to false after the request is complete
        state.error = action.payload; // Store the error message if the request fails
      });
  },
});

export default authSlice.reducer;
