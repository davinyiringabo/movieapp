import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ViewBase,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import debounce from "lodash";
import {
  apiCall,
  fallbackMoviePoster,
  image342,
  searchMoviesEndpoint,
} from "../api/movieDb";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (value) => {
    setLoading(true);
    const data = await apiCall(searchMoviesEndpoint(), { query: value });
    if (data && data.results) setResults(data.results);
    setLoading(false);
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1 py-3`}>
      <View
        style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          onChangeText={handleSearch}
          style={[
            tw`pb-1 pl-6 flex-1 text-base font-semibold text-white`,
            { fontFamily: "Montserrat-SemiBold" },
          ]}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`rounded-full p-3 m-1 bg-neutral-300`}
        >
          <XMarkIcon size={22} color={"white"} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={[tw`w-full`, { height: height * 0.3 }]}>
          <Loading />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={tw`gap-y-3`}
        >
          <Text
            style={[
              tw`text-white font-semibold ml-1 mb-3`,
              { fontFamily: "Montserrat-SemiBold" },
            ]}
          >
            Results ({results.length})
          </Text>
          {results.length > 0 ? (
            <View style={tw`flex-row justify-between flex-wrap`}>
              {results.map((item, index) => {
                console.log("Returned Item: --> ", item);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.push("Movie", item)}
                  >
                    <View style={tw`gap-y-2 mb-4`}>
                      <Image
                        source={{
                          uri:
                            image342(item.backdrop_path) || fallbackMoviePoster,
                        }}
                        style={[
                          { width: width * 0.44, height: height * 0.3 },
                          tw`rounded-3xl`,
                        ]}
                      />
                      <Text
                        style={[
                          tw`text-neutral-400 ml-1`,
                          { fontFamily: "Montserrat-SemiBold" },
                        ]}
                      >
                        {item.original_title.length > 19
                          ? item.original_title.slice(0, 19) + "..."
                          : item.original_title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View style={tw`flex-row justify-center mt-8`}>
              <Text
                style={[
                  tw`text-[1rem] text-neutral-500`,
                  { fontFamily: "Montserrat-SemiBold" },
                ]}
              >
                No Movies Found!
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
