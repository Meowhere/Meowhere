export interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  userId: number;
  subImageUrls: SubImage[];
  schedules: Schedule[];
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface ActivityFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating?: number;
  reviewCount?: number;
  subImageUrls: string[];
  schedules?: Omit<Schedule, 'id'>[];
}
