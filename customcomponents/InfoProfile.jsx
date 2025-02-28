import { View, Text } from "react-native";
import React from "react";

const InfoProfile = ({ title = 0, subtitle = "Not Available" }) => {
  return (
    <View className=" flex flex-col items-center justify-center p-2">
      <Text className="text-gray-100 font-semibold text-xl tracking-wider">
        {title}
      </Text>
      <Text className="text-gray-300 font-semibold text-sm tracking-wider">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoProfile;
