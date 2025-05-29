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
  subImages: SubImages;
  schedules: Schedules;
  createdAt: string;
  updatedAt: string;
}

export interface Schedules {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubImages {
  id: number;
  imageUrl: string;
}
