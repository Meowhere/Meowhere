import { ReviewModalProps } from "@/src/types/modal.types";

type Props = {
    options: ReviewModalProps
}

export default function ReviewModal({options} : Props) {
    return (
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => {
                options.onClose
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {options.cancelText || '아니요'}
            </button>
            <button
              onClick={() => {
                options.onConfirm?.();
                options.onClose
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-300 rounded-md hover:bg-primary-200"
            >
              {options.confirmText || '취소하기'}
            </button>
          </div>
        </div>
    )
}