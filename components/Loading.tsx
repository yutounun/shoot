import { SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center items-center">
      <LottieView
        source={require("@/assets/json/loading.json")}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </SafeAreaView>
  );
};

export default Loading;
