import LandingTemplate from "../../components/LandingTemplate";

export default function ProductLandingPage() {
  return (
    <LandingTemplate
      logo={{
        src: "/logo.svg",
        alt: "제품 로고",
        width: 120,
        height: 40,
      }}
      title="혁신적인 제품으로 일상을 바꾸세요"
      subtitle="간편하고 효율적인 솔루션으로 시간과 비용을 절약하세요"
      heroImage={{
        src: "/hero-product.jpg",
        alt: "제품 이미지",
        width: 600,
        height: 400,
      }}
      primaryCTA={{
        text: "지금 구매하기",
        href: "/purchase",
      }}
      secondaryCTA={{
        text: "더 알아보기",
        href: "/about",
      }}
      features={[
        {
          title: "쉬운 사용법",
          description: "누구나 쉽게 사용할 수 있는 직관적인 인터페이스",
        },
        {
          title: "시간 절약",
          description: "반복 작업을 자동화하여 소중한 시간을 절약하세요",
        },
        {
          title: "고품질",
          description: "최고급 소재와 정밀한 제작 과정으로 만들어진 제품",
        },
      ]}
      testimonials={[
        {
          quote: "이 제품을 사용한 후 업무 효율이 50% 이상 향상되었습니다!",
          author: "김민수",
          company: "테크 기업 CEO",
        },
        {
          quote: "정말 편리하고 실용적인 제품입니다. 강력 추천합니다.",
          author: "이지은",
          company: "프리랜서 디자이너",
        },
      ]}
      faqs={[
        {
          question: "배송은 얼마나 걸리나요?",
          answer: "주문 확인 후 1-3일 내에 배송이 시작되며, 국내 배송은 평균 2-3일이 소요됩니다.",
        },
        {
          question: "환불 정책은 어떻게 되나요?",
          answer: "제품 수령 후 7일 이내에 미사용 상태라면 전액 환불이 가능합니다. 자세한 내용은 고객센터로 문의해주세요.",
        },
        {
          question: "보증 기간은 얼마인가요?",
          answer: "모든 제품에는 1년 무상 보증이 제공됩니다. 정상적인 사용 중 발생한 제품 결함은 무상으로 수리해 드립니다.",
        },
      ]}
      footerLinks={[
        { title: "이용약관", href: "/terms" },
        { title: "개인정보처리방침", href: "/privacy" },
        { title: "고객센터", href: "/support" },
        { title: "회사소개", href: "/about-us" },
        { title: "블로그", href: "/blog" },
        { title: "채용정보", href: "/careers" },
      ]}
    />
  );
} 