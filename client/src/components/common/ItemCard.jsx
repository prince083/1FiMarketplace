import React from 'react';

/**
 * Reusable Card component for both Top Brands and Nearby Stores
 * Displays logo, title, optional distance badge, and description/address/EMI text
 */
export const ItemCard = ({
  logo,
  title,
  subtitle,
  badge,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-3.5 ${className}`}>
      {/* Brand or Store Logo Squircle */}
      {logo}

      {/* Details Column */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-[15.5px] font-bold text-gray-900 truncate leading-tight">
            {title}
          </h3>
          {badge && (
            <span className="shrink-0 bg-gray-100 text-gray-500 font-bold text-[10.5px] px-2 py-0.5 rounded-md tracking-tight uppercase">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle / Address / EMI Details */}
        <p className="text-[12px] text-gray-400 font-normal leading-relaxed line-clamp-2 pr-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
