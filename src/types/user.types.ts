import { SubmitHandler } from 'react-hook-form';
import { MyInfoFormType } from '../app/profile/my-info/components/MyInfoForm';
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

export interface MyInfoFormRef {
  submit: () => void;
}

export interface MyInfoFormProps {
  defaultValues: MyInfoFormType;
  onSubmit: SubmitHandler<MyInfoFormType>;
  isSubmitting: boolean;
  onFormStateChange?: (state: { isDirty: boolean; isValid: boolean }) => void;
}
