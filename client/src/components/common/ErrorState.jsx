import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-6 text-center my-4">
      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 text-rose-600">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-rose-900 text-base mb-1">
        Unable to load items
      </h3>
      <p className="text-xs text-rose-700/80 max-w-xs mx-auto mb-4">
        {message || 'Something went wrong while communicating with the 1Fi servers.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
