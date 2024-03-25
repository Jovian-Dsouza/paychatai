import React from 'react'

export function ThreeDotLoading() {
  return (
    <div>
      <div className="flex justify-center space-x-1 animate-pulse">
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}
