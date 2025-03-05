import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AoraLogo from "../../assets/images/logo.png";
import FormField from "../../customcomponents/FormField";
import CustomButton from "@/customcomponents/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useGlobalContext();

  //function to signin the user
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Enter both email and password");
    }
    setIsSubmitting(true);
    try {
      const result = await signIn(formData.email, formData.password);

      //todo set the result from global state
      const res = await getCurrentUser();

      if (res) {
        setUser(res);
        setIsLoggedIn(true);
      }
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-[#161622]" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: "grow" }}
          className="bg-[#161622]"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col min-h-[85vh] m-6  justify-center">
            <Image
              source={AoraLogo}
              resizeMode="contain"
              className="w-44 h-16 shrink-0 "
            />
            <Text className="text-2xl font-bold text-gray-100 tracking-wider mt-10">
              Signin to Aora app
            </Text>

            <View className=" mt-6 ">
              <View>
                <FormField
                  labelText="Email"
                  placeholderText="enter your email"
                  handleTextChange={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  value={formData.email}
                />
              </View>
              <View className="mt-6">
                <FormField
                  labelText="Password"
                  placeholderText="enter your password"
                  handleTextChange={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  value={formData.password}
                />
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.7} className="mt-6">
              <CustomButton
                onPress={() => {
                  handleSubmit();
                }}
                buttonStyle="bg-[#FF8C00] py-3 px-4 rounded-md"
                textStyle="text-neutral-800 text-lg font-semibold text-center tracking-wider"
                title="Signin"
              />
            </TouchableOpacity>

            <View className="mt-6 flex items-center">
              <Text className="text-gray-100">
                Don't have an account?{" "}
                <Link href={"/signup"} className="text-[#FF8C00]">
                  Signup Now
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SignIn;
