import { getToken } from "@/utils/tokenHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = "192.168.31.187";

// Fetch affirmations
export const fetchAffirmations = createAsyncThunk(
  "affirmations/fetchAffirmations",
  async ({ offset, limit }: { offset: number; limit: number }) => {
    console.log("Fetching affirmations...");
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `http://${localhost}:3000/api/data/affirmations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { offset, limit },
        }
      );
      return response.data;

      // console.log("Response data: ", response.data);
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Error response: ", error.response.data);
        console.log("Error status: ", error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.log("Error request: ", error.request);
      } else {
        // Something else caused the error
        console.log("Error message: ", error.message);
      }
      throw error; // Re-throw the error for redux to handle
    }
  }
);

// Add Favorite
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({
    affirmationId,
    userId,
    userName,
  }: {
    affirmationId: number;
    userId: number;
    userName: string;
  }) => {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(
      `http://${localhost}:3000/api/data/addfavorites`,
      { affirmationId, userId, userName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Remove Favorite
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({
    affirmationId,
    userId,
  }: {
    affirmationId: number;
    userId: string;
  }) => {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(
      `http://${localhost}:3000/api/data/removefavorites`,
      { data: { userId, affirmationId } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);
