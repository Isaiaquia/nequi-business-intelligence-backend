
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g., 'text-azul-principal'
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'text-azul-principal' }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'w-4 h-4 border-2';
      break;
    case 'md':
      sizeClasses = 'w-8 h-8 border-4';
      break;
    case 'lg':
      sizeClasses = 'w-12 h-12 border-[6px]';
      break;
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses} ${color}`}
        style={{ borderTopColor: 'transparent' }} 
      ></div>
    </div>
  );
};

export default Spinner;
    