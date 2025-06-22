
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, fullWidth = false, className, ...props }) => {
  const baseStyle = "font-medium text-base py-3 px-6 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const widthStyle = fullWidth ? "w-full" : "";

  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "bg-azul-principal text-white hover:bg-blue-700 focus:ring-azul-principal";
      break;
    case 'secondary':
      variantStyle = "bg-transparent text-azul-principal border border-azul-principal hover:bg-azul-principal hover:text-white focus:ring-azul-principal";
      break;
    case 'danger':
      variantStyle = "bg-rojo-error text-white hover:bg-red-700 focus:ring-rojo-error";
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${widthStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
    