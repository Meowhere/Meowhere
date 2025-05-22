# 🐣 어디가냥

> **“어디가냥은 쉼이 필요한 모두를 위한 체험 예약 플랫폼입니다.”**  

---

## 👩‍💻 팀 소개

| 강희정 | 고서영 | 김승민 | 김영호 | 김희성 | 차경훈 |
|--------|--------|--------|--------|--------|--------|
| [@tansxx](https://github.com/tansxx) | [@K0seoyoung](https://github.com/K0seoyoung) | [@KingsMinn](https://github.com/KingsMinn) | [@numi8462](https://github.com/numi8462) | [@huiseong29](https://github.com/huiseong29) | [@yujeongchoi](https://github.com/yujeongchoi) |
| <img src="https://avatars.githubusercontent.com/u/159680008?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/134926158?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/134246428?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/135202559?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/175691313?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/000000000?v=4" width="100"/> |


---

## 🔗 배포 주소


---

## ⏰ 프로젝트 기간

2025년 MM월 DD일 ~ 2025년 MM월 DD일

---

## 🐾 주요 기능

- 🗺️ 위치 기반 체험 지도 탐색
- 📅 캘린더 뷰를 통한 예약일 선택
- 👥 판매자/체험자 겸용 플랫폼 구조
- 🐣 병아리 테마의 감성 UI
- 💬 체험 후기, 등록, 관리 기능 포함

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **언어/프레임워크** | [Next.js (App Router)](https://nextjs.org/docs/app/building-your-application/routing) + TypeScript |
| **스타일링** | [Tailwind CSS](https://tailwindcss.com/) |
| **상태 관리** | [React Query](https://tanstack.com/query/latest) + [Zustand](https://github.com/pmndrs/zustand) |
| **라우팅** | Next.js 내장 App Router + [next-route](https://github.com/jeremyben/next-route) |

---

## 📁 폴더 구조 (예시)

```bash
where-gnyang/
├── app/                 # App Router 전용 폴더
│   ├── layout.tsx
│   └── page.tsx
├── components/          # 공통 UI 컴포넌트
├── features/            # 도메인 단위 기능
├── hooks/               # 커스텀 훅
├── libs/                # Zustand, API 클라이언트 등
├── public/              # 정적 리소스
├── styles/              # Tailwind config, global styles
└── utils/               # 유틸 함수 모음
```

---

## 🌱 브랜치 네이밍 규칙

| 브랜치 종류 | 네이밍 규칙 예시 |
|-------------|------------------|
| 기능 개발   | `feature/{기능-설명}` → `feature/map-filter` |
| 버그 수정   | `fix/{버그-설명}` → `fix/reservation-button` |
| 문서 작업   | `docs/{문서-내용}` → `docs/readme-update` |
| 핫픽스       | `hotfix/{이슈-설명}` → `hotfix/deploy-error` |

---

## 📝 커밋 컨벤션

```bash
[타입] 명확한 제목

상세 설명 (필요 시)

이슈 연결: #번호
```

| 타입 | 설명 |
|------|------|
| ✨ Feat | 새로운 기능 추가 |
| 🐛 Fix | 버그 수정 |
| 💄 Style | UI 및 포맷 수정 |
| 🔨 Refactor | 리팩토링 |
| 📚 Docs | 문서 작업 |
| ✅ Test | 테스트 코드 |
| 🔧 Chore | 설정 변경 등 기타 |

---

## 🔃 PR & Issue 작성 규칙

| 항목 | 내용 |
|------|------|
| Summary | 변경 요약 |
| Changes | 주요 변경 내용 |
| Checklist | 테스트, 설명, 브랜치 확인 등 |
| Screenshots | UI 변경 시 캡처 필수 |
| References | 관련 이슈 or 링크 |

---

> 🐤 **병아리처럼 소소한 체험이 모여, 나만의 쉼표가 됩니다.**
