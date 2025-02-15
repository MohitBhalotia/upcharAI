import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import JWT decode library
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

// Load auth state from localStorage
const storedToken = localStorage.getItem("token") || null;
const storedUserId = storedToken ? jwtDecode(storedToken).userId : null; // Decode userId from token

// Login with QR Code

export const loginWithNumber = createAsyncThunk(
  "auth/loginWithNumber",
  async (number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login-admin`, {
        number: number,
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
      .addCase(loginWithNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithNumber.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        toast.success("Login successfull");
        state.loading = false;
      })
      .addCase(loginWithNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // Handle getUser
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
