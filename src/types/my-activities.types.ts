import { Category } from './activity.types';
import { Activity } from './activity.types';

export interface RatingLabelProps {
  rating: number;
}

export interface MyActivitiesProps extends RatingLabelProps {
  id: number;
  userId?: number;
  title: string;
  description?: string;
  category?: Category;
  price: number;
  address?: string;
  bannerImageUrl: string;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// export interface ManagementDropdownProps {
//   isOpen: boolean;
//   onToggle: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

export interface ActivitiesPage {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}
