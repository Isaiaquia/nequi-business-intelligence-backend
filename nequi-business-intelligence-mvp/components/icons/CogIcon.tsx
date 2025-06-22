
import React from 'react';
import { IconVariant } from '../../types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: IconVariant;
}

const CogIcon: React.FC<IconProps> = ({ variant = IconVariant.OUTLINE, className, ...props }) => {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: `w-6 h-6 ${className || ''}`,
    ...props,
  };

  if (variant === IconVariant.SOLID) {
    return (
      <svg {...commonProps} fill="currentColor" stroke="currentColor">
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.948 1.562l-.08.418a14.12 14.12 0 00-1.074 1.074l-.418.08c-.9.249-1.562.9-1.562 1.948v1.104c0 .917.663 1.699 1.562 1.948l.418.08a14.12 14.12 0 001.074 1.074l.08.418c.249.9.9 1.562 1.948 1.562h1.104c.917 0 1.699-.663 1.948-1.562l.08-.418a14.12 14.12 0 001.074-1.074l.418-.08c.9-.249 1.562-.9 1.562-1.948v-1.104c0-.917-.663-1.699-1.562-1.948l-.418-.08a14.12 14.12 0 00-1.074-1.074l-.08-.418C13.447 2.913 12.784 2.25 11.857 2.25H11.08zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.006 1.11-1.212l.707-.353a.75.75 0 01.92.238l.969 1.453a.75.75 0 001.076.326l1.24-.62a.75.75 0 01.83.181l.98 1.143c.21.246.21.614 0 .86l-.587.732a.75.75 0 00.17.994l1.042.87c.45.378.618.992.364 1.49l-.499.998a.75.75 0 01-.98.396l-1.03-.433a.75.75 0 00-.997.26l-.744 1.289a.75.75 0 01-1.085.281l-1.144-.858a.75.75 0 00-.814-.078l-1.11.493a.75.75 0 01-.652-.093l-1.034-.776a.75.75 0 00-.978-.06L5.05 15.09a.75.75 0 01-1.018-.463l-.499-.998a.75.75 0 01.364-1.018l1.042-.87a.75.75 0 00.17-.994l-.587-.732a.75.75 0 010-.86l.98-1.143a.75.75 0 01.83-.181l1.24.62a.75.75 0 001.076-.326l.969-1.453a.75.75 0 01.92-.238l.707.353z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};

export default CogIcon;
    