import { Category } from './activity.types';
import { Activity } from './activity.types';
import { Schedule } from './activity.types';

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

// types/daum.d.ts

export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  [key: string]: any; // 다른 필드도 허용 (문서 참고)
}

export interface DaumPostcode {
  Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => { open: () => void };
}

declare global {
  interface Window {
    daum?: DaumPostcode;
  }
}

// 수정하기 에서 받아올 데이터들
export interface MyActivitiesFormData {
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  // rating?: number;
  // reviewCount?: number;
  subImageUrls: string[];
  schedules?: Omit<Schedule, 'id'>[];
}
