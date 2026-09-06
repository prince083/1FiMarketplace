import React from 'react';
import { Search, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const SearchBar = () => {
  const { activeTab, searchQuery, setSearchQuery } = useMarketplace();

  const placeholderText =
    activeTab === 'brands' ? 'Search online stores...' : 'Search stores...';

  return (
    <div className="shrink-0 px-4 mt-4">
      <div className="relative flex items-center">
        {/* Search icon */}
        <div className="absolute left-4 pointer-events-none flex items-center justify-center text-gray-400">
          <Search className="w-5 h-5 stroke-[2.2]" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholderText}
          className="w-full bg-white text-gray-800 text-[14.5px] rounded-2xl pl-11 pr-10 py-3.5 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6C38FF]/30 focus:border-[#6C38FF] transition-all placeholder:text-gray-400"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
