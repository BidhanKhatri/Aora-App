import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";

import { getVideoByUser, signOut } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import Icon from "react-native-vector-icons/FontAwesome";
import { ResizeMode, Video } from "expo-av";
import { useGlobalContext } from "@/context/GlobalProvider";
import InfoProfile from "@/customcomponents/InfoProfile";
import { useRouter } from "expo-router";

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});

  const [query, setQuery] = useState("");
  const { isLoading, setIsLoading, isLoggedIn, user, setUser, setIsLoggedIn } =
    useGlobalContext();
  // console.log("user details", user);
  const { data: userVideos, refetch } = useAppWrite(() =>
    getVideoByUser(user.$id)
  );
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/signin");
  };

  const onRefresh = () => {
    setRefreshing(true);

    refetch();
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
    <View className="my-4 mx-4">
      <View>
        <View className="flex-row items-center  gap-4">
          <View>
            <Image
              source={{ uri: item.creator?.avatar }}
              resizeMode="contain"
              className="size-10 shrink-0 rounded-md overflow-hidden border border-gray-100"
            />
          </View>
          <View>
            <Text numberOfLines={1} className="text-gray-100 font-semibold">
              {item.title}
            </Text>
            <Text className="text-gray-100 text-xs">
              {item.creator?.username}
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
        <View></View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              "Logout",
              "Are you sure want to logout?",

              [
                { text: "NO" },
                {
                  text: "YES",
                  onPress: async () => {
                    await handleLogout();
                  },
                },
              ]
            );
          }}
        >
          <Icon name="sign-out" size={28} color="rgba(255,0,0,.6)" />
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center my-4 ">
        <View className="p-1 bg-gray-100 rounded-xl overflow-hidden">
          <Image
            source={{ uri: user?.avatar }}
            resizeMode="cover"
            className="size-16 shrink-0  overflow-hidden  rounded-xl"
          />
        </View>
        <Text className="text-gray-100 mt-2 font-semibold text-xl tracking-wider">
          {user?.username}
        </Text>
        <View className="flex flex-row gap-6 items-center mt-6">
          <InfoProfile title={userVideos.length} subtitle="Total Videos" />
          <InfoProfile title={"1.2K"} subtitle="Followers" />
        </View>
      </View>
    </View>
  );

  //List Empty component
  const emptyContainer = () => (
    <View className="my-2 text-center flex flex-col items-center justify-center">
      <Text className="text-gray-100">No data to display</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <FlatList
        data={userVideos}
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
