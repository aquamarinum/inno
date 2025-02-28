import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "@/components/MyButton";
import Title from "@/components/Title";
import { Audio } from "expo-av";

type Props = {};

const AudioScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Разрешение на использование микрофона отклонено!");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();

      setRecording(newRecording);
    } catch (error) {
      console.error("Ошибка записи", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri);
    setRecording(null);
  };

  const playRecording = async () => {
    if (!audioUri) return;

    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>AudioScreen</Title>
      <MyButton onPress={recording ? stopRecording : startRecording}>
        {recording ? "Остановить запись" : "Начать запись"}
      </MyButton>
      {audioUri && (
        <MyButton onPress={playRecording}>Прослушать запись</MyButton>
      )}
      {audioUri && <Text>Файл сохранён: {audioUri}</Text>}
    </SafeAreaView>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
