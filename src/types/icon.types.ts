import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export interface HeartIconProps extends IconProps {
  isFilled?: boolean;
  showOverlay?: boolean;
}

export interface NotificationIconProps extends IconProps {
  hasBadge?: boolean;
  backgroundColor?: string;
}
