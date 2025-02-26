import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const SearchBar = ({ handleTextChange, placeholderText }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mt-6">
      {/* Input Container */}
      <View
        className={`border flex items-center justify-center ${
          isFocused ? "border-[#FF8C00]" : "border-neutral-800"
        } rounded-md bg-black/80 mt-2 py-4 px-4 gap-2 flex-row`}
      >
        {/* TextInput */}
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={"gray"}
          className="text-gray-100 flex-1 "
          onChangeText={handleTextChange}
          style={{ padding: 4 }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Button Text */}
        <View>
          <Text className="text-gray-100">Btn</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
