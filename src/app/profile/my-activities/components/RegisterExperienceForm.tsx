'use client';
import UploadImg from '../components/register-form/UploadImg';
import UploadImgList from '../components/register-form/UploadImgList';
import RegisterForm from '../components/register-form/RegisterForm';
import RegisterCalendar from '../components/register-calendar/RegisterCalendar';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { MyActivitiesFormData, CreateScheduleBody } from '@/src/types/my-activities.types';
import { useForm, FormProvider } from 'react-hook-form';
import { mapToApiPayload } from '@/src/utils/my-activities';
import { useUpdateMyActivityMutation } from '@/src/hooks/useUpdateMyActivityMutation';
import { useCreateActivityMutation } from '@/src/hooks/useCreateActivityMutation';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@/src/types/activity.types';

const formSchema = z.object({
  title: z.string().min(3, '3자 이상 입력하세요.'),
  category: z.string().nonempty('카테고리를 선택해주세요'),
  price: z.string().regex(/^\d+$/, '숫자만 입력 가능합니다.').nonempty('가격을 입력해주세요'),
  description: z.string().min(10, '10자 이상 입력하세요.').max(700, '700자 이하로 입력하세요.'),
  address: z.string().nonempty('주소를 입력하세요'),
  bannerImageUrl: z.string().url('이미지 URL이 필요합니다.').optional(),
  subImageUrls: z.array(z.string().url('이미지 URL이 필요합니다.')).optional(),
  schedules: z.array(z.any()).optional(),
});

type ActivityFormValues = z.infer<typeof formSchema>;
interface RegisterExperienceFormProps {
  mode: 'edit' | 'create';
  defaultValues?: MyActivitiesFormData;
  onSubmit?: (formData: MyActivitiesFormData) => void;
  activityId?: number;
}

export default function RegisterExperienceForm({
  mode,
  defaultValues,
  onSubmit,
  activityId,
}: RegisterExperienceFormProps) {
  const { isDesktop } = useBreakpoint();

  // 만약 삭제/추가 id를 폼 내부에서 따로 관리한다면 useState로 선언해야 함!
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<CreateScheduleBody[]>([]);

  const updateMyActivityMutation = useUpdateMyActivityMutation(activityId);
  const createActivityMutation = useCreateActivityMutation();

  const methods = useForm<ActivityFormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      price: defaultValues?.price ? String(defaultValues.price) : '',
      category: defaultValues?.category ?? '문화 · 예술',
      description: defaultValues?.description ?? '',
      address: defaultValues?.address ?? '',
      bannerImageUrl: defaultValues?.bannerImageUrl ?? '',
      subImageUrls: defaultValues?.subImageUrls ?? [],
      schedules: defaultValues?.schedules ?? [],
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const Submit = (formData: ActivityFormValues) => {
    alert(JSON.stringify(formData, null, 2));
    const baseForm: MyActivitiesFormData = {
      ...formData,
      price: Number(formData.price),
      category: formData.category as Category,
      bannerImageUrl: formData.bannerImageUrl ?? '',
      subImageUrls: formData.subImageUrls ?? [],
      schedules: formData.schedules ?? [],
    };
    const apiPayload = mapToApiPayload(baseForm, mode, {
      subImageIdsToRemove,
      scheduleIdsToRemove,
      schedulesToAdd,
    });
    if (mode === 'edit') {
      updateMyActivityMutation.mutate(apiPayload);
    } else {
      createActivityMutation.mutate(baseForm);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id='register-form'
        onSubmit={handleSubmit(Submit)}
        className='relative flex flex-col gap-[48px] lg:gap-[64px] px-[24px] py-[96px] mb-[300px]'
      >
        <div className='flex flex-col gap-[20px]'>
          <p className='text-xl font-semibold text-gray-800'>메인 이미지</p>
          <div className='w-[160px]'>
            <UploadImg defaultImage={defaultValues?.bannerImageUrl} />
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <p className='text-xl font-semibold text-gray-800'>소개 이미지</p>
          <UploadImgList defaultImages={defaultValues?.subImageUrls} />
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
              // disabled={!isValid}
            >
              {mode === 'edit' ? '수정 하기' : '등록 하기'}
            </BaseButton>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
