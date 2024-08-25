import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import { CustomButton } from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/store/actions/authAction";
import { AppDispatch, RootState } from "@/store/store";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit = () => {
    dispatch(signInUser(form));
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full min-h-[75vh] justify-center items-center my-2">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="mt-10 text-2xl font-bold text-black">
            Log in To Account
          </Text>
          <FormField
            title={"Email"}
            value={form.email}
            placeholder={"Enter Your Email"}
            handleChangeText={(e: any) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles=""
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder={"Enter Your Password"}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            tittle={"Sign In"}
            handlePress={submit}
            containerStyles="w-[90vw] mt-8"
            textStyles={"text-xl item-center justify-center font-bold"}
            isLoading={false}
          />
          <View className="flex-row justify-center items-center mt-7">
            <Text className="text-base font-semibold text-lg">
              Don't have account?{" "}
            </Text>
            <TouchableOpacity>
              <Link
                href={"/sign-up"}
                className="text-blue-800 text-base font-bold text-lg"
              >
                Sign Up
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
