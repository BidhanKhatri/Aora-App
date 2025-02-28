import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import AoraLogo from "../assets/images/logo.png";
import EntryImg from "../assets/images/img.png";
import CustomButton from "@/customcomponents/CustomButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const router = useRouter();
  return (
    <SafeAreaView className="bg-[#161622]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" flex flex-col min-h-[92vh] items-center justify-center gap-6">
          <Image
            source={AoraLogo}
            resizeMode="contain"
            className="w-44 h-16 shrink-0 "
          />
          <Image
            source={EntryImg}
            resizeMode="contain"
            className="w-[380px] h-96 shrink-0 "
          />

          <View>
            <Text className="text-neutral-100 text-3xl font-semibold text-center  text-wrap px-12">
              Discover Endless Possibilities with{" "}
              <Text className="text-[#FF8C00] text-3xl font-semibold text-center  text-wrap">
                Aora
              </Text>
            </Text>
            <Text className="text-neutral-400  font-semibold text-center  text-wrap px-10 mt-6">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora{" "}
            </Text>
          </View>

          <CustomButton
            title="Get started with singin"
            buttonStyle="bg-[#FF8C00] px-10 py-4 rounded-md w-80 flex items-center justify-center"
            textStyle="text-neutral-900 font-semibold tracking-wider text-lg "
            onPress={() => router.push("/signin")}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default index;
