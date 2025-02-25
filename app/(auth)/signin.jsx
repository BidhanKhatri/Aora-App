import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AoraLogo from "../../assets/images/logo.png";
import FormField from "../../customcomponents/FormField";
import CustomButton from "@/customcomponents/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //function to handle form submission
  const handleSubmit = () => {};
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        className="bg-[#161622]"
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

          <View className=" mt-6">
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
                handleSubmit;
              }}
              buttonStyle="bg-[#FF8C00] py-3 px-4 rounded-md"
              textStyle="text-neutral-800 text-lg font-semibold text-center tracking-wider"
              title="Signin"
            />
          </View>

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
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SignIn;
