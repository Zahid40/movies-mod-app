import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { FlashList } from "@shopify/flash-list";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
  const [searchQuery, setSetSearchQuery] = useState("");

  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch: loadMovies,
  } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => fetchMovies({ query: searchQuery }),
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(()=>{
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  },[movies])

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlashList
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={3}
        className="pl-2 pr-6"
        renderItem={({ item }: any) => <MovieCard {...item} />}
        estimatedItemSize={200}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-center items-center mt-20 mb-10 w-full">
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>
            <View className="mb-3">
              <SearchBar
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeValue={(value: string) => setSetSearchQuery(value)}
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3 self-center"
              />
            )}
            {isError && (
              <Text className="text-red-500 px-5 my-3">
                Error : {error?.message}
              </Text>
            )}
            {!isLoading &&
              !isError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-semibold">
                  Search Results for{" "}
                  <Text className="text-xl text-accent font-semibold">
                    {searchQuery}
                  </Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !isError ? (
            <View>
              <Text>
                {searchQuery.trim()
                  ? `No movies found with name ${searchQuery.trim()} , ${error}`
                  : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
