
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gris-neutro mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-principal focus:border-azul-principal outline-none transition-colors text-base text-gris-neutro placeholder-texto-placeholder ${error ? 'border-rojo-error focus:ring-rojo-error' : ''} ${className || ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-rojo-error">{error}</p>}
    </div>
  );
};

export default Input;
    