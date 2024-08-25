import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
  try {
    await SecureStore.setItemAsync("authToken", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Failed to save the token", error);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      console.log("Token Found😁");
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync("authToken");
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Failed to delete the token", error);
  }
}
