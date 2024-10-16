import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";

function Profile() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">Profile</Text>
      <StatusBar />
      <Link style={{ color: "blue" }} href="/">
        Go to Home
      </Link>
    </View>
  );
}

export default Profile;
