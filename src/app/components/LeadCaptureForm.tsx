"use client";

import { useState } from 'react';
import { saveLeadInfo } from '@/utils/supabase';

interface LeadCaptureFormProps {
  buttonType: string;
  onSubmitCallback?: () => void;
}

export default function LeadCaptureForm({ buttonType, onSubmitCallback }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: '유효한 이메일을 입력해주세요.' });
      return;
    }

    if (!privacyConsent) {
      setMessage({ type: 'error', text: '개인정보 수집 및 이용에 동의해주세요.' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 마케팅 동의 여부도 함께 저장 (buttonType과 함께 전달)
      const success = await saveLeadInfo(email, `${buttonType}_marketing_${marketingConsent ? 'yes' : 'no'}`);
      
      if (success) {
        setMessage({ type: 'success', text: '사전 예약이 완료되었습니다. 곧 소식을 전해드릴게요!' });
        setEmail('');
        setPrivacyConsent(false);
        setMarketingConsent(false);
        if (onSubmitCallback) {
          onSubmitCallback();
        }
      } else {
        setMessage({ type: 'error', text: '저장 중 오류가 발생했습니다. 다시 시도해주세요.' });
      }
    } catch (error) {
      console.error('Error saving lead:', error);
      setMessage({ type: 'error', text: '처리 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일 주소
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {/* 개인정보 수집 및 이용 동의 */}
        <div className="flex items-start mt-2">
          <div className="flex items-center h-5">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="privacy" className="font-medium text-gray-700">
              개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500 text-xs mt-1">
              이메일 주소는 서비스 출시 안내 및 예약 확인을 위해 수집되며, 서비스 출시 후 1년간 보관됩니다.
              <button 
                type="button" 
                className="text-blue-600 underline ml-1"
                onClick={() => alert('개인정보 처리방침:\n1. 수집항목: 이메일 주소\n2. 수집목적: 서비스 출시 안내 및 예약 확인\n3. 보관기간: 서비스 출시 후 1년\n4. 동의 거부 시 서비스 이용이 제한됩니다.')}
              >
                자세히 보기
              </button>
            </p>
          </div>
        </div>
        
        {/* 마케팅 수신 동의 */}
        <div className="flex items-start mt-1">
          <div className="flex items-center h-5">
            <input
              id="marketing"
              name="marketing"
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketing" className="font-medium text-gray-700">
              마케팅 정보 수신 동의 (선택)
            </label>
            <p className="text-gray-500 text-xs mt-1">
              스토리메이커의 이벤트, 할인 및 신규 서비스 안내 등의 정보를 받아보실 수 있습니다.
            </p>
          </div>
        </div>
        
        {message && (
          <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '처리 중...' : '사전 예약하기'}
        </button>
      </form>
    </div>
  );
} 