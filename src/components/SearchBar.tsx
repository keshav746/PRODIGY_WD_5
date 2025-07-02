import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
  locationLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationRequest, 
  loading, 
  locationLoading 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div style={{ position: 'relative' }}>
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="search-button"
        >
          {loading ? (
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Search size={20} />
          )}
        </button>
      </form>

      <button
        onClick={onLocationRequest}
        disabled={locationLoading}
        className="location-button"
      >
        {locationLoading ? (
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <MapPin size={20} />
        )}
        <span>Use My Location</span>
      </button>
    </div>
  );
};