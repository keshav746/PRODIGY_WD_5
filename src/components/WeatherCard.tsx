import React from 'react';
import { WeatherData } from '../types/weather';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap
} from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

const getWeatherIcon = (condition: string, isDay: boolean) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return isDay ? <Sun size={64} className="weather-icon-svg" style={{ color: '#f59e0b' }} /> : 
                   <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#d1d5db' }} />;
  }
  if (conditionLower.includes('cloud')) {
    return <Cloud size={64} style={{ color: '#6b7280' }} />;
  }
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain size={64} style={{ color: '#3b82f6' }} />;
  }
  if (conditionLower.includes('snow')) {
    return <CloudSnow size={64} style={{ color: '#93c5fd' }} />;
  }
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <Zap size={64} style={{ color: '#d97706' }} />;
  }
  
  return <Cloud size={64} style={{ color: '#6b7280' }} />;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const temperature = unit === 'celsius' ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = unit === 'celsius' ? weather.current.feelslike_c : weather.current.feelslike_f;
  const tempUnit = unit === 'celsius' ? '°C' : '°F';

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="weather-card">
      {/* Location Header */}
      <div className="weather-header">
        <h2 className="weather-location">
          {weather.location.name}
        </h2>
        <p className="weather-region">
          {weather.location.region}, {weather.location.country}
        </p>
        <p className="weather-time">
          {new Date(weather.location.localtime).toLocaleString()}
        </p>
      </div>

      {/* Main Weather Display */}
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather.current.condition.text, weather.current.is_day === 1)}
        </div>
        <div className="weather-temp">
          {Math.round(temperature)}{tempUnit}
        </div>
        <p className="weather-condition">
          {weather.current.condition.text}
        </p>
        <p className="weather-feels-like">
          Feels like {Math.round(feelsLike)}{tempUnit}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="weather-details">
        <div className="weather-detail humidity">
          <Droplets size={24} className="detail-icon humidity" />
          <div className="detail-info">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.current.humidity}%</p>
          </div>
        </div>

        <div className="weather-detail wind">
          <Wind size={24} className="detail-icon wind" />
          <div className="detail-info">
            <p className="detail-label">Wind</p>
            <p className="detail-value">
              {Math.round(weather.current.wind_kph)} km/h
            </p>
          </div>
        </div>

        <div className="weather-detail visibility">
          <Eye size={24} className="detail-icon visibility" />
          <div className="detail-info">
            <p className="detail-label">Visibility</p>
            <p className="detail-value">
              {weather.current.vis_km} km
            </p>
          </div>
        </div>

        <div className="weather-detail pressure">
          <Gauge size={24} className="detail-icon pressure" />
          <div className="detail-info">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">
              {weather.current.pressure_mb} mb
            </p>
          </div>
        </div>
      </div>

      {/* UV Index */}
      <div className="uv-index">
        <div className="uv-content">
          <Sun size={24} className="uv-icon" />
          <div className="uv-info">
            <p className="uv-label">UV Index</p>
            <p className="uv-value">{weather.current.uv}</p>
          </div>
        </div>
        <div className="uv-level">
          <p className="uv-level-text">
            {getUVLevel(weather.current.uv)}
          </p>
        </div>
      </div>
    </div>
  );
};