import React from 'react';
import {
  X,
  QrCode,
  MapPin,
  Calendar,
  Clock,
  Users,
  Share2,
  ShieldCheck,
  Download,
  ExternalLink,
} from 'lucide-react';
import { MatchSlot } from '../types';

interface SlotTicketModalProps {
  match: MatchSlot;
  onClose: () => void;
  onShare: () => void;
}

export const SlotTicketModal: React.FC<SlotTicketModalProps> = ({
  match,
  onClose,
  onShare,
}) => {
  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Official Match Slot Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pass Visual Card */}
        <div className="p-6 space-y-5">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl relative overflow-hidden text-center space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-2.5 py-0.5 bg-[#0197FF]/15 text-[#0197FF] text-[10px] font-extrabold uppercase rounded-full">
                {match.sport} Verified
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                PASS #{match.id.toUpperCase().slice(0, 8)}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-white">{match.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{match.venueName}</p>
            </div>

            {/* QR Code Placeholder Graphic */}
            <div className="p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-lg">
              <QrCode className="w-32 h-32 text-slate-900" />
              <span className="text-[9px] font-mono font-bold text-slate-700 mt-1">
                SCAN AT TURF ENTRY
              </span>
            </div>

            {/* Pass Metadata */}
            <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-800 text-xs">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">Timing</span>
                <span className="font-bold text-slate-200 text-xs">{match.time}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">Date</span>
                <span className="font-bold text-slate-200 text-xs">{match.date.split(' ')[0]}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Host Confirmed • Locker & Floodlight Included</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={onShare}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Pass</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#0197FF]/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
