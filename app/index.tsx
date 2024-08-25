import { images } from "@/constants";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "../components/CustomButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppDispatch } from "@/store/store";
import * as SecureStore from "expo-secure-store";
import { verifyUser } from "@/store/actions/authAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        // // Optionally validate token here
        // dispatch(verifyUser({ token }));
        router.replace("/home");
      }
    };
    checkToken();
  }, [dispatch]);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-custom h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
            backgroundColor: "#76a5a7",
          }}
        >
          <View className="flex-col justify-center items-center min-h-[85vh] w-full">
            <Image
              source={images.logo}
              className="w-[138px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="h-[300px] max-w-[380px] w-full"
              resizeMode="contain"
            />
            <Text className="text-[40px] text-slate-100 font-extrabold text-center">
              Discover Yourself
            </Text>
            <CustomButton
              tittle={"Continue with Email"}
              handlePress={() => router.push("/sign-in")}
              containerStyles={"w-[90vw] m-3"}
              textStyles={"text-xl item-center justify-center font-bold"}
              isLoading={false}
            />
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
