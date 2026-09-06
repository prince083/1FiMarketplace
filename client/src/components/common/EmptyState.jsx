import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const EmptyState = ({ message }) => {
  const { searchQuery, setSearchQuery } = useMarketplace();

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center my-4 shadow-xs">
      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#6C38FF]">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-gray-800 text-base mb-1">
        No results found
      </h3>
      <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
        {message || `We couldn't find any matches for "${searchQuery}". Try searching with a different brand or store name.`}
      </p>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4F0FF] hover:bg-[#ECE4FF] text-[#6C38FF] text-xs font-semibold rounded-xl border border-[#E1D4FF] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Search</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
