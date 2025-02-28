import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { usePathname, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchBar = ({
  handleTextChange,
  placeholderText,
  searchScreenQuery,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(searchScreenQuery || "");

  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="mt-6">
      {/* Input Container */}
      <View
        className={`border flex items-center justify-center ${
          isFocused ? "border-[#FF8C00]" : "border-neutral-700"
        } rounded-md bg-[#18181B] mt-2 py-4 px-4 gap-2 flex-row`}
      >
        {/* TextInput */}
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor="#CDCDE0"
          className="text-gray-100 flex-1 "
          onChangeText={(text) => setQuery(text)}
          value={query}
          style={{ padding: 4 }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Button Text */}
        <View>
          <TouchableOpacity
            onPress={() => {
              if (!query) {
                return Alert.alert(
                  "Missing Query",
                  "Please enter a search value"
                );
              }
              if (pathname.startsWith("/search")) {
                router.setParams({ query });
              } else {
                router.push(`/search/${query}`);
              }
            }}
            className="text-gray-100"
          >
            <Icon
              name="search"
              size={20}
              color={isFocused ? "#FF8C00" : "#CDCDE0"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
