import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
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
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
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
          ) : moviesError ? (
            <Text>Error : {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                placeholder="Search for a movie"
                onPress={() => router.push("/search")}
              />

              <>
                <Text className="text-white font-bold text-lg mt-3 mb-5">
                  Latest Movies
                </Text>
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  className="mt-2 pb-32"
                  contentContainerClassName=""
                  columnWrapperClassName="justify-start gap-6 pr-4 mt-4"
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <MovieCard {...item} />
                  )}
                />
              </>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
