import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function AllDetailsScreen() {
  const { params: title } = useRoute();
  console.log("title", title);
  return (
    <View>
      <Text>AllDetailsScreen</Text>
    </View>
  );
}
