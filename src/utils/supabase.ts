import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 더미 클라이언트 타입 정의
type DummyClient = {
  from: (table: string) => {
    insert: (data: unknown[]) => Promise<{ error: null }>;
  };
  rpc: (fn: string, params?: Record<string, unknown>) => Promise<{ data: unknown; error: null | Error }>;
};

// Supabase 클라이언트 생성 (환경 변수가 없으면 더미 클라이언트 생성)
let supabase: SupabaseClient<any, "storymaker", any> | DummyClient;

// Database, SchemaName 타입 정의
type Database = Record<string, unknown>;
type SchemaName = "storymaker";

// 유효한 URL과 키가 있을 때만 실제 Supabase 클라이언트 생성
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
      schema: 'storymaker'
    }
  });
  
  // 스키마 존재 여부 확인 및 초기화 함수
  const initializeSchema = async () => {
    try {
      // 스키마가 이미 존재하는지 확인
      const { data, error } = await supabase.rpc('check_schema_exists', { 
        schema_name: 'storymaker' 
      });
      
      // 에러가 발생했거나 스키마가 없는 경우 생성
      if (error || !data) {
        console.log('스키마가 존재하지 않거나 확인할 수 없습니다. 새로 생성합니다.');
        await createSchema();
      } else {
        console.log('storymaker 스키마가 이미 존재합니다. 기존 스키마를 사용합니다.');
      }
    } catch (error) {
      console.error('스키마 확인 중 오류 발생:', error);
      // 오류 발생 시 스키마 생성 시도
      await createSchema();
    }
  };
  
  // 스키마 및 테이블 생성 함수
  const createSchema = async () => {
    try {
      // SQL 실행 (관리자 권한 필요)
      // 프론트엔드에서는 실행이 제한될 수 있으므로 로그만 출력
      console.log('새로운 스키마 생성이 필요합니다. 다음 SQL을 Supabase SQL 에디터에서 실행해주세요:');
      console.log(`
-- 기존 스키마가 있다면 삭제 (주의: 모든 데이터가 삭제됩니다)
DROP SCHEMA IF EXISTS storymaker CASCADE;

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

-- RLS(Row Level Security) 활성화
ALTER TABLE storymaker.button_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE storymaker.leads ENABLE ROW LEVEL SECURITY;

-- 익명 사용자를 위한 RLS 정책 생성 (INSERT만 허용)
CREATE POLICY "익명 사용자 버튼 클릭 삽입 허용" ON storymaker.button_clicks
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "익명 사용자 리드 정보 삽입 허용" ON storymaker.leads
  FOR INSERT WITH CHECK (true);
  
-- 관리자(authenticated)를 위한 모든 권한 정책 생성
CREATE POLICY "관리자 버튼 클릭 모든 권한" ON storymaker.button_clicks
  FOR ALL TO authenticated USING (true);
  
CREATE POLICY "관리자 리드 정보 모든 권한" ON storymaker.leads
  FOR ALL TO authenticated USING (true);
  
-- 데이터 조회를 위한 뷰 생성 (보안 강화)
CREATE VIEW storymaker.button_clicks_stats AS
  SELECT 
    button_type, 
    COUNT(*) as click_count,
    MIN(created_at) as first_click,
    MAX(created_at) as last_click
  FROM storymaker.button_clicks
  GROUP BY button_type;

CREATE VIEW storymaker.leads_stats AS
  SELECT 
    source,
    COUNT(*) as lead_count,
    MIN(created_at) as first_lead,
    MAX(created_at) as last_lead
  FROM storymaker.leads
  GROUP BY source;

-- 뷰에 대한 접근 권한 설정
GRANT SELECT ON storymaker.button_clicks_stats TO authenticated;
GRANT SELECT ON storymaker.leads_stats TO authenticated;

-- 스키마 존재 확인용 함수 생성
CREATE OR REPLACE FUNCTION public.check_schema_exists(schema_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM information_schema.schemata
    WHERE schema_name = $1
  );
END;
$$;
      `);
    } catch (error) {
      console.error('스키마 생성 중 오류 발생:', error);
    }
  };
  
  // 애플리케이션 시작 시 스키마 초기화 시도
  initializeSchema().catch(console.error);
  
} else {
  // 더미 클라이언트 - 실제 작업 대신 로깅만 수행
  /* eslint-disable @typescript-eslint/no-unused-vars */
  supabase = {
    from: (table: string) => ({
      insert: (data: unknown[]) => {
        console.log('Supabase not configured. Would insert:', data);
        return Promise.resolve({ error: null });
      }
    }),
    rpc: (fn: string, params?: Record<string, unknown>) => {
      console.log(`Supabase not configured. Would call RPC: ${fn}`, params);
      return Promise.resolve({ data: false, error: null });
    }
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */
  console.warn('Supabase URL or Key not properly configured. Using dummy client.');
}

export { supabase };

// 버튼 클릭 이벤트 추적 함수
export const trackButtonClick = async (buttonType: string, userInfo: Record<string, unknown> = {}) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log(`[개발 모드] 버튼 클릭 추적: ${buttonType}`, userInfo);
      return;
    }

    // IP 주소 가져오기 (옵션)
    let ip = "개발환경";
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch (ipError) {
      console.warn('IP 주소를 가져오는데 실패했습니다:', ipError);
    }

    // 클릭 이벤트 저장
    const { error } = await supabase
      .from('button_clicks')
      .insert([
        { 
          button_type: buttonType,
          user_ip: ip,
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          ...userInfo
        }
      ]);

    if (error) {
      console.error('Error tracking button click:', error);
    }
  } catch (error) {
    console.error('Failed to track button click:', error);
  }
};

// 리드 저장 함수 (이메일 수집용)
export const saveLeadInfo = async (email: string, buttonType: string) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log(`[개발 모드] 이메일 저장: ${email}, 소스: ${buttonType}`);
      return true;
    }

    const { error } = await supabase
      .from('leads')
      .insert([{ 
        email, 
        source: buttonType,
        created_at: new Date().toISOString() 
      }]);

    if (error) {
      console.error('Error saving lead info:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to save lead info:', error);
    return false;
  }
}; 