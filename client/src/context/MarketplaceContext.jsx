import React, { createContext, useContext, useState } from 'react';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('brands'); // 'brands' | 'stores' | 'marketplace'
  const [selectedCity, setSelectedCity] = useState('Mahoba');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBottomNav, setActiveBottomNav] = useState('shop'); // 'home' | 'shop' | 'dues' | 'limit' | 'profile'
  const [marketplaceCategory, setMarketplaceCategory] = useState('All');
  const [selectedProductId, setSelectedProductId] = useState(null); // When viewing a single product detail
  const [simulateDelay, setSimulateDelay] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setMarketplaceCategory('All');
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchQuery('');
    setSelectedProductId(null); // Close any active product detail when switching tabs
  };

  const value = {
    activeTab,
    setActiveTab: handleTabChange,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    activeBottomNav,
    setActiveBottomNav,
    marketplaceCategory,
    setMarketplaceCategory,
    selectedProductId,
    setSelectedProductId,
    simulateDelay,
    setSimulateDelay,
    simulateError,
    setSimulateError,
    isLocationModalOpen,
    setIsLocationModalOpen,
    resetFilters,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
