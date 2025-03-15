import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-full pb-2"
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
      </ScrollView>
    </View>
  );
}
