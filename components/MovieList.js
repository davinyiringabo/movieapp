import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/movieDb";

const { width, height } = Dimensions.get("window");
export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = "Anti-Man and the wasp: Quantumonia";
  const navigation = useNavigation();
  return (
    <View style={tw`mb-8 gap-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={[tw`text-white text-xl`, {fontFamily: "Montserrat-Medium"}]}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[tw`text-[#eab308] text-lg`, {fontFamily: "Montserrat-Medium"}]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View style={tw`my-2 mr-4 mx-2`}>
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={[
                    { width: width * 0.33, height: height * 0.22 },
                    tw`rounded-3xl`,
                  ]}
                />
                <Text style={[tw`text-neutral-300 ml-1 mt-1`, {fontFamily: "Montserrat-Medium"}]}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
