import React, { useState, useEffect } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { weatherService } from './services/weatherApi';
import { useGeolocation } from './hooks/useGeolocation';
import { WeatherData } from './types/weather';
import { Thermometer } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  
  const { coords, loading: locationLoading, error: locationError, getCurrentLocation } = useGeolocation();

  // Load weather for user's location when coordinates are available
  useEffect(() => {
    if (coords) {
      handleLocationWeather();
    }
  }, [coords]);

  const handleLocationWeather = async () => {
    if (!coords) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getCurrentWeatherByCoords(coords);
      setWeather(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data for your location');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getCurrentWeather(location);
      setWeather(weatherData);
    } catch (err) {
      setError(`Unable to find weather data for "${location}". Please check the spelling and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    setError(null);
    getCurrentLocation();
  };

  const dismissError = () => {
    setError(null);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Weather App</h1>
        <p>Get current weather conditions for any location</p>
      </div>

      {/* Temperature Unit Toggle */}
      {weather && (
        <button onClick={toggleUnit} className="unit-toggle">
          <Thermometer size={16} />
          <span>{unit === 'celsius' ? '°C' : '°F'}</span>
        </button>
      )}

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onLocationRequest={handleLocationRequest}
        loading={loading}
        locationLoading={locationLoading}
      />

      {/* Error Messages */}
      {error && (
        <ErrorMessage message={error} onDismiss={dismissError} />
      )}
      
      {locationError && !error && (
        <ErrorMessage message={locationError} onDismiss={() => {}} />
      )}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Weather Card */}
      {weather && !loading && (
        <WeatherCard weather={weather} unit={unit} />
      )}

      {/* Welcome Message */}
      {!weather && !loading && !error && (
        <div className="welcome-message">
          <p className="welcome-title">
            Search for a city or use your current location to get started
          </p>
          <div className="welcome-tips">
            <p>• Enter any city name in the search bar</p>
            <p>• Click "Use My Location" for local weather</p>
            <p>• Toggle between Celsius and Fahrenheit</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <p>Weather data provided by WeatherAPI</p>
      </div>
    </div>
  );
}

export default App;