import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess, logout } from "../reducers/authReducer";
import axios from "axios";
import { Alert } from "react-native"; // Import Alert API
import { getToken, deleteToken, saveToken } from "@/utils/tokenHandler";

const localhost = "192.168.1.40";
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        `http://${localhost}:3000/api/user/signin`,
        credentials
      );
      const { token, user } = response.data;
      await saveToken(token);
      dispatch(loginSuccess({ token, user }));
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", error.response.data);
        Alert.alert("Sign In Error", error.response.data.message); // Show alert with error message
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
        Alert.alert("Sign In Error", "No response received from server."); // Show alert for no response
      } else {
        // Something else happened while setting up the request
        console.log("Error setting up request:", error.message);
        Alert.alert("Sign In Error", "An unexpected error occurred."); // Show alert for unexpected errors
      }
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    credentials: { username: string; email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await axios.post(
        `http://${localhost}:3000/api/user/signup`,
        credentials
      );
      const { token, user } = response.data;
      await saveToken(token);
      dispatch(loginSuccess({ token, user }));
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", error.response.data);
        Alert.alert("Sign In Error", error.response.data.message); // Show alert with error message
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
        Alert.alert("Sign In Error", "No response received from server."); // Show alert for no response
      } else {
        // Something else happened while setting up the request
        console.log("Error setting up request:", error.message);
        Alert.alert("Sign In Error", "An unexpected error occurred."); // Show alert for unexpected errors
      }
    }
  }
);
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (credentials: { token: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        `http://${localhost}:3000/api/user/verify`,
        credentials
      );
      const { token, user } = response.data;
      dispatch(loginSuccess({ token, user }));
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", error.response.data);
        Alert.alert("Sign In Error", error.response.data.message);
        if (error.response.message === "TOKEN_INVALID") {
          deleteToken();
          dispatch(logout());
        }
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
        Alert.alert("Sign In Error", "No response received from server."); // Show alert for no response
      } else {
        // Something else happened while setting up the request
        console.log("Error setting up request:", error.message);
        Alert.alert("Sign In Error", "An unexpected error occurred."); // Show alert for unexpected errors
      }
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }
      await axios.post(`http://${localhost}:3000/api/user/logout`, token);
      deleteToken();
      dispatch(logout());
    } catch (error) {
      console.log("error", error);
    }
  }
);
