import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  apiCall,
  fallbackPersonImage,
  image342,
  personDetailsEndpoint,
  personMoviesEndpoint,
} from "../api/movieDb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS;

export default function PersonScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});
  const verticalMargin = ios ? "" : "my-3";

  useEffect(() => {
    setLoading(true);
    console.log("Person: ", item.id);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await apiCall(personDetailsEndpoint(id));
    console.log("Got Person Details: ", data);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await apiCall(personMoviesEndpoint(id));
    console.log("Got Person Movies: ", data);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };
  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900`}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        style={tw`w-full flex-row justify-between items-center mt-3 px-4 ${verticalMargin}`}
      >
        <TouchableOpacity
          style={tw`rounded-xl p-1 bg-[#eab308]`}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <>
          <View
            style={[
              {
                shadowColor: "#000", // Corrected shadow color
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              },
              tw`flex-row justify-center`,
            ]}
          >
            <View
              style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}
            >
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                resizeMethod="contain"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              {person?.name}
            </Text>
            <Text style={tw`text-base text-neutral-500 font-bold text-center`}>
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}
          >
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Gender</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Known for</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={tw`px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Popularity</Text>
              <Text style={tw`text-neutral-300 text-sm`}>
                {person?.popularity?.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={tw`my-6 mx-4 gap-y-2`}>
            <Text style={tw`text-white`}>Biography</Text>
            <Text style={tw`text-neutral-400`}>
              {person?.biography || "N/A"}
            </Text>
          </View>
          <MovieList data={personMovies} hideSeeAll={true} title={"Movies"} />
        </>
      )}
    </ScrollView>
  );
}
