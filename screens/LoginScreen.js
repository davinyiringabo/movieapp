import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { StatusBar } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import {useFonts} from "expo-font";
const {width, height} = Dimensions.get("window");
import {useNavigation} from "@react-navigation/native"
export default function LoginScreen() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('../assets/fonts/montserrat/Montserrat-Black.ttf'),
  });
  if (!fontsLoaded && !fontError) {
    console.log("fonts not loaded");
    return null;
  }
  return (
    <View style={tw`bg-neutral-800 h-full w-full flex flex-col items-center justify-center px-3`}>
      <View style={[{marginBottom: height * 0.1}, tw`flex flex-col items-center gap-3`]}>
        <Text style={[{fontFamily:"Montserrat-SemiBold"}, tw`text-3xl text-white`]}>Sign In</Text>
        <Text  style={[{fontFamily:"Montserrat-Medium"}, tw`text-sm text-white`]}>Hi! Welcome back, you've been raised </Text>
      </View>
      <View style={tw`w-full mb-3`}>
        <Text style={[{fontFamily:"Montserrat-Medium"},tw`mb-1 text-white`]}>Email</Text>
        <TextInput style={[{fontFamily:"Montserrat-Medium"},tw`border border-neutral-200 w-full py-2 px-3 rounded-xl text-white`]} placeholderTextColor={"#FFF"} placeholder='Enter Your Email'/>
      </View>
      <View style={tw`w-full mb-3`}>
        <Text style={[{fontFamily:"Montserrat-Medium"},tw`mb-1 text-white`]}>Password</Text>
        <TextInput style={[{fontFamily:"Montserrat-Medium"},tw`border border-neutral-200 w-full py-2 px-3 rounded-xl text-white`]} placeholderTextColor={"#FFF"} secureTextEntry placeholder='Enter Your Password'/>
      </View>
      <TouchableOpacity style={tw`w-full rounded-full py-4 bg-[#0165FC] mt-4`} onPress={()=> navigation.navigate("Home")}>
        <Text style={[{fontFamily:"Montserrat-SemiBold"},tw`w-full text-center text-white`]}>Sign In</Text>
      </TouchableOpacity>

      <View style={tw`w-full flex flex-row justify-center items-center gap-1 mt-4`}>
        <Text style={[{fontFamily:"Montserrat-Medium"}, tw`text-sm text-white`]}>Don't have an account? </Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
          <Text style={[{fontFamily:"Montserrat-Medium"}, tw`text-sm text-[#0165FC]`]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}