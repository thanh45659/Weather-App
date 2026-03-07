import { View, StyleSheet } from "react-native";
import Weather from "../components/Weather";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
