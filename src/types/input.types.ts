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
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}
