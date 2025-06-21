import { FieldError } from 'react-hook-form';

export interface InputProps {
  label: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  watchValue?: string; // watch로부터 받은 현재 값
  error?: FieldError | string;
  isPassword?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
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

export interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  error?: string;
}
