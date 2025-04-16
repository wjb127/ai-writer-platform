import LandingTemplate from "../../components/LandingTemplate";

export default function ServiceLandingPage() {
  return (
    <LandingTemplate
      logo={{
        src: "/logo-service.svg",
        alt: "서비스 로고",
        width: 120,
        height: 40,
      }}
      title="전문 서비스로 비즈니스의 성장을 가속화하세요"
      subtitle="맞춤형 솔루션으로 귀사의 비즈니스가 한 단계 도약할 수 있도록 지원합니다"
      heroImage={{
        src: "/hero-service.jpg",
        alt: "서비스 이미지",
        width: 600,
        height: 400,
      }}
      primaryCTA={{
        text: "무료 상담 신청",
        href: "/consultation",
      }}
      secondaryCTA={{
        text: "서비스 소개서 다운로드",
        href: "/download-brochure",
      }}
      features={[
        {
          title: "맞춤형 전략 수립",
          description: "귀사의 비즈니스 목표와 환경에 맞는 최적의 전략을 제시합니다",
        },
        {
          title: "전문가 컨설팅",
          description: "각 분야 10년 이상의 경력을 가진 전문가들이 지원합니다",
        },
        {
          title: "지속적인 관리",
          description: "프로젝트 완료 후에도 지속적인 모니터링과 개선을 제공합니다",
        },
        {
          title: "투명한 보고",
          description: "모든 과정과 결과를 투명하게 공유하고 보고합니다",
        },
      ]}
      testimonials={[
        {
          quote: "이 서비스를 통해 우리 회사의 매출이 30% 증가했습니다. 놀라운 결과였습니다!",
          author: "박지원",
          company: "A사 마케팅 이사",
        },
        {
          quote: "전문성과 친절함을 겸비한 최고의 서비스입니다. 다른 기업에도 추천하고 싶습니다.",
          author: "최영희",
          company: "B사 대표이사",
        },
        {
          quote: "복잡한 문제들이 체계적으로 해결되는 과정이 인상적이었습니다.",
          author: "정대현",
          company: "C사 운영 책임자",
        },
      ]}
      faqs={[
        {
          question: "서비스 비용은 어떻게 되나요?",
          answer: "각 기업의 상황과 요구사항에 따라 맞춤형으로 견적이 산출됩니다. 무료 상담을 통해 자세한 내용을 안내해 드립니다.",
        },
        {
          question: "서비스 기간은 얼마나 걸리나요?",
          answer: "프로젝트의 규모와 복잡성에 따라 다르지만, 일반적으로 3개월에서 6개월 정도 소요됩니다.",
        },
        {
          question: "어떤 기업들이 이 서비스를 이용할 수 있나요?",
          answer: "스타트업부터 대기업까지 모든 규모의 기업에 맞춤형 서비스를 제공하고 있습니다.",
        },
        {
          question: "서비스 지역 제한이 있나요?",
          answer: "전국 어디서나 서비스 이용이 가능합니다. 온라인 미팅과 현장 방문을 병행하여 진행합니다.",
        },
      ]}
      footerLinks={[
        { title: "서비스 소개", href: "/services" },
        { title: "성공 사례", href: "/case-studies" },
        { title: "자주 묻는 질문", href: "/faq" },
        { title: "블로그", href: "/blog" },
        { title: "회사 소개", href: "/about-us" },
        { title: "연락처", href: "/contact" },
        { title: "채용 정보", href: "/careers" },
        { title: "이용약관", href: "/terms" },
        { title: "개인정보처리방침", href: "/privacy" },
      ]}
    />
  );
} 