
import React from 'react';
import { IconVariant } from '../../types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: IconVariant;
}

const HomeIcon: React.FC<IconProps> = ({ variant = IconVariant.OUTLINE, className, ...props }) => {
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M12 21.75V15.75a.75.75 0 01.75-.75H15a.75.75 0 01.75.75v6m-4.5 0H6.75A2.25 2.25 0 014.5 19.5V12m12.75 7.5h-4.5a2.25 2.25 0 01-2.25-2.25V15m4.5-3V9A2.25 2.25 0 0013.5 6.75H12A2.25 2.25 0 009.75 9v3m4.5 0h3.75M3.75 12h16.5" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M12 2.25v19.5M2.25 12H21.75M5.25 12V6.75a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v5.25m4.5 0V6.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v5.25M7.5 21.75h9" />
    </svg>
  );
};

export default HomeIcon;
    