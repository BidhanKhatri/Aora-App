import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import "../global.css"; // Ensure NativeWind is properly configured

const FormField = ({
  labelText = "label",
  handleTextChange,
  value,
  placeholderText = "placeholder",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mt-6">
      {/* Label */}
      <Text className="text-gray-100 text-xl tracking-wider">{labelText}</Text>

      {/* Input Container */}
      <View
        className={`border   ${
          isFocused ? "border-[#FF8C00]" : "border-neutral-800"
        } rounded-md bg-black/80 mt-2 p-2`}
      >
        {/* Move text-gray-100 into TextInput */}
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={"gray"}
          className="text-gray-100 w-full"
          onChangeText={handleTextChange}
          secureTextEntry={labelText === "Password"}
          value={value}
          style={{ padding: 12 }}
          onFocus={() => setIsFocused((prev) => !prev)}
          onBlur={() => setIsFocused((prev) => !prev)}
        />
      </View>
    </View>
  );
};

export default FormField;
