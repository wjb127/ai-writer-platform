# 스토리메이커 - AI 소설 플랫폼

AI와 함께 당신의 소설을 쉽게 완성할 수 있는 플랫폼, 스토리메이커의 랜딩 페이지입니다. 하루 1시간만 투자해도 퀄리티 높은 소설을 쓰고 수익화까지 가능한 서비스를 소개합니다.

## 프로젝트 소개

이 레포지토리는 스토리메이커 서비스의 사업성 검증을 위한 랜딩 페이지를 포함하고 있습니다. 구글 애즈 광고를 집행하여 서비스에 대한 사전 예약 및 관심도를 측정하기 위한 목적으로 제작되었습니다.

## 주요 특징

- **AI 작문 어시스턴트**: 플롯 구성, 캐릭터 개발, 문장 개선까지 AI가 당신의 글쓰기를 도와줍니다
- **하루 1시간으로 충분**: 짧은 시간에도 효율적으로 소설을 진행할 수 있는 맞춤형 시스템
- **수익화 시스템**: 구독 모델, 팁 시스템으로 당신의 창작물로 수익을 창출할 수 있습니다
- **글쓰기 커뮤니티**: 다른 작가들과 소통하고 피드백을 주고받으며 함께 성장하세요

## 시작하기

```bash
# 저장소 클론
git clone https://github.com/your-username/ai-story-platform.git

# 디렉토리 이동
cd ai-story-platform

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 기술 스택

- Next.js 14
- React
- Tailwind CSS
- TypeScript
- Supabase (사용자 데이터 수집 및 분석)

## 프로젝트 구조

```
/public            - 정적 파일(이미지, 아이콘 등)
/src
  /app            - Next.js 페이지 컴포넌트
    /components   - 재사용 가능한 UI 컴포넌트
  /utils          - 유틸리티 함수 및 API 클라이언트
```

## 사업성 검증 방법론

1. **랜딩 페이지 구현**: 서비스 가치 제안과 핵심 기능을 명확히 전달
2. **가상 결제 버튼 구현**: Supabase로 클릭률 및 전환율 측정
3. **구글 애즈 광고 집행**: 타겟 고객층에게 랜딩 페이지 노출
4. **데이터 수집 및 분석**: 페이지 방문, 버튼 클릭, 이메일 등록 등의 지표 분석
5. **MVP 개발 여부 결정**: 수집된 데이터를 바탕으로 실제 서비스 개발 진행 여부 결정

## Supabase 설정

이 프로젝트는 버튼 클릭 이벤트와 리드 수집을 추적하기 위해 Supabase를 사용합니다. 다음 단계에 따라 설정하세요:

1. [Supabase](https://supabase.com/) 계정을 만들고 새 프로젝트를 생성합니다.
2. 프로젝트에서 다음 SQL을 실행하여 스키마와 테이블을 생성하세요:
   
   ```sql
   -- 스토리메이커 프로젝트를 위한 별도 스키마 생성
   CREATE SCHEMA storymaker;
   
   -- 버튼 클릭 추적 테이블
   CREATE TABLE storymaker.button_clicks (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     button_type TEXT NOT NULL,
     user_ip TEXT,
     user_agent TEXT,
     referrer TEXT,
     button_text TEXT,
     button_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- 리드(이메일) 수집 테이블
   CREATE TABLE storymaker.leads (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT NOT NULL UNIQUE,
     source TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- 스키마에 대한 접근 권한 설정
   GRANT USAGE ON SCHEMA storymaker TO anon, authenticated, service_role;
   GRANT ALL ON ALL TABLES IN SCHEMA storymaker TO anon, authenticated, service_role;
   GRANT ALL ON ALL SEQUENCES IN SCHEMA storymaker TO anon, authenticated, service_role;
   ```

3. Supabase 프로젝트의 URL과 익명 키를 프로젝트 루트의 `.env.local` 파일에 추가하세요:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 라이선스

MIT
