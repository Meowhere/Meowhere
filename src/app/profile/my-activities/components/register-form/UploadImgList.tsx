import { v4 as uuidv4 } from 'uuid';
import UploadImg from './UploadImg';
import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';
import { useToastStore } from '@/src/store/toastStore';
import { useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const MAX_FILES = 4;

export default function UploadImgList() {
  const { watch, setValue } = useFormContext();
  const { showToast } = useToastStore();
  const uploadActivityImage = useUploadActivityImageMutation();

  const urlToUuid = useRef<Map<string, string>>(new Map());

  // 업로드 중인 상태 추적
  const [isUploading, setIsUploading] = useState(false);

  // form 값
  const subImageUrls: string[] = watch('subImageUrls') ?? [];

  // uuid를 subImageUrls 기준으로 매핑
  useEffect(() => {
    subImageUrls.forEach((url) => {
      if (!urlToUuid.current.has(url)) {
        urlToUuid.current.set(url, uuidv4());
      }
    });
  }, [subImageUrls]);

  // files 생성: uuid만 key로 사용
  const files = useMemo(() => {
    return subImageUrls.map((url) => {
      if (!urlToUuid.current.has(url)) {
        urlToUuid.current.set(url, uuidv4());
      }
      return {
        id: urlToUuid.current.get(url)!,
        previewUrl: url,
      };
    });
  }, [subImageUrls]);

  // 빈 슬롯 표시 여부: 업로드 중이 아니고 최대 개수 미만일 때만
  const showEmptySlot = !isUploading && subImageUrls.length < MAX_FILES;

  const handleFileChange = useCallback(
    async (file: File | null, slotUrl: string | undefined) => {
      if (file) {
        // 이미 업로드 중이면 무시
        if (isUploading) {
          showToast('error', '이미 업로드 중입니다.');
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          showToast('error', '파일 크기는 5MB를 초과할 수 없습니다.');
          return;
        }
        if (!file.type.startsWith('image/')) {
          showToast('error', '이미지 파일만 업로드할 수 있습니다.');
          return;
        }

        setIsUploading(true);

        try {
          const url: string = await uploadActivityImage.mutateAsync({ file });

          // 업로드 완료 후 현재 상태 다시 확인
          const currentUrls = watch('subImageUrls') ?? [];

          // 이미 같은 url이 존재하면 중복 추가 막기
          if (currentUrls.includes(url)) {
            showToast('error', '이미 추가된 이미지입니다.');
            return;
          }

          let newUrls = currentUrls.slice();
          if (slotUrl) {
            // 기존 슬롯 교체
            newUrls = newUrls.map((u: string) => (u === slotUrl ? url : u));
          } else {
            // 빈 슬롯에 추가
            newUrls.push(url);
          }

          setValue('subImageUrls', newUrls.slice(0, MAX_FILES), { shouldDirty: true });
          showToast('success', '이미지가 업로드되었습니다.');
        } catch (error) {
          showToast('error', '이미지 업로드에 실패했습니다.');
          console.error('이미지 업로드 에러:', error);
        } finally {
          setIsUploading(false);
        }
      } else {
        // 삭제 - 업로드 중이면 삭제 불가
        if (isUploading) {
          showToast('error', '업로드 중인 이미지는 삭제할 수 없습니다.');
          return;
        }

        if (slotUrl) {
          const currentUrls = watch('subImageUrls') ?? [];
          const newUrls = currentUrls.filter((u: string) => u !== slotUrl);
          setValue('subImageUrls', newUrls, { shouldDirty: true });
        }
      }
    },
    [isUploading, uploadActivityImage, setValue, showToast, watch]
  );

  return (
    <div className='grid grid-cols-2 gap-[5px] justify-center lg:grid-cols-[repeat(4,160px)] lg:justify-start'>
      {files.map((f) => (
        <UploadImg
          key={f.id}
          file={null}
          defaultImage={f.previewUrl}
          onFileChange={(file) => handleFileChange(file, f.previewUrl)}
        />
      ))}
      {showEmptySlot && (
        <UploadImg
          key='empty-slot' // 고정된 key 사용
          file={null}
          defaultImage={''}
          onFileChange={(file) => handleFileChange(file, undefined)}
        />
      )}
    </div>
  );
}
