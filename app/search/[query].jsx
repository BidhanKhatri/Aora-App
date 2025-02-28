import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import useAppWrite from "@/lib/useAppwrite";
import { getSearchVideo } from "@/lib/appwrite";
import SearchBar from "@/customcomponents/SearchBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { Video, ResizeMode } from "expo-av";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: searchedVideo, refetch } = useAppWrite(() => getSearchVideo(query));
  const [playingVideos, setPlayingVideos] = useState({});

  useEffect(() => {
    refetch()
  }, [query]);

  const handlePlay = (videoId) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  //renderItem component for FlatList
  const renderComponent = ({ item }) => (
    <View className="my-4 mx-4">
      <View>
        <View className="flex-row items-center  gap-4">
          <View>
            <Image
              source={{ uri: item.creator.avatar }}
              resizeMode="contain"
              className="size-10 shrink-0 rounded-md overflow-hidden border border-gray-100"
            />
          </View>
          <View>
            <Text numberOfLines={1} className="text-gray-100 font-semibold">
              {item.title}
            </Text>
            <Text className="text-gray-100 text-xs">
              {item.creator.username}
            </Text>
          </View>
        </View>
      </View>

      {playingVideos[item.$id] ? (
        <View>
          <Video
            source={{ uri: item.video }}
            shouldPlay
            style={{
              width: "100%",
              height: 210,
              borderRadius: 12,
              overflow: "hidden",
              marginTop: 16,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
          onPress={() => handlePlay(item.$id)}
          className="w-full rounded-xl overflow-hidden mt-4 relative flex items-center justify-center"
        >
          <Image
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-full h-60 rounded-xl overflow-hidden"
          />

          <Icon name="play" size={40} color="white" className="absolute" />
        </TouchableOpacity>
      )}
    </View>
  );

  //ListHeaderComponent for FlatList
  const headerComponent = () => (
    <View className="my-4 px-4 ">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm  text-gray-100">Search Result</Text>
          <Text className="text-3xl font-semibold text-white mt-2">
            {query}
          </Text>
        </View>
      </View>

      <View>
        <SearchBar
          searchScreenQuery={query}
          placeholderText="search video here..."
        />
      </View>
    </View>
  );

  //List Empty component
  const emptyContainer = () => (
    <View>
      <Text>No data to dispaly</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <FlatList
        data={searchedVideo}
        keyExtractor={(item) => item.$id}
        renderItem={renderComponent}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={emptyContainer}
        refreshControl={""}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default Search;
