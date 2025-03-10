import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/Title";
import MyButton from "@/components/MyButton";
import * as DocumentPicker from "expo-document-picker";

type Props = {};

const CameraScreen = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось открыть img файл.");
      console.error("Ошибка открытия PDF:", error);
    }
  };

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Нужно разрешение на доступ к галерее!");
        return false;
      }
      return true;
    }
    return false;
  };

  const pickImage = async (): Promise<void> => {
    const hasPermission = await requestPermission();

    if (!hasPermission) {
      Alert.alert("Huy bez razresheniya");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("Huy");
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
      <MyButton onPress={pickDocument}>Выбрать из галереи</MyButton>

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
