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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: '유효한 이메일을 입력해주세요.' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await saveLeadInfo(email, buttonType);
      
      if (success) {
        setMessage({ type: 'success', text: '사전 예약이 완료되었습니다. 곧 소식을 전해드릴게요!' });
        setEmail('');
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