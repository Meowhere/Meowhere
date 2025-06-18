// 이미지 업로드 post
// hooks/useUploadActivityImageMutation.ts
import { useMutation } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useToastStore } from '@/src/store/toastStore';

// 실제로 이미지를 업로드하는 함수
async function uploadActivityImage({ file }: { file: File }) {
  const { showToast } = useToastStore();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetchFromClient(`/activities/image`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    showToast('error', '이미지 업로드에 실패했습니다.');
  }

  const data = await res.json();

  // 응답 구조 로깅 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log('이미지 업로드 응답:', data);
  }

  // API 응답의 activityImageUrl 키를 사용
  const imageUrl = data.activityImageUrl;
  if (!imageUrl) {
    showToast('error', '이미지 URL을 받아올 수 없습니다.');
  }

  return imageUrl;
}

// 커스텀 뮤테이션 훅
export function useUploadActivityImageMutation() {
  return useMutation({
    mutationFn: uploadActivityImage,
    onError: (error: Error) => {
      console.error('이미지 업로드 에러:', error);
    },
  });
}
