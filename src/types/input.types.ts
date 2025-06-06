export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  error?: string;
  isPassword?: boolean;
}
export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}
