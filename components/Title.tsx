import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  children: string;
};

const Title: React.FC<Props> = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,

    fontSize: 30,
    fontWeight: 700,
    color: "#000000",
  },
});
