import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-3 flex-col  ${otherStyles}`}>
      <Text className="text-base font-medium">{title}</Text>
      <View className="w-[90vw] bg-slate-300 border border-gray-300 h-16 justify-center items-center rounded-xl flex-row">
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          {...props}
          className="font-semibold text-base flex-1 w-full px-4"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6 m-1"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
