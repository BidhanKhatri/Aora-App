import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/customcomponents/FormField";
import Icon from "react-native-vector-icons/FontAwesome";
import { ResizeMode, Video } from "expo-av";
import CustomButton from "@/customcomponents/CustomButton";

const create = () => {
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbanail: null,
    prompt: "",
  });

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-gray-100 text-2xl font-semibold">
          Upload Video
        </Text>

        <View className="mt-6">
          <FormField
            labelText="Video Title"
            placeholderText="Give your video a catch title..."
            handleTextChange={(text) => setForm({ ...form, title: text })}
          />
        </View>

        <View className="mt-6">
          <Text className="text-xl text-gray-100">Upload Video</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex items-center justify-center h-56 bg-[#18181B] w-full rounded-2xl mt-2 border border-dashed border-gray-500"
          >
            <View>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  useNativeControls
                  isLooping
                  resizeMode={ResizeMode.COVER}
                  style={{
                    width: "100%",
                    height: 224,
                    borderRadius: 40,
                  }}
                />
              ) : (
                <View className="flex items-center">
                  <Icon name="cloud-upload" size={40} color="white" />
                  <Text className="text-white text-center mt-2">
                    Upload Video
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <Text className="text-xl text-gray-100">Thumbnail Image</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex items-center justify-center h-14 bg-[#18181B] w-full rounded-2xl mt-2 border border-dashed border-gray-500"
          >
            <View>
              {form.thumbanail ? (
                <Image
                  source={{ uri: form.thumbanail.uri }}
                  style={{
                    width: "100%",
                    height: 224,
                    borderRadius: 40,
                    resizeMode: "cover",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : (
                <View className="flex flex-row items-center justify-center gap-2">
                  <Icon name="cloud-upload" size={18} color="white" />
                  <Text className="text-white text-center ">Choose a file</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <FormField
            labelText="AI Prompt"
            placeholderText="The prompt you used to create this video"
            handleTextChange={(text) => setForm({ ...form, promp: text })}
          />
        </View>

        <View className="mt-6">
          <CustomButton
            title="Upload Video"
            onPress={() => {}}
            textStyle={"text-neutral-800 font-semibold text-lg tracking-wider"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
