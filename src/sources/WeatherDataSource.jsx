import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 34.4133,
  longitude: -119.861,
  daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_probability_max", "wind_speed_10m_max", "uv_index_max", "sunset"],
  timezone: "auto",
  forecast_days: 1,
  wind_speed_unit: "mph",
  temperature_unit: "fahrenheit",
  precipitation_unit: "inch",
};

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

const response = responses[0];
const utcOffsetSeconds = response.utcOffsetSeconds(); // Get the correct time offset
const daily = response.daily();

// Extract the sunset variable block specifically
const sunsetVariable = daily.variables(5);

export const WeatherData = {
  // Take index 0 since forecast_days is 1
  temperature_max: daily.variables(0).valuesArray()[0],
  temperature_min: daily.variables(1).valuesArray()[0],
  max_chance_rain: daily.variables(2).valuesArray()[0],
  wind_speed_max:  daily.variables(3).valuesArray()[0],
  uv_index_max:    daily.variables(4).valuesArray()[0],
  
  // Use the correctly defined sunsetVariable and pull the first date out
  sunset: Array.from({ length: sunsetVariable.valuesInt64Length() }, (_, i) => 
    new Date(Number(sunsetVariable.valuesInt64(i)) * 1000)
  )
};