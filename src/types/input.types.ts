import { ChangeEventHandler } from 'react';

export interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  isPassword?: boolean;
  className?: string;
}
export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}
