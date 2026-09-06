import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import ViewportContainer from './components/layout/ViewportContainer';
import HeroBanner from './components/banner/HeroBanner';
import Tabs from './components/common/Tabs';
import SearchBar from './components/common/SearchBar';
import BrandList from './components/brands/BrandList';
import StoreList from './components/stores/StoreList';
import BottomNav from './components/navigation/BottomNav';

const MarketplaceContent = () => {
  const { activeTab } = useMarketplace();

  return (
    <ViewportContainer>
      {/* Scrollable Screen Content strictly inside mobile viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
        {/* 1Fi Top Hero Banner */}
        <HeroBanner />

        {/* Segmented Pill Tabs */}
        <Tabs />

        {/* Dynamic Search Bar */}
        <SearchBar />

        {/* Main Content Area: Top Brands OR Nearby Stores */}
        <main className="flex-1 min-h-[300px] pb-6">
          {activeTab === 'brands' ? <BrandList /> : <StoreList />}
        </main>
      </div>

      {/* Fixed Bottom Navigation inside mobile viewport */}
      <BottomNav />
    </ViewportContainer>
  );
};

function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}

export default App;
