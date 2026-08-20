import React, { useState } from 'react';
import {
  Users,
  Plus,
  Share2,
  Calendar,
  MapPin,
  Clock,
  Shield,
  Trophy,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  UserPlus,
} from 'lucide-react';
import { Community, MatchSlot, Player, SportType } from '../types';
import { SPORTS_METADATA, MOCK_CURRENT_USER, MATCH_SLOTS_DATA } from '../data/mockData';

interface CommunityViewProps {
  communities?: Community[];
  currentCity?: string;
  currentUser?: Player;
  onJoinCommunityToggle?: (communityId: string) => void;
  onToggleJoinCommunity?: (communityId: string) => void;
  onOpenCreateCommunityModal?: () => void;
  onOpenShareModal?: (type: 'match' | 'community', item: any) => void;
  onOpenMatchBooking?: (match: MatchSlot) => void;
  onOpenBookingModal?: (match: MatchSlot) => void;
  matches?: MatchSlot[];
  selectedSport?: SportType | 'all';
  onSelectSport?: (sport: SportType | 'all') => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  communities = [],
  currentCity = 'Ahmedabad',
  currentUser = MOCK_CURRENT_USER,
  onJoinCommunityToggle,
  onToggleJoinCommunity,
  onOpenCreateCommunityModal = () => {},
  onOpenShareModal = (_t: any, _i: any) => {},
  onOpenMatchBooking,
  onOpenBookingModal,
  matches = [],
  selectedSport: controlledSport,
  onSelectSport: controlledOnSelectSport,
}) => {
  const [internalSport, setInternalSport] = useState<SportType | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'my_squads'>('all');
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  const selectedSport = controlledSport !== undefined ? controlledSport : internalSport;
  const setSelectedSport = (sport: SportType | 'all') => {
    if (controlledOnSelectSport) controlledOnSelectSport(sport);
    setInternalSport(sport);
  };

  const handleToggleJoin = (id: string) => {
    if (onToggleJoinCommunity) onToggleJoinCommunity(id);
    else if (onJoinCommunityToggle) onJoinCommunityToggle(id);
  };

  const handleBookingClick = (match: MatchSlot) => {
    if (onOpenMatchBooking) onOpenMatchBooking(match);
    else if (onOpenBookingModal) onOpenBookingModal(match);
  };

  const safeCommunities = communities || [];
  const safeMatches = matches && matches.length > 0 ? matches : MATCH_SLOTS_DATA;

  const myCommunities = safeCommunities.filter((c) => c && c.isJoined);

  const filteredCommunities = (activeTab === 'my_squads' ? myCommunities : safeCommunities).filter(
    (c) => c && (selectedSport === 'all' || c.sport === selectedSport)
  );

  const displayedCommunity = selectedCommunity || filteredCommunities[0] || safeCommunities[0];

  const communityMatches = safeMatches.filter(
    (m) =>
      m &&
      displayedCommunity &&
      (m.communityId === displayedCommunity.id ||
        m.communityName?.toLowerCase().includes(displayedCommunity.name.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FD7040]/15 border border-[#FD7040]/30 text-[#FD7040] text-[10px] font-extrabold uppercase">
              Sports Communities & Squads
            </span>
            <span className="text-xs text-slate-400 font-medium">• {currentCity}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Community Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Join local squads like Community HHS, FLY OVER & Tiger Squad for regular matches.
          </p>
        </div>

        <button
          onClick={onOpenCreateCommunityModal}
          id="create-community-btn"
          className="px-4 py-2.5 bg-gradient-to-r from-[#FD7040] to-[#e65c2c] hover:from-[#ff7c4f] hover:to-[#FD7040] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#FD7040]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create New Squad</span>
        </button>
      </div>

      {/* Sport Chips & SubTabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center bg-[#18181b] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            id="tab-all-squads"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-[#0197FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Squads ({communities.length})
          </button>
          <button
            onClick={() => setActiveTab('my_squads')}
            id="tab-my-squads"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'my_squads' ? 'bg-[#0197FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>My Squads</span>
            {myCommunities.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-[#FD7040] text-white text-[9px] font-extrabold rounded-full">
                {myCommunities.length}
              </span>
            )}
          </button>
        </div>

        {/* Sports filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedSport('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedSport === 'all'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-[#18181b] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All Sports
          </button>
          {['volleyball', 'cricket', 'tennis', 'football'].map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSport(sp as SportType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                selectedSport === sp
                  ? 'bg-[#FD7040]/20 text-[#FD7040] border-[#FD7040]/40'
                  : 'bg-[#18181b] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Bento Layout: Left List (Col 1-5), Right Detailed Hub (Col 6-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Communities List */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            {activeTab === 'my_squads' ? 'Your Enrolled Squads' : 'Explore Nearby Communities'}
          </p>

          {filteredCommunities.length === 0 ? (
            <div className="p-8 bg-[#18181b] border border-slate-800 rounded-3xl text-center">
              <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No squads found for this category.</p>
            </div>
          ) : (
            filteredCommunities.map((comm) => {
              const isSelected = displayedCommunity?.id === comm.id;
              return (
                <div
                  key={comm.id}
                  id={`community-card-${comm.id}`}
                  onClick={() => setSelectedCommunity(comm)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-[#0197FF] shadow-lg shadow-[#0197FF]/10'
                      : 'bg-[#18181b] hover:bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                      {comm.logo}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white truncate">{comm.name}</h3>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded uppercase">
                          {comm.sport}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {comm.memberCount} members • {comm.homeVenue.split(',')[0]}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {comm.isJoined && (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Member
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-medium truncate">
                          {comm.scheduleDays[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-colors shrink-0 ${
                      isSelected ? 'text-[#0197FF]' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: In-Depth Squad View (Bento Grid) */}
        {displayedCommunity && (
          <div className="lg:col-span-7 bg-[#18181b] border border-slate-800 rounded-3xl p-6 space-y-6">
            {/* Squad Hero Banner */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0 shadow-lg">
                  {displayedCommunity.logo}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">{displayedCommunity.name}</h2>
                    <span className="px-2.5 py-0.5 bg-[#0197FF]/15 text-[#0197FF] border border-[#0197FF]/30 text-xs font-bold rounded-full uppercase">
                      {displayedCommunity.sport}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    {displayedCommunity.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenShareModal('community', displayedCommunity)}
                  id="community-share-invite-btn"
                  className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Share Invite Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleJoin(displayedCommunity.id)}
                  id="community-join-toggle-btn"
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    displayedCommunity.isJoined
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300'
                      : 'bg-[#0197FF] hover:bg-[#0081dd] text-white shadow-lg shadow-[#0197FF]/20'
                  }`}
                >
                  {displayedCommunity.isJoined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Joined Squad</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Join Squad</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Squad Stats Bento Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                  <Users className="w-3.5 h-3.5 text-[#0197FF]" />
                  <span>Total Roster</span>
                </div>
                <p className="text-base font-extrabold text-white">
                  {displayedCommunity.memberCount} Active Players
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FD7040]" />
                  <span>Home Turf</span>
                </div>
                <p className="text-xs font-bold text-white truncate">
                  {displayedCommunity.homeVenue}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Play Routine</span>
                </div>
                <p className="text-xs font-bold text-white truncate">
                  {displayedCommunity.scheduleDays.join(', ')}
                </p>
              </div>
            </div>

            {/* Members Roster Section (as depicted in "People" visual designs) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Squad Players & Rankings
                </h3>
                <span className="text-xs text-slate-400">
                  {displayedCommunity.members.length} Squad Mates
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayedCommunity.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-[#0197FF]/50 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{member.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>Played: {member.gamesPlayed}</span>
                          <span>•</span>
                          <span className="text-[#8BF3F5] font-bold">Rank {member.rank}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded border border-slate-700 shrink-0">
                      {member.skillLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Community Matches */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Upcoming Community Matches & Lobbies
              </h3>
              {communityMatches.length === 0 ? (
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl text-center">
                  <p className="text-xs text-slate-400">No scheduled matches currently active for this squad.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {communityMatches.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{m.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {m.venueName} • {m.date} ({m.time})
                        </p>
                      </div>
                      <button
                        onClick={() => handleBookingClick(m)}
                        className="px-3 py-1.5 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl shrink-0"
                      >
                        {m.isJoined ? 'View Pass' : 'Join (₹' + m.pricePerPerson + ')'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
