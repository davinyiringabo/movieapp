import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import tw from "twrnc";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  apiCall,
  fetchTrendingMovies,
  topRatedMoviesEndpoint,
  trendingMoviesEndpoint,
  upcomingMoviesEndpoint,
} from "../api/movieDb";
const ios = Platform.OS;
const Drawer = createDrawerNavigator();
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("testinggg ...");
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const data = await apiCall(trendingMoviesEndpoint);
      // console.log("got trending  movies: ", data);
      if (data && data.results) setTrending(data.results);
      setLoading(false);
    } catch (error) {
      console.log("error while fethcing: ", error);
    }
  };
  const getUpcomingMovies = async () => {
    try {
      const data = await apiCall(upcomingMoviesEndpoint);
      // console.log("got Up Coming movies: ", data);
      if (data && data.results) setUpcoming(data.results);
    } catch (error) {
      console.log("error while fethcing: ", error);
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const data = await apiCall(topRatedMoviesEndpoint);
      // console.log("got Top Rated  movies: ", data);
      if (data && data.results) setTopRated(data.results);
    } catch (error) {
      console.log("error while fethcing: ", error);
    }
  };
  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      <SafeAreaView style={ios ? tw`mb-2` : tw`mb-3`}>
        <StatusBar barStyle={"light-content"} />
        <View style={tw`flex-row justify-between mx-4 mt-3`}>
          <Text
            style={[
              tw`text-white text-3xl`,
              { fontFamily: "Montserrat-SemiBold" },
            ]}
          >
            <Text
              style={[
                tw`text-[#eab308]`,
                { fontFamily: "Montserrat-SemiBold" },
              ]}
            >
              M
            </Text>
            ovio
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          <TrendingMovies data={trending} />
          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Top rated movies row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
