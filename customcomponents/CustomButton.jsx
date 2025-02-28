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
      className={buttonStyle}
    >
      <Text className={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
