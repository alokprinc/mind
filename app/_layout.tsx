import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/store/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <SafeAreaProvider>
        <SafeAreaView> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        {/* </SafeAreaView>
      </SafeAreaProvider> */}
    </Provider>
  );
}
