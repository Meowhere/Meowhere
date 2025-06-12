import { useForm } from 'react-hook-form';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import Category from './Category';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PostAddress from './PostAddress';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(3, '3자 이상 입력하세요.'),
  category: z.string().nonempty('카테고리를 선택해주세요'),
  price: z.string().regex(/^\d+$/, '숫자만 입력 가능합니다.').nonempty('가격을 입력해주세요'),
  description: z.string().min(10, '10자 이상 입력하세요.').max(700, '700자 이하로 입력하세요.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const titleValue = watch('title', '');
  const priceValue = watch('price', '');
  const descriptionValue = watch('description', '');

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const [address, setAddress] = useState('');
  return (
    <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='제목'
        type='text'
        {...register('title')}
        error={errors.title}
        watchValue={titleValue}
        required
      />
      {/* <Category /> */}
      <Input
        label='가격'
        type='text'
        {...register('price')}
        error={errors.price}
        watchValue={priceValue}
        required
      />
      <PostAddress
      // onChange={(value, data) => {
      //   setAddress(value);
      // }}
      />
      <Textarea
        {...register('description')}
        error={errors.description}
        watchValue={descriptionValue}
        required
      />
    </form>
  );
}
