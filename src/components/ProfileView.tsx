import React, { useState } from 'react';
import {
  User,
  Trophy,
  Award,
  Calendar,
  MapPin,
  Shield,
  Edit3,
  Check,
  ChevronRight,
  Sparkles,
  Settings,
  Flame,
  Phone,
  Mail,
  LogOut,
  QrCode,
  Share2,
} from 'lucide-react';
import { MatchSlot, Player, SportSkillBreakdown, SportType } from '../types';
import { SPORTS_METADATA, MOCK_CURRENT_USER, MATCH_SLOTS_DATA } from '../data/mockData';

interface ProfileViewProps {
  player?: Player;
  currentUser?: Player;
  onUpdateProfile?: (updated: Partial<Player>) => void;
  matchHistory?: MatchSlot[];
  matches?: MatchSlot[];
  onOpenTicketModal?: (match: MatchSlot) => void;
  onOpenShareModal?: (type: 'match' | 'community', item: any) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  player: propPlayer,
  currentUser,
  onUpdateProfile = (_u: any) => {},
  matchHistory: propMatchHistory,
  matches,
  onOpenTicketModal = (_m: any) => {},
  onOpenShareModal = (_t: any, _i: any) => {},
}) => {
  const player = propPlayer || currentUser || MOCK_CURRENT_USER;
  const matchHistory = propMatchHistory || (matches ? matches.filter(m => m && m.isJoined) : MATCH_SLOTS_DATA.filter(m => m.isJoined));
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(player.name);
  const [bio, setBio] = useState(
    player.bio ||
      'All-round sports enthusiast! Weekly volleyball setter & weekend turf cricket captain.'
  );
  const [preferredSport, setPreferredSport] = useState<SportType>(player.preferredSport || player.primarySport || 'volleyball');
  const [phone, setPhone] = useState(player.phone || '+91 98765 43210');
  const [email, setEmail] = useState(player.email || 'alex.sports@outlook.com');
  const [city, setCity] = useState(player.city || 'Ahmedabad');

  const handleSave = () => {
    onUpdateProfile({
      name,
      bio,
      preferredSport,
      phone,
      email,
      city,
    });
    setIsEditing(false);
  };

  // Skill breakdown as depicted in visual design: Tennis (A), Basketball (B), Pickleball (C), Kabaddi (D), Cricket (E), Volleyball (F)
  const skillsMatrix: SportSkillBreakdown[] = player.skillsBreakdown || [
    { sport: 'Tennis', grade: 'A', level: 'Advanced / Top 5%' },
    { sport: 'Basketball', grade: 'B', level: 'Upper Intermediate' },
    { sport: 'Pickleball', grade: 'C', level: 'Intermediate Player' },
    { sport: 'Kabaddi', grade: 'D', level: 'Casual / Pickup' },
    { sport: 'Cricket', grade: 'E', level: 'Club Level All-Rounder' },
    { sport: 'Volleyball', grade: 'F', level: 'Foundation Setter' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header Hero Card (Bento Style) */}
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0197FF]/15 via-[#8BF3F5]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={player.avatar}
                alt={player.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-slate-800 border border-[#0197FF]/50 shadow-2xl"
              />
              <span className="absolute bottom-1 right-1 p-1.5 bg-[#0197FF] rounded-xl text-white shadow-lg">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{player.name}</h1>
                <span className="px-3 py-1 bg-[#0197FF]/15 text-[#0197FF] border border-[#0197FF]/30 text-xs font-bold rounded-full uppercase">
                  Rank #{player.rank}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                  Verified Athlete
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                {player.bio || bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0197FF]" />
                  {player.city || city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FD7040]" />
                  Primary: <strong className="text-white capitalize">{player.preferredSport}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {player.email || email}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              id="edit-profile-btn"
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#0197FF]" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form Modal/Drawer if isEditing */}
      {isEditing && (
        <div className="p-6 bg-[#18181b] border border-[#0197FF]/40 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Edit Athlete Details
            </h3>
            <span className="text-xs text-slate-400">Update preferences and contacts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Preferred Primary Sport
              </label>
              <select
                value={preferredSport}
                onChange={(e) => setPreferredSport(e.target.value as SportType)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF] capitalize"
              >
                {SPORTS_METADATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Short Bio / Sports Playstyle
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              id="save-profile-btn"
              className="px-5 py-2 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Overview Stats Bento Row (as seen on "Profile" screen design) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Total Games Played */}
        <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Games Played</span>
            <Calendar className="w-4 h-4 text-[#0197FF]" />
          </div>
          <p className="text-3xl font-black font-['Outfit'] text-white">
            {player.gamesPlayed || 100}
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            +14 this month
          </span>
        </div>

        {/* Global / City Rank */}
        <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">City Rank</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black font-['Outfit'] text-white">#{player.rank || 120}</p>
          <span className="text-[10px] text-[#8BF3F5] font-semibold mt-1 block">
            Top 4% in {player.city || 'Ahmedabad'}
          </span>
        </div>

        {/* Tournaments Played */}
        <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tournaments</span>
            <Award className="w-4 h-4 text-[#FD7040]" />
          </div>
          <p className="text-3xl font-black font-['Outfit'] text-white">
            {player.tournamentsPlayed || 12}
          </p>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            {player.tournamentsWon || 4} Trophies Won
          </span>
        </div>

        {/* Win Rate */}
        <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Win Ratio</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black font-['Outfit'] text-white">
            {player.winRate || '68%'}
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            High Team Reliability
          </span>
        </div>
      </div>

      {/* Main Bento: Skills Matrix (Col 1-7) & Match History (Col 8-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Skills Grade Breakdown (as in design sheet) */}
        <div className="lg:col-span-7 bg-[#18181b] border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Sports Skill & Level Breakdown</h3>
              <p className="text-xs text-slate-400">Assessed by community hosts & match ratings</p>
            </div>
            <span className="text-xs font-bold text-[#0197FF]">Ranked A–F</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillsMatrix.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{item.sport}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.level}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0197FF]/20 to-[#0197FF]/5 border border-[#0197FF]/40 flex items-center justify-center text-sm font-black text-[#0197FF] shrink-0">
                  {item.grade}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match History & Passes */}
        <div className="lg:col-span-5 bg-[#18181b] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Recent Match Passes</h3>
              <span className="text-xs text-slate-400">History</span>
            </div>

            <div className="space-y-3">
              {matchHistory.slice(0, 3).map((match) => (
                <div
                  key={match.id}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{match.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {match.venueName} • {match.date.split(' ')[0]}
                    </p>
                    {match.scoreSummary && (
                      <span className="text-[10px] text-amber-300 font-medium block mt-0.5">
                        🏆 {match.scoreSummary}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenTicketModal(match)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#0197FF] border border-slate-700 transition-colors shrink-0"
                    title="View QR Slot Ticket"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Member since Nov 2024</span>
            <span className="text-emerald-400 font-bold">100% Attendance Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
