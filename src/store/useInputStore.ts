// store/useInputStore.ts
import { create } from 'zustand';

interface InputState {
  email: string;
  emailError: string;
  pw: string;
  pwError: string;
  nickname: string;
  nicknameError: string;
  textarea: string;
  textareaError: string;
  setEmail: (v: string) => void;
  setPw: (v: string) => void;
  setNickname: (v: string) => void;
  setTextarea: (v: string) => void;
}

export const useInputStore = create<InputState>((set) => ({
  email: '',
  emailError: '',
  pw: '',
  pwError: '',
  nickname: '',
  nicknameError: '',
  textarea: '',
  textareaError: '',
  setEmail: (v) =>
    set((state) => ({
      email: v,
      emailError: v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '이메일 형식으로 입력해 주세요' : '',
    })),
  setPw: (v) =>
    set((state) => ({
      pw: v,
      pwError: v.length > 0 && v.length < 6 ? '6자 이상 입력하세요' : '',
    })),
  setNickname: (v) =>
    set((state) => ({
      nickname: v,
      nicknameError: v.length > 0 && v.length < 2 ? '2자 이상 입력하세요' : '',
    })),
  setTextarea: (v) =>
    set(() => ({
      textarea: v,
      textareaError: v.length > 0 && v.length < 10 ? '10자 이상 입력하세요' : '',
    })),
}));
