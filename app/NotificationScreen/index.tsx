import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/Title";
import MyButton from "@/components/MyButton";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "axios";

type Props = {};

const NotificationScreen = (props: Props) => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      let token: string | undefined;

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Не удалось получить разрешение на отправку уведомлений!"
          );
          return;
        }

        const pushToken = await Notifications.getExpoPushTokenAsync();
        token = pushToken.data;
        setExpoPushToken(token);
        console.log("Expo Push Token:", token);
      } else {
        alert("Уведомления работают только на реальном устройстве");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    }

    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification: Notifications.Notification) => {
          console.log("Получено уведомление:", notification);
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response: Notifications.NotificationResponse) => {
          console.log("Пользователь открыл уведомление:", response);
        }
      );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  async function sendNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Привет! 📬",
        body: "Это тестовое уведомление",
        data: { someData: "Тестовые данные" },
      },
      trigger: null,
    });
  }

  const sendFromServ = async () => {
    axios.post("https://exp.host/--/api/v2/push/send"), {};
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>NotificatScreen</Title>
      <Text>Push token {expoPushToken}</Text>
      <MyButton onPress={sendNotification}>Send Notif</MyButton>
      <MyButton>Test serv</MyButton>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
