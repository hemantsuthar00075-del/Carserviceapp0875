import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Trophy,
  Share2,
  Plus,
  CheckCircle2,
  ChevronRight,
  Shield,
  Award,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { MatchSlot, Player, SportType } from '../types';
import { SPORTS_METADATA, MOCK_CURRENT_USER, MATCH_SLOTS_DATA } from '../data/mockData';

interface PlayScheduleViewProps {
  matches?: MatchSlot[];
  currentUser?: Player;
  currentCity?: string;
  onOpenBooking?: (match: MatchSlot) => void;
  onOpenBookingModal?: (match: MatchSlot) => void;
  onOpenShareModal?: (type: 'match' | 'community', item: any) => void;
  onOpenHostModal?: () => void;
  onOpenTicketModal?: (match: MatchSlot) => void;
  onOpenMatchDetail?: (match: MatchSlot) => void;
}

export const PlayScheduleView: React.FC<PlayScheduleViewProps> = ({
  matches = [],
  currentUser = MOCK_CURRENT_USER,
  currentCity = 'Ahmedabad',
  onOpenBooking,
  onOpenBookingModal,
  onOpenShareModal = (_t: any, _i: any) => {},
  onOpenHostModal = () => {},
  onOpenTicketModal = (_m: any) => {},
  onOpenMatchDetail = (_m: any) => {},
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'history' | 'my_slots'>('upcoming');
  const [selectedSportFilter, setSelectedSportFilter] = useState<SportType | 'all'>('all');
  const [selectedDateIndex, setSelectedDateIndex] = useState(1); // Default to Monday 10

  const handleBooking = (match: MatchSlot) => {
    if (match.isJoined && onOpenTicketModal) {
      onOpenTicketModal(match);
    } else if (onOpenBooking) {
      onOpenBooking(match);
    } else if (onOpenBookingModal) {
      onOpenBookingModal(match);
    }
  };

  const safeMatches = matches && matches.length > 0 ? matches : MATCH_SLOTS_DATA;

  // Date strip items inspired by the visual design: S 09, M 10, T 11, W 12, THR 13, F 14, S 15
  const calendarDays = [
    { day: 'S', date: '09', month: 'Nov', fullDate: '2025-11-09' },
    { day: 'M', date: '10', month: 'Nov', fullDate: '2025-11-10' },
    { day: 'T', date: '11', month: 'Nov', fullDate: '2025-11-11' },
    { day: 'W', date: '12', month: 'Nov', fullDate: '2025-11-12' },
    { day: 'THR', date: '13', month: 'Nov', fullDate: '2025-11-13' },
    { day: 'F', date: '14', month: 'Nov', fullDate: '2025-11-14' },
    { day: 'S', date: '15', month: 'Nov', fullDate: '2025-11-15' },
    { day: 'S', date: '16', month: 'Nov', fullDate: '2025-11-16' },
    { day: 'M', date: '17', month: 'Nov', fullDate: '2025-11-17' },
    { day: 'T', date: '18', month: 'Nov', fullDate: '2025-11-18' },
  ];

  // Filtering matches based on tab and sport
  const filteredMatches = safeMatches.filter((m) => {
    if (!m) return false;
    const matchesSport = selectedSportFilter === 'all' || m.sport === selectedSportFilter;
    if (!matchesSport) return false;

    if (activeSubTab === 'upcoming') {
      return m.status === 'upcoming';
    } else if (activeSubTab === 'history') {
      return m.status === 'completed';
    } else if (activeSubTab === 'my_slots') {
      return m.isJoined;
    }
    return true;
  });

  const myUpcomingSlots = safeMatches.filter((m) => m && m.isJoined && m.status === 'upcoming');

  return (
    <div className="space-y-6 pb-20">
      {/* Bento Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0197FF]/15 border border-[#0197FF]/30 text-[#0197FF] text-[10px] font-extrabold uppercase">
              Schedule & Matches
            </span>
            <span className="text-xs text-slate-400 font-medium">• {currentCity}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Play Arena & Slot Booking</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Book open slots, check match history, and track team results.
          </p>
        </div>

        <button
          onClick={onOpenHostModal}
          id="play-host-new-lobby-btn"
          className="px-4 py-2.5 bg-gradient-to-r from-[#0197FF] to-[#0081dd] hover:from-[#21a6ff] hover:to-[#0197FF] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#0197FF]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Host a Game Lobby</span>
        </button>
      </div>

      {/* Date Strip Calendar Selector (as in UI screen: My Schedule S 09, M 10, T 11...) */}
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#0197FF]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Select Match Day (November 2025)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Active: {calendarDays[selectedDateIndex].month} {calendarDays[selectedDateIndex].date} ({calendarDays[selectedDateIndex].day})
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
          {calendarDays.map((item, idx) => {
            const isSelected = selectedDateIndex === idx;
            return (
              <button
                key={idx}
                id={`calendar-day-${item.date}`}
                onClick={() => setSelectedDateIndex(idx)}
                className={`flex flex-col items-center justify-center min-w-[54px] py-2.5 px-2 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#0197FF] text-white border-[#0197FF] shadow-lg shadow-[#0197FF]/25 font-bold scale-105'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
                }`}
              >
                <span className={`text-[10px] uppercase ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                  {item.day}
                </span>
                <span className="text-base font-extrabold">{item.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub Tabs: Upcoming / History / My Booked Slots */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center bg-[#18181b] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('upcoming')}
            id="subtab-upcoming"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'upcoming'
                ? 'bg-[#0197FF] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming Open Slots
          </button>
          <button
            onClick={() => setActiveSubTab('my_slots')}
            id="subtab-myslots"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeSubTab === 'my_slots'
                ? 'bg-[#0197FF] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>My Booked Slots</span>
            {myUpcomingSlots.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-[#FD7040] text-white text-[9px] font-extrabold rounded-full">
                {myUpcomingSlots.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            id="subtab-history"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'history'
                ? 'bg-[#0197FF] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Match History & Ranks
          </button>
        </div>

        {/* Sport Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedSportFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedSportFilter === 'all'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-[#18181b] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All
          </button>
          {['volleyball', 'cricket', 'football', 'tennis'].map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSportFilter(sp as SportType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                selectedSportFilter === sp
                  ? 'bg-[#0197FF]/20 text-[#0197FF] border-[#0197FF]/40'
                  : 'bg-[#18181b] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Match Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches.length === 0 ? (
          <div className="col-span-full py-16 bg-[#18181b] border border-slate-800 rounded-3xl text-center p-6">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Matches Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              There are no {activeSubTab} match slots for this filter. Create a lobby to invite players in {currentCity}!
            </p>
            <button
              onClick={onOpenHostModal}
              className="px-4 py-2 bg-[#0197FF] text-white text-xs font-bold rounded-xl"
            >
              Host Match Lobby
            </button>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.id}
              id={`play-match-card-${match.id}`}
              className="bg-[#18181b] border border-slate-800 hover:border-slate-700 rounded-3xl p-5 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="relative z-10 space-y-3">
                {/* Header tag row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs font-extrabold rounded-lg uppercase tracking-wider border border-slate-700">
                      {match.sport}
                    </span>
                    {match.communityName && (
                      <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[140px]">
                        {match.communityName}
                      </span>
                    )}
                  </div>

                  {match.status === 'completed' ? (
                    <span className="px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-extrabold rounded-full flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {match.userRankInMatch || 'Completed'}
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        match.currentPlayers >= match.maxPlayers
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {match.currentPlayers}/{match.maxPlayers} Players
                    </span>
                  )}
                </div>

                {/* Match Title */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#0197FF] transition-colors">
                    {match.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{match.description}</p>
                </div>

                {/* Details Bento Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Venue</span>
                    <span className="text-xs font-bold text-slate-200 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#0197FF] shrink-0" />
                      {match.venueName}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Time & Date</span>
                    <span className="text-xs font-bold text-slate-200 truncate flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#8BF3F5] shrink-0" />
                      {match.time}, {match.date.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Completed Scoreline if completed */}
                {match.status === 'completed' && match.scoreSummary && (
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      Match Result Summary
                    </div>
                    <p className="font-semibold text-slate-200">{match.scoreSummary}</p>
                  </div>
                )}

                {/* Host & Player avatars preview */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={match.host.avatar}
                      alt={match.host.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-[#0197FF]"
                    />
                    <div className="text-left">
                      <span className="text-[10px] text-slate-500 block">Host</span>
                      <span className="text-xs font-bold text-slate-200">{match.host.name}</span>
                    </div>
                  </div>

                  <div className="flex -space-x-1.5 overflow-hidden">
                    {match.playersList.slice(0, 4).map((p, idx) => (
                      <img
                        key={idx}
                        src={p.avatar}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-[#18181b] object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Slot Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-white">₹{match.pricePerPerson}</span>
                    {match.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">₹{match.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenShareModal('match', match)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Share Match Slot"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  {match.isJoined ? (
                    <button
                      onClick={() => onOpenTicketModal(match)}
                      id={`view-ticket-btn-${match.id}`}
                      className="px-3.5 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Slot Pass / QR</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBooking(match)}
                      id={`book-match-btn-${match.id}`}
                      className="px-4 py-2 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl shadow-md shadow-[#0197FF]/20 transition-all active:scale-95"
                    >
                      Book Slot
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
