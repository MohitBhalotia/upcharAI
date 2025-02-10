// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

const backendUrl = import.meta.env.VITE_BACKEND_URI;

// Define the initial state
const initialState = {
  token: null,
  userId: null, // Store the user ID extracted from JWT
  error: null,
  loading: false,
};

// Create the async thunk for handling login via QR code
export const loginWithQR = createAsyncThunk(
  "auth/loginWithQR",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login-qr`, data);
      return response.data; // Return the response payload
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Error sending data to backend"
      ); // Ensure proper error handling
    }
  }
);

// Create the authSlice using createSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // No additional reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(loginWithQR.pending, (state) => {
        state.loading = true; // Start loading
        state.error = null; // Reset error
      })
      .addCase(loginWithQR.fulfilled, (state, action) => {
        state.loading = false; // Stop loading
        state.token = action.payload.token; // Save token
        // Decode JWT and extract userId
        try {
          const decodedToken = jwtDecode(action.payload.token);
          state.userId = decodedToken.userId; // Assuming "userId" is a field in your JWT payload
        } catch (error) {
          console.error("Error decoding JWT:", error);
          state.error = "Invalid token received";
        }
      })
      .addCase(loginWithQR.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.payload || "Something went wrong"; // Store error as string
      });
  },
});

export default authSlice.reducer;
