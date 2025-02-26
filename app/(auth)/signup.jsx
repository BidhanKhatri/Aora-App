import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/customcomponents/FormField";
import CustomButton from "@/customcomponents/CustomButton";
import { StatusBar } from "expo-status-bar";
import AoraLogo from "../../assets/images/logo.png";
import { Link } from "expo-router";
import { createUser } from "../../lib/appwrite.js";
import { useRouter } from "expo-router";

const Singup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  //function to signup the user
  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(
        formData.email,
        formData.password,
        formData.username
      );

      //todo set the result from global state
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="bg-[#161622]"
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex flex-col min-h-[85vh] m-6  justify-center">
              <Image
                source={AoraLogo}
                resizeMode="contain"
                className="w-44 h-16 shrink-0 "
              />
              <Text className="text-2xl font-bold text-gray-100 tracking-wider mt-10">
                Signup to Aora app
              </Text>

              <View className=" mt-6">
                <FormField
                  labelText="Username"
                  placeholderText="enter your username"
                  handleTextChange={(text) =>
                    setFormData({ ...formData, username: text })
                  }
                  value={formData.username}
                />
                <FormField
                  labelText="Email"
                  placeholderText="enter your email"
                  handleTextChange={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  value={formData.email}
                />
                <FormField
                  labelText="Password"
                  placeholderText="enter your password"
                  handleTextChange={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  value={formData.password}
                />
              </View>

              <View className="mt-6">
                <CustomButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  buttonStyle="bg-[#FF8C00] py-3 px-4 rounded-md"
                  textStyle="text-neutral-800 text-lg font-semibold text-center tracking-wider"
                  title="Signup"
                />
              </View>

              <View className="mt-6 flex items-center">
                <Text className="text-gray-100">
                  Already have an account?{" "}
                  <Link href={"/signin"} className="text-[#FF8C00]">
                    Sigin
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Singup;
