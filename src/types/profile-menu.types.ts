export interface IconTypes {
  'my-info': string;
  favorites: string;
  reservations: string;
  'my-activities': string;
  'my-reservation': string;
}
export type IconType = keyof IconTypes;
export const ICONS: IconTypes = {
  'my-info': '/assets/icons/account/account-people.svg',
  favorites: '/assets/icons/heart/ico-heart-bw.svg',
  reservations: '/assets/icons/account/account-history.svg',
  'my-activities': '/assets/icons/account/account-calendar.svg',
  'my-reservation': '/assets/icons/account/ico-settings.svg',
};

export interface ProfileMenuItemProps {
  href: string;
  icon: IconType;
  title: string;
}
