import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = "192.168.1.40";

// Fetch affirmations
export const fetchAffirmations = createAsyncThunk(
  "affirmations/fetchAffirmations",
  async () => {
    const response = await axios.get(
      `http://${localhost}:3000/api/affirmations`
    );
    return response.data;
  }
);

// Add favorite
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (affirmationId: number) => {
    const response = await axios.post(
      `http://${localhost}:3000/api/favorites`,
      { affirmationId }
    );
    return response.data;
  }
);

// Remove favorite
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (affirmationId: number) => {
    const response = await axios.delete(
      `http://${localhost}:3000/api/favorites/${affirmationId}`
    );
    return affirmationId;
  }
);
