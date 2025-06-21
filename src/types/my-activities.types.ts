import { Category } from './activity.types';
import { Activity } from './activity.types';
import { Schedule } from './activity.types';

//my activities 목록
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
  subImageUrls?: string[];
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivitiesPage {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}

// 카카오 api 주소 추가

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

// PATCH API payload
export interface UpdateMyActivityPayload {
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrlsToAdd: string[];
  subImageIdsToRemove: number[];
  schedulesToAdd: CreateScheduleBody[];
  scheduleIdsToRemove: number[];
}

// 스케줄 추가용 타입
export interface CreateScheduleBody {
  date: string;
  startTime: string;
  endTime: string;
}

// ActivityFormValues: 폼에서 사용하는 값 타입
export interface ActivityFormValues {
  title: string;
  description: string;
  category: string; // Category 타입 대신 string! (register에선 string)
  price: string; // number 대신 string! (입력값 그대로)
  address: string;
  bannerImageUrl: string;
  subImageUrls: string[];
  schedules?: { date: string; startTime: string; endTime: string }[];
}
