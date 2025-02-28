import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ResizeMode, Video } from "expo-av";

const HorizontalScroll = ({ posts }) => {
  console.log("horizontal scroll response", posts);
  const [playingVideos, setPlayingVideos] = useState({});

  const handleVideoChange = (videoId) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const renderComponent = ({ item }) => (
    <View className="">
      {playingVideos[item.$id] ? (
        <View>
          <Video
            source={{ uri: item.video }}
            shouldPlay
            style={{
              width: 170,
              height: 252,
              border: "1px solid rgba(243, 244, 246, 0.2)",
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,.9)",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlayingVideos((prev) => ({
                  ...prev,
                  [item.$id]: false,
                }));
              }
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative"
          onPress={() => handleVideoChange(item.$id)}
        >
          <View className="">
            <ImageBackground
              source={{ uri: item.thumbnail }}
              resizeMode="cover"
              className="h-72 w-48 shrink-0 rounded-xl overflow-hidden border border-gray-100/10 bg-gray-100/5"
            />
          </View>
          <Icon
            name="play"
            size={26}
            color="white"
            className="absolute top-1/2 left-1/2"
          />
        </TouchableOpacity>
      )}
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
        ItemSeparatorComponent={() => <View className="w-2" />}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default HorizontalScroll;
