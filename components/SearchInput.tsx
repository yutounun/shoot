import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  initialQuery,
  value,
  placeholder = "Search for video topic",
  srcPage,
}: {
  initialQuery?: string;
  value: string;
  placeholder?: string;
  srcPage: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  function onClickSearch() {
    if (!query) {
      Alert.alert(
        "Missing Query",
        "Please input something to search results across database"
      );
    }
    if (pathname.startsWith("/search")) {
      // if you're in search page, update query
      router.setParams({ query });
    } else {
      // if you're not in serch page, go to search page with query
      srcPage === "bookmark"
        ? router.push(`/search/saved/${query}`)
        : router.push(`/search/${query}`);
    }
  }

  return (
    <View
      className={`border-1 border-balck-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary justify-between flex-row items-center space-x-4`}
    >
      <TextInput
        className="text-white font-pregular text-base flex-1 mt-0.5"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={onClickSearch}>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
