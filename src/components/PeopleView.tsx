import React, { useState } from 'react';
import {
  Users,
  Search,
  Trophy,
  UserPlus,
  Check,
  MessageSquare,
  Shield,
  Star,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Player, SportType } from '../types';
import { SPORTS_METADATA, MOCK_CURRENT_USER, PLAYERS_DIRECTORY } from '../data/mockData';

interface PeopleViewProps {
  players?: Player[];
  currentUser?: Player;
  currentCity?: string;
  onToggleConnect?: (playerId: string) => void;
  onToggleFollow?: (playerId: string) => void;
  onStartChat?: (player: Player) => void;
  onInviteToMatch?: (player: Player) => void;
  onOpenShareModal?: (type: 'match' | 'community', item: any) => void;
}

export const PeopleView: React.FC<PeopleViewProps> = ({
  players = [],
  currentUser = MOCK_CURRENT_USER,
  currentCity = 'Ahmedabad',
  onToggleConnect,
  onToggleFollow,
  onStartChat = (_p: any) => {},
  onInviteToMatch = (_p: any) => {},
  onOpenShareModal = (_t: any, _i: any) => {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'connected' | 'top_ranked'>('all');

  const handleConnect = (id: string) => {
    if (onToggleConnect) onToggleConnect(id);
    else if (onToggleFollow) onToggleFollow(id);
  };

  const safePlayers = players && players.length > 0 ? players : PLAYERS_DIRECTORY;

  const filteredPlayers = safePlayers.filter((p) => {
    if (!p) return false;
    if (currentUser && p.id === currentUser.id) return false;

    const sportStr = (p.preferredSport || p.primarySport || '').toLowerCase();
    const nameStr = (p.name || '').toLowerCase();
    const cityStr = (p.city || p.location || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      nameStr.includes(query) ||
      sportStr.includes(query) ||
      cityStr.includes(query);

    const matchesSport =
      selectedSport === 'all' ||
      p.preferredSport === selectedSport ||
      p.primarySport === selectedSport;

    let matchesFilter = true;
    if (filterType === 'connected') {
      matchesFilter = p.isConnection === true || (p as any).isConnected === true || p.isFollowed === true;
    } else if (filterType === 'top_ranked') {
      matchesFilter = (p.rank || 999) <= 150;
    }

    return matchesSearch && matchesSport && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0197FF]/15 border border-[#0197FF]/30 text-[#0197FF] text-[10px] font-extrabold uppercase">
              Player Network
            </span>
            <span className="text-xs text-slate-400 font-medium">• {currentCity}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Discover Sports Players</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Connect with local teammates, compare rankings, and invite athletes to upcoming match lobbies.
          </p>
        </div>

        {/* Search Input in Header */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="people-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, sport, or area..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 focus:border-[#0197FF] rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter and Sport Chips Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center bg-[#18181b] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-[#0197FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Players ({players.length - 1})
          </button>
          <button
            onClick={() => setFilterType('connected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'connected' ? 'bg-[#0197FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            My Network ({players.filter((p) => p.isConnected).length})
          </button>
          <button
            onClick={() => setFilterType('top_ranked')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'top_ranked' ? 'bg-[#0197FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Top Ranked
          </button>
        </div>

        {/* Sport filter */}
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
          {['volleyball', 'cricket', 'football', 'tennis', 'badminton'].map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSport(sp as SportType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                selectedSport === sp
                  ? 'bg-[#0197FF]/20 text-[#0197FF] border-[#0197FF]/40'
                  : 'bg-[#18181b] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Players Bento Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.length === 0 ? (
          <div className="col-span-full py-16 bg-[#18181b] border border-slate-800 rounded-3xl text-center p-6">
            <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Players Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search criteria or switch to another sport category.
            </p>
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              id={`player-card-${player.id}`}
              className="bg-[#18181b] border border-slate-800 hover:border-slate-700 rounded-3xl p-5 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header with avatar & rank */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700 group-hover:border-[#0197FF] transition-colors"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#18181b]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#0197FF] transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#0197FF]" />
                        {player.city || currentCity}
                      </p>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-right">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">Rank</span>
                    <span className="text-xs font-black text-[#8BF3F5]">#{player.rank}</span>
                  </div>
                </div>

                {/* Player Bio & Sports Attributes */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                  {player.bio || `Passionate ${player.preferredSport} player looking for regular pickup matches in ${currentCity}.`}
                </p>

                {/* Bento metric row */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Sport</span>
                    <span className="text-xs font-bold text-slate-200 capitalize truncate block">
                      {player.preferredSport}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Skill</span>
                    <span className="text-xs font-bold text-slate-200 truncate block">
                      {player.skillLevel}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Matches</span>
                    <span className="text-xs font-bold text-white truncate block">
                      {player.gamesPlayed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleConnect(player.id)}
                  id={`connect-player-btn-${player.id}`}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    player.isConnected || player.isFollowed || player.isConnection
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {player.isConnected || player.isFollowed || player.isConnection ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onStartChat(player)}
                  id={`chat-player-btn-${player.id}`}
                  className="p-2 rounded-xl bg-[#0197FF]/15 hover:bg-[#0197FF]/25 text-[#0197FF] border border-[#0197FF]/30 transition-colors"
                  title="Direct Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onInviteToMatch(player)}
                  id={`invite-player-btn-${player.id}`}
                  className="py-2 px-3 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#0197FF]/20"
                >
                  Invite
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
