import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "@/components/MyButton";
import Title from "@/components/Title";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";

type Props = {};

const FileScreen = () => {
  const [fileUri, setFileUri] = useState<string | undefined>(undefined);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result.canceled || !result.assets) return;

      const uri = result.assets[0].uri;
      console.log("Выбранный файл:", uri);

      const content = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      setFileContent(content);

      if (!result.canceled && result.assets.length > 0) {
        setFileUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось открыть файл.");
      console.error("Ошибка открытия PDF:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>FileScreen</Title>

      <MyButton onPress={pickDocument}>Open file</MyButton>
      {/* {fileUri && <Pdf source={{ uri: fileUri }} style={styles.webview} />} */}
      {fileContent && (
        <WebView
          originWhitelist={["*"]}
          source={{ html: `<pre>${fileContent}</pre>` }}
          style={styles.webview}
        />
      )}
    </SafeAreaView>
  );
};

export default FileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
});
