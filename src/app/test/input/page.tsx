'use client';
import { useForm } from 'react-hook-form';
import Input from '../../../components/common/inputs/Input';
import Textarea from '../../../components/common/inputs/Textarea';

type FormValues = {
  email: string;
  password: string;
  nickname: string;
  textarea: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  // floating label 등 value 체크용
  const emailValue = watch('email', '');
  const pwValue = watch('password', '');
  const nicknameValue = watch('nickname', '');
  const textareaValue = watch('textarea', '');

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form className='max-w-lg mx-auto py-40' onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='email'
        label='이메일'
        type='email'
        register={register('email', {
          required: '이메일을 입력해 주세요',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '이메일 형식으로 입력해 주세요',
          },
        })}
        error={errors.email?.message}
        value={emailValue}
      />
      <Input
        name='password'
        label='비밀번호'
        type='password'
        isPassword
        register={register('password', {
          required: '비밀번호를 입력해 주세요',
          minLength: { value: 6, message: '6자 이상 입력하세요' },
        })}
        error={errors.password?.message}
        value={pwValue}
      />
      <Input
        name='nickname'
        label='닉네임'
        type='text'
        register={register('nickname', {
          required: '닉네임을 입력해 주세요',
          minLength: { value: 2, message: '2자 이상 입력하세요' },
        })}
        error={errors.nickname?.message}
        value={nicknameValue}
      />
      <Textarea
        register={register('textarea', {
          required: '내용을 입력해 주세요',
          minLength: { value: 10, message: '10자 이상 입력하세요' },
          maxLength: { value: 700, message: '700자 이내로 입력해 주세요' },
        })}
        error={errors.textarea?.message}
        value={textareaValue}
      />
    </form>
  );
}
