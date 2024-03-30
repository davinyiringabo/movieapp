import { View, Text, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View style={[{ height, width }, tw`flex-row justify-center items-center`]}>
      <Progress.CircleSnail thickness={6} size={90} color={"#eab308"} />
    </View>
  );
}
