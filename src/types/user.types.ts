export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  user?: User | null;
  error?: string;
}

export interface UpdateMyInfoPayload {
  nickname?: string;
  profileImgUrl?: string;
  newPassword?: string;
}
