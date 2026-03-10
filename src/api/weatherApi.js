const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
export const getWeatherByCity = async (city) => {
  const safeCity = encodeURIComponent(city.trim());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${safeCity}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.log("API ERROR:", errorData);
    throw new Error("Không lấy được dữ liệu thời tiết");
  }

  return await response.json();
};
