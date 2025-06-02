'use client';
import Input from '@/src/components/common/inputs/Input';
import { useState, useEffect } from 'react';
import BaseButton from '@/src/components/common/buttons/BaseButton';
export default function MyInfoPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  // 윈도우 크기 체크하여 isDesktop 상태 설정
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px 이상을 데스크탑으로 간주
    };

    checkScreenSize(); // 처음 렌더링 시 실행
    window.addEventListener('resize', checkScreenSize); // 크기 변화에 따라 실행

    return () => {
      window.removeEventListener('resize', checkScreenSize); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  // const [pw, setPw] = useState('');
  // const [pwError, setPwError] = useState('');
  // const [pwConfirm, setPwConfirm] = useState('');
  // const [pwConfirmError, setPwConfirmError] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [nicknameError, setNicknameError] = useState('');

  // // 비밀번호 유효성 검사
  // const handlePwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;
  //   setPw(val);
  //   setPwError(val.length > 0 && val.length < 6 ? '6자 이상 입력하세요' : '');
  // }, []);

  // // 비밀번호 확인 유효성 검사
  // const handlePwConfirmChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const val = e.target.value;
  //     setPwConfirm(val);
  //     setPwConfirmError(val !== pw ? '비밀번호가 일치하지 않습니다' : '');
  //   },
  //   [pw]
  // );

  // // 닉네임 유효성 검사
  // const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;
  //   setNickname(val);
  //   setNicknameError(val.length > 0 && val.length < 2 ? '2자 이상 입력하세요' : '');
  // }, []);

  return (
    <div className='flex flex-col gap-[64px] mt-[48px] mx-[24px] mb-[600px]'>
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800 '>닉네임 변경</p>
        <Input
          label='닉네임'
          type='text'
          // value={nickname}
          // onChange={handleNicknameChange}
          // error={nicknameError}
        />
      </div>
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800'>비밀번호 변경</p>
        <div>
          <Input
            label='비밀번호'
            type='password'
            // value={pw}
            // onChange={handlePwChange}
            // error={pwError}
            isPassword={true}
          />
          <Input
            label='비밀번호 확인'
            type='password'
            // value={pwConfirm}
            // onChange={handlePwConfirmChange}
            // error={pwConfirmError}
            isPassword={true}
          />
        </div>
      </div>
      {isDesktop && (
        <div className='flex justify-end w-full'>
          <div className='w-[128px]'>
            <BaseButton disabled={false}>변경하기</BaseButton>
          </div>
        </div> // 데스크탑일 때는 버튼 활성화
      )}
    </div>
  );
}
