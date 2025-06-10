import { useState } from 'react';
import UploadImg from './UploadImg';

export default function UploadImgList() {
  const [files, setFiles] = useState<(File | null)[]>([null]);

  // 각 UploadImg에서 파일이 업로드될 때 호출
  const handleFileChange = (file: File | null, idx: number) => {
    let newFiles = [...files];
    newFiles[idx] = file;
    // 마지막(빈) UploadImg에 파일이 업로드되면 새 빈 UploadImg 추가
    if (idx === files.length - 1 && file) {
      newFiles.push(null);
    }
    // 파일을 삭제한 경우
    if (!file) {
      // 마지막이 아닌 곳에서 삭제하면 해당 인덱스 제거
      if (idx !== files.length - 1) {
        newFiles.splice(idx, 1);
      }
      // 마지막이 null이 아닌 경우, 마지막에 null 추가
      if (newFiles.length === 0 || newFiles[newFiles.length - 1] !== null) {
        newFiles.push(null);
      }
      // 만약 처음부터 아무것도 없으면 최소 1개는 남기기
      if (newFiles.length === 0) {
        newFiles = [null];
      }
    }
    setFiles(newFiles);
  };

  return (
    <div className='grid grid-cols-2 gap-[5px] lg:grid-cols-[repeat(4,160px)] justify-center'>
      {files.map((file, idx) => (
        <UploadImg key={idx} file={file} onFileChange={(file) => handleFileChange(file, idx)} />
      ))}
    </div>
  );
}
