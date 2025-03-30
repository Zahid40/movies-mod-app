import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerClassName="pb-24">
        <Image
          source={{
            uri: data?.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full aspect-[3/4]"
          resizeMode="stretch"
        />
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-2xl text-white font-bold">{data?.title}</Text>
          <View className="flex-row items-start justify-start gap-4 mt-2 ">
            <Text className="text-base text-light-300 ">
              {data?.release_date.split("-")[0]}
            </Text>
            <Text className="text-base text-light-300 ">
              {data?.runtime} min
            </Text>
          </View>
          <View className="bg-dark-100 flex-row items-center justify-center px-2 py-1 rounded-md gap-x-2 mt-2 ">
            <Image source={icons.star} resizeMode="cover" className="size-4" />
            <Text className="text-white font-semibold">
              {Math.round(data?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 ">
              ( {data?.vote_count} votes )
            </Text>
          </View>
          <View className="flex-col gap-4 py-4">
            {[
              {
                label: "Overview",
                value: data?.overview,
              },
              {
                label: "Genres",
                value: data?.genres.map((g) => g.name).join(" - ") || "N/A",
              },
              {
                label: "Budget",
                value: data?.budget
                  ? `$${data?.budget / 1000000} million`
                  : "N/A",
              },
              {
                label: "Revenue",
                value: data?.revenue
                  ? `$${Math.round(data?.revenue / 1000000)} million`
                  : "N/A",
              },
              {
                label: "Production Companies",
                value:
                  data?.production_companies.map((c) => c.name).join(" - ") ||
                  "N/A",
              },
            ].map((e, i) => (
              <View key={i} className="gap-3 my-2">
                <Text className="text-light-200  ">{e.label}</Text>
                <Text className="text-light-100 font-semibold">{e.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-accent absolute bottom-8  left-0 right-0  mx-5  rounded-lg py-3.5 flex flex-row justify-center items-center z-50 "
        onPress={router.back}
      >
        <Image source={icons.arrow} className="rotate-180 size-5 mr-5 mt-0.5" tintColor={"#fff"} />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
