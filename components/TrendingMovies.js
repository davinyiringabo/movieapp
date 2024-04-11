import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDb";
const { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    console.log("clicked", item.id);
    navigation.navigate("Movie", item);
  };
  return (
    <View style={tw`mb-8`}>
      <Text style={[tw`text-white text-xl mx-4 mb-2`, {fontFamily: "Montserrat-Medium"}]}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={[
          {
            width: width * 0.6,
            height: height * 0.4,
          },
          tw`rounded-3xl`,
        ]}
      />
    </TouchableWithoutFeedback>
  );
};
