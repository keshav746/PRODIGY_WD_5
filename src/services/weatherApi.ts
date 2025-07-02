import { WeatherData, LocationCoords } from '../types/weather';

// Mock weather data - no real API needed
const mockWeatherData: WeatherData = {
  location: {
    name: "New York",
    region: "New York",
    country: "United States",
    lat: 40.71,
    lon: -74.01,
    tz_id: "America/New_York",
    localtime_epoch: Date.now() / 1000,
    localtime: new Date().toLocaleString()
  },
  current: {
    last_updated_epoch: Date.now() / 1000,
    last_updated: new Date().toLocaleString(),
    temp_c: 22,
    temp_f: 72,
    is_day: 1,
    condition: {
      text: "Partly cloudy",
      icon: "",
      code: 1003
    },
    wind_mph: 8.1,
    wind_kph: 13.0,
    wind_degree: 230,
    wind_dir: "SW",
    pressure_mb: 1013.0,
    pressure_in: 29.91,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 65,
    cloud: 25,
    feelslike_c: 24,
    feelslike_f: 75,
    vis_km: 16.0,
    vis_miles: 10.0,
    uv: 5.0,
    gust_mph: 12.5,
    gust_kph: 20.2
  }
};

export const weatherService = {
  async getCurrentWeather(location: string): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data with the searched location name
    return {
      ...mockWeatherData,
      location: {
        ...mockWeatherData.location,
        name: location
      }
    };
  },

  async getCurrentWeatherByCoords(coords: LocationCoords): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data for current location
    return {
      ...mockWeatherData,
      location: {
        ...mockWeatherData.location,
        name: "Your Location"
      }
    };
  }
};