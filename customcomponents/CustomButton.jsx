import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import "../global.css";

const CustomButton = ({
  onPress,
  title = "Button Text",
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress ? onPress : null}
      className="bg-[#FF8C00] px-10 py-4 rounded-md w-full flex items-center justify-center"
    >
      <Text className={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
