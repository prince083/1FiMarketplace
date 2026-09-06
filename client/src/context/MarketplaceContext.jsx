import React, { createContext, useContext, useState } from 'react';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('brands'); // 'brands' or 'stores'
  const [selectedCity, setSelectedCity] = useState('Mahoba');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBottomNav, setActiveBottomNav] = useState('shop'); // 'home' | 'shop' | 'dues' | 'limit' | 'profile'
  const [simulateDelay, setSimulateDelay] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
  };

  const value = {
    activeTab,
    setActiveTab,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    activeBottomNav,
    setActiveBottomNav,
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
