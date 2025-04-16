import LandingTemplate from "./components/LandingTemplate";
import FeaturesWithImages from "./components/FeaturesWithImages";

export default function Home() {
  const featuresWithImages = [
    {
      title: "AI 작문 어시스턴트",
      description: "플롯 구성, 캐릭터 개발, 문장 개선까지 AI가 당신의 글쓰기를 도와줍니다. 막막한 글쓰기의 시작부터 마무리까지 AI가 함께합니다.",
      imageSrc: "/images/ai-assistant.jpg",
      imageAlt: "AI 작문 어시스턴트 이미지"
    },
    {
      title: "하루 1시간으로 충분",
      description: "짧은 시간에도 효율적으로 소설을 진행할 수 있는 맞춤형 시스템. 바쁜 일상 속에서도 꾸준히 작품을 완성할 수 있습니다.",
      imageSrc: "/images/one-hour-writing.jpg",
      imageAlt: "하루 1시간 글쓰기 이미지"
    },
    {
      title: "수익화 시스템",
      description: "구독 모델, 팁 시스템으로 당신의 창작물로 수익을 창출할 수 있습니다. 취미로 시작한 글쓰기가 수입원이 될 수 있습니다.",
      imageSrc: "/images/monetization.jpg",
      imageAlt: "수익화 시스템 이미지"
    },
    {
      title: "글쓰기 커뮤니티",
      description: "다른 작가들과 소통하고 피드백을 주고받으며 함께 성장하세요. 혼자가 아닌 함께하는 글쓰기로 더 큰 성장을 경험하세요.",
      imageSrc: "/images/community.jpg",
      imageAlt: "글쓰기 커뮤니티 이미지"
    }
  ];

  return (
    <>
      <LandingTemplate
        logo={{
          src: "/images/storymaker-logo.jpg",
          alt: "스토리메이커 로고",
          width: 120,
          height: 40,
        }}
        title="AI와 함께 당신의 소설을 쉽게 완성하세요"
        subtitle="하루 1시간만 투자해도 퀄리티 높은 소설을 쓰고 수익화까지 가능한 플랫폼"
        heroImage={{
          src: "/images/ai-writing-hero.jpg",
          alt: "소설 작성 이미지",
          width: 600,
          height: 400,
        }}
        primaryCTA={{
          text: "지금 시작하기",
          href: "/register",
        }}
        secondaryCTA={{
          text: "무료체험",
          href: "/free-trial",
        }}
        features={[
          {
            title: "AI 작문 어시스턴트",
            description: "플롯 구성, 캐릭터 개발, 문장 개선까지 AI가 당신의 글쓰기를 도와줍니다",
          },
          {
            title: "하루 1시간으로 충분",
            description: "짧은 시간에도 효율적으로 소설을 진행할 수 있는 맞춤형 시스템",
          },
          {
            title: "수익화 시스템",
            description: "구독 모델, 팁 시스템으로 당신의 창작물로 수익을 창출할 수 있습니다",
          },
          {
            title: "글쓰기 커뮤니티",
            description: "다른 작가들과 소통하고 피드백을 주고받으며 함께 성장하세요",
          },
        ]}
        testimonials={[
          {
            quote: "직장생활과 병행하면서도 6개월만에 첫 장편소설을 완성했어요. 매달 소정의 수익까지 생겼습니다!",
            author: "김지은",
            company: "마케팅 매니저, 소설가",
          },
          {
            quote: "AI 추천 기능 덕분에 글이 막힐 때마다 새로운 아이디어를 얻을 수 있었어요. 덕분에 연재를 꾸준히 할 수 있었습니다.",
            author: "박현우",
            company: "IT 개발자, 판타지 작가",
          },
          {
            quote: "처음 소설을 쓰는 초보자였지만, 플랫폼의 가이드 덕분에 자신감을 얻었어요. 지금은 200명 이상의 구독자가 생겼습니다.",
            author: "이수진",
            company: "대학생, 로맨스 작가",
          },
        ]}
        faqs={[
          {
            question: "글쓰기 경험이 없어도 시작할 수 있나요?",
            answer: "네, 경험이 없으셔도 AI 어시스턴트와 단계별 가이드가 도와드립니다. 초보자도 쉽게 시작할 수 있습니다.",
          },
          {
            question: "수익은 어떻게 창출되나요?",
            answer: "독자들의 구독료, 개별 작품 구매, 팁 시스템 등 다양한 방법으로 수익을 얻을 수 있습니다. 플랫폼은 수익의 20%만 수수료로 취합니다.",
          },
          {
            question: "하루에 얼마나 시간을 투자해야 하나요?",
            answer: "최소 하루 1시간 정도면 충분합니다. AI가 구성과 아이디어 발전을 도와주어 효율적으로 글쓰기가 가능합니다.",
          },
          {
            question: "저작권은 어떻게 보호되나요?",
            answer: "모든 작품의 저작권은 작가 본인에게 있으며, 플랫폼은 배포 권한만 가집니다. 블록체인 기술로 저작권을 안전하게 보호합니다.",
          },
        ]}
        footerLinks={[
          { title: "서비스 소개", href: "/about" },
          { title: "성공 사례", href: "/success-stories" },
          { title: "요금제", href: "/pricing" },
          { title: "작가 가이드", href: "/guide" },
          { title: "AI 기능", href: "/ai-features" },
          { title: "커뮤니티", href: "/community" },
          { title: "자주 묻는 질문", href: "/faq" },
          { title: "이용약관", href: "/terms" },
          { title: "개인정보처리방침", href: "/privacy" },
        ]}
      />

      {/* 이미지가 포함된 상세 특징 섹션 */}
      <FeaturesWithImages 
        title="AI 소설 플랫폼의 특별함" 
        features={featuresWithImages} 
      />
    </>
  );
}
