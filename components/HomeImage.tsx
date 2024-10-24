import { TouchableOpacity, Image } from "react-native";
import { images } from "@/constants";
import { router } from "expo-router";

const HomeImage = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/")} className="mt-1.5">
      <Image
        source={images.logoSmall}
        className="w-9 h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default HomeImage;
