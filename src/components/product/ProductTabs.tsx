import { ProductTabsProps } from '@/services/types/product';

export function ProductTabs({
  activeTab,
  setActiveTab,
  detailsRef,
  shippingRef,
  reviewsRef,
  qnaRef,
}: ProductTabsProps) {
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between" aria-label="Tabs">
        {['상세정보', '배송/환불', '상품평', 'Q&A'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              switch (tab) {
                case '상세정보':
                  scrollToSection(detailsRef);
                  break;
                case '배송/환불':
                  scrollToSection(shippingRef);
                  break;
                case '상품평':
                  scrollToSection(reviewsRef);
                  break;
                case 'Q&A':
                  scrollToSection(qnaRef);
                  break;
              }
            }}
            className={`${
              activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
