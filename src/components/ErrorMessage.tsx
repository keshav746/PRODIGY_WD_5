import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <AlertCircle size={20} className="error-icon" />
        <div className="error-text">
          <p>{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="error-close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};