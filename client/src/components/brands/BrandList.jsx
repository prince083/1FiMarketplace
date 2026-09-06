import React from 'react';
import { Sparkles, Gem } from 'lucide-react';
import { useBrands } from '../../hooks/useBrands';
import ItemCard from '../common/ItemCard';
import SkeletonCard from '../common/SkeletonCard';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';

// Helper to render brand logos
const renderBrandLogo = (brand) => {
  switch (brand.slug) {
    case 'air-india':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#D71921] flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <div className="text-[9px] font-black tracking-tighter uppercase leading-none text-center">
            AIR INDIA
          </div>
          <div className="w-6 h-0.5 bg-yellow-400 rounded-full mt-1" />
        </div>
      );
    case 'apple-reseller':
      return (
        <div className="w-14 h-14 rounded-2xl bg-black flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <svg className="w-6 h-6 fill-current mb-0.5" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.42-6.1-9.35-10.87-20.09-14.34-32.22-3.47-12.13-5.21-23.75-5.21-34.86 0-16.1 4.23-29.35 12.69-39.75 8.46-10.4 18.96-15.77 31.5-16.12 5.03 0 10.4 1.34 16.12 4.02 5.72 2.68 9.38 4.08 10.99 4.21 2.01-.13 5.86-1.56 11.55-4.3 5.69-2.73 10.78-4.02 15.27-3.86 11.54.62 20.89 5.09 28.05 13.41-9.97 6.08-14.86 14.73-14.67 25.96.2 9.04 3.75 16.64 10.66 22.8 6.91 6.16 15.08 9.68 24.51 10.55-2.23 6.72-4.99 13.2-8.27 19.45zM119.22 31.84c0-7.39 2.68-14.47 8.04-21.24 5.36-6.77 12.01-10.6 19.95-11.49.2 1.12.3 2.18.3 3.18 0 7.39-2.79 14.53-8.38 21.41-5.59 6.88-12.24 10.74-19.95 11.58.04-1.12.04-2.27.04-3.44z" />
          </svg>
          <span className="text-[6.5px] font-semibold tracking-tight text-gray-300">Premium Reseller</span>
        </div>
      );
    case 'caratlane':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#671B6A] flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <Gem className="w-5 h-5 text-purple-200 mb-0.5" />
          <span className="text-[7.5px] font-bold tracking-tight text-white uppercase">CARATLANE</span>
        </div>
      );
    case 'samsung':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#1428A0] flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <span className="text-[10px] font-black tracking-widest text-white">SAMSUNG</span>
        </div>
      );
    case 'croma':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#009999] flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <span className="text-[11px] font-black tracking-tight text-white">croma</span>
        </div>
      );
    case 'tanishq':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#8E1E2B] flex flex-col items-center justify-center text-white shadow-xs p-1.5 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-300 mb-0.5" />
          <span className="text-[8px] font-serif font-bold text-white tracking-widest">TANISHQ</span>
        </div>
      );
    default:
      return (
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs p-1.5 shrink-0 font-bold text-sm">
          {brand.name.substring(0, 2).toUpperCase()}
        </div>
      );
  }
};

export const BrandList = () => {
  const { brands, loading, error, refetch } = useBrands();

  return (
    <div className="px-4 mt-5 pb-6">
      {/* Section Header */}
      <h2 className="text-[20px] font-bold text-gray-900 tracking-tight mb-3.5">
        Top Brands
      </h2>

      {/* States Handling */}
      {loading ? (
        <SkeletonCard count={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : brands.length === 0 ? (
        <EmptyState message="No brands matched your search." />
      ) : (
        <div className="space-y-3.5">
          {brands.map(brand => (
            <ItemCard
              key={brand.id}
              logo={renderBrandLogo(brand)}
              title={brand.name}
              subtitle={brand.emiText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandList;
