import { useState, useEffect, useCallback } from 'react';
import { fetchStoresApi } from '../services/api';
import { useMarketplace } from '../context/MarketplaceContext';

export const useStores = () => {
  const { searchQuery, selectedCity, simulateDelay, simulateError } = useMarketplace();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStoresApi({
        search: searchQuery,
        city: selectedCity,
        simulateDelay: simulateDelay ? 1200 : 300,
        simulateError: simulateError
      });
      setStores(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch nearby stores');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCity, simulateDelay, simulateError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStores();
    }, 200); // 200ms debounce
    return () => clearTimeout(timer);
  }, [loadStores]);

  return { stores, loading, error, refetch: loadStores };
};
