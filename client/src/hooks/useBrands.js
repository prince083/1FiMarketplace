import { useState, useEffect, useCallback } from 'react';
import { fetchBrandsApi } from '../services/api';
import { useMarketplace } from '../context/MarketplaceContext';

export const useBrands = () => {
  const { searchQuery, simulateDelay, simulateError } = useMarketplace();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBrandsApi({
        search: searchQuery,
        simulateDelay: simulateDelay ? 1200 : 300,
        simulateError: simulateError
      });
      setBrands(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, simulateDelay, simulateError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBrands();
    }, 200); // 200ms debounce
    return () => clearTimeout(timer);
  }, [loadBrands]);

  return { brands, loading, error, refetch: loadBrands };
};
