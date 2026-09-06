import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Tabs = () => {
  const { activeTab, setActiveTab } = useMarketplace();

  const tabs = [
    { id: 'brands', label: 'Top Brands' },
    { id: 'stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace' },
  ];

  return (
    <div className="shrink-0 relative -mt-6 z-20 px-3.5">
      <div className="bg-[#F0EDFB] p-1 rounded-full shadow-md flex items-center border border-purple-100/60 backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-1 rounded-full text-center transition-all duration-200 flex flex-col items-center justify-center relative ${
                isActive
                  ? 'bg-white shadow-[0_2px_8px_rgba(108,56,255,0.08)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span
                className={`text-[12.5px] xs:text-[13px] tracking-tight whitespace-nowrap ${
                  isActive
                    ? 'font-bold text-[#6C38FF]'
                    : 'font-semibold text-gray-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-6 h-[2.5px] bg-[#6C38FF] rounded-full mt-0.5 animate-in fade-in zoom-in duration-150" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
