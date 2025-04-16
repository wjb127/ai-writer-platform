import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 더미 클라이언트 타입 정의
type DummyClient = {
  from: (table: string) => {
    insert: (data: unknown[]) => Promise<{ error: null }>;
  };
};

// Supabase 클라이언트 생성 (환경 변수가 없으면 더미 클라이언트 생성)
let supabase: SupabaseClient | DummyClient;

// 유효한 URL과 키가 있을 때만 실제 Supabase 클라이언트 생성
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // 더미 클라이언트 - 실제 작업 대신 로깅만 수행
  supabase = {
    from: (table: string) => ({
      insert: (data: unknown[]) => {
        console.log('Supabase not configured. Would insert:', data);
        return Promise.resolve({ error: null });
      }
    })
  };
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
      .from('storymaker.button_clicks')
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
      .from('storymaker.leads')
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