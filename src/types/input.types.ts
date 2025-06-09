import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldError } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  error?: string;
  isPassword?: boolean;
  register?: UseFormRegisterReturn; // For react-hook-form
}
export interface TextareaProps {
  label?: string;
  name?: string;
  watchValue?: string; // watch로부터 받은 현재 값 (floating label용)
  error?: FieldError | string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  autoResize?: boolean; // 자동 높이 조절 여부
  scrollable?: boolean; // 스크롤 허용 여부
  maxHeight?: string; // 최대 높이 (autoResize 사용시)
}
