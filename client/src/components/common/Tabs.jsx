import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Tabs = () => {
  const { activeTab, setActiveTab } = useMarketplace();

  return (
    <div className="shrink-0 relative -mt-6 z-20 px-4">
      <div className="bg-[#F0EDFB] p-1.5 rounded-full shadow-md flex items-center border border-purple-100/60 backdrop-blur-md">
        {/* Top Brands Tab */}
        <button
          onClick={() => setActiveTab('brands')}
          className={`flex-1 py-2.5 px-3 rounded-full text-center transition-all duration-200 flex flex-col items-center justify-center relative ${
            activeTab === 'brands'
              ? 'bg-white shadow-[0_2px_10px_rgba(108,56,255,0.08)]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span
            className={`text-[14.5px] tracking-tight ${
              activeTab === 'brands'
                ? 'font-bold text-[#6C38FF]'
                : 'font-semibold text-gray-500'
            }`}
          >
            Top Brands
          </span>
          {activeTab === 'brands' && (
            <span className="w-8 h-[3px] bg-[#6C38FF] rounded-full mt-1 animate-in fade-in zoom-in duration-200" />
          )}
        </button>

        {/* Nearby Stores Tab */}
        <button
          onClick={() => setActiveTab('stores')}
          className={`flex-1 py-2.5 px-3 rounded-full text-center transition-all duration-200 flex flex-col items-center justify-center relative ${
            activeTab === 'stores'
              ? 'bg-white shadow-[0_2px_10px_rgba(108,56,255,0.08)]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span
            className={`text-[14.5px] tracking-tight ${
              activeTab === 'stores'
                ? 'font-bold text-[#6C38FF]'
                : 'font-semibold text-gray-500'
            }`}
          >
            Nearby Stores
          </span>
          {activeTab === 'stores' && (
            <span className="w-8 h-[3px] bg-[#6C38FF] rounded-full mt-1 animate-in fade-in zoom-in duration-200" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Tabs;
