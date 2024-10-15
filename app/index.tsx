import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-red-400">
      <Text className="text-xl">
        Open up App.js to start working2 on your app!
      </Text>
      <StatusBar style="auto" />
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}
