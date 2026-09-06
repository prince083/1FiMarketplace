import React from 'react';

export const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="space-y-3.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 animate-pulse"
        >
          {/* Skeleton Logo Box */}
          <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />

          {/* Skeleton Text Column */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded-md w-1/2" />
              <div className="h-3.5 bg-gray-100 rounded-full w-12" />
            </div>
            <div className="h-3 bg-gray-100 rounded-md w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
