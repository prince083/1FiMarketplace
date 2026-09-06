import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandsPath = path.join(__dirname, '../data/brands.json');

const getBrands = () => {
  const data = fs.readFileSync(brandsPath, 'utf-8');
  return JSON.parse(data);
};

// GET /api/brands?search=&category=&simulateDelay=&simulateError=
router.get('/', (req, res) => {
  const { search, category, simulateDelay, simulateError } = req.query;

  if (simulateError === 'true') {
    return res.status(500).json({
      success: false,
      message: 'Simulated server error fetching top brands. Please try again.'
    });
  }

  const delayMs = parseInt(simulateDelay, 10) || 0;

  setTimeout(() => {
    try {
      let brands = getBrands();

      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        brands = brands.filter(b => 
          b.name.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.emiText.toLowerCase().includes(query)
        );
      }

      if (category && category !== 'All') {
        brands = brands.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }

      return res.json({
        success: true,
        count: brands.length,
        data: brands
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

// GET /api/brands/:id
router.get('/:id', (req, res) => {
  try {
    const brands = getBrands();
    const brand = brands.find(b => b.id === req.params.id || b.slug === req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    return res.json({ success: true, data: brand });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
