import React, { useState } from 'react';
import {
  MapPin,
  Bell,
  Search,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Calendar,
  Tag,
  Trophy,
} from 'lucide-react';
import { Logo } from './Logo';
import { NotificationItem, Player } from '../types';

interface HeaderProps {
  currentCity: string;
  onChangeCity?: (city: string) => void;
  onOpenCityModal?: () => void;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  currentUser: Player;
  onOpenHostModal?: () => void;
  onOpenCreateCommunityModal?: () => void;
  onNavigateTab?: (tab: any) => void;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
  selectedSport?: string;
  onSelectSport?: (sport: any) => void;
  onOpenProfile?: () => void;
  onOpenAuthModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity = 'Ahmedabad',
  onChangeCity,
  onOpenCityModal,
  notifications = [],
  onMarkNotificationRead = (_id: string) => {},
  currentUser,
  onOpenHostModal = () => {},
  onOpenCreateCommunityModal = () => {},
  onNavigateTab,
  activeTab = 'discover',
  onTabChange,
  selectedSport,
  onSelectSport,
  onOpenProfile,
  onOpenAuthModal,
  searchQuery = '',
  onSearchChange = (_q: string) => {},
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);

  const handleNav = (tab: any) => {
    if (onTabChange) onTabChange(tab);
    if (onNavigateTab) onNavigateTab(tab);
  };

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  const popularCities = [
    'Ahmedabad',
    'Surat',
    'Mumbai',
    'Vadodara',
    'Rajkot',
    'Bengaluru',
    'Delhi NCR',
    'Pune',
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#051426]/85 border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => handleNav('discover')}
              className="flex items-center text-left focus:outline-none group"
            >
              <Logo size="md" />
            </button>

            {/* City Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  if (onOpenCityModal) onOpenCityModal();
                  else setShowCityPicker(!showCityPicker);
                }}
                id="header-city-selector"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-slate-200 transition-all group hover:border-[#0197FF]/50"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0197FF] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-white">{currentCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {showCityPicker && (
                <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-[#09223e] border border-white/15 shadow-2xl backdrop-blur-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Select City</p>
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        if (onChangeCity) onChangeCity(city);
                        setShowCityPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        currentCity === city
                          ? 'bg-[#0197FF]/20 text-[#8BF3F5]'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{city}</span>
                      {currentCity === city && <CheckCircle2 className="w-3 h-3 text-[#8BF3F5]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search games, venues (Rajpath, Karnavati), sports..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-white/15 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#0197FF] focus:ring-1 focus:ring-[#0197FF] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Action Button (+ Host / Squad) */}
            <div className="relative">
              <button
                onClick={() => setShowQuickCreate(!showQuickCreate)}
                id="header-create-button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#0197FF] to-[#0080db] hover:from-[#21a6ff] hover:to-[#0197FF] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0197FF]/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Host / Create</span>
              </button>

              {/* Quick Create Dropdown */}
              {showQuickCreate && (
                <div
                  className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-[#09223e] border border-white/15 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setShowQuickCreate(false)}
                >
                  <button
                    onClick={onOpenHostModal}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0197FF]/20 border border-[#0197FF]/40 flex items-center justify-center text-[#0197FF] group-hover:scale-110 transition-transform">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Host a Game</div>
                      <div className="text-[11px] text-slate-400">Open pickup match lobby</div>
                    </div>
                  </button>
                  <button
                    onClick={onOpenCreateCommunityModal}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors group mt-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FD7040]/20 border border-[#FD7040]/40 flex items-center justify-center text-[#FD7040] group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Create Community</div>
                      <div className="text-[11px] text-slate-400">Form a new sports squad</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Messages Shortcut */}
            <button
              onClick={() => onNavigateTab('chat')}
              id="header-chat-btn"
              className={`relative p-2.5 rounded-xl border transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#0197FF]/20 border-[#0197FF] text-[#8BF3F5]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Chats & Groups"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FD7040] rounded-full ring-2 ring-[#051426]"></span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                id="header-notifications-btn"
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#FD7040] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#051426] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#09223e] border border-white/15 shadow-2xl backdrop-blur-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Notifications</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#0197FF]/20 text-[#8BF3F5] rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        notifications.forEach((n) => onMarkNotificationRead(n.id));
                      }}
                      className="text-[11px] text-[#0197FF] hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">No new notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onMarkNotificationRead(notif.id);
                            if (notif.type === 'match_invite') onNavigateTab('play');
                            if (notif.type === 'offer') onNavigateTab('discover');
                          }}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer text-left border ${
                            notif.read
                              ? 'bg-white/5 border-transparent opacity-75'
                              : 'bg-[#0197FF]/10 border-[#0197FF]/30'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 p-1 rounded-lg bg-white/10 text-[#8BF3F5]">
                              {notif.type === 'booking_confirmed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                              {notif.type === 'match_invite' && <Calendar className="w-3.5 h-3.5 text-[#0197FF]" />}
                              {notif.type === 'offer' && <Tag className="w-3.5 h-3.5 text-[#FD7040]" />}
                              {notif.type === 'community_update' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                              </div>
                              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Chip & Settings */}
            <button
              onClick={onOpenProfile}
              id="header-user-profile-btn"
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#8BF3F5]/60 group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-white truncate max-w-[90px]">{currentUser.name}</span>
                <span className="text-[10px] font-semibold text-[#8BF3F5]">Rank #{currentUser.rank}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expand */}
        {showSearchInput && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search games, venues, sports..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-white/20 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#0197FF]"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
