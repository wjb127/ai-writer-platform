import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 더미 클라이언트 타입 정의
type DummyClient = {
  from: (table: string) => {
    insert: (data: unknown[]) => Promise<{ error: null }>;
    select: (column: string, options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) => {
      order: (column: string, options?: { ascending?: boolean }) => Promise<{ data: any[]; error: null }>;
      data: any[];
      error: null;
    };
  };
  rpc: (fn: string, params?: Record<string, unknown>) => Promise<{ data: unknown; error: null | Error }>;
};

// Supabase 클라이언트 생성 (환경 변수가 없으면 더미 클라이언트 생성)
let supabase: SupabaseClient<any, any, any> | DummyClient;

// 유효한 URL과 키가 있을 때만 실제 Supabase 클라이언트 생성
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // 테이블 초기화 함수
  const initializeTables = async () => {
    try {
      // 테이블 존재 여부 확인 (간단한 쿼리 실행)
      const { error } = await supabase.from('sm_button_clicks').select('id', { count: 'exact', head: true });
      
      if (error && error.code === '42P01') {  // 테이블이 존재하지 않는 경우
        console.log('테이블이 존재하지 않습니다. 새로 생성해야 합니다.');
        await createTables();
      } else {
        console.log('테이블이 이미 존재합니다. 기존 테이블을 사용합니다.');
      }
    } catch (error) {
      console.error('테이블 확인 중 오류 발생:', error);
      await createTables();
    }
  };
  
  // 테이블 생성 함수
  const createTables = async () => {
    console.log('새로운 테이블 생성이 필요합니다. 다음 SQL을 Supabase SQL 에디터에서 실행해주세요:');
    console.log(`
-- 기존 테이블 삭제 (필요한 경우)
DROP TABLE IF EXISTS sm_button_clicks;
DROP TABLE IF EXISTS sm_leads;
DROP VIEW IF EXISTS sm_button_clicks_stats;
DROP VIEW IF EXISTS sm_leads_stats;

-- 버튼 클릭 추적 테이블
CREATE TABLE sm_button_clicks (
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
CREATE TABLE sm_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  marketing_consent BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS(Row Level Security) 활성화
ALTER TABLE sm_button_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sm_leads ENABLE ROW LEVEL SECURITY;

-- 익명 사용자를 위한 RLS 정책 생성 (INSERT만 허용)
CREATE POLICY "익명 사용자 버튼 클릭 삽입 허용" ON sm_button_clicks
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "익명 사용자 리드 정보 삽입 허용" ON sm_leads
  FOR INSERT WITH CHECK (true);
  
-- 관리자(authenticated)를 위한 모든 권한 정책 생성
CREATE POLICY "관리자 버튼 클릭 모든 권한" ON sm_button_clicks
  FOR ALL TO authenticated USING (true);
  
CREATE POLICY "관리자 리드 정보 모든 권한" ON sm_leads
  FOR ALL TO authenticated USING (true);
  
-- 데이터 조회를 위한 뷰 생성 (보안 강화)
CREATE VIEW sm_button_clicks_stats AS
  SELECT 
    button_type, 
    COUNT(*) as click_count,
    MIN(created_at) as first_click,
    MAX(created_at) as last_click
  FROM sm_button_clicks
  GROUP BY button_type;

CREATE VIEW sm_leads_stats AS
  SELECT 
    source,
    COUNT(*) as lead_count,
    MIN(created_at) as first_lead,
    MAX(created_at) as last_lead
  FROM sm_leads
  GROUP BY source;

-- 뷰에 대한 접근 권한 설정
GRANT SELECT ON sm_button_clicks_stats TO authenticated;
GRANT SELECT ON sm_leads_stats TO authenticated;
    `);
  };
  
  // 애플리케이션 시작 시 테이블 초기화 시도
  initializeTables().catch(console.error);
  
} else {
  // Supabase 클라이언트 생성 (또는 API 키가 없는 경우 더미 클라이언트)
  const createClient = (): DummyClient => {
    // 더미 클라이언트 - 실제 작업 대신 로깅만 수행하고 개발 시 빈 데이터 배열 반환
    /* eslint-disable @typescript-eslint/no-unused-vars */
    let _client: DummyClient;
    
    // 더미 데이터 생성 (개발 환경에서 UI 테스트를 위함)
    const dummyLeads = [
      {
        id: '1',
        email: 'test1@example.com',
        source: 'signup',
        marketing_consent: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        email: 'test2@example.com',
        source: 'free_trial',
        marketing_consent: false,
        created_at: new Date(Date.now() - 86400000).toISOString() // 하루 전
      }
    ];
    
    const dummyButtonClicks = [
      {
        id: '1',
        button_type: 'signup_button',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        button_type: 'free_trial_button',
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    const dummyData: Record<string, any[]> = {
      'sm_leads': dummyLeads,
      'sm_button_clicks': dummyButtonClicks,
      'sm_leads_stats': [
        { source: 'signup', lead_count: 1, first_lead: new Date().toISOString(), last_lead: new Date().toISOString() },
        { source: 'free_trial', lead_count: 1, first_lead: new Date(Date.now() - 86400000).toISOString(), last_lead: new Date(Date.now() - 86400000).toISOString() }
      ],
      'sm_button_clicks_stats': [
        { button_type: 'signup_button', click_count: 1, first_click: new Date().toISOString(), last_click: new Date().toISOString() },
        { button_type: 'free_trial_button', click_count: 1, first_click: new Date(Date.now() - 86400000).toISOString(), last_click: new Date(Date.now() - 86400000).toISOString() }
      ]
    };
    
    _client = {
      from: ((table: string) => {
        console.log(`[개발 모드] 테이블 접근: ${table}`);
        
        return {
          insert: (data: unknown[]) => {
            console.log('[개발 모드] 인서트 작업:', table, data);
            return Promise.resolve({ error: null });
          },
          select: (column: string, options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) => {
            console.log('[개발 모드] 셀렉트 작업:', table, column, options);
            
            // 더미 데이터 반환을 위한 객체
            const returnObj = {
              order: (column: string, options?: { ascending?: boolean }) => {
                console.log('[개발 모드] 정렬 작업:', column, options);
                // 개발 환경에서는 더미 데이터를 반환
                const tableData = dummyData[table] || [];
                
                // 정렬 로직 (간단한 구현)
                const sortedData = [...tableData].sort((a, b) => {
                  if (options?.ascending === false) {
                    return new Date(b[column]).getTime() - new Date(a[column]).getTime();
                  }
                  return new Date(a[column]).getTime() - new Date(b[column]).getTime();
                });
                
                return Promise.resolve({ data: sortedData, error: null });
              },
              data: dummyData[table] || [],
              error: null
            };
            
            return returnObj;
          }
        };
      }),
      rpc: (fn: string, params?: Record<string, unknown>) => {
        console.log('[개발 모드] RPC 함수 호출:', fn, params);
        return Promise.resolve({ data: null, error: null });
      }
    };
    
    console.warn('Supabase URL 또는 API 키가 제대로 설정되지 않았습니다. 개발 모드로 실행 중입니다.');
    return _client;
    /* eslint-enable @typescript-eslint/no-unused-vars */
  };
  
  supabase = createClient();
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
      .from('sm_button_clicks')
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

    // 마케팅 수신 동의 정보 추출 (buttonType에서)
    let source = buttonType;
    let hasMarketingConsent = false;
    
    if (buttonType.includes('_marketing_')) {
      const parts = buttonType.split('_marketing_');
      source = parts[0];
      hasMarketingConsent = parts[1] === 'yes';
    }

    const { error } = await supabase
      .from('sm_leads')
      .insert([{ 
        email, 
        source: source,
        marketing_consent: hasMarketingConsent,
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