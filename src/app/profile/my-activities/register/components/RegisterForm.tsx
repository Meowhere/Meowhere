import { useForm } from 'react-hook-form';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import Category from './Category';

type FormValues = {
  title: string;
  price: string;
  description: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const titleValue = watch('title', '');
  const priceValue = watch('price', '');
  const descriptionValue = watch('description', '');

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='title'
        label='제목'
        type='text'
        register={register('title', {
          required: '제목을 입력해주세요',
          minLength: { value: 3, message: '3자 이상 입력하세요.' },
        })}
        error={errors.title?.message}
        value={titleValue}
      />
      <Category />
      <Input
        name='price'
        label='가격'
        type='text'
        register={register('price', {
          required: '가격을 입력해주세요',
          pattern: {
            value: /^\d+$/,
            message: '숫자만 입력 가능합니다.',
          },
        })}
        error={errors.price?.message}
        value={priceValue}
      />
      {/* <Input name='location'/> */}
      <Textarea
        register={register('description', {
          required: '설명을 입력해주세요',
          minLength: { value: 10, message: '10자 이상 입력하세요.' },
          maxLength: { value: 700, message: '500자 이하로 입력하세요.' },
        })}
        error={errors.description?.message}
        value={descriptionValue}
      />
    </form>
  );
}
