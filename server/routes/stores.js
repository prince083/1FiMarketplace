import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storesPath = path.join(__dirname, '../data/stores.json');
const locationsPath = path.join(__dirname, '../data/locations.json');

const getStores = () => JSON.parse(fs.readFileSync(storesPath, 'utf-8'));
const getLocations = () => JSON.parse(fs.readFileSync(locationsPath, 'utf-8'));

// Haversine formula distance helper
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

// GET /api/stores?search=&city=&category=&simulateDelay=&simulateError=
router.get('/', (req, res) => {
  const { search, city = 'Mahoba', category, simulateDelay, simulateError } = req.query;

  if (simulateError === 'true') {
    return res.status(500).json({
      success: false,
      message: 'Simulated server error fetching nearby stores. Please try again.'
    });
  }

  const delayMs = parseInt(simulateDelay, 10) || 0;

  setTimeout(() => {
    try {
      let stores = getStores();
      const locations = getLocations();
      const activeLoc = locations.find(l => l.name.toLowerCase() === city.toLowerCase()) || locations[0];

      // Calculate realistic dynamic distances based on selected city coordinates
      stores = stores.map(store => {
        let dist = calculateDistance(activeLoc.lat, activeLoc.lng, store.lat, store.lng);
        if (store.city.toLowerCase() === activeLoc.name.toLowerCase()) {
          dist = store.distanceKm && store.distanceKm < 10 ? store.distanceKm : 1.5;
        }
        return {
          ...store,
          calculatedDistanceKm: dist,
          distance: `${dist} KM`
        };
      });

      // Filter by search query
      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        stores = stores.filter(s =>
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.address.toLowerCase().includes(query) ||
          s.city.toLowerCase().includes(query)
        );
      }

      if (category && category !== 'All') {
        stores = stores.filter(s => s.category.toLowerCase() === category.toLowerCase());
      }

      // Sort by distance (closest first, matching user screenshots)
      stores.sort((a, b) => a.calculatedDistanceKm - b.calculatedDistanceKm);

      return res.json({
        success: true,
        count: stores.length,
        selectedCity: activeLoc.name,
        data: stores
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
      });
    }
  }, delayMs);
});

export default router;
