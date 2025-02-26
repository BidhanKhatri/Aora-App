import { View, Text, FlatList } from "react-native";
import React from "react";

const HorizontalScroll = ({ posts }) => {
  const renderComponent = ({ item }) => (
    <View>
      <Text className="text-gray-100">{item.id}</Text>
    </View>
  );

  const emptyComponent = () => (
    <View className="flex items-center justify-center text-red-500 text-center my-4 p-2">
      <Text>No item available</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        horizontal
        data={posts}
        renderItem={renderComponent}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

export default HorizontalScroll;
