export interface IconTypes {
  'my-info': string;
  'my-reservation': string;
  'my-activities': string;
  settings: string;
}
export type IconType = keyof IconTypes;
export const ICONS: IconTypes = {
  'my-info': '/assets/icons/account/account-people.svg',
  'my-reservation': '/assets/icons/account/account-history.svg',
  'my-activities': '/assets/icons/account/account-calendar.svg',
  settings: '/assets/icons/account/ico-settings.svg',
};

export interface ProfileItemProps {
  href: string;
  icon: IconType;
  title: string;
}
