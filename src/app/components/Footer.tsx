"use client";

import { useState } from 'react';

interface FooterLink {
  title: string;
  href: string;
}

interface FooterProps {
  links: FooterLink[];
}

export default function Footer({ links }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('현재 서비스 준비 중입니다. 조금만 기다려주세요.');
  };

  return (
    <footer className="w-full py-10 px-6 sm:px-10 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              onClick={handleLinkClick}
              className="text-sm hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>© {new Date().getFullYear()} 스토리메이커. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
} 