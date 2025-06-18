import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UploadImg from './UploadImg';
import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';
import { useToastStore } from '@/src/store/toastStore';

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

const updateFilesState = (currentFiles: FileObj[], fileToRemoveId?: string): FileObj[] => {
  let newFiles = fileToRemoveId
    ? currentFiles.filter((f: FileObj) => f.id !== fileToRemoveId)
    : [...currentFiles];

  // 1. 완전히 비었으면 무조건 하나 남기기(최소 1개)
  if (newFiles.length === 0) {
    newFiles = [{ id: uuidv4(), file: null }];
  }
  // 2. 빈 슬롯(null)이 없다면 빈 슬롯 추가 (최대 4개 제한)
  else if (newFiles.length < MAX_FILES && !newFiles.find((f: FileObj) => f.file === null)) {
    newFiles.push({ id: uuidv4(), file: null });
  }

  return newFiles;
};

export default function UploadImgList({ defaultImages, onUrlsChange }: UploadImgListProps) {
  const [files, setFiles] = useState<FileObj[]>(() => {
    if (defaultImages?.length) {
      const withPreviews = defaultImages.map((url) => ({
        id: uuidv4(),
        file: null,
        previewUrl: url,
      }));
      return updateFilesState(withPreviews);
    }
    return [{ id: uuidv4(), file: null }];
  });

  const uploadActivityImage = useUploadActivityImageMutation();
  const { showToast } = useToastStore();

  // 각 UploadImg에서 파일이 업로드될 때 호출
  const handleFileChange = async (file: File | null, id: string) => {
    if (file) {
      // 파일 크기 체크 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('error', '파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        showToast('error', '이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      try {
        // 서버 업로드
        const url = await uploadActivityImage.mutateAsync({ file });

        // 새로운 URL로 파일 상태 업데이트
        const newFiles = files.map((f) => (f.id === id ? { ...f, file, previewUrl: url } : f));

        const updatedFiles = updateFilesState(newFiles);
        setFiles(updatedFiles);

        // 현재 모든 유효한 URL 수집
        const currentUrls = updatedFiles
          .filter((f: FileObj) => f.previewUrl)
          .map((f: FileObj) => f.previewUrl as string);

        // form 값 업데이트
        onUrlsChange?.(currentUrls);

        showToast('success', '이미지가 업로드되었습니다.');
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        showToast('error', '이미지 업로드에 실패했습니다.');

        // 실패 시 파일 상태 초기화
        const updatedFiles = files.map((f: FileObj) =>
          f.id === id ? { ...f, file: null, previewUrl: undefined } : f
        );
        setFiles(updatedFiles);

        // form 값도 업데이트
        const currentUrls = updatedFiles
          .filter((f: FileObj) => f.previewUrl)
          .map((f: FileObj) => f.previewUrl as string);
        onUrlsChange?.(currentUrls);
      }
    } else {
      // 파일 삭제
      const updatedFiles = updateFilesState(files, id);
      setFiles(updatedFiles);

      // URL 업데이트 (삭제된 후 남은 URL들)
      const remainingUrls = updatedFiles
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
