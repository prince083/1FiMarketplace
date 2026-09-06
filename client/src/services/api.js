// Fallback mock data in case backend server is temporarily unreachable
const FALLBACK_BRANDS = [
  {
    id: "brand-air-india",
    name: "Air India",
    slug: "air-india",
    emiText: "No-cost EMIs upto 18 months"
  },
  {
    id: "brand-apple",
    name: "Apple Premium Reseller",
    slug: "apple-reseller",
    emiText: "No-cost EMIs upto 24 months"
  },
  {
    id: "brand-caratlane",
    name: "CaratLane",
    slug: "caratlane",
    emiText: "No-cost EMIs upto 6 months"
  },
  {
    id: "brand-samsung",
    name: "Samsung Smart Plaza",
    slug: "samsung",
    emiText: "No-cost EMIs upto 24 months"
  },
  {
    id: "brand-croma",
    name: "Croma",
    slug: "croma",
    emiText: "No-cost EMIs upto 12 months"
  },
  {
    id: "brand-tanishq",
    name: "Tanishq",
    slug: "tanishq",
    emiText: "No-cost EMIs upto 9 months"
  }
];

const FALLBACK_STORES = [
  {
    id: "store-tripbouquet",
    name: "TripBouquet",
    distance: "445 KM",
    city: "Gurugram",
    address: "241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018"
  },
  {
    id: "store-charger-on-wheels",
    name: "Charger On Wheels",
    distance: "446 KM",
    city: "Gurugram",
    address: "Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101"
  },
  {
    id: "store-ashoka-suzuki",
    name: "Ashoka Suzuki",
    distance: "446 KM",
    city: "Gurugram",
    address: "Khata No 271, 316, Badshahpur Sohna Rd, Gurugram, Haryana, 122101"
  },
  {
    id: "store-atelier-forbidden",
    name: "Atelier Forbidden Jewels",
    distance: "447 KM",
    city: "Gurugram",
    address: "Sector 29, Leisure Valley Road, Gurugram, Haryana, 122002"
  },
  {
    id: "store-mahoba-electronics",
    name: "Mahoba Digital Hub",
    distance: "1.2 KM",
    city: "Mahoba",
    address: "Main Market Road, Near Gandhi Park, Mahoba, Uttar Pradesh, 210427"
  },
  {
    id: "store-bundelkhand-motors",
    name: "Bundelkhand Honda & Suzuki",
    distance: "2.8 KM",
    city: "Mahoba",
    address: "Banda - Mahoba Bypass Road, Mahoba, Uttar Pradesh, 210427"
  }
];

const FALLBACK_LOCATIONS = [
  { id: "loc-mahoba", name: "Mahoba", state: "Uttar Pradesh", pincode: "210427" },
  { id: "loc-gurugram", name: "Gurugram", state: "Haryana", pincode: "122001" },
  { id: "loc-delhi", name: "Delhi NCR", state: "Delhi", pincode: "110001" },
  { id: "loc-bengaluru", name: "Bengaluru", state: "Karnataka", pincode: "560001" },
  { id: "loc-mumbai", name: "Mumbai", state: "Maharashtra", pincode: "400001" }
];

export const fetchBrandsApi = async ({ search = '', simulateDelay = 0, simulateError = false } = {}) => {
  if (simulateError) {
    throw new Error('Simulated network error. Please try again.');
  }

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (simulateDelay) params.append('simulateDelay', simulateDelay);
    if (simulateError) params.append('simulateError', simulateError);

    const res = await fetch(`/api/brands?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (simulateDelay) {
      await new Promise(r => setTimeout(r, simulateDelay));
    }

    let results = [...FALLBACK_BRANDS];
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      results = results.filter(b => 
        b.name.toLowerCase().includes(q) || 
        b.emiText.toLowerCase().includes(q)
      );
    }
    return results;
  }
};

export const fetchStoresApi = async ({ search = '', city = 'Mahoba', simulateDelay = 0, simulateError = false } = {}) => {
  if (simulateError) {
    throw new Error('Simulated network error. Please try again.');
  }

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (city) params.append('city', city);
    if (simulateDelay) params.append('simulateDelay', simulateDelay);
    if (simulateError) params.append('simulateError', simulateError);

    const res = await fetch(`/api/stores?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (simulateDelay) {
      await new Promise(r => setTimeout(r, simulateDelay));
    }

    let results = [...FALLBACK_STORES];

    if (city.toLowerCase() === 'gurugram') {
      results = results.map(s => {
        if (s.city === 'Gurugram') {
          return { ...s, distance: '1.4 KM' };
        }
        return { ...s, distance: '445 KM' };
      });
    } else if (city.toLowerCase() === 'mahoba') {
      results = results.map(s => {
        if (s.city === 'Mahoba') {
          return { ...s, distance: '1.2 KM' };
        }
        return { ...s, distance: s.distance || '445 KM' };
      });
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
      );
    }
    return results;
  }
};

export const fetchLocationsApi = async () => {
  try {
    const res = await fetch('/api/locations');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch {
    return FALLBACK_LOCATIONS;
  }
};
