import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { getProductById, calculateEmi } from '../../services/marketplaceApi';
import EmiApplicationFlow from './EmiApplicationFlow';

export const ProductDetailView = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variant States
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(12);
  const [emiCalculation, setEmiCalculation] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Fetch product data dynamically via Axios service
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(productId);
        setProduct(data);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.storageOptions?.length > 0) setSelectedStorage(data.storageOptions[0]);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchDetail();
    }
  }, [productId]);

  // Dynamic price calculation based on base price + selected variant delta
  const currentPrice = product && selectedStorage
    ? product.basePrice + (selectedStorage.priceDelta || 0)
    : product?.basePrice || 0;

  // Recalculate EMI whenever price or selected tenure changes via Axios API
  useEffect(() => {
    if (currentPrice > 0 && selectedTenure) {
      calculateEmi(currentPrice, selectedTenure)
        .then(calc => setEmiCalculation(calc))
        .catch(() => {
          // Fallback calculation
          setEmiCalculation({
            monthlyEmi: Math.round(currentPrice / selectedTenure),
            tenureMonths: selectedTenure,
            interestRate: 0,
            processingFee: 0,
            requiredCollateralMf: Math.round(currentPrice * 1.15)
          });
        });
    }
  }, [currentPrice, selectedTenure]);

  if (loading) {
    return (
      <div className="p-5 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4" />
        <div className="w-full aspect-square bg-gray-200 rounded-2xl" />
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-20 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-red-600 mb-3">{error || 'Product not found'}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  // Determine which image to show based on selected color variant
  const activeImage = selectedColor && product.images?.[selectedColor.id]
    ? product.images[selectedColor.id]
    : product.images?.default;

  const availableTenures = [3, 6, 9, 12, 18, 24].filter(
    t => t <= (product.maxTenure || 24)
  );

  return (
    <div className="relative flex-1 h-full overflow-hidden flex flex-col bg-[#FAF9FD]">
      {/* Top Sticky Header */}
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between z-20">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
          <span className="text-gray-500">Back</span>
        </button>

        <span className="text-xs font-bold text-gray-700 truncate max-w-[180px]">
          {product.name}
        </span>

        <div className="w-8" />
      </div>

      {/* Main Product Scrollable Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* Product Image Stage */}
        <div className="relative w-full aspect-square rounded-3xl bg-white border border-gray-100 p-6 flex items-center justify-center shadow-xs overflow-hidden">
          {product.badge && (
            <div className="absolute top-3.5 left-3.5 bg-[#6C38FF] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{product.badge}</span>
            </div>
          )}

          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
          />

          {selectedColor && (
            <div className="absolute bottom-3.5 right-3.5 bg-gray-900/80 backdrop-blur-xs text-white text-[10.5px] px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span>{selectedColor.name}</span>
            </div>
          )}
        </div>

        {/* Title, Brand, Rating */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h1 className="text-xl font-black text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalMrp > currentPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{product.originalMrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Zero Downpayment
            </span>
          </div>

          {/* 1Fi Mutual Fund Benefit Highlight */}
          <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-start gap-2 text-[11px] text-gray-600">
            <TrendingUp className="w-4 h-4 text-[#6C38FF] shrink-0 mt-0.5" />
            <span>
              <strong>1Fi Advantage:</strong> Your mutual funds remain invested and earn continuous market returns while covering your EMIs.
            </span>
          </div>
        </div>

        {/* Variant Section 1: Color Choices */}
        {product.colors && product.colors.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Select Color: <span className="text-[#6C38FF] normal-case">{selectedColor?.name}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-[#6C38FF] bg-purple-50 text-[#6C38FF] shadow-2xs ring-2 ring-[#6C38FF]/20'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#6C38FF]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Variant Section 2: Storage / Specifications */}
        {product.storageOptions && product.storageOptions.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Select Configuration / Storage
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.storageOptions.map((opt) => {
                const isSelected = selectedStorage?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedStorage(opt)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#6C38FF] bg-purple-50 text-[#6C38FF] shadow-2xs ring-2 ring-[#6C38FF]/20'
                        : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] mt-0.5 text-gray-500">
                      {opt.priceDelta > 0 ? `+₹${opt.priceDelta.toLocaleString('en-IN')}` : 'Base Price'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* EMI Options / Plans Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6C38FF]" />
              <span>Select 1Fi No-Cost EMI Plan</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              0% Interest
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mb-3">
            Choose your monthly repayment tenure backed by your mutual fund portfolio.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {availableTenures.map((tenure) => {
              const isSelected = selectedTenure === tenure;
              const monthly = Math.round(currentPrice / tenure);

              return (
                <button
                  key={tenure}
                  onClick={() => setSelectedTenure(tenure)}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-[#6C38FF] bg-[#F7F4FF] shadow-sm ring-2 ring-[#6C38FF]/20'
                      : 'border-gray-200 hover:border-purple-200 bg-gray-50/50'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6C38FF]" />
                  )}
                  <div className="text-xs font-extrabold text-gray-900">{tenure} Months</div>
                  <div className="text-[11px] font-bold text-[#6C38FF] mt-0.5">
                    ₹{monthly.toLocaleString('en-IN')}<span className="text-[9px] font-normal text-gray-500">/mo</span>
                  </div>
                  <div className="text-[9px] text-emerald-600 font-semibold mt-1">
                    0% Interest
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed EMI Summary Breakdown */}
          {emiCalculation && (
            <div className="mt-3.5 pt-3 border-t border-purple-100/60 bg-[#FAF8FF] -mx-4 -mb-4 p-4 rounded-b-2xl">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Monthly EMI:</span>
                  <span className="ml-1 font-bold text-[#6C38FF]">
                    ₹{emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Interest Rate:</span>
                  <span className="ml-1 font-bold text-emerald-600">0% (No-Cost)</span>
                </div>
                <div>
                  <span className="text-gray-400">Processing Fee:</span>
                  <span className="ml-1 font-bold text-gray-800">₹0</span>
                </div>
                <div>
                  <span className="text-gray-400">Total Repayment:</span>
                  <span className="ml-1 font-bold text-gray-800">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] text-gray-500">
                <Info className="w-3 h-3 text-[#6C38FF] shrink-0" />
                <span>Estimated mutual fund pledge: ₹{emiCalculation.requiredCollateralMf.toLocaleString('en-IN')} (Units remain yours)</span>
              </div>
            </div>
          )}
        </div>

        {/* Technical Highlights & Specs */}
        {product.highlights && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Key Highlights
            </h3>
            <ul className="space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Specs Table */}
        {product.specs && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Specifications
            </h3>
            <div className="divide-y divide-gray-100">
              {product.specs.map((s, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{s.label}</span>
                  <span className="font-semibold text-gray-800 text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar with CTA */}
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-3.5 shadow-lg flex items-center justify-between gap-3 z-20">
        <div>
          <div className="text-[10px] uppercase font-bold text-gray-400">
            {selectedTenure} Months No-Cost EMI
          </div>
          <div className="text-lg font-black text-[#6C38FF] leading-tight">
            ₹{emiCalculation?.monthlyEmi ? emiCalculation.monthlyEmi.toLocaleString('en-IN') : Math.round(currentPrice / selectedTenure).toLocaleString('en-IN')}
            <span className="text-xs font-normal text-gray-500"> /mo</span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-3 px-4 bg-[#6C38FF] hover:bg-[#5923ee] active:scale-[0.98] text-white text-xs font-bold rounded-2xl shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
        >
          <span>Proceed with 1Fi Credit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* EMI Checkout & Loan Approval Bottom Sheet */}
      {isCheckoutOpen && (
        <EmiApplicationFlow
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          selectedTenure={selectedTenure}
          currentPrice={currentPrice}
          emiCalculation={emiCalculation}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            onBack();
          }}
        />
      )}
    </div>
  );
};

export default ProductDetailView;
