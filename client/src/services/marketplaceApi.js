import axios from 'axios';
import { MARKETPLACE_PRODUCTS, CATEGORIES_LIST } from '../data/marketplaceData';

// Dedicated Axios client instance
export const marketplaceClient = axios.create({
  baseURL: '/api/marketplace',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 8000
});

// Axios Custom Adapter for Mock API simulation
marketplaceClient.defaults.adapter = async (config) => {
  const { url, method, params = {}, data } = config;
  const parsedData = typeof data === 'string' ? JSON.parse(data || '{}') : data || {};

  // Simulate network latency (250ms)
  await new Promise(resolve => setTimeout(resolve, 250));

  // Simulate Error if requested
  if (params.simulateError === 'true' || params.simulateError === true) {
    const error = new Error('Simulated network error while fetching marketplace data');
    error.response = { status: 500, data: { message: 'Internal Server Error' } };
    throw error;
  }

  // Route 1: GET /products (Listing with search and category filtering)
  if (url === '/products' && method === 'get') {
    let results = [...MARKETPLACE_PRODUCTS];

    // Filter by Category
    if (params.category && params.category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }

    // Filter by Search Query
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return {
      data: {
        success: true,
        count: results.length,
        categories: CATEGORIES_LIST,
        data: results
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  // Route 2: GET /products/:id (Single Product Detail)
  if (url.startsWith('/products/') && method === 'get') {
    const id = url.split('/products/')[1];
    const product = MARKETPLACE_PRODUCTS.find(p => p.id === id);

    if (!product) {
      const err = new Error('Product not found');
      err.response = { status: 404, data: { message: 'Product not found' } };
      throw err;
    }

    return {
      data: { success: true, data: product },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  // Route 3: POST /calculate-emi (Dynamic tenure & price calculation)
  if (url === '/calculate-emi' && method === 'post') {
    const { amount, tenure } = parsedData;
    const monthly = Math.round(amount / tenure);
    const requiredCollateral = Math.round(amount * 1.15); // 115% MF coverage

    return {
      data: {
        success: true,
        calculation: {
          purchaseAmount: amount,
          tenureMonths: tenure,
          monthlyEmi: monthly,
          interestRate: 0,
          processingFee: 0,
          requiredCollateralMf: requiredCollateral,
          totalPayable: amount
        }
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  // Route 4: POST /orders (Submit 1Fi Mutual Fund EMI pledge order)
  if (url === '/orders' && method === 'post') {
    const orderId = '1FI-MF-' + Math.floor(100000 + Math.random() * 900000);

    return {
      data: {
        success: true,
        orderId,
        status: 'PRE_APPROVED',
        approvalTimestamp: new Date().toISOString(),
        orderSummary: parsedData
      },
      status: 201,
      statusText: 'Created',
      headers: {},
      config
    };
  }

  // Fallback 404
  return {
    data: { success: false, message: 'Route not found' },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config
  };
};

/**
 * Service functions called by React hooks and components
 */
export const getMarketplaceProducts = async ({ search = '', category = 'All', simulateError = false } = {}) => {
  const response = await marketplaceClient.get('/products', {
    params: { search, category, simulateError }
  });
  return response.data.data;
};

export const getProductById = async (id) => {
  const response = await marketplaceClient.get(`/products/${id}`);
  return response.data.data;
};

export const calculateEmi = async (amount, tenure) => {
  const response = await marketplaceClient.post('/calculate-emi', { amount, tenure });
  return response.data.calculation;
};

export const submitEmiOrder = async (orderData) => {
  const response = await marketplaceClient.post('/orders', orderData);
  return response.data;
};
