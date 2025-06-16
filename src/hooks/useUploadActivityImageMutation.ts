// 이미지 업로드 post
// hooks/useUploadActivityImageMutation.ts
import { useMutation } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

// 실제로 이미지를 업로드하는 함수
async function uploadActivityImage({ file }: { file: File }) {
  const formData = new FormData();
  formData.append('image', file);

  // teamId를 path에 포함 (swagger 기준)
  const res = await fetchFromClient(`/activities/image`, {
    method: 'POST',
    body: formData,
    // fetchFromClient가 content-type을 자동 설정하지 않도록 header X
    // 인증 필요하면 credentials: 'include' 옵션 활용
  });

  // 응답 json 파싱
  const data = await res.json();
  if (!data.activityImgUrl) {
    throw new Error('activityImgUrl이 응답에 없습니다');
  }
  return data.activityImgUrl as string;
}

// 커스텀 뮤테이션 훅
export function useUploadActivityImageMutation() {
  return useMutation({
    mutationFn: uploadActivityImage,
  });
}
