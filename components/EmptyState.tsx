import { View, Text, Image } from "react-native";
import { images } from "@/constants";
import CustomButton from "./customButton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="font-psemibold text-xl text-white mt-2">{title}</Text>
      <CustomButton
        title="Create video now"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyles="my-5 w-full"
      ></CustomButton>
    </View>
  );
};

export default EmptyState;
