import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import CustomButton from "@/components/customButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const create = () => {
  const [uploading, setUploading] = useState(false);

  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Permission to access media library is required!"
      );
      return;
    }

    // Open the media library to select an image or video
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true, // Allow user to edit/crop the image/video
      quality: 1, // Set quality (1 means best quality)
    });

    // Check if user canceled the picker
    if (result.cancelled) return;

    // Use the selected media file's URI to update the form
    if (selectType === "image") {
      setForm({ ...form, thumbnail: result.assets[0] });
    } else {
      setForm({ ...form, video: result.assets[0] });
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Video uploaded successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="mx-4 my-6">
        <Text className="text-2xl font-psemibold text-white">Upload video</Text>

        <FormField
          title="Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e) => {
            setForm({ ...form, title: e });
          }}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                shouldPlay
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="justify-center items-center w-full h-40 px-4 bg-black-100 rounded-2xl">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>

          <View className="space-y-2 mt-7">
            <Text className="text-gray-100 text-base font-pmedium">
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="flex-row space-x-2 justify-center items-center w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                  <Text className="text-gray-100 font-pmedium text-sm">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The prompt you used to create this video"
            handleChangeText={(e) => {
              setForm({ ...form, prompt: e });
            }}
            otherStyles="mt-7"
          />
        </View>

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
