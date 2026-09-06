import { useState, useEffect, useCallback } from 'react';
import { getMarketplaceProducts } from '../services/marketplaceApi';
import { useMarketplace } from '../context/MarketplaceContext';

export const useProducts = () => {
  const { searchQuery, marketplaceCategory } = useMarketplace();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarketplaceProducts({
        search: searchQuery,
        category: marketplaceCategory
      });
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load marketplace products');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, marketplaceCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 200);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    refetch: loadProducts
  };
};

export default useProducts;
