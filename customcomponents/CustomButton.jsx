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
    <Pressable onPress={onPress} className={buttonStyle}>
      <Text className={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
