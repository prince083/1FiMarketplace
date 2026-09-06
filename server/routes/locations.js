import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locationsPath = path.join(__dirname, '../data/locations.json');

router.get('/', (req, res) => {
  try {
    const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf-8'));
    return res.json({ success: true, data: locations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
