import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CATEGORIES_LIST } from '../../data/marketplaceData';
import ProductCard from './ProductCard';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';

export const MarketplaceListing = () => {
  const { products, loading, error, refetch } = useProducts();
  const { marketplaceCategory, setMarketplaceCategory, setSelectedProductId } = useMarketplace();

  return (
    <div className="px-3.5 mt-5 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">
            1Fi Marketplace
          </h2>
          <p className="text-[12px] text-gray-500 font-normal">
            Buy gadgets, EVs & luxury with 0% Mutual Fund EMIs
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-2">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = marketplaceCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setMarketplaceCategory(cat)}
              className={`text-[12px] px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#6C38FF] text-white shadow-xs font-semibold'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* States Handling */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 border border-gray-100 space-y-2">
              <div className="w-full aspect-square bg-gray-200 rounded-xl" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState message="No products matched your search in 1Fi Marketplace." />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProductId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceListing;
