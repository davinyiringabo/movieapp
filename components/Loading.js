import { View, Text, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View style={[tw`w-full h-full flex-row justify-center items-center`]}>
      <Progress.CircleSnail thickness={6} size={90} color={"#eab308"} />
    </View>
  );
}
