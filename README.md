# 1Fi Marketplace - Shop Today, Pay Later using Mutual Funds

A pixel-perfect, responsive mobile-friendly marketplace designed and engineered for **1Fi** according to the reference designs.

![1Fi Marketplace](/client/public/assets/1fi_hero_illustration.jpg)

## Tech Stack
- **Frontend**: React 19, Tailwind CSS v3, Lucide React icons, Vite 8 bundling.
- **Backend**: Node.js, Express REST API, CORS.
- **Architecture**: Modular MERN structure with resilient fallback data and dynamic location-based distance calculations.

---

## Key Features

1. **Hero Banner**:
   - Deep royal purple gradient background with ambient radial lighting.
   - `✨ NO-COST EMIs` frosted pill badge with backdrop blur.
   - Headline typography: *"Shop today, Pay later using Mutual funds."* with stylized italic emphasis.
   - Subtext: *"No credit score required. No interest. Backed by your investments."*
   - 3D luxury shopping visual composition (car, motorcycle, laptop, phone, gold gift bag with floating confetti).

2. **Segmented Pill Navigation**:
   - Smooth toggle between **Top Brands** and **Nearby Stores**.
   - Active state indicator with purple highlight and underline pill.

3. **Contextual Search**:
   - Debounced search with clear (`X`) button.
   - Automatically adapts placeholder: *"Search online stores..."* for Top Brands and *"Search stores..."* for Nearby Stores.

4. **Top Brands View**:
   - Cards for Air India, Apple Premium Reseller, CaratLane, Samsung, Croma, Tanishq, IKEA, etc.
   - Category filtering chips (Electronics, Jewellery, Travel, Home).
   - Shows EMI tenure terms (*"No-cost EMIs upto 18 months"*, *"No-cost EMIs upto 24 months"*).
   - Click any brand to open the **1Fi Mutual Fund EMI Calculator Modal**.

5. **Nearby Stores View**:
   - Location dropdown pill (`Mahoba ⌵`) allowing users to switch between Mahoba, Gurugram, Delhi NCR, Bengaluru, Mumbai.
   - Distance calculation based on selected city (e.g., 445 KM for Gurugram from Mahoba, ~1.2 KM when in local vicinity).
   - Store cards with distance badge (`445 KM`), store logo box, full address, and contact details (TripBouquet, Charger On Wheels, Ashoka Suzuki, Atelier Forbidden).

6. **Interactive 1Fi EMI Calculator Modal**:
   - Purchase amount slider (₹5,000 to ₹2,00,000).
   - Dynamic tenure selection (3, 6, 9, 12, 18, 24 months).
   - Zero-interest monthly breakdown (0% interest, ₹0 fee, mutual funds remain invested and earning returns).
   - One-click instant approval simulation.

7. **Error, Loading & Empty States**:
   - Shimmer skeleton loaders.
   - Graceful error banner with retry button.
   - Friendly empty search state with clear search button.
   - Developer toolbar with toggles to simulate latency (skeletons) and simulated network errors.

8. **Fixed Bottom Navigation Bar**:
   - 5 tabs: **Home**, **Shop** (active with purple top indicator), **EMI Dues**, **Limit**, **Profile**.

9. **Device Preview Mode**:
   - iPhone mobile frame shell preview or full-width responsive layout.

---

## Getting Started

### 1. Install Dependencies
```bash
# Install root, server, and client dependencies
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Run the Development Server
```bash
# Run both client and server concurrently:
npm run dev:all

# Or run client only (includes built-in fallback mocks):
npm run dev
```

The application will be running at `http://localhost:3000`.
The Express API runs at `http://localhost:5000`.

---

## API Endpoints

- `GET /api/brands` - Fetch brands list with `?search=`, `?category=`, `?simulateDelay=`, `?simulateError=`.
- `GET /api/brands/:id` - Fetch single brand details.
- `GET /api/stores` - Fetch stores list with `?city=`, `?search=`, `?simulateDelay=`, `?simulateError=`.
- `GET /api/locations` - Fetch available cities and coordinates.
- `GET /api/health` - Health check.
