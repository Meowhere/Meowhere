# 🚀 어디가냥 GNB 사용 가이드

## 📋 목차

1. [기본 사용법](#기본-사용법)
2. [동적 업데이트](#동적-업데이트)
3. [Props 상세 설명](#props-상세-설명)
4. [실제 사용 예시](#실제-사용-예시)
5. [주의사항](#주의사항)
6. [트러블슈팅](#트러블슈팅)

---

## 🎯 기본 사용법

### **1. 기본 import**

```typescript
import { useGnb } from '@/src/hooks/useGnb';
```

### **2. 페이지 컴포넌트에서 사용**

```typescript
export default function MyPage() {
  const router = useRouter();

  useGnb({
    title: '페이지 제목',
    subtitle: '부제목 (선택사항)',
    backAction: () => router.back(),
    rightButtons: [
      <HeartIcon key="heart" aria-label="좋아요" />,
      <KebabIcon key="kebab" aria-label="더보기" />
    ],
  });

  return <div>페이지 내용</div>;
}
```

---

## 🔄 동적 업데이트

페이지 로드 후 GNB를 동적으로 변경하고 싶을 때 사용하세요!

### **1. Store import 추가**

```typescript
import { useGnbStore } from '@/src/store/gnbStore';
```

### **2. 사용 방법**

```typescript
export default function MyPage() {
  const [count, setCount] = useState(0);
  const { setTitle, setSubtitle, setRightButtons } = useGnbStore();

  // 초기 설정
  useGnb({
    title: '초기 제목',
    subtitle: '초기 부제목'
  });

  // 동적 업데이트 예시들
  const updateTitle = () => {
    setTitle(`업데이트된 제목 ${count}`);
    setCount(count + 1);
  };

  const updateButtons = () => {
    setRightButtons([
      <button key="save" onClick={saveData}>저장</button>
    ]);
  };

  return (
    <div>
      <button onClick={updateTitle}>제목 변경</button>
      <button onClick={updateButtons}>버튼 변경</button>
    </div>
  );
}
```

---

## 📝 Props 상세 설명

### **UseGnbProps Interface**

| Props            | Type                | Required | Default | 설명                                 |
| ---------------- | ------------------- | -------- | ------- | ------------------------------------ |
| `title`          | `string`            | ✅       | -       | GNB 제목                             |
| `subtitle`       | `string`            | ✅       | -       | GNB 부제목                           |
| `backAction`     | `() => void`        | ❌       | `null`  | 뒤로가기 버튼 클릭 시 실행될 함수    |
| `rightButtons`   | `React.ReactNode[]` | ❌       | `[]`    | 우측 버튼들 (최대 2개)               |
| `resetOnUnmount` | `boolean`           | ❌       | `true`  | 컴포넌트 언마운트 시 GNB 초기화 여부 |

### **Store Functions**

| Function                                      | 설명               | 사용 시점     |
| --------------------------------------------- | ------------------ | ------------- |
| `setTitle(title: string)`                     | 제목 변경          | 동적 업데이트 |
| `setSubtitle(subtitle: string)`               | 부제목 변경        | 동적 업데이트 |
| `setBackAction(action: () => void \| null)`   | 뒤로가기 액션 변경 | 동적 업데이트 |
| `setRightButtons(buttons: React.ReactNode[])` | 우측 버튼들 변경   | 동적 업데이트 |
| `resetGnb()`                                  | GNB 초기화         | 수동 초기화   |

---

## 💡 실제 사용 예시

### **1. 기본 페이지**

```typescript
export default function ProfilePage() {
  useGnb({
    title: '프로필',
    subtitle: '내 정보 관리',
    backAction: () => router.back(),
  });
}
```

### **2. 검색 결과 페이지**

```typescript
export default function SearchPage() {
  const [results, setResults] = useState([]);
  const { setTitle } = useGnbStore();

  useGnb({
    title: '검색 중...',
    backAction: () => router.back(),
  });

  useEffect(() => {
    if (results.length > 0) {
      setTitle(`검색 결과 ${results.length}개`);
    } else {
      setTitle('검색 결과 없음');
    }
  }, [results]);
}
```

### **3. 편집 페이지**

```typescript
export default function EditPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { setRightButtons } = useGnbStore();

  useGnb({
    title: '게시글 수정',
    backAction: () => router.back(),
    rightButtons: [
      <button key="edit" onClick={() => setIsEditing(true)}>
        편집
      </button>
    ],
  });

  useEffect(() => {
    if (isEditing) {
      setRightButtons([
        <button key="cancel" onClick={() => setIsEditing(false)}>
          취소
        </button>,
        <button key="save" onClick={handleSave}>
          저장
        </button>
      ]);
    }
  }, [isEditing]);
}
```

### **4. 로딩 상태 관리**

```typescript
export default function DataPage() {
  const [loading, setLoading] = useState(true);
  const { setTitle, setRightButtons } = useGnbStore();

  useGnb({
    title: '로딩 중...',
    subtitle: '데이터를 불러오는 중입니다',
  });

  useEffect(() => {
    fetchData().then((data) => {
      setLoading(false);
      setTitle('데이터 조회');
      setRightButtons([
        <button key="refresh" onClick={refreshData}>
          새로고침
        </button>
      ]);
    });
  }, []);
}
```

---

## ⚠️ 주의사항

### **1. rightButtons에 key 필수**

```typescript
// ❌ 잘못된 방법
rightButtons: [
  <HeartIcon />,  // key 없음 - React 경고 발생
]

// ✅ 올바른 방법
rightButtons: [
  <HeartIcon key="heart" />,  // key 있음
]
```

### **2. 최대 2개 버튼**

```typescript
// ❌ 3개 이상 - 자동으로 처음 2개만 표시됨
rightButtons: [
  <Button1 key="1" />,
  <Button2 key="2" />,
  <Button3 key="3" />,  // 이건 무시됨
]
```

### **3. 접근성 고려**

```typescript
// ✅ 접근성 좋은 방법
rightButtons: [
  <HeartIcon
    key="heart"
    aria-label="좋아요"
    onClick={handleLike}
  />,
]
```

### **4. 메모리 누수 방지**

```typescript
// ✅ 컴포넌트 언마운트 시 자동 초기화 (기본값)
useGnb({
  title: '제목',
  resetOnUnmount: true, // 기본값이라 생략 가능
});

// ✅ 수동으로 초기화하고 싶은 경우
useGnb({
  title: '제목',
  resetOnUnmount: false,
});
```

---

## 🔧 트러블슈팅

### **Q: "Maximum update depth exceeded" 에러가 떠요!**

**A:** 의존성 배열에 store 함수들을 넣지 마세요.

```typescript
// ❌ 잘못된 방법
useEffect(() => {
  setTitle('제목');
}, [title, setTitle]); // setTitle 제거 필요

// ✅ 올바른 방법
useEffect(() => {
  setTitle('제목');
}, [title]); // store 함수는 의존성에서 제외
```

### **Q: rightButtons가 업데이트되지 않아요!**

**A:** JSX 요소들이 매번 새로 생성되어서 그래요. useMemo를 사용하거나 store를 직접 사용하세요.

```typescript
// ✅ 해결 방법 1: useMemo 사용
const buttons = useMemo(() => [
  <HeartIcon key="heart" />
], []);

// ✅ 해결 방법 2: 동적 업데이트
const { setRightButtons } = useGnbStore();
setRightButtons([<HeartIcon key="heart" />]);
```

### **Q: 홈페이지('/')에서 title이 표시되지 않아요!**

**A:** 홈페이지는 검색바가 표시되는 특별한 레이아웃입니다. 다른 페이지에서만 title이 표시됩니다.

### **Q: 뒤로가기 버튼이 나타나지 않아요!**

**A:** backAction이나 rightButtons가 있을 때만 뒤로가기 버튼이 표시됩니다.

---

## 🎯 패턴 요약

### **기본 패턴**

```typescript
// 1. 초기 설정 (페이지 로드 시 한 번만)
useGnb({ title, subtitle, backAction, rightButtons });

// 2. 동적 업데이트 (필요할 때마다)
const { setTitle, setSubtitle, setRightButtons } = useGnbStore();
```

### **권장 사용법**

- ✅ 페이지 진입 시: `useGnb` 사용
- ✅ 상태 변경 시: `useGnbStore` 사용
- ✅ 정적 내용: `useGnb`만으로 충분
- ✅ 동적 내용: `useGnb` + `useGnbStore` 조합

---

**GNB 마스터 완료! 🎉**

이 가이드를 통해 어디가냥 GNB를 완벽하게 활용하세요!
