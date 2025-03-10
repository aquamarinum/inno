import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "@/components/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "..";
import Title from "@/components/Title";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>HomeScreen</Title>
      <MyButton onPress={() => navigation.navigate("Camera")}>
        Go Camera
      </MyButton>
      <MyButton onPress={() => navigation.navigate("Audio")}>Go Audio</MyButton>
      <MyButton onPress={() => navigation.navigate("Files")}>Go Files</MyButton>
      <MyButton onPress={() => navigation.navigate("Notification")}>
        Go Notification
      </MyButton>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
