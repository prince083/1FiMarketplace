import React from 'react';
import { Zap, Compass, Bike, Gem, Smartphone } from 'lucide-react';
import { useStores } from '../../hooks/useStores';
import ItemCard from '../common/ItemCard';
import LocationSelector from '../common/LocationSelector';
import SkeletonCard from '../common/SkeletonCard';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';

// Helper to render store logos
const renderStoreLogo = (store) => {
  switch (store.id) {
    case 'store-tripbouquet':
      return (
        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center shadow-2xs p-1 shrink-0">
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] font-black text-red-500 bg-red-50 px-0.5 rounded">TG</span>
            <span className="text-[7.5px] font-bold text-gray-800 tracking-tight">tripbouquet</span>
          </div>
        </div>
      );
    case 'store-charger-on-wheels':
      return (
        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center shadow-2xs p-1 shrink-0">
          <div className="text-[7.5px] font-black tracking-tight text-gray-900 uppercase text-center leading-tight">
            CHARGER<br />
            <span className="text-emerald-500 flex items-center justify-center gap-0.5">
              ON WHEEL <Zap className="w-2 h-2 fill-emerald-500 inline" />
            </span>
          </div>
        </div>
      );
    case 'store-ashoka-suzuki':
      return (
        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center shadow-2xs p-1 shrink-0">
          <div className="w-6 h-6 flex items-center justify-center mb-0.5">
            <svg className="w-5 h-5 fill-red-600" viewBox="0 0 24 24">
              <path d="M19.5 3.5L4.5 13.5v7l15-10v-7zm-15 0v7l15-10v-7l-15 10z" opacity="0.3" />
              <path d="M19.5 3.5h-8.8L4.5 11.2h8.8l-8.8 9.3h8.8l6.2-7.7h-8.8l8.8-9.3z" />
            </svg>
          </div>
          <span className="text-[7px] font-bold text-[#002B66] uppercase tracking-wider">SUZUKI</span>
        </div>
      );
    case 'store-atelier-forbidden':
      return (
        <div className="w-14 h-14 rounded-2xl bg-[#1A1829] border border-amber-600/30 flex flex-col items-center justify-center shadow-2xs p-1 shrink-0">
          <div className="w-7 h-7 rounded-full border border-amber-400 flex items-center justify-center">
            <Gem className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>
      );
    case 'store-mahoba-electronics':
      return (
        <div className="w-14 h-14 rounded-2xl bg-purple-600 flex flex-col items-center justify-center text-white shadow-2xs p-1 shrink-0">
          <Smartphone className="w-5 h-5 mb-0.5" />
          <span className="text-[7.5px] font-bold tracking-tight">MAHOBA</span>
        </div>
      );
    case 'store-bundelkhand-motors':
      return (
        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-2xs p-1 shrink-0">
          <Bike className="w-5 h-5 mb-0.5" />
          <span className="text-[7px] font-bold tracking-tight">MOTORS</span>
        </div>
      );
    default:
      return (
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 shadow-2xs p-1 shrink-0 font-bold text-sm">
          <Compass className="w-6 h-6 text-gray-500" />
        </div>
      );
  }
};

export const StoreList = () => {
  const { stores, loading, error, refetch } = useStores();

  return (
    <div className="px-4 mt-5 pb-6">
      {/* Section Header with Title and Location Pill */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">
          Nearby Stores
        </h2>
        <LocationSelector />
      </div>

      {/* State Handling */}
      {loading ? (
        <SkeletonCard count={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : stores.length === 0 ? (
        <EmptyState message="No stores found nearby with your search criteria." />
      ) : (
        <div className="space-y-3.5">
          {stores.map(store => (
            <ItemCard
              key={store.id}
              logo={renderStoreLogo(store)}
              title={store.name}
              badge={store.distance}
              subtitle={store.address}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
