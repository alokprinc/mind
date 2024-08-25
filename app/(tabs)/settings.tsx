import { View, Text } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { CustomButton } from "@/components/CustomButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/actions/authAction";
import { AppDispatch } from "@/store/store";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // This will throw an error if the thunk fails
      router.replace("/sign-in");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  return (
    <View>
      <CustomButton
        tittle={"Log Out"}
        handlePress={handleLogout}
        containerStyles="w-40"
        textStyles="text-xl font-semibold"
        isLoading={false}
      />
    </View>
  );
};

export default Settings;
