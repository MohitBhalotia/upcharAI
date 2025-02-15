import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import JWT decode library
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

// Load auth state from localStorage
const storedToken = localStorage.getItem("token") || null;

export const loginWithNumber = createAsyncThunk(
  "auth/loginWithNumber",
  async (number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login-admin`, {
        number: number,
      });

      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (role !== "Admin") {
        return rejectWithValue("Access denied: Not an admin");
      }

      localStorage.setItem("token", token);
      return { token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Abha login failed");
    }
  }
);

const initialState = {
  token: storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithNumber.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        toast.success("Login successful");
        state.loading = false;
      })
      .addCase(loginWithNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
