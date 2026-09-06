import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { submitEmiOrder } from '../../services/marketplaceApi';

export const EmiApplicationFlow = ({
  product,
  selectedColor,
  selectedStorage,
  selectedTenure,
  currentPrice,
  emiCalculation,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1); // 1: Mutual fund pledge review, 2: Processing, 3: Success Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderResult, setOrderResult] = useState(null);

  const handlePledgeSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderPayload = {
        productId: product.id,
        productName: product.name,
        color: selectedColor?.name,
        storage: selectedStorage?.label,
        tenureMonths: selectedTenure,
        price: currentPrice,
        monthlyEmi: emiCalculation?.monthlyEmi || Math.round(currentPrice / selectedTenure),
        collateralPledged: emiCalculation?.requiredCollateralMf || Math.round(currentPrice * 1.15),
        folioPledged: '1FI-FOLIO-8829471'
      };

      // Real Axios POST call via marketplaceClient
      const response = await submitEmiOrder(orderPayload);
      setOrderResult(response);
      setStep(3); // Success step
    } catch (err) {
      setError(err.message || 'Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl max-h-[85%] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between bg-[#FAF9FD] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[#6C38FF]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">
                {step === 3 ? 'Application Approved!' : '1Fi Instant MF Credit'}
              </h3>
              <p className="text-[10px] text-gray-500">
                {step === 3 ? 'Order confirmed successfully' : 'Zero liquidation mutual fund credit'}
              </p>
            </div>
          </div>
          <button
            onClick={step === 3 ? onSuccess : onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1">
          {step === 1 && (
            <>
              {/* Product mini summary */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <img
                  src={selectedColor && product.images?.[selectedColor.id] ? product.images[selectedColor.id] : product.images?.default}
                  alt={product.name}
                  className="w-12 h-12 object-contain rounded-lg mix-blend-multiply bg-white p-1 border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900 truncate">{product.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {selectedColor?.name} {selectedStorage ? `• ${selectedStorage.label}` : ''}
                  </div>
                  <div className="text-xs font-bold text-[#6C38FF] mt-0.5">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Verified Mutual Fund Collateral Box */}
              <div className="bg-gradient-to-br from-[#FAF8FF] to-purple-50/70 rounded-2xl p-4 border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#6C38FF]" />
                    Linked MF Portfolio
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    Active & Eligible
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Holdings Value:</span>
                    <span className="font-bold text-gray-900">₹3,45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available 1Fi Credit Limit:</span>
                    <span className="font-bold text-emerald-600">₹2,00,000</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-purple-100">
                    <span className="text-gray-500">Lien Required (115%):</span>
                    <span className="font-bold text-[#6C38FF]">
                      ₹{(emiCalculation?.requiredCollateralMf || Math.round(currentPrice * 1.15)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[10.5px] text-purple-700 bg-white/80 p-2.5 rounded-xl border border-purple-100 leading-relaxed">
                  💡 <strong>No redemption needed:</strong> You retain complete ownership and full market compounding on your mutual fund units.
                </div>
              </div>

              {/* Repayment Schedule Overview */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-2">
                <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">
                  Repayment Breakdown
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <div className="text-[10px] text-gray-400">Tenure</div>
                    <div className="font-bold text-gray-900 mt-0.5">{selectedTenure} Months</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-xl">
                    <div className="text-[10px] text-[#6C38FF]">Monthly EMI</div>
                    <div className="font-bold text-[#6C38FF] mt-0.5">
                      ₹{(emiCalculation?.monthlyEmi || Math.round(currentPrice / selectedTenure)).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <div className="text-[10px] text-gray-400">Interest Rate</div>
                    <div className="font-bold text-emerald-600 mt-0.5">0% No Cost</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <div className="text-[10px] text-gray-400">First Debit</div>
                    <div className="font-bold text-gray-900 mt-0.5">5th of Next Month</div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </>
          )}

          {step === 3 && orderResult && (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-900">Credit Approved & Order Placed!</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Your 1Fi No-Cost EMI order has been successfully initiated via Axios API.
                </p>
              </div>

              <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-gray-100 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Reference:</span>
                  <span className="font-mono font-bold text-gray-800">{orderResult.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Product:</span>
                  <span className="font-semibold text-gray-800 truncate max-w-[180px]">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly EMI:</span>
                  <span className="font-bold text-[#6C38FF]">
                    ₹{(orderResult.orderSummary?.monthlyEmi || Math.round(currentPrice / selectedTenure)).toLocaleString('en-IN')} /mo ({selectedTenure} mos)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Approval Status:</span>
                  <span className="font-bold text-emerald-600">PRE-APPROVED</span>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-700 text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#6C38FF] shrink-0 mt-0.5" />
                <span>Your mutual fund pledge has been registered. The merchant partner will dispatch your item within 24-48 hours.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-gray-100 bg-[#FAF9FD] shrink-0">
          {step === 1 ? (
            <button
              onClick={handlePledgeSubmit}
              disabled={loading}
              className="w-full py-3.5 bg-[#6C38FF] hover:bg-[#5923ee] active:scale-[0.99] disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Contacting 1Fi Credit API...</span>
                </>
              ) : (
                <>
                  <span>Pledge Units & Confirm EMI Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onSuccess}
              className="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
            >
              Return to Marketplace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmiApplicationFlow;
