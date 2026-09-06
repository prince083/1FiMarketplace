import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(product.id)}
      className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(108,56,255,0.08)] hover:border-purple-200/80 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      {/* Product Image Box */}
      <div className="relative w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-2.5 flex items-center justify-center p-2">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-xs text-[#6C38FF] border border-purple-100 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#6C38FF]" />
            <span>{product.badge}</span>
          </div>
        )}

        <img
          src={product.images?.default}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug group-hover:text-[#6C38FF] transition-colors line-clamp-2 mb-1.5">
            {product.name}
          </h3>
        </div>

        {/* Pricing & EMI Pill */}
        <div className="pt-1 border-t border-gray-50">
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-[15px] font-black text-gray-900">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </span>
            {product.originalMrp > product.basePrice && (
              <span className="text-[11px] text-gray-400 line-through font-normal">
                ₹{product.originalMrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Starting Zero-Cost EMI */}
          <div className="bg-[#F6F3FF] border border-[#E9E2FF] rounded-lg px-2 py-1 flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[#6C38FF]">
              ₹{product.startingEmi.toLocaleString('en-IN')}<span className="text-[9.5px] font-normal text-gray-500">/mo</span>
            </span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
              0% EMI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
