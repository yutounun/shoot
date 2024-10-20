import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "@/constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}: {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`border-1 border-balck-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary justify-between flex-row items-center space-x-4`}
    >
      <TextInput
        className="text-white font-pregular text-base flex-1 mt-0.5"
        value={value}
        placeholder="Search for video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={!showPassword && title === "Password"}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
