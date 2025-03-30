import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import TrendingCard from "@/components/trending-card";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    isLoading: moviesLoading,
    isError,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies({ query: "" }),
  });

  const trendingMovies = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrendingMovies(),
  });

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-[100%] "
      >
        <View className="flex-1 mt-5 ">
          <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
          {moviesLoading ? (
            <ActivityIndicator
              size={"large"}
              color={"#0000ff"}
              className="mt-10 self-center"
            />
          ) : isError ? (
            <Text>Error : {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                placeholder="Search for a movie"
                onPress={() => router.push("/search")}
              />

              <>
                <View >
                  <Text className="text-white font-bold text-lg mt-3 mb-2">
                    Trending Movies
                  </Text>
                  <FlashList
                    data={trendingMovies.data}
                    keyExtractor={(item: any) => item.movie_id.toString()}
                    className="mt-3 mb-4  pr-12 h-64"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-6" />}
                    renderItem={({ item, index }: any) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    estimatedItemSize={6}
                  />
                </View>
                <Text className="text-white font-bold text-lg mt-3 mb-2">
                  Latest Movies
                </Text>
                <FlashList
                  data={movies}
                  keyExtractor={(item: any) => item.id.toString()}
                  numColumns={3}
                  className="mt-1 pb-32"
                  // contentContainerClassName="flex-col justify-center items-center"
                  // columnWrapperClassName="justify-start gap-6 pr-4 mt-4"

                  scrollEnabled={false}
                  renderItem={({ item }: any) => <MovieCard {...item} />}
                  estimatedItemSize={200}
                />
              </>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
