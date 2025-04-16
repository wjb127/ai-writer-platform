# 랜딩 페이지 템플릿 라이브러리

다양한 목적에 맞는 랜딩 페이지 템플릿을 제공하는 라이브러리입니다. 제품, 서비스, 이벤트 등 여러 용도에 맞게 쉽고 빠르게 랜딩 페이지를 생성할 수 있습니다.

## 특징

- **재사용 가능한 템플릿**: 핵심 컴포넌트를 재사용하여 다양한 랜딩 페이지 생성
- **빠른 개발**: 기획 1일, 개발 1일, 광고 세팅 1일, 데이터 수집 1주일, 분석 1일로 약 2주 내에 완료 가능
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험 제공
- **커스터마이징 용이**: 컨텐츠 및 디자인 요소를 손쉽게 변경 가능
- **검증된 구조**: 전환율에 최적화된 구조와 디자인

## 예시 페이지

- **제품 랜딩 페이지**: 제품 소개 및 판매를 위한 최적화된 랜딩 페이지
- **서비스 랜딩 페이지**: 전문 서비스 비즈니스를 위한 특화된 랜딩 페이지
- **이벤트 랜딩 페이지**: 특별 할인, 프로모션 이벤트에 최적화된 랜딩 페이지

## 시작하기

```bash
# 저장소 클론
git clone https://github.com/wjb127/landing-mvp.git

# 디렉토리 이동
cd landing-mvp

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 템플릿을 활용한 새 프로젝트 만들기

이 템플릿을 기반으로 새로운 프로젝트를 만들고 다른 GitHub 저장소에 업로드하는 방법입니다:

### 1. 템플릿 클론하기

```bash
# 템플릿 저장소를 새 이름으로 클론
git clone https://github.com/wjb127/landing-mvp.git my-landing-page

# 새 프로젝트 디렉토리로 이동
cd my-landing-page
```

### 2. Git 연결 초기화하기

```bash
# .git 디렉토리 삭제 (기존 Git 히스토리 제거)
rm -rf .git

# 새 Git 저장소 초기화
git init

# 모든 파일 스테이징
git add .

# 첫 커밋 생성
git commit -m "초기 커밋: 랜딩 페이지 템플릿 기반"
```

### 3. 새 GitHub 저장소 만들기

1. GitHub 웹사이트에서 새 저장소 생성 (예: `my-project-landing`)
2. 저장소를 비어있는 상태로 생성 (README, 라이센스 등 추가하지 않음)

### 4. 로컬 저장소를 새 GitHub 저장소에 연결하기

```bash
# 원격 저장소 연결
git remote add origin https://github.com/your-username/my-project-landing.git

# 원격 저장소로 푸시
git push -u origin main  # 또는 master (Git 버전에 따라 다름)
```

### 5. 템플릿 커스터마이징하기

내용을 프로젝트에 맞게 수정합니다:

- `package.json`의 이름과 버전 업데이트
- `src/app/components/LandingTemplate.tsx`를 기반으로 내용 커스터마이징
- 예시 페이지들을 참고하여 필요한 랜딩 페이지 생성

### 6. 변경사항 커밋 및 푸시

```bash
git add .
git commit -m "랜딩 페이지 내용 커스터마이징"
git push
```

## 기술 스택

- Next.js
- React
- Tailwind CSS
- TypeScript

## 사용 예시

```tsx
import LandingTemplate from "../components/LandingTemplate";

export default function CustomLandingPage() {
  return (
    <LandingTemplate
      title="나만의 랜딩 페이지 제목"
      subtitle="부제목을 입력하세요"
      primaryCTA={{
        text: "지금 시작하기",
        href: "/start",
      }}
      // 기타 필요한 속성들 추가
    />
  );
}
```

## 라이선스

MIT

## Supabase 설정

이 프로젝트는 버튼 클릭 이벤트와 리드 수집을 추적하기 위해 Supabase를 사용합니다. 다음 단계에 따라 설정하세요:

1. [Supabase](https://supabase.com/) 계정을 만들고 새 프로젝트를 생성합니다.
2. 프로젝트에서 다음 테이블을 생성하세요:
   
   **button_clicks 테이블**
   ```sql
   CREATE TABLE button_clicks (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     button_type TEXT NOT NULL,
     user_ip TEXT,
     user_agent TEXT,
     referrer TEXT,
     button_text TEXT,
     button_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **leads 테이블**
   ```sql
   CREATE TABLE leads (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT NOT NULL UNIQUE,
     source TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. Supabase 프로젝트의 URL과 익명 키를 프로젝트 루트의 `.env.local` 파일에 추가하세요:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

이제 버튼 클릭 이벤트와 사전 예약 이메일이 Supabase 데이터베이스에 저장됩니다. Supabase 대시보드에서 수집된 데이터를 확인할 수 있습니다.
