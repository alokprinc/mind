import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAffirmations,
  addFavorite,
  removeFavorite,
} from "../actions/affirmationsAction";

interface affirmationState {
  affirmations: Array<any>; // Changed to any to accommodate more detailed affirmation objects
  favoritesMap: { [key: number]: boolean };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  offset: number;
  limit: number;
}

const initialState: affirmationState = {
  affirmations: [],
  favoritesMap: {},
  status: "idle",
  error: null,
  offset: 0,
  limit: 10,
};

const affirmationSlice = createSlice({
  name: "affirmations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAffirmations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.affirmations = [
          ...state.affirmations,
          ...action.payload.affirmations,
        ];
        state.offset += state.limit;
        action.payload.favorites.map((obj:any)=>{
          state.favoritesMap[obj.affirmationId] = true;
        })
        console.log(action.payload)
      })
      .addCase(fetchAffirmations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAffirmations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch affirmations";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        console.log("Favorite added:", action.payload.affirmationId);
        state.favoritesMap[action.payload.affirmationId] = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        console.log("Favorite removed:", action.payload.affirmationId);
        delete state.favoritesMap[action.payload.affirmationId];
      });
  },
});

export default affirmationSlice.reducer;
