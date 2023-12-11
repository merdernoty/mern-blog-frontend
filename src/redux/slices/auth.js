import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "/auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: {
    // Получение тегов
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
        state.data = null;
        state.status = "error";
    },
  },
});

export const authReducer = authSlice.reducer;
