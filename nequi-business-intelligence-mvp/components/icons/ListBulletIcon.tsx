
import React from 'react';
import { IconVariant } from '../../types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: IconVariant;
}

const ListBulletIcon: React.FC<IconProps> = ({ variant = IconVariant.OUTLINE, className, ...props }) => {
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
        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm0 6a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm0 6a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM8.25 7.875a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
};

export default ListBulletIcon;
    