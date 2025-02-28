import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  children: string;
  onPress?: () => void;
};

const MyButton: React.FC<Props> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{children}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,

    backgroundColor: "#5f5f5f",

    fontSize: 20,
    color: "#ffffff",
  },
});
