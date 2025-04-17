"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, TooltipProps } from 'recharts';

interface ButtonClickStats {
  button_type: string;
  click_count: number;
  first_click: string;
  last_click: string;
}

interface LeadStats {
  source: string;
  lead_count: number;
  first_lead: string;
  last_lead: string;
}

interface Lead {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

// Pie 차트 라벨 타입
interface PieChartLabel {
  source: string;
  lead_count: number;
  percent: number;
}

// 버튼 타입을 한국어로 변환하는 함수
const getButtonTypeInKorean = (buttonType: string): string => {
  const buttonTypeMap: Record<string, string> = {
    'signup_button': '가입 버튼',
    'free_trial_button': '무료 체험 버튼',
    'primary': '메인 버튼',
    'secondary': '보조 버튼',
    'signup': '가입 신청',
    'free_trial': '무료 체험 신청',
  };
  
  return buttonTypeMap[buttonType] || buttonType;
};

// 소스 타입을 한국어로 변환하는 함수
const getSourceTypeInKorean = (sourceType: string): string => {
  const sourceTypeMap: Record<string, string> = {
    'signup': '가입 신청',
    'free_trial': '무료 체험 신청',
  };
  
  return sourceTypeMap[sourceType] || sourceType;
};

export default function AdminDashboard() {
  const [buttonStats, setButtonStats] = useState<ButtonClickStats[]>([]);
  const [leadStats, setLeadStats] = useState<LeadStats[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview');
  
  // 인증 상태와 통계 정보 로드
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // 버튼 클릭 통계 가져오기
        const { data: buttonData, error: buttonError } = await supabase
          .from('sm_button_clicks_stats')
          .select('*');
        
        if (buttonError) {
          console.error("Error fetching button stats:", buttonError);
          if (buttonError.code === "42P01") {
            setAuthError("테이블이 존재하지 않습니다. 먼저 SQL 스크립트를 실행해주세요.");
          } else if (buttonError.code === "PGRST301") {
            setAuthError("인증 오류: 대시보드에 접근할 권한이 없습니다.");
          } else {
            setAuthError(`오류 발생: ${buttonError.message}`);
          }
        } else {
          setButtonStats(buttonData || []);
        }
        
        // 리드 통계 가져오기
        const { data: leadStatsData, error: leadStatsError } = await supabase
          .from('sm_leads_stats')
          .select('*');
        
        if (leadStatsError) {
          console.error("Error fetching lead stats:", leadStatsError);
        } else {
          setLeadStats(leadStatsData || []);
        }
        
        // 리드 목록 가져오기
        const { data: leadsData, error: leadsError } = await supabase
          .from('sm_leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (leadsError) {
          console.error("Error fetching leads:", leadsError);
        } else {
          setLeads(leadsData || []);
        }
      } catch (error) {
        console.error("Error:", error);
        setAuthError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 차트용 색상
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // 다운로드 기능
  const downloadCSV = (data: any[], filename: string) => {
    // CSV 헤더 생성
    const headers = Object.keys(data[0] || {}).join(',');
    // CSV 데이터 행 생성
    const csvData = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    // CSV 문자열 생성
    const csv = `${headers}\n${csvData}`;
    
    // 다운로드 링크 생성
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">스토리메이커 관리자 대시보드</h1>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            홈으로 돌아가기
          </Link>
        </div>

        {/* 탭 네비게이션 */}
        {!loading && !authError && (
          <div className="mb-6 border-b">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-4 font-medium ${activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                개요
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-2 px-4 font-medium ${activeTab === 'leads' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                리드 목록
              </button>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p>데이터를 불러오는 중...</p>
          </div>
        ) : authError ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-bold">오류 발생</p>
            <p>{authError}</p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
              <h3 className="font-semibold mb-2">다음 SQL을 Supabase SQL 에디터에서 실행해주세요:</h3>
              <pre className="text-xs">
{`-- 기존 테이블 삭제 (필요한 경우)
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
GRANT SELECT ON sm_leads_stats TO authenticated;`}
              </pre>
            </div>
          </div>
        ) : activeTab === 'overview' ? (
          <>
            {/* 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">총 버튼 클릭</div>
                <div className="mt-2 text-3xl font-bold">
                  {buttonStats.reduce((sum, stat) => sum + (stat.click_count || 0), 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {buttonStats.length > 0 
                    ? `마지막 클릭: ${formatDate(buttonStats.sort((a, b) => new Date(b.last_click).getTime() - new Date(a.last_click).getTime())[0]?.last_click)}`
                    : '아직 클릭 데이터가 없습니다'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">총 리드 수</div>
                <div className="mt-2 text-3xl font-bold">
                  {leadStats.reduce((sum, stat) => sum + (stat.lead_count || 0), 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {leadStats.length > 0 
                    ? `마지막 리드: ${formatDate(leadStats.sort((a, b) => new Date(b.last_lead).getTime() - new Date(a.last_lead).getTime())[0]?.last_lead)}`
                    : '아직 리드 데이터가 없습니다'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">전환율</div>
                <div className="mt-2 text-3xl font-bold">
                  {buttonStats.length > 0 && leadStats.length > 0 ? (
                    `${((leadStats.reduce((sum, stat) => sum + (stat.lead_count || 0), 0) / 
                       buttonStats.reduce((sum, stat) => sum + (stat.click_count || 0), 0)) * 100).toFixed(1)}%`
                  ) : '측정 불가'}
                </div>
                <div className="text-xs text-gray-500 mt-1">클릭 대비 리드 획득 비율</div>
              </div>
            </div>
            
            {/* 차트 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 버튼 클릭 차트 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">버튼 클릭 통계</h2>
                  {buttonStats.length > 0 && (
                    <button 
                      onClick={() => downloadCSV(buttonStats, '버튼클릭통계')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      CSV 다운로드
                    </button>
                  )}
                </div>
                {buttonStats.length === 0 ? (
                  <p className="text-gray-500 italic">아직 데이터가 없습니다.</p>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={buttonStats}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="button_type" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [`${value}회`, '클릭 수']}
                          labelFormatter={(label: string) => `버튼: ${getButtonTypeInKorean(label)}`}
                        />
                        <Legend />
                        <Bar dataKey="click_count" name="클릭 수" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
              
              {/* 리드 소스 파이 차트 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">리드 소스 분포</h2>
                  {leadStats.length > 0 && (
                    <button 
                      onClick={() => downloadCSV(leadStats, '리드통계')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      CSV 다운로드
                    </button>
                  )}
                </div>
                {leadStats.length === 0 ? (
                  <p className="text-gray-500 italic">아직 데이터가 없습니다.</p>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="lead_count"
                          nameKey="source"
                          label={({ source, lead_count, percent }: PieChartLabel) => 
                            `${source}: ${lead_count}명 (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {leadStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number, name: string, props: any) => [`${value}명`, props.payload.source]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            
            {/* 상세 통계 테이블 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">버튼 클릭 상세</h2>
                <div className="overflow-x-auto">
                  {buttonStats.length === 0 ? (
                    <p className="text-gray-500 italic">아직 데이터가 없습니다.</p>
                  ) : (
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">버튼 유형</th>
                          <th className="text-left py-2">클릭 수</th>
                          <th className="text-left py-2">첫 클릭</th>
                          <th className="text-left py-2">마지막 클릭</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buttonStats.map((stat, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{getButtonTypeInKorean(stat.button_type)}</td>
                            <td className="py-2">{stat.click_count}</td>
                            <td className="py-2">{formatDate(stat.first_click)}</td>
                            <td className="py-2">{formatDate(stat.last_click)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">리드 수집 상세</h2>
                <div className="overflow-x-auto">
                  {leadStats.length === 0 ? (
                    <p className="text-gray-500 italic">아직 데이터가 없습니다.</p>
                  ) : (
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">소스</th>
                          <th className="text-left py-2">리드 수</th>
                          <th className="text-left py-2">첫 등록</th>
                          <th className="text-left py-2">마지막 등록</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadStats.map((stat, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{getSourceTypeInKorean(stat.source)}</td>
                            <td className="py-2">{stat.lead_count}</td>
                            <td className="py-2">{formatDate(stat.first_lead)}</td>
                            <td className="py-2">{formatDate(stat.last_lead)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* 리드 목록 탭 */
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">리드 목록</h2>
              {leads.length > 0 && (
                <button 
                  onClick={() => downloadCSV(leads, '리드목록')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  CSV 다운로드
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              {leads.length === 0 ? (
                <p className="text-gray-500 italic">아직 데이터가 없습니다.</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">이메일</th>
                      <th className="text-left py-2">소스</th>
                      <th className="text-left py-2">등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b">
                        <td className="py-2">{lead.email}</td>
                        <td className="py-2">{getSourceTypeInKorean(lead.source)}</td>
                        <td className="py-2">{formatDate(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 