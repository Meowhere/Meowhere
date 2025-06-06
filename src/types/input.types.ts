import { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
  isPassword?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}
