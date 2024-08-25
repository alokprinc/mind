import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAffirmations,
  addFavorite,
  removeFavorite,
} from "../actions/affirmationsAction";

interface affirmationState {
  affirmations: Array<any>;
  favorites: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: affirmationState = {
  affirmations: [],
  favorites: [],
  status: "idle",
  error: null,
};

const affirmationSlice = createSlice({
  name: "affirmations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAffirmations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAffirmations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.affirmations = [...state.affirmations, ...action.payload];
      })
      .addCase(fetchAffirmations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch affirmations";
      });
  },
});
