export interface IconTypes {
  'my-info': string;
  favorites: string;
  'my-reservations': string;
  'my-activities': string;
  settings: string;
  'dark-mode': string;
  'light-mode': string;
  logout: string;
}
export type IconType = keyof IconTypes;
export const ICONS: IconTypes = {
  'my-info': '/assets/icons/account/account-people.svg',
  favorites: '/assets/icons/account/account-favorite.svg',
  'my-reservations': '/assets/icons/account/account-history.svg',
  'my-activities': '/assets/icons/account/account-calendar.svg',
  settings: '/assets/icons/account/ico-settings.svg',
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
