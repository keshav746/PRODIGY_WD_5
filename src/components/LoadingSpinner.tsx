import React from 'react';
import { Cloud } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <Cloud className="spinner-cloud" />
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading weather data...</p>
    </div>
  );
};