import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";
import { searchBookmarkedPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import HomeImage from "@/components/HomeImage";

const search = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const { data: savedPosts, refetch } = useAppwrite(() =>
    searchBookmarkedPosts(user.$id, query)
  );

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Result
                </Text>

                <Text className="font-psemibold text-2xl text-white">
                  {query}
                </Text>
              </View>

              <View className="mt-1.5">
                <HomeImage />
              </View>
            </View>
            <View className="mb-8">
              <SearchInput srcPage="bookmark" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No video found for this query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default search;
