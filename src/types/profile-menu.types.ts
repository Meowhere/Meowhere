export interface IconTypes {
  'my-info': string;
  achievements: string;
  favorites: string;
  reservations: string;
  'my-activities': string;
  'my-reservation': string;
  analytics: string;
  'dark-mode': string;
  'light-mode': string;
  logout: string;
}
export type IconType = keyof IconTypes;
export const ICONS: IconTypes = {
  'my-info': '/assets/icons/account/account-people.svg',
  achievements: '/assets/icons/account/account-achievement.svg',
  favorites: '/assets/icons/account/account-favorite.svg',
  reservations: '/assets/icons/account/account-history.svg',
  'my-activities': '/assets/icons/account/account-calendar.svg',
  'my-reservation': '/assets/icons/account/ico-settings.svg',
  analytics: '/assets/icons/account/account-analytics.svg',
  'dark-mode': '/assets/icons/ico-moon.svg',
  'light-mode': '/assets/icons/ico-sun.svg',
  logout: '/assets/icons/ico-out.svg',
};

export interface ProfileMenuItemProps {
  href?: string;
  icon: IconType;
  title: string;
  onClick?: () => void;
  className?: string;
  hasArrow?: boolean;
}
