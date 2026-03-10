import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { getWeatherByCity } from "../api/weatherApi";

const cities = ["Can Tho", "Hanoi", "Ho Chi Minh City"];

export default function Weather() {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const results = await Promise.all(
        cities.map((city) => getWeatherByCity(city)),
      );
      setWeatherList(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>Lỗi: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {weatherList.map((w, index) => {
        const icon = `https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`;

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.city}>{w.name}</Text>

            <Image source={{ uri: icon }} style={styles.icon} />

            <Text style={styles.temp}>{w.main.temp}°C</Text>

            <Text style={styles.desc}>{w.weather[0].description}</Text>

            <View style={styles.row}>
              <Text style={styles.info}>💧 {w.main.humidity}%</Text>
              <Text style={styles.info}>💨 {w.wind.speed} m/s</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#4facfe",
    minHeight: "100%",
  },

  card: {
    backgroundColor: "white",
    width: 280,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  city: {
    fontSize: 24,
    fontWeight: "bold",
  },

  icon: {
    width: 80,
    height: 80,
  },

  temp: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 5,
  },

  desc: {
    fontSize: 16,
    textTransform: "capitalize",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 15,
  },

  info: {
    fontSize: 14,
    color: "#555",
  },
});
