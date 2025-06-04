import { useModal } from '@/src/hooks/useModal';
import BaseButton from '../buttons/BaseButton';

export default function AuthModal() {
  const { openConfirmModal } = useModal();

  const handleConfirm = () => {
    openConfirmModal({
      message: '예약을 취소하시겠어요? ', // 모달 창 메세지
      confirmText: '예약 취소', // 확인 버튼 이름
      cancelText: '아니요', // 취소 버튼 이름
      onConfirm: () => {
        // 필요 함수
        console.log('예약 취소됨');
      },
    });
  };

  return (
    <div>
      회원 가입 및 로그인
      <div>
        <BaseButton onClick={handleConfirm}>또 다른 모달</BaseButton>
      </div>
    </div>
  );
}
