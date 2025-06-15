export default function PrivacyPolicyModal() {
  return (
    <div className='w-full h-[500px] mx-auto p-[24px] font-light text-gray-800 dark:text-gray-300'>
      <h1 className='text-2xl font-bold mb-[24px]'>개인정보처리방침</h1>

      <div className='space-y-[24px]'>
        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>1. 개인정보처리방침 개요</h2>
          <p className='text-sm leading-relaxed'>
            본 서비스 "어디가냥"은 코드잇 부트캠프 14기의 심화프로젝트 과정에서 개발된 포트폴리오용
            웹 애플리케이션입니다. 본 개인정보처리방침은 이용자의 개인정보 보호를 위해
            개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라
            작성되었습니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>2. 개인정보 수집 및 이용 목적</h2>
          <ul className='text-sm space-y-[4px] list-disc list-inside'>
            <li>회원 가입 및 관리</li>
            <li>서비스 제공 및 운영</li>
            <li>본인 확인 및 인증</li>
            <li>서비스 개선 및 개발</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>3. 수집하는 개인정보 항목</h2>
          <div className='text-sm space-y-[8px]'>
            <p>
              <strong>필수 수집 항목:</strong>
            </p>
            <ul className='list-disc list-inside ml-[16px] space-y-[4px]'>
              <li>이메일 주소</li>
              <li>비밀번호 (암호화 저장)</li>
              <li>닉네임</li>
              <li>프로필 이미지 (선택 사항)</li>
            </ul>
            <p>
              <strong>카카오 로그인 시:</strong>
            </p>
            <ul className='list-disc list-inside ml-[16px]'>
              <li>카카오 계정 식별자</li>
            </ul>
            <p>
              <strong>자동 수집 정보:</strong>
            </p>
            <ul className='list-disc list-inside ml-[16px] space-y-[4px]'>
              <li>찜 목록 (로컬스토리지)</li>
              <li>다크모드 설정 (로컬스토리지)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>4. 개인정보 보유 및 이용 기간</h2>
          <p className='text-sm leading-relaxed'>
            본 서비스는 포트폴리오 프로젝트로서, 모든 개인정보의 실제 관리 및 보관은
            <strong> 코드잇(Codeit)</strong>에서 담당하고 있습니다. 개발팀은 개인정보에 대한
            직접적인 관리 권한이 없으며, 데이터의 보관 기간 및 삭제 정책은 코드잇의
            개인정보처리방침을 따릅니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>5. 개인정보 제3자 제공</h2>
          <p className='text-sm leading-relaxed'>
            본 서비스는 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 다음의 경우에는 예외로
            합니다:
          </p>
          <ul className='text-sm mt-[8px] space-y-[4px] list-disc list-inside ml-[16px]'>
            <li>카카오 로그인 서비스 이용 시 카카오와의 필요 최소한의 정보 교환</li>
            <li>법령에 의해 요구되는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>6. 개인정보 처리 위탁</h2>
          <div className='text-sm space-y-[8px]'>
            <p>
              <strong>위탁업체:</strong> 코드잇(Codeit)
            </p>
            <p>
              <strong>위탁업무:</strong> 개인정보 저장 및 관리, 서버 운영
            </p>
            <p>
              <strong>이미지 저장:</strong> Amazon Web Services (AWS) S3 (코드잇 관리)
            </p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>7. 정보주체의 권리</h2>
          <p className='text-sm leading-relaxed'>
            이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:
          </p>
          <ul className='text-sm mt-[8px] space-y-[4px] list-disc list-inside ml-[16px]'>
            <li>개인정보 처리 현황에 대한 열람 요구</li>
            <li>개인정보 수정 및 삭제 요구</li>
            <li>개인정보 처리 정지 요구</li>
            <li>회원 탈퇴</li>
          </ul>
          <p className='text-sm mt-[8px] text-gray-600 dark:text-gray-400'>
            ※ 단, 본 서비스는 포트폴리오 프로젝트로서 실제 데이터 관리는 코드잇에서 담당하므로,
            개인정보 관련 요청사항은 코드잇에 직접 문의하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>8. 개인정보 보호 조치</h2>
          <ul className='text-sm space-y-[4px] list-disc list-inside'>
            <li>비밀번호 암호화 저장</li>
            <li>HTTPS 통신 프로토콜 사용</li>
            <li>접근 권한 제한</li>
            <li>보안 프로그램 설치 및 갱신</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>9. 쿠키 및 로컬스토리지 사용</h2>
          <p className='text-sm leading-relaxed'>
            본 서비스는 사용자 경험 향상을 위해 다음과 같은 정보를 브라우저에 저장합니다:
          </p>
          <ul className='text-sm mt-[8px] space-y-[4px] list-disc list-inside ml-[16px]'>
            <li>로그인 상태 유지를 위한 인증 쿠키</li>
            <li>찜 목록 정보 (로컬스토리지)</li>
            <li>다크모드 설정 (로컬스토리지)</li>
          </ul>
          <p className='text-sm mt-[8px] text-gray-600 dark:text-gray-400'>
            이러한 정보는 사용자의 브라우저에만 저장되며, 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>10. 미성년자 개인정보 처리</h2>
          <p className='text-sm leading-relaxed'>
            본 서비스는 만 14세 이상 이용 가능하며, 미성년자의 개인정보 처리 시에는 법정대리인의
            동의를 받도록 하겠습니다. 단, 포트폴리오 프로젝트 특성상 실제 결제나 민감한 개인정보
            처리는 발생하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>11. 개인정보처리방침 변경</h2>
          <p className='text-sm leading-relaxed'>
            본 개인정보처리방침이 변경되는 경우, 변경사항을 서비스 내 공지사항을 통해
            알려드리겠습니다.
          </p>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-[12px]'>12. 문의</h2>
          <div className='text-sm space-y-[8px]'>
            <p>
              <strong>프로젝트명:</strong> 어디가냥 (코드잇 부트캠프 14기)
            </p>
            <p>
              <strong>개인정보 관리:</strong> 코드잇(Codeit)
            </p>
            <p>
              <strong>서비스 성격:</strong> 포트폴리오 프로젝트
            </p>
            <p className='text-gray-600 dark:text-gray-400 mt-[16px]'>
              개인정보와 관련된 문의사항이 있으시면 코드잇 고객센터로 연락하시기 바랍니다.
            </p>
          </div>
        </section>

        <section className='border-t border-gray-200 dark:border-gray-700 pt-[16px] pb-[80px]'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            본 개인정보처리방침은 2025년 6월부터 적용됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
