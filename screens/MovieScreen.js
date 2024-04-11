import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  apiCall,
  fallbackMoviePoster,
  fetchMovieDetails,
  image500,
  movieCreditsEndpoint,
  movieDetailsEndpoint,
  similarMoviesEndpoint,
} from "../api/movieDb";

const { width, height } = Dimensions.get("window");
export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  let movieName = "Anti-Man and the wasp: Quantumonia";

  useEffect(() => {
    console.log("ItemID: ", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    try {
      const data = await apiCall(movieDetailsEndpoint(id));
      console.log("get Movie Details: ", data);
      if (data) setMovie(data);
      setLoading(false);
    } catch (error) {
      console.log("Error occured fetching details: ", error);
    }
  };
  const getMovieCredits = async (id) => {
    try {
      const data = await apiCall(movieCreditsEndpoint(id));
      console.log("get Movie Credits: ", data);
      if (data && data.cast) setCast(data.cast);
      setLoading(false);
    } catch (error) {
      console.log("Error occured fetching details: ", error);
    }
  };
  const getSimilarMovies = async (id) => {
    try {
      const data = await apiCall(similarMoviesEndpoint(id));
      console.log("get Similar Movies: ", data);
      if (data && data.results) setSimilarMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error occured fetching details: ", error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}
    >
      {loading ? (
        <View style={tw`w-full bg-transparent`}>
          <Loading />
        </View>
      ) : (
        <View style={tw`w-full`}>
          <SafeAreaView
            style={tw`absolute z-20 w-full flex-row justify-between items-center mt-3 px-4`}
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
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              //   source={require("../assets/movie1.jpg")}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.0)", "rgba(23,23,23,1)"]}
              style={[{ width, height: height * 0.4 }, tw`absolute bottom-0`]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        </View>
      )}
      <View style={[{ marginTop: -(height * 0.09) }, tw`gap-y-3`]}>
        <Text style={[tw`text-white text-center text-3xl`,{fontFamily:"Montserrat-SemiBold"}]}>
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text
            style={[tw`text-neutral-400 font-semibold text-base text-center`,{fontFamily: "Montserrat-SemiBold"}]}
          >
            {" "}
            {movie?.status} * {movie?.release_date.split("-")[0]} *{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          horizontal
          style={tw`flex-row mx-4 gap-x-2`}
        >
          {movie?.genres?.map((genre, index) => {
            const showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                style={[tw`text-neutral-400 font-semibold text-base text-center`, {fontFamily:"Montserrat-SemiBold"}]}
              >
                {" "}
                {genre?.name} {showDot ? " * " : null}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={[tw`text-neutral-400 mx-4`, {fontFamily: "Montserrat-Medium"}]}>{movie?.overview}</Text>
      </View>
      <Cast navigation={navigation} cast={cast} />
      {/* Similar Movies */}
      <MovieList
        hideSeeAll={true}
        title={"Similar Movies"}
        data={similarMovies}
      />
    </ScrollView>
  );
}
