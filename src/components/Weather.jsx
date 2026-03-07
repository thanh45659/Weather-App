import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getWeatherByCity } from "../api/weatherApi";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeather();
  }, []);

  const cities = ["Can Tho", "Ha Noi", "Ho Chi Minh"];

  const [weatherList, setWeatherList] = useState([]);

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
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Lỗi: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {weatherList.map((w, index) => (
        <View key={index} style={{ marginBottom: 15 }}>
          <Text style={styles.city}>{w.name}</Text>
          <Text>Nhiệt độ: {w.main.temp}°C</Text>
          <Text>Thời tiết: {w.weather[0].description}</Text>
          <Text>Độ ẩm: {w.main.humidity}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  city: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
