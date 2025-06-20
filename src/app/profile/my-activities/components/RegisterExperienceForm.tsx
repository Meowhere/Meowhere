'use client';
import { useEffect } from 'react';
import UploadImg from '../components/register-form/UploadImg';
import UploadImgList from '../components/register-form/UploadImgList';
import RegisterForm from '../components/register-form/RegisterForm';
import RegisterCalendar from '../components/register-calendar/RegisterCalendar';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';
import { useForm, FormProvider } from 'react-hook-form';
import { Category } from '@/src/types/activity.types';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORY_LIST } from './register-form/RegisterCategory';

const formSchema = z.object({
  title: z.string().min(3, '3자 이상 입력하세요.'),
  category: z.custom<Category>((val) => CATEGORY_LIST.includes(val as Category), {
    message: '올바른 카테고리를 선택해주세요',
  }),
  price: z.string().regex(/^\d+$/, '숫자만 입력 가능합니다.').nonempty('가격을 입력해주세요'),
  description: z.string().min(10, '10자 이상 입력하세요.').max(700, '700자 이하로 입력하세요.'),
  address: z.string().nonempty('주소를 입력하세요'),
  bannerImageUrl: z.string().nonempty('메인 이미지를 업로드해주세요.'),
  subImageUrls: z.array(z.string()).optional(),
  schedules: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .optional(),
});

type ActivityFormValues = z.infer<typeof formSchema>;
interface RegisterExperienceFormProps {
  mode: 'edit' | 'create';
  defaultValues?: MyActivitiesFormData;
  onSubmit: (formData: MyActivitiesFormData) => void;
  isSubmitting?: boolean;
}

export default function RegisterExperienceForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: RegisterExperienceFormProps) {
  const { isDesktop } = useBreakpoint();

  const methods = useForm<ActivityFormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      price: defaultValues?.price ? String(defaultValues.price) : '',
      category: defaultValues?.category ?? CATEGORY_LIST[0],
      description: defaultValues?.description ?? '',
      address: defaultValues?.address ?? '',
      bannerImageUrl: defaultValues?.bannerImageUrl ?? '',
      subImageUrls: defaultValues?.subImageUrls ?? [],
      schedules: defaultValues?.schedules ?? [],
    },
  });

  const {
    handleSubmit,
    formState: { isValid, errors, isDirty },
    setValue,
    watch,
  } = methods;

  // 개발 환경에서만 form 상태 로깅
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Form Data:', watch());
      // console.log('Is Valid:', isValid);
      // console.log('Is Dirty:', isDirty);
      // console.log('Errors:', errors);
    }
  }, [watch, isValid, isDirty, errors]);

  // 초기 마운트 시 카테고리 값 설정
  useEffect(() => {
    setValue('category', defaultValues?.category ?? CATEGORY_LIST[0], { shouldValidate: true });
  }, [setValue, defaultValues?.category]);

  const submitForm = async (formData: ActivityFormValues) => {
    const baseForm: MyActivitiesFormData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      address: formData.address,
      bannerImageUrl: formData.bannerImageUrl,
      subImageUrls: formData.subImageUrls ?? [],
      schedules: formData.schedules ?? [],
    };

    onSubmit(baseForm);
  };

  return (
    <FormProvider {...methods}>
      <form
        id='register-form'
        onSubmit={handleSubmit(submitForm)}
        className='relative flex flex-col gap-[48px] lg:gap-[64px] px-[24px] pb-[96px] mb-[300px]'
      >
        <div className='flex flex-col gap-[20px]'>
          <p className='text-xl font-semibold text-gray-800'>메인 이미지</p>
          <div className='w-[160px]'>
            <UploadImg defaultImage={defaultValues?.bannerImageUrl} isBanner={true} />
          </div>
          {errors.bannerImageUrl && (
            <p className='text-sm text-red-500'>{errors.bannerImageUrl.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-[20px]'>
          <p className='text-xl font-semibold text-gray-800'>소개 이미지</p>
          <UploadImgList />
          {errors.subImageUrls && (
            <p className='text-sm text-red-500'>{errors.subImageUrls.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-[20px]'>
          <p className='text-xl font-semibold text-gray-800'>체험 정보</p>
          <RegisterForm />
        </div>
        <RegisterCalendar defaultSchedules={defaultValues?.schedules} />
        {isDesktop && (
          <div className='w-[128px] absolute right-[24px] top-full'>
            <BaseButton
              type='submit'
              variant='primary'
              className='text-md font-semibold'
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {isSubmitting ? '처리 중...' : mode === 'edit' ? '수정 하기' : '등록 하기'}
            </BaseButton>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
