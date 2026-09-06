import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Check, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { fetchLocationsApi } from '../../services/api';

export const LocationSelector = () => {
  const { selectedCity, setSelectedCity, isLocationModalOpen, setIsLocationModalOpen } = useMarketplace();
  const [locations, setLocations] = useState([]);
  const [locSearch, setLocSearch] = useState('');

  useEffect(() => {
    fetchLocationsApi().then(data => setLocations(data));
  }, []);

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(locSearch.toLowerCase()) ||
    loc.state.toLowerCase().includes(locSearch.toLowerCase())
  );

  return (
    <>
      {/* Pill Button */}
      <button
        onClick={() => setIsLocationModalOpen(true)}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F4F0FF] border border-[#E1D4FF] text-[#6C38FF] text-[13px] font-semibold hover:bg-[#ECE4FF] transition-colors shadow-2xs"
      >
        <span>{selectedCity}</span>
        <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>

      {/* Modal / Drawer for Location Selection */}
      {isLocationModalOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs p-0 animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-200 max-h-[85%] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#6C38FF]" />
                <h3 className="font-bold text-gray-900 text-lg">Select Your City</h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 mb-3">
              Nearby stores and distance estimates will recalculate based on your selected city.
            </p>

            {/* Quick search input */}
            <input
              type="text"
              placeholder="Search city or state..."
              value={locSearch}
              onChange={(e) => setLocSearch(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 mb-3 focus:outline-none focus:border-[#6C38FF]"
            />

            {/* Location List */}
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = selectedCity.toLowerCase() === loc.name.toLowerCase();
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedCity(loc.name);
                      setIsLocationModalOpen(false);
                      setLocSearch('');
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-[#F4F0FF] text-[#6C38FF] font-bold border border-[#E1D4FF]'
                        : 'hover:bg-gray-50 text-gray-700 font-medium'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm">{loc.name}</div>
                      <div className="text-xs text-gray-400">{loc.state}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#6C38FF]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;
