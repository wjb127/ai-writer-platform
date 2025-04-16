import LandingTemplate from "../../components/LandingTemplate";

export default function EventLandingPage() {
  return (
    <LandingTemplate
      logo={{
        src: "/logo-event.svg",
        alt: "이벤트 로고",
        width: 120,
        height: 40,
      }}
      title="특별한 할인 이벤트! 최대 50% 할인"
      subtitle="7월 한 달간 진행되는 여름 맞이 특별 프로모션에 참여하세요"
      heroImage={{
        src: "/hero-event.jpg",
        alt: "이벤트 이미지",
        width: 600,
        height: 400,
      }}
      primaryCTA={{
        text: "지금 할인받기",
        href: "/discount",
      }}
      secondaryCTA={{
        text: "이벤트 상세 보기",
        href: "/event-details",
      }}
      features={[
        {
          title: "최대 50% 할인",
          description: "모든 제품에 적용되는 파격적인 할인 혜택",
        },
        {
          title: "추가 사은품 증정",
          description: "10만원 이상 구매 시 특별 사은품을 드립니다",
        },
        {
          title: "무료 배송",
          description: "이벤트 기간 동안 모든 주문에 무료 배송 혜택 제공",
        },
        {
          title: "추가 포인트 적립",
          description: "구매 금액의 10%를 추가 포인트로 적립해 드립니다",
        },
      ]}
      testimonials={[
        {
          quote: "작년 이벤트에서 구매했는데 품질이 정말 좋았어요. 올해도 기대됩니다!",
          author: "이현주",
        },
        {
          quote: "사은품도 알차고 할인도 커서 매년 이 이벤트를 기다립니다.",
          author: "김태호",
        },
      ]}
      faqs={[
        {
          question: "이벤트 기간은 언제인가요?",
          answer: "7월 1일부터 7월 31일까지 한 달간 진행됩니다.",
        },
        {
          question: "온라인과 오프라인 모두 적용되나요?",
          answer: "네, 온라인 스토어와 전국 오프라인 매장 모두에서 동일하게 적용됩니다.",
        },
        {
          question: "중복 할인이 가능한가요?",
          answer: "다른 쿠폰이나 프로모션과의 중복 할인은 불가능합니다. 가장 높은 할인율이 자동 적용됩니다.",
        },
        {
          question: "반품 및 환불 정책은 어떻게 되나요?",
          answer: "일반 구매와 동일한 반품 및 환불 정책이 적용됩니다. 제품 수령 후 7일 이내에 미사용 상태에서 반품 가능합니다.",
        },
      ]}
      footerLinks={[
        { title: "이용약관", href: "/terms" },
        { title: "개인정보처리방침", href: "/privacy" },
        { title: "고객센터", href: "/support" },
        { title: "매장 위치", href: "/stores" },
        { title: "자주 묻는 질문", href: "/faq" },
      ]}
    />
  );
} 