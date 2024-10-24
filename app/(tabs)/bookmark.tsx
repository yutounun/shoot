import { Text, FlatList, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";
import { bookmarkedPosts, searchBookmarkedPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loading from "@/components/Loading";

const bookmark = () => {
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => bookmarkedPosts(user?.$id));

  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <Text className="font-psemibold text-2xl text-white">
                Saved Videos
              </Text>
            </View>

            <SearchInput placeholder="Search saved videos" srcPage="bookmark" />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Bookmark videos you like"
            showButton={false}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default bookmark;
