import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
//   label: string;
//   type?: 'text' | 'email' | 'password' | 'tel' | 'url';
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   name?: string;
//   error?: string;
//   isPassword?: boolean;
//   disabled?: boolean;
//   className?: string;
// }

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  error?: string;
  isPassword?: boolean;
  register?: UseFormRegisterReturn; // For react-hook-form
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}
