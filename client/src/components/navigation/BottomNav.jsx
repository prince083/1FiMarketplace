import React from 'react';
import { Home, Store, ReceiptIndianRupee, TrendingUp, User } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const BottomNav = () => {
  const { activeBottomNav, setActiveBottomNav } = useMarketplace();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'dues', label: 'EMI Dues', icon: ReceiptIndianRupee },
    { id: 'limit', label: 'Limit', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="shrink-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] rounded-t-3xl">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeBottomNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveBottomNav(item.id)}
              className="flex-1 flex flex-col items-center justify-center relative py-1 group transition-all"
            >
              {/* Active Indicator Top Pill */}
              {isActive ? (
                <span className="w-8 h-1 bg-[#6C38FF] rounded-full absolute -top-2 transition-all duration-200" />
              ) : (
                <span className="w-0 h-1 bg-transparent rounded-full absolute -top-2 transition-all duration-200" />
              )}

              <Icon
                className={`w-5 h-5 transition-transform group-active:scale-90 ${
                  isActive
                    ? 'text-[#6C38FF] stroke-[2.4]'
                    : 'text-gray-400 group-hover:text-gray-600 stroke-[1.8]'
                }`}
              />

              <span
                className={`text-[10px] mt-1 tracking-tight font-medium ${
                  isActive ? 'text-[#6C38FF] font-bold' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
