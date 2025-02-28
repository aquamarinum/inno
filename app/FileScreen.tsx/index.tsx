import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "@/components/MyButton";
import Title from "@/components/Title";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";

type Props = {};

const FileScreen = () => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled && result.assets.length > 0) {
        setPdfUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Ошибка выбора PDF:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>FileScreen</Title>

      {!pdfUri ? (
        <MyButton onPress={pickPdf}>Open (pdf)</MyButton>
      ) : (
        <WebView source={{ uri: pdfUri }} style={styles.webview} />
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
    width: "100%",
  },
});
