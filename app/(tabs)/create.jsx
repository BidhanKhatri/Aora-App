import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/customcomponents/FormField";
import Icon from "react-native-vector-icons/FontAwesome";
import { ResizeMode, Video } from "expo-av";
import CustomButton from "@/customcomponents/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const { user } = useGlobalContext();

  // Function to get files (video/image) using Expo Document Picker
  const pickDocument = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["video/*"],
    });

    if (!result.canceled) {
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      } else if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };

  // Function to handle upload
  const handleUpload = async () => {
    if (!form.thumbnail || !form.video || !form.title || !form.prompt) {
      Alert.alert("Fields are required", "Please fill all the fields");
      return;
    }

    setUploading(true);

    try {
      // Add upload logic here
      await createVideo({
        ...form,
        userId: user.$id,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setUploading(false);
      setForm({ title: "", prompt: "", video: null, thumbnail: null });
    }
  };

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-gray-100 text-2xl font-semibold">
          Upload Video
        </Text>

        <View className="mt-6">
          <FormField
            labelText="Video Title"
            placeholderText="Give your video a catchy title..."
            handleTextChange={(text) => setForm({ ...form, title: text })}
          />
        </View>

        <View className="mt-6">
          <Text className="text-xl text-gray-100">Upload Video</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex items-center justify-center h-56 bg-[#18181B] w-full rounded-2xl mt-2 border border-dashed border-gray-500"
            onPress={() => pickDocument("video")}
          >
            <View>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
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
            onPress={() => pickDocument("image")}
          >
            <View>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  style={{
                    width: "100%",
                    height: 224,
                    borderRadius: 40,
                    resizeMode: "cover",
                  }}
                />
              ) : (
                <View className="flex flex-row items-center justify-center gap-2">
                  <Icon name="cloud-upload" size={18} color="white" />
                  <Text className="text-white text-center">Choose a file</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <FormField
            labelText="AI Prompt"
            placeholderText="The prompt you used to create this video"
            handleTextChange={(text) => setForm({ ...form, prompt: text })}
          />
        </View>

        <View className="mt-6">
          <CustomButton
            title="Upload Video"
            onPress={handleUpload}
            textStyle="text-neutral-800 font-semibold text-lg tracking-wider"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
