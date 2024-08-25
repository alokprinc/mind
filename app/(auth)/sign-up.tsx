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
import { AppDispatch, RootState } from "@/store/store";
import { signUpUser } from "@/store/actions/authAction";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submit = () => {
    dispatch(signUpUser(form));
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
            Sign Up To Account
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            placeholder={"Enter Your Username"}
            handleChangeText={(e: any) =>
              setForm({
                ...form,
                username: e,
              })
            }
            otherStyles="mb-4 mt-10"
          />
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
            otherStyles="mt-5"
          />
          <CustomButton
            tittle={"Sign Up"}
            handlePress={submit}
            containerStyles="w-[90vw] mt-8"
            textStyles={"text-xl item-center justify-center font-bold"}
            isLoading={false}
          />
          <View className="flex-row justify-center items-center mt-7">
            <Text className="text-base font-semibold text-lg">
              Have a account already?{" "}
            </Text>
            <TouchableOpacity>
              <Link
                href={"/sign-in"}
                className="text-blue-800 text-base font-bold text-lg"
              >
                Sign In
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
