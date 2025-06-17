import { useState } from 'react';
import UploadImg from './UploadImg';
import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';

// 고유 id 생성 함수(uuid 써도 됨 의견 궁금합니다.)
const genId = () => Math.random().toString(36).slice(2) + Date.now();

type FileObj = {
  id: string;
  file: File | null;
  previewUrl?: string;
};

interface UploadImgListProps {
  defaultImages?: string[];
  onUrlsChange?: (urls: string[]) => void;
}

const MAX_FILES = 4;

export default function UploadImgList({ defaultImages, onUrlsChange }: UploadImgListProps) {
  const [files, setFiles] = useState<FileObj[]>(() => {
    if (defaultImages?.length) {
      const withPreviews = defaultImages.map((url) => ({
        id: genId(),
        file: null,
        previewUrl: url,
      }));
      return [...withPreviews, { id: genId(), file: null }];
    }
    return [{ id: genId(), file: null }];
  });

  const uploadActivityImage = useUploadActivityImageMutation();

  // 각 UploadImg에서 파일이 업로드될 때 호출
  const handleFileChange = (file: File | null, id: string) => {
    if (file) {
      // 먼저 파일 상태 업데이트
      const newFiles: FileObj[] = files.map((f) => (f.id === id ? { ...f, file } : f));

      // 마지막 빈 칸에 업로드 & 4개 미만일 때만 새 빈 추가
      if (id === files[files.length - 1].id && files.length < MAX_FILES) {
        newFiles.push({ id: genId(), file: null });
      }

      setFiles(newFiles);

      // 그 다음 서버 업로드
      uploadActivityImage.mutate(
        { file },
        {
          onSuccess: (url) => {
            // 새로운 URL로 파일 상태 업데이트
            setFiles((prev) => {
              const updated = prev.map((f: FileObj) =>
                f.id === id ? { ...f, file, previewUrl: url } : f
              );

              // 현재 모든 유효한 URL 수집
              const currentUrls = updated
                .filter((f: FileObj) => f.previewUrl)
                .map((f: FileObj) => f.previewUrl as string);

              // form 값 업데이트
              onUrlsChange?.(currentUrls);

              return updated;
            });
          },
          onError: (error) => {
            console.error('이미지 업로드 실패:', error);
            // 실패 시 파일 상태 초기화
            setFiles((prev) =>
              prev.map((f: FileObj) =>
                f.id === id ? { ...f, file: null, previewUrl: undefined } : f
              )
            );
          },
        }
      );
    } else {
      // 파일 삭제
      let newFiles = files.filter((f: FileObj) => f.id !== id);

      // ⚠️ 조건 분기 설명 ⚠️
      // 1. 완전히 비었으면 무조건 하나 남기기(최소 1개)
      if (newFiles.length === 0) {
        newFiles = [{ id: genId(), file: null }];
      }
      // 2. 빈 슬롯(null)이 없다면 빈 슬롯 추가 (최대 4개 제한)
      else if (newFiles.length < MAX_FILES && !newFiles.find((f: FileObj) => f.file === null)) {
        newFiles.push({ id: genId(), file: null });
      }

      setFiles(newFiles);

      // URL 업데이트 (삭제된 후 남은 URL들)
      const remainingUrls = newFiles
        .filter((f: FileObj) => f.previewUrl)
        .map((f: FileObj) => f.previewUrl as string);
      onUrlsChange?.(remainingUrls);
    }
  };

  return (
    <div className='grid grid-cols-2 gap-[5px] justify-center lg:grid-cols-[repeat(4,160px)] lg:justify-start'>
      {files.map((f) => (
        <UploadImg
          key={f.id}
          file={f.file}
          defaultImage={f.previewUrl}
          onFileChange={(file) => handleFileChange(file, f.id)}
        />
      ))}
    </div>
  );
}
