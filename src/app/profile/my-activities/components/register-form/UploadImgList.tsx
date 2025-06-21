import { v4 as uuidv4 } from 'uuid';
import UploadImg from './UploadImg';
import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';
import { useToastStore } from '@/src/store/toastStore';
import { useFormContext } from 'react-hook-form';
import { useEffect, useRef } from 'react';

const MAX_FILES = 4;

export default function UploadImgList() {
  const { watch, setValue } = useFormContext();
  const { showToast } = useToastStore();
  const uploadActivityImage = useUploadActivityImageMutation();

  // 컴포넌트 최상단에서 선언
  const urlToUuid = useRef<Map<string, string>>(new Map());
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

  // files 생성: uuid만 key로 사용, index 동작 X
  const files = subImageUrls.map((url) => ({
    id: urlToUuid.current.get(url)!,
    previewUrl: url,
  }));

  // 빈 슬롯 1개만 추가 (MAX_FILES 넘지 않게)
  const showEmptySlot = subImageUrls.length < MAX_FILES;

  const handleFileChange = async (file: File | null, slotUrl: string | undefined) => {
    let newUrls = subImageUrls.slice();
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('error', '파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        showToast('error', '이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      try {
        const url: string = await uploadActivityImage.mutateAsync({ file });

        // 이미 같은 url이 존재하면 중복 추가 막기
        if (subImageUrls.includes(url)) {
          showToast('error', '이미 추가된 이미지입니다.');
          return;
        }

        if (slotUrl) {
          // 기존 슬롯 교체
          newUrls = newUrls.map((u) => (u === slotUrl ? url : u));
        } else {
          // 빈 슬롯에 추가
          newUrls.push(url);
        }
        setValue('subImageUrls', newUrls.slice(0, MAX_FILES), { shouldDirty: true });
        showToast('success', '이미지가 업로드되었습니다.');
      } catch (error) {
        showToast('error', '이미지 업로드에 실패했습니다.');
      }
    } else {
      // 삭제(해당 인덱스만 삭제)
      if (slotUrl) {
        newUrls = newUrls.filter((u) => u !== slotUrl);
        setValue('subImageUrls', newUrls, { shouldDirty: true });
      }
    }
  };

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
          key={`empty-slot-${subImageUrls.length}`}
          file={null}
          defaultImage={''}
          onFileChange={(file) => handleFileChange(file, undefined)}
        />
      )}
    </div>
  );
}
