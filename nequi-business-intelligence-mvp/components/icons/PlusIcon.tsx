
import React from 'react';
import { IconVariant } from '../../types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: IconVariant;
}
const PlusIcon: React.FC<IconProps> = ({ variant = IconVariant.OUTLINE, className, ...props }) => {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: variant === IconVariant.SOLID ? "currentColor" : "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: `w-6 h-6 ${className || ''}`,
    ...props,
  };
  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};
export default PlusIcon;
    