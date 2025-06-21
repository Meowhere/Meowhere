import { FieldError, Resolver, useForm } from 'react-hook-form';

import { useModalStore } from '@/src/store/modalStore';
import { useToastStore } from '@/src/store/toastStore';
import { usePostReview } from '@/src/hooks/usePostReview';
import { formatDateDot } from '@/src/utils/date-format';
import { CreateReviewModalProps } from '@/src/types/modal.types';

import StarFillIcon from '@/src/components/common/icons/StarFillIcon';
import StarIcon from '@/src/components/common/icons/StarIcon';
import Textarea from '../inputs/Textarea';
import BaseButton from '../buttons/BaseButton';

interface FormValues {
  rating: number;
  content: string;
}

const formResolver: Resolver<FormValues> = async (values) => {
  const errors: { [key: string]: FieldError } = {};

  if (!values.rating || values.rating === 0) {
    errors.rating = {
      type: 'required',
      message: '별점을 선택해주세요',
    };
  }

  if (!values.content || values.content.trim() === '') {
    errors.content = {
      type: 'required',
      message: '리뷰 내용을 작성해주세요',
    };
  }

  return {
    values: values,
    errors,
  };
};

export default function CreateReviewModal({
  reservationId,
  title,
  schedule,
  headCount,
  price,
}: CreateReviewModalProps) {
  const { mutate: postReview, isPending } = usePostReview();
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      content: '',
    },
    resolver: formResolver,
    reValidateMode: 'onChange',
  });

  const handleFormSubmit = (data: FormValues) => {
    if (data.rating === 0 || data.content.trim() === '') {
      alert('별점과 후기를 모두 입력해주세요!');
      return;
    }
    postReview(
      { reservationId, rating: data.rating, content: data.content },
      {
        onSuccess: () => {
          showToast('success', '리뷰 등록이 완료되었습니다');
          closeModal();
        },
        onError: () => {
          showToast('error', '리뷰 등록에 실패했습니다');
        },
      }
    );
  };

  return (
    <div className='flex flex-col flex-grow mt-[38px]'>
      <h3 className='text-lg font-bold text-gray-900 dark:text-gray-100 text-center mb-[6px]'>
        {title}
      </h3>

      <div className='w-[220px] mx-auto text-center text-[1.3rem] font-regular text-gray-500 dark:text-gray-400 mb-[32px] border-t border-t-[rgba(17,34,17,0.1)] dark:border-t-gray-700'>
        <div className='flex justify-center mt-[6px] gap-[16px]'>
          <span>{`${formatDateDot(new Date(schedule.date), true)}`}</span>
          <span>{`${schedule.startTime} - ${schedule.endTime}`}</span>
        </div>
        <div className='flex justify-center mt-[6px] gap-[13px]'>
          <span>{`${headCount}명`}</span>
          <span>{`₩${price.toLocaleString()}`}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex justify-center gap-[4px] mb-[32px]'>
          {[1, 2, 3, 4, 5].map((i) =>
            i <= watch('rating') ? (
              <StarFillIcon
                key={i}
                onClick={() => setValue('rating', i, { shouldValidate: true })}
                className='w-[42px] h-[42px] cursor-pointer text-yellow-200'
              />
            ) : (
              <StarIcon
                key={i}
                onClick={() => setValue('rating', i, { shouldValidate: true })}
                className='w-[42px] h-[42px] cursor-pointer text-gray-400'
              />
            )
          )}
        </div>

        <Textarea
          placeholder='후기를 작성해주세요'
          className='focus:outline focus:outline-primary-300'
          {...register('content')}
          watchValue={watch('content')}
          error={errors.content}
        />

        {isPending ? (
          <div className='flex flex-col items-center py-[24px] space-y-[8px]'>
            <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
            <p className='text-sm text-gray-500 animate-pulse'>후기 등록 중입니다...</p>
          </div>
        ) : (
          <div className='flex flex-col gap-[8px] pt-[32px]'>
            <BaseButton type='submit' className='h-[48px] text-md' disabled={!isValid}>
              작성하기
            </BaseButton>
            <BaseButton variant='outline' onClick={closeModal} className='h-[48px] text-md'>
              취소하기
            </BaseButton>
          </div>
        )}
      </form>
    </div>
  );
}
