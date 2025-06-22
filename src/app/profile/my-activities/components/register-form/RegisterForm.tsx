import { useFormContext } from 'react-hook-form';
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import PostAddress from './PostAddress';
import RegisterCategory from './RegisterCategory';
import { DaumPostcodeData } from '@/src/types/my-activities.types';
import { useEffect } from 'react';

export default function RegisterForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const titleValue = watch('title', '');
  const priceValue = watch('price', '');
  const descriptionValue = watch('description', '');
  const addressValue = watch('address');

  useEffect(() => {
    const raw = watch('price');
    if (raw && !isNaN(Number(raw))) {
      const formatted = Number(raw).toLocaleString('ko-KR');
      setValue('price', formatted, { shouldDirty: false });
    }
  }, [watch, setValue, priceValue]);

  return (
    <div className='flex flex-col gap-[20px]'>
      <Input
        label='제목'
        type='text'
        {...register('title')}
        error={errors.title as any} // type error 계속 발생. 추후 해결
        watchValue={titleValue}
        required
      />
      <RegisterCategory />
      <Input
        label='가격'
        type='text'
        {...register('price', {
          onBlur: (e) => {
            // 1. 입력값에서 콤마 모두 제거
            const raw = e.target.value.replace(/,/g, '');
            // 2. 값이 있으면 콤마 포맷해서 input에 직접 반영
            if (raw && !isNaN(Number(raw))) {
              e.target.value = Number(raw).toLocaleString('ko-KR');
            }
            // 3. return은 신경 안 써도 됨 (폼 값에는 영향 X)
          },
          setValueAs: (v) => v.replace(/,/g, ''),
        })}
        error={errors.price as any}
        watchValue={priceValue}
        required
      />
      <PostAddress
        name='address'
        value={addressValue}
        onChange={(value: string, data?: DaumPostcodeData) => setValue('address', value)}
        error={errors.address?.message as any}
      />
      <Textarea
        {...register('description')}
        error={errors.description as any}
        watchValue={descriptionValue}
        required
        scrollable={false}
        autoResize={true}
      />
    </div>
  );
}
