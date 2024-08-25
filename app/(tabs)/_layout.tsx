import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Image, Text, Platform } from "react-native";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="justify-center items-center gap-2 mt-1">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="h-full">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,

          tabBarStyle: {
            paddingBottom: Platform.OS === "android" ? 10 : 0, // Adjusts the padding for Android
            paddingTop: Platform.OS === "ios" ? 0 : 0, // Adjusts the padding for iOS
            height: Platform.OS === "android" ? 60 : 60,
            marginTop: Platform.OS === "ios" ? 0 : 0, // Ensures consistent height across platforms
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name={"Home"}
                color={color}
                icon={icons.home}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name={"Favorites"}
                color={color}
                icon={icons.favorites}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name={"Settings"}
                color={color}
                icon={icons.settings}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
