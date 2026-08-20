import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Tag,
  CreditCard,
  Smartphone,
  CheckCircle2,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { MatchSlot, Player } from '../types';

interface BookingModalProps {
  match: MatchSlot;
  currentUser: Player;
  onClose: () => void;
  onConfirmBooking: (matchId: string, paymentMethod: string, finalAmount: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  match,
  currentUser,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'gpay' | 'paytm' | 'card'>('gpay');
  const [promoCode, setPromoCode] = useState('FRIDAY30');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FRIDAY30');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!match) return null;

  const basePrice = match.pricePerPerson || 150;
  const discount = appliedPromo === 'FRIDAY30' ? 30 : appliedPromo === 'FIRSTFREE' ? basePrice : 0;
  const platformFee = 10;
  const totalAmount = Math.max(0, basePrice - discount + platformFee);

  const handleApplyPromo = () => {
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'FRIDAY30') {
      setAppliedPromo('FRIDAY30');
    } else if (promoCode.trim().toUpperCase() === 'FIRSTFREE') {
      setAppliedPromo('FIRSTFREE');
    } else {
      setPromoError('Invalid promo code. Try FRIDAY30 or FIRSTFREE');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmBooking(match.id, selectedPayment, totalAmount);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0197FF]/15 text-[#0197FF] text-[10px] font-extrabold uppercase">
              Secure Slot Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Match Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase bg-slate-800 text-[#8BF3F5] px-2 py-0.5 rounded">
                {match.sport}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {match.maxPlayers - match.currentPlayers} Spots Left
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{match.title}</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0197FF]" />
                {match.venueName}
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8BF3F5]" />
                {match.time} • {match.date}
              </p>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase block">
              Have a Promo or Referral Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. FRIDAY30"
                className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-[#0197FF]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" /> Coupon {appliedPromo} applied (-₹{discount})
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-400 font-semibold">
                {promoError}
              </p>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase block">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPayment('gpay')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  selectedPayment === 'gpay'
                    ? 'bg-slate-800 border-[#0197FF] shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#0197FF]" />
                <div>
                  <span className="text-xs font-bold text-white block">Google Pay</span>
                  <span className="text-[10px] text-slate-400">UPI Instant</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment('upi')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  selectedPayment === 'upi'
                    ? 'bg-slate-800 border-[#0197FF] shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#FD7040]" />
                <div>
                  <span className="text-xs font-bold text-white block">PhonePe / UPI</span>
                  <span className="text-[10px] text-slate-400">Auto approve</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment('paytm')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  selectedPayment === 'paytm'
                    ? 'bg-slate-800 border-[#0197FF] shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#8BF3F5]" />
                <div>
                  <span className="text-xs font-bold text-white block">Paytm Wallet</span>
                  <span className="text-[10px] text-slate-400">1-click pay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment('card')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  selectedPayment === 'card'
                    ? 'bg-slate-800 border-[#0197FF] shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-white block">Cards / Netbanking</span>
                  <span className="text-[10px] text-slate-400">Visa, Mastercard</span>
                </div>
              </button>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Slot Fee (1 Player)</span>
              <span className="text-white font-medium">₹{basePrice}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promo Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Turf Lighting & Amenities Tax</span>
              <span className="text-white font-medium">₹{platformFee}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span>Total Payable</span>
              <span className="text-[#0197FF]">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer Checkout CTA */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Payable</span>
            <span className="text-lg font-black text-white">₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePay}
            id="confirm-pay-slot-btn"
            disabled={isProcessing || isSuccess}
            className="px-6 py-3 bg-gradient-to-r from-[#0197FF] to-[#0081dd] hover:from-[#21a6ff] hover:to-[#0197FF] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#0197FF]/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                <span>Slot Confirmed!</span>
              </>
            ) : isProcessing ? (
              <span>Authorizing UPI...</span>
            ) : (
              <>
                <span>Pay & Reserve Slot</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
