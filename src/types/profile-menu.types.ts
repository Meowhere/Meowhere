export interface IconTypes {
  'my-info': string;
  'my-reservations': string;
  'my-activities': string;
  settings: string;
}
export type IconType = keyof IconTypes;
export const ICONS: IconTypes = {
  'my-info': '/assets/icons/account/account-people.svg',
  'my-reservations': '/assets/icons/account/account-history.svg',
  'my-activities': '/assets/icons/account/account-calendar.svg',
  settings: '/assets/icons/account/ico-settings.svg',
};

export interface ProfileMenuItemProps {
  href: string;
  icon: IconType;
  title: string;
}
