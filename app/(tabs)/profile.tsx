import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const Profile = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        {/* Logo */}
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {/* User Info Section */}
        <View className="flex items-center mt-10">
          <View className="p-4 bg-gray-700 rounded-full">
            <Image
              source={icons.person}
              className="size-16"
              tintColor="#fff"
            />
          </View>
          <Text className="mt-4 text-2xl font-bold text-white">John Doe</Text>
          <Text className="mt-1 text-base text-gray-400">john.doe@example.com</Text>
        </View>
        
        {/* Settings or Logout Button */}
        <TouchableOpacity className="px-5 py-3 mt-10 rounded-lg bg-accent">
          <Text className="font-semibold text-center text-white">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 mt-3 bg-gray-700 rounded-lg">
          <Text className="font-semibold text-center text-white">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;