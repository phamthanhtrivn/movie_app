/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { getSavedMovies } from "@/services/appwrite";
import SavedMovieCard from "@/components/SavedMovieCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Saved = () => {
  const { data: savedMovies, loading, error, refetch: loadSavedMovies } = useFetch(getSavedMovies);

  useFocusEffect(
    useCallback(() => {
      loadSavedMovies(); // gọi lại khi màn hình được focus (tức là mount lần đầu hoặc quay lại từ màn khác)
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        <View className="mt-10">
          <Text className="mb-3 text-lg font-bold text-white">
            Saved Movies
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="self-center mt-10"
          />
        ) : error ? (
          <Text className="mt-5 mb-3 text-lg font-bold text-red-500">
            Error: {error?.message}
          </Text>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => <SavedMovieCard {...item} />}
            keyExtractor={(item) => item.movie_id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              paddingBottom: 10,
            }}
            className="pb-32 mt-2"
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
