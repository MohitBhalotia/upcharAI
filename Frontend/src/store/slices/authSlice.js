import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import JWT decode library

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// Load auth state from localStorage
const storedToken = localStorage.getItem("token") || null;
const storedUserId = storedToken ? jwtDecode(storedToken).userId : null; // Decode userId from token

// Login with QR Code
export const loginWithQr = createAsyncThunk(
  "auth/loginWithQr",
  async (qrCodeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/auth/login-qr`,
        qrCodeData
      );

      const token = response.data.token;
      const decodedToken = jwtDecode(token); // Decode JWT to extract userId
      const userId = decodedToken.userId;

      // Save userId and token to localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      return { userId, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "QR login failed");
    }
  }
);
export const loginWithAbha = createAsyncThunk(
  "auth/loginWithAbha",
  async (abha, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login-abha`, {
        abha: abha,
      });

      const token = response.data.token;
      const decodedToken = jwtDecode(token); // Decode JWT to extract userId
      const userId = decodedToken.userId;

      // Save userId and token to localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      return { userId, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Abha login failed");
    }
  }
);

// Fetch user details
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found");

      const response = await axios.get(`${backendUrl}/user/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch user"
      );
    }
  }
);

const initialState = {
  user: null,
  userId: storedUserId,
  token: storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;

      // Clear localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginWithQr
      .addCase(loginWithQr.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithQr.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginWithQr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithAbha.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithAbha.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginWithAbha.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
