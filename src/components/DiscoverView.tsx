import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  Users,
  Shield,
  ArrowRight,
  TrendingUp,
  Tag,
  Share2,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import {
  MatchSlot,
  SportOffer,
  SportType,
  Venue,
  Community,
  Player,
} from '../types';
import { SPORTS_METADATA, MOCK_OFFERS_DATA } from '../data/mockData';

interface DiscoverViewProps {
  currentCity?: string;
  selectedSport?: SportType | 'all';
  onSelectSport?: (s: SportType | 'all') => void;
  matches?: MatchSlot[];
  offers?: SportOffer[];
  venues?: Venue[];
  communities?: Community[];
  onOpenMatchDetail?: (match: MatchSlot) => void;
  onOpenBooking?: (match: MatchSlot) => void;
  onOpenBookingModal?: (match: MatchSlot) => void;
  onOpenTicketModal?: (match: MatchSlot) => void;
  onOpenShareModal?: (type: 'match' | 'community', item: any) => void;
  onOpenCommunityDetail?: (community: Community) => void;
  onOpenVenueDetail?: (venue: Venue) => void;
  onOpenRulebook?: (sport: SportType) => void;
  onOpenHostModal?: () => void;
  onOpenCreateCommunityModal?: () => void;
  onToggleJoinCommunity?: (communityId: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  currentCity = 'Ahmedabad',
  selectedSport = 'all',
  onSelectSport = (_s: any) => {},
  matches = [],
  offers = [],
  venues = [],
  communities = [],
  onOpenMatchDetail = (_m: any) => {},
  onOpenBooking,
  onOpenBookingModal,
  onOpenTicketModal = (_m: any) => {},
  onOpenShareModal = (_t: any, _i: any) => {},
  onOpenCommunityDetail = (_c: any) => {},
  onOpenVenueDetail = (_v: any) => {},
  onOpenRulebook = (_r: any) => {},
  onOpenHostModal = () => {},
  onOpenCreateCommunityModal = () => {},
  onToggleJoinCommunity = (_id: any) => {},
  onNavigateTab = (_tab: any) => {},
}) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  const handleBookingClick = (match: MatchSlot) => {
    if (match.isJoined && onOpenTicketModal) {
      onOpenTicketModal(match);
    } else if (onOpenBooking) {
      onOpenBooking(match);
    } else if (onOpenBookingModal) {
      onOpenBookingModal(match);
    }
  };

  const safeMatches = matches || [];
  const safeOffers = (offers && offers.length > 0) ? offers : MOCK_OFFERS_DATA;
  const safeVenues = venues || [];
  const safeCommunities = communities || [];

  // Filter matches based on selectedSport
  const filteredMatches = safeMatches.filter(
    (m) =>
      m &&
      m.status === 'upcoming' &&
      (selectedSport === 'all' || m.sport === selectedSport)
  );

  const filteredVenues = safeVenues.filter((v) =>
    v && (selectedSport === 'all'
      ? true
      : v.sportsSupported?.includes(selectedSport as SportType))
  );

  const filteredCommunities = safeCommunities.filter((c) =>
    c && (selectedSport === 'all' ? true : c.sport === selectedSport)
  );

  const featuredMatch = safeMatches.find((m) => m && m.id === 'match_vb_1') || safeMatches[0];

  return (
    <div className="space-y-6 pb-20">
      {/* Sports Selector Pill Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        <button
          onClick={() => onSelectSport('all')}
          id="sport-filter-all"
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedSport === 'all'
              ? 'bg-[#0197FF] text-white shadow-md shadow-[#0197FF]/20 border border-[#0197FF]'
              : 'bg-[#18181b] text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Sports</span>
        </button>

        {SPORTS_METADATA.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              id={`sport-filter-${sport.id}`}
              onClick={() => onSelectSport(sport.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-slate-800 text-white border-[#0197FF] shadow-sm shadow-[#0197FF]/20'
                  : 'bg-[#18181b] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-slate-800'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: sport.color }}
              ></span>
              <span className="capitalize">{sport.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Bento Cell 1: Featured Active Pickup Match (Col 1-8) */}
        {featuredMatch && (
          <div className="md:col-span-8 bg-[#18181b] border border-slate-800 hover:border-slate-700/80 rounded-3xl p-6 relative overflow-hidden transition-all group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0197FF]/15 via-[#8BF3F5]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#0197FF]/15 text-[#0197FF] border border-[#0197FF]/30 text-xs font-bold rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0197FF] animate-ping"></span>
                    Featured Match Lobby
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700 uppercase">
                    {featuredMatch.sport}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {featuredMatch.maxPlayers - featuredMatch.currentPlayers} spots remaining
                  </span>
                </div>
              </div>

              {/* Title & Host info */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {featuredMatch.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4">
                {featuredMatch.description}
              </p>

              {/* Match Meta pills in Bento row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-bold mb-0.5">
                    <MapPin className="w-3 h-3 text-[#0197FF]" />
                    <span>Venue</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {featuredMatch.venueName}
                  </p>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-bold mb-0.5">
                    <Clock className="w-3 h-3 text-[#8BF3F5]" />
                    <span>Date & Time</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {featuredMatch.time}, {featuredMatch.date.split(' ')[0]}
                  </p>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-bold mb-0.5">
                    <Users className="w-3 h-3 text-[#FD7040]" />
                    <span>Squad</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {featuredMatch.currentPlayers}/{featuredMatch.maxPlayers} Players
                  </p>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-bold mb-0.5">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Skill</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {featuredMatch.skillRequired}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  {featuredMatch.playersList.slice(0, 4).map((p, idx) => (
                    <img
                      key={p.id || idx}
                      src={p.avatar}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#18181b] object-cover"
                    />
                  ))}
                  {featuredMatch.playersList.length > 4 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 ring-2 ring-[#18181b] text-[10px] font-bold text-slate-300">
                      +{featuredMatch.playersList.length - 4}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    Slot Fee
                  </span>
                  <span className="text-base font-extrabold text-white">
                    ₹{featuredMatch.pricePerPerson}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenShareModal('match', featuredMatch)}
                  id="featured-match-share-btn"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Share Match"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleBookingClick(featuredMatch)}
                  id="featured-match-join-btn"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0197FF] to-[#0081dd] hover:from-[#20a4ff] hover:to-[#0197FF] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#0197FF]/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{featuredMatch.isJoined ? 'View Slot Pass' : 'Join Match (₹' + featuredMatch.pricePerPerson + ')'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bento Cell 2: Live City Activity Metric (Col 9-12) */}
        <div className="md:col-span-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-[#0197FF]/10 rounded-2xl border border-[#0197FF]/20 text-[#0197FF]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentCity} Pulse
            </span>
          </div>

          <div className="my-4 space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
              {safeMatches.filter((m) => m && m.status === 'upcoming').length + 18}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              Active Game Slots Open Today in {currentCity}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Communities</p>
              <p className="text-sm font-bold text-slate-200">{safeCommunities.length} Active</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Verified Turf</p>
              <p className="text-sm font-bold text-slate-200">{safeVenues.length} Venues</p>
            </div>
          </div>
        </div>

        {/* Bento Cell 3: Special Venue Offers Carousel (Col 1-12) */}
        <div className="md:col-span-12 bg-gradient-to-r from-[#18181b] via-[#1a1e29] to-[#18181b] border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FD7040]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Exclusive Sports Offers & Venue Discounts
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {safeOffers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveOfferIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeOfferIndex === idx ? 'w-6 bg-[#0197FF]' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {safeOffers.map((offer, idx) => (
              <div
                key={offer.id}
                className={`p-4 rounded-2xl border transition-all ${
                  activeOfferIndex === idx
                    ? 'bg-slate-900/80 border-[#0197FF]/40 shadow-lg shadow-[#0197FF]/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setActiveOfferIndex(idx)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold bg-[#FD7040] text-white rounded-lg uppercase">
                    {offer.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    CODE: {offer.code}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{offer.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{offer.description}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2">
                  <span className="truncate">{offer.venueName}</span>
                  <span className="text-[#0197FF] font-semibold hover:underline cursor-pointer">
                    Apply Offer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Cell 4: Upcoming Match Slots Grid (Col 1-8) */}
        <div className="md:col-span-8 bg-[#18181b] border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Upcoming Pickup Matches</h3>
              <p className="text-xs text-slate-400">Open game lobbies in {currentCity}</p>
            </div>
            <button
              onClick={onOpenHostModal}
              id="discover-open-host-modal-btn"
              className="text-xs font-bold text-[#0197FF] hover:text-[#28a8ff] flex items-center gap-1 transition-colors"
            >
              <span>+ Host Match</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
                <p className="text-xs text-slate-400">No active matches found for selected sport in {currentCity}.</p>
                <button
                  onClick={onOpenHostModal}
                  className="mt-3 px-4 py-1.5 bg-[#0197FF] text-white text-xs font-bold rounded-xl"
                >
                  Be the first to Host
                </button>
              </div>
            ) : (
              filteredMatches.map((match) => (
                <div
                  key={match.id}
                  id={`match-card-${match.id}`}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-[#0197FF]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0197FF]/10 border border-[#0197FF]/30 flex items-center justify-center text-[#0197FF] font-bold text-sm shrink-0 uppercase">
                      {match.sport.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#0197FF] transition-colors">
                          {match.title}
                        </h4>
                        {match.offerBadge && (
                          <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#FD7040]/20 text-[#FD7040] border border-[#FD7040]/30 rounded">
                            {match.offerBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0197FF]" />
                          {match.venueName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#8BF3F5]" />
                          {match.time} • {match.date.split(' ')[0]}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300 font-semibold">
                          <Users className="w-3 h-3 text-emerald-400" />
                          {match.currentPlayers}/{match.maxPlayers} Joined
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Per Slot</span>
                      <span className="text-sm font-extrabold text-white">₹{match.pricePerPerson}</span>
                    </div>

                    <button
                      onClick={() => handleBookingClick(match)}
                      id={`join-slot-btn-${match.id}`}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        match.isJoined
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-[#0197FF] hover:bg-[#0081dd] text-white shadow-sm shadow-[#0197FF]/20'
                      }`}
                    >
                      {match.isJoined ? 'Pass Booked' : 'Book Slot'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bento Cell 5: Sports Communities Spotlight (Col 9-12) */}
        <div className="md:col-span-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Top Squads</h3>
                <p className="text-xs text-slate-400">Join active sports communities</p>
              </div>
              <span className="text-xs text-[#0197FF] font-bold">Explore</span>
            </div>

            <div className="space-y-3">
              {filteredCommunities.slice(0, 3).map((community) => (
                <div
                  key={community.id}
                  onClick={() => onOpenCommunityDetail(community)}
                  className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                      {community.logo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-[#0197FF] transition-colors">
                        {community.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {community.memberCount} members • {community.homeVenue.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Learn rules & regulations card */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#0197FF]/15 to-transparent border border-[#0197FF]/30">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-[#8BF3F5]" />
              <h4 className="text-xs font-bold text-white">New to a Sport?</h4>
            </div>
            <p className="text-[11px] text-slate-300">
              Read official rules, rotation guides, and court tactics in our Guide.
            </p>
            <button
              onClick={() => onOpenRulebook(selectedSport === 'all' ? 'volleyball' : (selectedSport as SportType))}
              className="mt-2 text-xs font-bold text-[#8BF3F5] hover:underline flex items-center gap-1"
            >
              <span>View Rulebook</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bento Cell 6: Verified Local Sports Venues (Col 1-12) */}
        <div className="md:col-span-12 bg-[#18181b] border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Partner Venues & Sports Clubs in {currentCity}</h3>
              <p className="text-xs text-slate-400">Verified turf grounds with floodlights, lockers & amenities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden group flex flex-col justify-between transition-all"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-amber-400 border border-amber-400/30 flex items-center gap-1">
                    ★ {venue.rating} ({venue.reviewsCount})
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h4 className="text-sm font-bold text-white truncate">{venue.name}</h4>
                    <p className="text-[11px] text-slate-300 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0197FF] shrink-0" />
                      {venue.area}, {venue.city}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-1">
                    {venue.sportsSupported.map((sp) => (
                      <span
                        key={sp}
                        className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-semibold rounded capitalize"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Starting at</span>
                      <span className="text-xs font-bold text-white">₹{venue.pricingPerHour}/hr</span>
                    </div>
                    <button
                      onClick={() => onOpenVenueDetail(venue)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold rounded-xl border border-white/10 hover:border-[#0197FF]/40 transition-colors"
                    >
                      View Slots
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
