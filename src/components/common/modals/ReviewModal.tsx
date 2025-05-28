import { useModalStore } from '@/src/store/modalStore';
import { ReviewModalProps } from '@/src/types/modal.types';

type Props = {
  options: ReviewModalProps;
};

export default function ReviewModal({ options }: Props) {
  const { closeModal } = useModalStore();

  return (
    <div className="flex flex-col flex-grow">
      {/*임시 데이터*/}
      <div className="flex-grow justify-center">
        <p className="text-sm text-center">{options.content}</p>
      </div>
      <div className="flex justify-center items-end space-x-2">
        <button
          onClick={() => {
            closeModal();
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          {options.cancelText || '아니요'}
        </button>
        <button
          onClick={() => {
            options.onConfirm?.();
            closeModal();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-300 rounded-md hover:bg-primary-200"
        >
          취소하기
        </button>
      </div>
    </div>
  );
}
