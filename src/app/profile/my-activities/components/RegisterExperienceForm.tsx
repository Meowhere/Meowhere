'use client';
import UploadImg from '../components/register-form/UploadImg';
import UploadImgList from '../components/register-form/UploadImgList';
import RegisterForm from '../components/register-form/RegisterForm';
import RegisterCalendar from '../components/register-calendar/RegisterCalendar';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';

interface RegisterExperienceFormProps {
  mode: 'edit' | 'create';
  defaultValues?: MyActivitiesFormData;
  onSubmit?: () => void;
  showSubmitButton?: boolean;
}

export default function RegisterExperienceForm({
  mode,
  defaultValues,
  onSubmit,
  showSubmitButton = false,
}: RegisterExperienceFormProps) {
  const { isDesktop } = useBreakpoint();

  return (
    <div className='relative flex flex-col gap-[48px] lg:gap-[64px] px-[24px] py-[96px] mb-[300px]'>
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
        <RegisterForm defaultValues={defaultValues} />
      </div>
      <RegisterCalendar defaultSchedules={defaultValues?.schedules} />
      {isDesktop && (
        <div className='w-[128px] absolute right-[24px] top-full'>
          <BaseButton variant='primary' className='text-md font-semibold'>
            {mode === 'edit' ? '수정 하기' : '등록 하기'}
          </BaseButton>
        </div>
      )}
    </div>
  );
}
