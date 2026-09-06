import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import ViewportContainer from './components/layout/ViewportContainer';
import HeroBanner from './components/banner/HeroBanner';
import Tabs from './components/common/Tabs';
import SearchBar from './components/common/SearchBar';
import BrandList from './components/brands/BrandList';
import StoreList from './components/stores/StoreList';
import MarketplaceListing from './components/marketplace/MarketplaceListing';
import ProductDetailView from './components/marketplace/ProductDetailView';
import BottomNav from './components/navigation/BottomNav';

const MarketplaceContent = () => {
  const { activeTab, selectedProductId, setSelectedProductId } = useMarketplace();

  return (
    <ViewportContainer>
      {/* If a product is selected, render the full ProductDetailView */}
      {selectedProductId ? (
        <ProductDetailView
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      ) : (
        /* Scrollable Screen Content strictly inside mobile viewport */
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          {/* 1Fi Top Hero Banner */}
          <HeroBanner />

          {/* Segmented Pill Tabs (Top Brands, Nearby Stores, 1Fi Marketplace) */}
          <Tabs />

          {/* Dynamic Search Bar */}
          <SearchBar />

          {/* Main Content Area: Top Brands OR Nearby Stores OR 1Fi Marketplace */}
          <main className="flex-1 min-h-[300px] pb-6">
            {activeTab === 'brands' && <BrandList />}
            {activeTab === 'stores' && <StoreList />}
            {activeTab === 'marketplace' && <MarketplaceListing />}
          </main>
        </div>
      )}

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
