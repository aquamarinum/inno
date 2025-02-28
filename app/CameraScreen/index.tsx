import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/Title";
import MyButton from "@/components/MyButton";

type Props = {};

const CameraScreen = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async (): Promise<void> => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>CameraScreen</Title>
      <MyButton onPress={takePhoto}>Сделать фото</MyButton>
      <MyButton onPress={pickImage}>Выбрать из галереи</MyButton>

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
