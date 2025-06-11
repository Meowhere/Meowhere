'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Textarea from '../../../components/common/inputs/Textarea';

// zod 스키마 정의
const formSchema = z.object({
  scrollableContent: z
    .string()
    .min(1, '내용을 입력해주세요')
    .max(700, '최대 700자까지 입력 가능합니다'),
  autoResizeContent: z
    .string()
    .min(1, '내용을 입력해주세요')
    .max(700, '최대 700자까지 입력 가능합니다'),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scrollableContent: '',
      autoResizeContent: '',
    },
    mode: 'onChange',
  });

  // watch 값들
  const scrollableValue = watch('scrollableContent');
  const autoResizeValue = watch('autoResizeContent');

  const onSubmit = (data: FormData) => {
    console.log('폼 데이터:', data);
    alert('폼이 성공적으로 제출되었습니다!');
  };

  return (
    <form className='max-w-lg mx-auto py-40' onSubmit={handleSubmit(onSubmit)}>
      {/* Input들 주석 처리 */}
      {/* 
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
      */}

      {/* Scrollable Textarea */}
      <div className='mb-4'>
        <Textarea
          {...register('scrollableContent')}
          name='scrollableContent'
          placeholder='내용을 입력해 주세요'
          watchValue={scrollableValue}
          error={errors.scrollableContent}
          scrollable={true}
          autoResize={false}
          maxLength={700}
          rows={5}
        />
      </div>

      {/* Auto Resize Textarea */}
      <div className='mb-4'>
        <Textarea
          {...register('autoResizeContent')}
          name='autoResizeContent'
          placeholder='내용을 입력해 주세요'
          watchValue={autoResizeValue}
          error={errors.autoResizeContent}
          scrollable={false}
          autoResize={true}
          maxLength={700}
          maxHeight='300px'
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type='submit'
        className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        제출하기
      </button>

      {/* 현재 값 표시 (디버깅용) */}
      <div className='mt-8 p-4 bg-gray-100 rounded-lg'>
        <h3 className='font-semibold mb-2'>현재 입력 값:</h3>
        <div className='text-sm'>
          <p>
            <strong>Scrollable:</strong> {scrollableValue}
          </p>
          <p>
            <strong>Auto Resize:</strong> {autoResizeValue}
          </p>
        </div>
      </div>
    </form>
  );
}
