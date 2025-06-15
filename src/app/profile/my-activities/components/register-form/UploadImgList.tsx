import { useState } from 'react';
import UploadImg from './UploadImg';

// 고유 id 생성 함수(uuid 써도 됨 의견 궁금합니다.)
const genId = () => Math.random().toString(36).slice(2) + Date.now();

type FileObj = {
  id: string;
  file: File | null;
  previewUrl?: string;
};

interface UploadImgListProps {
  defaultImages?: string[];
}

const MAX_FILES = 4;

export default function UploadImgList({ defaultImages }: UploadImgListProps) {
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

  // 각 UploadImg에서 파일이 업로드될 때 호출
  const handleFileChange = (file: File | null, id: string) => {
    let newFiles = files.map((f) => (f.id === id ? { ...f, file, previewUrl: undefined } : f));

    // 파일 추가 (마지막 빈 칸에 업로드 & 4개 미만일 때만 새 빈 추가)
    if (file && id === files[files.length - 1].id && files.length < MAX_FILES) {
      newFiles.push({ id: genId(), file: null });
    }

    // 파일 삭제
    if (!file) {
      // 해당 파일 객체를 제거
      newFiles = newFiles.filter((f) => f.id !== id);

      // ⚠️ 조건 분기 설명 ⚠️
      // 1. 완전히 비었으면 무조건 하나 남기기(최소 1개)
      if (newFiles.length === 0) {
        newFiles = [{ id: genId(), file: null }];
      }
      // 2. 빈 슬롯(null)이 없다면 빈 슬롯 추가 (최대 4개 제한)
      else if (newFiles.length < MAX_FILES && !newFiles.find((f) => f.file === null)) {
        newFiles.push({ id: genId(), file: null });
      }
    }

    setFiles(newFiles);
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
