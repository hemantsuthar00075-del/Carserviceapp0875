import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Users,
  Shield,
  Tag,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MatchSlot, Player } from '../types';

interface MatchDetailModalProps {
  match: MatchSlot;
  currentUser: Player;
  onClose: () => void;
  onBookSlot: (match: MatchSlot) => void;
  onShare: (match: MatchSlot) => void;
  onToggleJoin: (matchId: string) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  currentUser,
  onClose,
  onBookSlot,
  onShare,
  onToggleJoin,
}) => {
  if (!match) return null;

  const isHost = match.host?.id === currentUser?.id;
  const isFull = match.currentPlayers >= match.maxPlayers;
  const isJoined = match.isJoined;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0197FF]/15 text-[#0197FF] text-[10px] font-extrabold uppercase">
              {match.sport} Match Slot
            </span>
            {isJoined && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                You're Joined
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare(match)}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Main Title & Venue */}
          <div>
            <h2 className="text-xl font-black text-white">{match.title}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0197FF]" />
              {match.venueName} • {match.venueArea}
            </p>
          </div>

          {/* Quick Stats Bento */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Date</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{match.date}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Time</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{match.time}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Slot Fee</span>
              <span className="text-xs font-black text-[#0197FF] mt-0.5 block">
                {match.pricePerPerson === 0 ? 'Free' : `₹${match.pricePerPerson}`}
              </span>
            </div>
          </div>

          {/* Host Info Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={
                  match.host?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
                alt={match.host?.name || 'Host'}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#0197FF]/30"
              />
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Hosted by
                </span>
                <p className="text-xs font-bold text-white">{match.host?.name || 'Host Athlete'}</p>
                <p className="text-[10px] text-[#0197FF]">Rank #{match.host?.rank || '42'}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20">
              Verified Host
            </span>
          </div>

          {/* Description & Rules */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">About the Game</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {match.description ||
                'Friendly pickup match! Bring your own hydration. Non-marking shoes required.'}
            </p>
          </div>

          {/* Players Roster */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Confirmed Athletes ({match.currentPlayers}/{match.maxPlayers})
              </h4>
              <span className="text-[10px] font-semibold text-slate-400">
                {match.maxPlayers - match.currentPlayers} spots open
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(match.playersList || [match.host]).map((p, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2"
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{p.name}</p>
                    <span className="text-[9px] text-slate-400">Rank #{p.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Price</span>
            <span className="text-lg font-black text-white">
              {match.pricePerPerson === 0 ? 'Free Entry' : `₹${match.pricePerPerson}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isJoined ? (
              <button
                onClick={() => onToggleJoin(match.id)}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all"
              >
                Leave Match
              </button>
            ) : (
              <button
                onClick={() => onBookSlot(match)}
                disabled={isFull}
                id="book-slot-from-detail-btn"
                className="px-6 py-2.5 bg-gradient-to-r from-[#0197FF] to-[#0081dd] hover:from-[#21a6ff] hover:to-[#0197FF] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#0197FF]/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <span>{isFull ? 'Slot Full' : 'Book & Join Slot'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
