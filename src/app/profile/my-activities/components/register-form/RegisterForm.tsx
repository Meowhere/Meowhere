import { useForm } from 'react-hook-form';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PostAddress from './PostAddress';
import RegisterCategory from './RegisterCategory';
import { DaumPostcodeData } from '@/src/types/my-activities.types';

interface RegisterFormProps {
  defaultValues?: {
    title?: string;
    price?: number;
    category?: string;
    description?: string;
    address?: string;
  };
}

const formSchema = z.object({
  title: z.string().min(3, '3자 이상 입력하세요.'),
  category: z.string().nonempty('카테고리를 선택해주세요'),
  price: z.string().regex(/^\d+$/, '숫자만 입력 가능합니다.').nonempty('가격을 입력해주세요'),
  description: z.string().min(10, '10자 이상 입력하세요.').max(700, '700자 이하로 입력하세요.'),
  address: z.string().nonempty('주소를 입력하세요'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm({ defaultValues }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      price: defaultValues?.price ? String(defaultValues.price) : '',
      category: defaultValues?.category ?? '',
      description: defaultValues?.description ?? '',
      address: defaultValues?.address ?? '',
    },
  });

  const titleValue = watch('title', '');
  const priceValue = watch('price', '');
  const descriptionValue = watch('description', '');
  const addressValue = watch('address');

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

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
          setValueAs: (v) => v.replace(/,/g, ''), // 폼 데이터는 콤마 제거
        })}
        error={errors.price}
        watchValue={priceValue ? priceValue?.toLocaleString() : ''}
        required
      />
      <PostAddress
        name='address'
        value={addressValue}
        onChange={(value: string, data?: DaumPostcodeData) => setValue('address', value)}
        error={errors.address?.message}
      />
      <Textarea
        {...register('description')}
        error={errors.description}
        watchValue={descriptionValue}
        required
        scrollable={false}
        autoResize={true}
      />
    </form>
  );
}
