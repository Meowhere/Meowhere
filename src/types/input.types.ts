import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  error?: string;
  isPassword?: boolean;
  register?: UseFormRegisterReturn; // For react-hook-form
}
export interface TextareaProps {
  value?: string;
  error?: string;
  className?: string;
  register?: UseFormRegisterReturn; // For react-hook-form
  placeholder?: string;
}
