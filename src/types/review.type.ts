export interface ReviewUser {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}
