import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

const CustomButton = ({
  tittle,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-yellow-500 min-h-[62px] justify-center items-center rounded-xl mt-5 ${containerStyles}`}
    >
      <Text className={`${textStyles}`}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export { CustomButton };
