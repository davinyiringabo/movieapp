import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { fallbackPersonImage, image185 } from "../api/movieDb";

export default function Cast({ cast, navigation }) {
  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={tw``}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Person", person)}
                key={index}
                style={tw`mr-4 items-center`}
              >
                <View
                  style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}
                >
                  <Image
                    // source={require("../assets/celeb.jpg")}
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                    resizeMode="contain"
                    style={{ width: "90%", flex: 1 }}
                  />
                </View>
                <Text style={tw`text-white text-xs mt-1`}>
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text style={tw`text-neutral-400 text-xs mt-1`}>
                  {person.original_name.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
