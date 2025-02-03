import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  medicines: [],
  error: null,
  loading: false,
};
const backendUrl = import.meta.env.VITE_BACKEND_URI;

export const getMedicines = createAsyncThunk("medi/getMedicines", async () => {
  try {
    const medi = await axios.get(`${backendUrl}/medicines/get-medicines`);
    return medi.data.medicines;
  } catch (error) {
    console.log(error);
  }
});

const mediSlice = createSlice({
  name: "medi",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getMedicines.pending,(state,action)=>{
        state.error=null,
        state.loading=true
    })
    .addCase(getMedicines.fulfilled,(state,action)=>{
        state.error=null,
        state.medicines=action.payload;
        state.loading=false
    })
    .addCase(getMedicines.rejected,(state,action)=>{
        state.error=action.payload.error.msg,
        state.loading=false
    })
  }
});

export default mediSlice.reducer;
