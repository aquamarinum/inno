import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import CameraScreen from "./CameraScreen";
import HomeScreen from "./HomeScreen";
import AudioScreen from "./AudioScreen";
import FileScreen from "./FileScreen.tsx";
import NotificationScreen from "./NotificationScreen";

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Audio: undefined;
  Files: undefined;
  Notification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />
      <Stack.Screen name="Files" component={FileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
