import { ChangeEventHandler } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  // onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  isPassword?: boolean;
  register?: any; // For react-hook-form
}
export interface TextareaProps {
  value?: string;
  error?: string;
  className?: string;
  register?: any; // For react-hook-form
}
