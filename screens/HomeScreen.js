import { View, Text, SafeAreaView, StatusBar, Platform } from "react-native";
import React from "react";

const ios = Platform.OS;
export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-800">
      <SafeAreaView
        className={
          ios
            ? "mb-2 flex-1 justify-center items-center"
            : "mb-3 flex-1 justify-center items-center"
        }
      >
        <Text className="font-bold text-red-900">Home Screen</Text>
      </SafeAreaView>
    </View>
  );
}
