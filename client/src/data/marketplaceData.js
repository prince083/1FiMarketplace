export const MARKETPLACE_PRODUCTS = [
  {
    id: "prod-iphone-15-pro",
    name: "Apple iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    badge: "0% Interest EMI",
    rating: 4.9,
    reviewsCount: 1420,
    basePrice: 129900,
    originalMrp: 134900,
    startingEmi: 5412,
    maxTenure: 24,
    description: "Forged in titanium with the ground-breaking A17 Pro chip, customizable Action button, and the most versatile iPhone camera system yet.",
    images: {
      default: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      natural: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      blue: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      black: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "natural", name: "Natural Titanium", hex: "#9A958D" },
      { id: "blue", name: "Blue Titanium", hex: "#2F3B4C" },
      { id: "black", name: "Black Titanium", hex: "#1F2022" }
    ],
    storageOptions: [
      { id: "128gb", label: "128 GB", priceDelta: 0, available: true },
      { id: "256gb", label: "256 GB", priceDelta: 10000, available: true },
      { id: "512gb", label: "512 GB", priceDelta: 30000, available: true },
      { id: "1tb", label: "1 TB", priceDelta: 50000, available: true }
    ],
    highlights: [
      "Aerospace-grade titanium design with textured matte glass back",
      "A17 Pro chip with 6-core GPU for console-level gaming",
      "Pro camera system with 48MP main sensor and 3x Telephoto lens",
      "USB-C connector with USB 3 speeds up to 10Gb/s"
    ],
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR with ProMotion" },
      { label: "Processor", value: "A17 Pro Chip 3nm" },
      { label: "Camera", value: "48MP + 12MP Ultra-wide + 12MP Telephoto" },
      { label: "Battery Life", value: "Up to 23 hours video playback" },
      { label: "Water Resistance", value: "IP68 standard (6m up to 30 mins)" }
    ],
    mfBenefit: "Lock in zero-cost monthly installments backed by your mutual fund portfolio. Zero liquidation needed."
  },
  {
    id: "prod-macbook-air-m3",
    name: "MacBook Air 13\" (M3)",
    brand: "Apple",
    category: "Laptops",
    badge: "Best Seller",
    rating: 4.8,
    reviewsCount: 890,
    basePrice: 114900,
    originalMrp: 124900,
    startingEmi: 4787,
    maxTenure: 24,
    description: "Lean, mean, M3 machine. Incredibly thin and fast MacBook Air slips easily into your backpack and powers through work and play with up to 18 hours of battery.",
    images: {
      default: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      midnight: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      starlight: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      silver: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "midnight", name: "Midnight", hex: "#1E232A" },
      { id: "starlight", name: "Starlight", hex: "#E8E2D5" },
      { id: "silver", name: "Silver", hex: "#E2E4E6" }
    ],
    storageOptions: [
      { id: "256gb", label: "8GB / 256GB SSD", priceDelta: 0, available: true },
      { id: "512gb", label: "16GB / 512GB SSD", priceDelta: 20000, available: true },
      { id: "1tb", label: "16GB / 1TB SSD", priceDelta: 40000, available: true }
    ],
    highlights: [
      "Supercharged by Apple M3 chip with 8-core CPU and 10-core GPU",
      "Up to 18 hours of continuous battery life on a single charge",
      "13.6-inch Liquid Retina display with 500 nits brightness",
      "Fanless silent acoustic design"
    ],
    specs: [
      { label: "Memory", value: "Unified 8GB / 16GB" },
      { label: "Display", value: "13.6-inch Liquid Retina with True Tone" },
      { label: "Ports", value: "MagSafe 3, 2x Thunderbolt, 3.5mm jack" },
      { label: "Weight", value: "1.24 kg ultraportable" }
    ],
    mfBenefit: "Upgrade your professional workspace with instant 1Fi MF credit without touching savings."
  },
  {
    id: "prod-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    badge: "Galaxy AI",
    rating: 4.8,
    reviewsCount: 1105,
    basePrice: 129999,
    originalMrp: 139999,
    startingEmi: 5416,
    maxTenure: 24,
    description: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8\" flat display with embedded S Pen and Galaxy AI.",
    images: {
      default: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      gray: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      black: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      violet: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "gray", name: "Titanium Gray", hex: "#6E6F73" },
      { id: "black", name: "Titanium Black", hex: "#222327" },
      { id: "violet", name: "Titanium Violet", hex: "#4C3D56" }
    ],
    storageOptions: [
      { id: "256gb", label: "12GB / 256GB", priceDelta: 0, available: true },
      { id: "512gb", label: "12GB / 512GB", priceDelta: 10000, available: true },
      { id: "1tb", label: "12GB / 1TB", priceDelta: 30000, available: true }
    ],
    highlights: [
      "Live Translate and Circle to Search powered by Galaxy AI",
      "200MP Quad Telephoto Camera with 100x Space Zoom",
      "Titanium frame and Corning Gorilla Armor glass",
      "Snapdragon 8 Gen 3 for Galaxy with vapor chamber cooling"
    ],
    specs: [
      { label: "Display", value: "6.8\" Dynamic AMOLED 2X, 120Hz, 2600 nits" },
      { label: "Battery", value: "5000 mAh with 45W Fast Charging" },
      { label: "Stylus", value: "Built-in S Pen included" }
    ],
    mfBenefit: "Smart flagship upgrade on 0% EMI while your SIPs continue compounding."
  },
  {
    id: "prod-sony-wh1000xm5",
    name: "Sony WH-1000XM5 ANC",
    brand: "Sony",
    category: "Audio",
    badge: "Top Rated",
    rating: 4.9,
    reviewsCount: 3200,
    basePrice: 29990,
    originalMrp: 34990,
    startingEmi: 2499,
    maxTenure: 12,
    description: "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound quality and crystal-clear hands-free calling.",
    images: {
      default: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      black: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      silver: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "black", name: "Midnight Black", hex: "#111111" },
      { id: "silver", name: "Platinum Silver", hex: "#D6D5CE" }
    ],
    storageOptions: [
      { id: "standard", label: "Standard Edition", priceDelta: 0, available: true }
    ],
    highlights: [
      "Auto NC Optimizer optimizes noise canceling based on wearing conditions",
      "Specially designed 30mm driver unit for High-Resolution Audio",
      "Up to 30-hour battery life with 3-minute quick charge giving 3 hours",
      "Multi-point connection allows pairing with two devices simultaneously"
    ],
    specs: [
      { label: "Driver", value: "30mm Dome type carbon fiber composite" },
      { label: "Battery Life", value: "Up to 30 hours (ANC On)" },
      { label: "Bluetooth", value: "Version 5.2 with LDAC / AAC / SBC" }
    ],
    mfBenefit: "Experience acoustic perfection with pocket-friendly ₹2,499/month 1Fi EMI."
  },
  {
    id: "prod-ather-450x",
    name: "Ather 450X Gen 3 (EV)",
    brand: "Ather Energy",
    category: "Electric Vehicles",
    badge: "Eco Superbike",
    rating: 4.7,
    reviewsCount: 420,
    basePrice: 144999,
    originalMrp: 154999,
    startingEmi: 6041,
    maxTenure: 24,
    description: "India's quickest smart electric scooter. Instant torque, Warp Mode, Google Maps on touchscreen dashboard, and true 110 km real-world range.",
    images: {
      default: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      space_grey: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      white: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "space_grey", name: "Space Grey", hex: "#3A3D40" },
      { id: "white", name: "True White", hex: "#F5F5F5" },
      { id: "mint", name: "Mint Green", hex: "#98D8C8" }
    ],
    storageOptions: [
      { id: "standard_3_7", label: "3.7 kWh Battery (150 km Certified)", priceDelta: 0, available: true },
      { id: "pro_pack", label: "Pro Pack (Warp Mode + Maps)", priceDelta: 15000, available: true }
    ],
    highlights: [
      "0 to 40 km/h in an astonishing 3.3 seconds in Warp Mode",
      "7-inch TFT touchscreen with Google Maps navigation and music control",
      "Regenerative braking with smart auto-hold on steep inclines",
      "Home Ather Dot charger included with free installation"
    ],
    specs: [
      { label: "Top Speed", value: "90 km/h" },
      { label: "Real Range", value: "110 km in Eco Mode" },
      { label: "Battery", value: "3.7 kWh Lithium-ion with 5-year warranty" },
      { label: "Charging", value: "0-80% in 4h 30m" }
    ],
    mfBenefit: "Ride green with zero down payment! Pledged mutual funds cover your EMIs safely."
  },
  {
    id: "prod-tanishq-solitaire",
    name: "Tanishq 18K Diamond Ring",
    brand: "Tanishq",
    category: "Jewellery",
    badge: "Certified Solitaire",
    rating: 4.9,
    reviewsCount: 530,
    basePrice: 65990,
    originalMrp: 72990,
    startingEmi: 5499,
    maxTenure: 12,
    description: "Classic four-prong solitaire diamond engagement ring crafted in radiant 18 Karat yellow and white gold with IGI diamond certification.",
    images: {
      default: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      gold: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      rose_gold: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
    },
    colors: [
      { id: "gold", name: "18K Yellow Gold", hex: "#E5C158" },
      { id: "rose_gold", name: "18K Rose Gold", hex: "#ECC5B2" },
      { id: "white_gold", name: "18K White Gold", hex: "#E5E5E5" }
    ],
    storageOptions: [
      { id: "size_12", label: "Ring Size 12 (0.25 Carat)", priceDelta: 0, available: true },
      { id: "size_14", label: "Ring Size 14 (0.35 Carat)", priceDelta: 15000, available: true },
      { id: "size_16", label: "Ring Size 16 (0.50 Carat)", priceDelta: 35000, available: true }
    ],
    highlights: [
      "Hallmarked 18KT Gold with certified natural diamonds",
      "IGI Certified VVS-VS clarity diamonds with Excellent cut",
      "Lifetime exchange and buyback guarantee at any Tanishq boutique"
    ],
    specs: [
      { label: "Gold Purity", value: "18 Karat (750 Hallmarked)" },
      { label: "Diamond Clarity", value: "VVS-VS with Color G-H" },
      { label: "Certification", value: "IGI (International Gemological Institute)" }
    ],
    mfBenefit: "Celebrate precious moments with zero-interest 1Fi mutual fund EMI."
  }
];

export const CATEGORIES_LIST = [
  "All",
  "Smartphones",
  "Laptops",
  "Audio",
  "Electric Vehicles",
  "Jewellery"
];
