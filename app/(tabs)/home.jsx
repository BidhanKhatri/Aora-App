import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import SearchBar from "@/customcomponents/SearchBar";
import HorizontalScroll from "@/customcomponents/HorizontalScroll";
import DummyImg from "../../assets/images/react-logo.png";
import { getVideos } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import Icon from "react-native-vector-icons/FontAwesome";

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const { data, loading } = useAppWrite(getVideos);

  const onRefresh = () => {
    setRefreshing(true);
    //if new data available
    // refresh();
    setRefreshing(false);
  };

  const handlePlay = (videoId) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  //renderItem component for FlatList
  const renderComponent = ({ item }) => (
    <View className="my-6 mx-4">
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
        <Text className="text-gray-100 text-center mt-4">Playing</Text>
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
    <View className="my-6 px-4 ">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm  text-gray-100">Welcome back</Text>
          <Text className="text-3xl font-semibold text-white mt-2">
            Bidhan Khatri
          </Text>
        </View>
        <View>
          <Image
            source={DummyImg}
            resizeMode="contain"
            className="w-10 h-10 shrink-0 rounded-full overflow-hidden"
          />
        </View>
      </View>

      <View>
        <SearchBar placeholderText="search video here..." />
      </View>

      <View className="my-6">
        <Text className="text-gray-100">Featured Videos</Text>
      </View>

      {/* add another flat list for horizontal scroll */}
      <View>
        <HorizontalScroll posts={[{ id: 101 }, { id: 201 }]} />
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
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={renderComponent}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={emptyContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;
