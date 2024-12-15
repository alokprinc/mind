import { useEffect, useState } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";

const localhost = "192.168.31.187";
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  // Get the project ID
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    console.error("Project ID not found");
    return;
  }

  // Get the push token
  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log("Push notification token:", token);
  return token;
}

const getRandomAffirmation = async (token: any, offset = 0, limit = 100) => {
  try {
    const response = await axios.get(
      `http://${localhost}:3000/api/data/affirmations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { offset, limit },
      }
    );

    console.log("Prince  size -> ", response.data.affirmations.length);
    // console.log("Prince -> ", response.data);
    // Assuming the response data is an array of affirmations
    const affirmations = response.data.affirmations; // Adjust based on your actual response structure
    if (affirmations.length === 0) {
      throw new Error("No affirmations available");
    }

    // Select a random affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  } catch (error) {
    console.error("Error fetching affirmations:", error);
    return null; // Return null if there's an error
  }
};

const scheduleNotification = async (token: any) => {
  console.log("Checking scheduled notifications before cancellation...");

  // Get scheduled notifications before cancelling
  const beforeCancel = await Notifications.getAllScheduledNotificationsAsync();
  console.log("Scheduled Notifications (Before):", beforeCancel);

  // Cancel all scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  console.log("Checking scheduled notifications after cancellation...");
  const afterCancel = await Notifications.getAllScheduledNotificationsAsync();
  console.log("Scheduled Notifications (After):", afterCancel);

  console.log("Scheduling new notification...");
  // Fetch a random affirmation
  const affirmation = await getRandomAffirmation(token);

  if (!affirmation) {
    console.error("No affirmation found for notification.");
    return;
  }

  const trigger = {
    seconds: 100,
    repeats: true,
  };
  console.log("affirmation here is --> ", affirmation);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Today's thoughts",
      body: affirmation.affirmation,
    },
    trigger,
  });
  // Function to continuously schedule notifications at intervals

  console.log("Notification scheduled!");
};
const startNotificationScheduler = async (token: any) => {
  setInterval(async () => {
    await scheduleNotification(token);
  }, 100000); // Schedule every 10 seconds
};
export {
  scheduleNotification,
  registerForPushNotificationsAsync,
  startNotificationScheduler,
};
