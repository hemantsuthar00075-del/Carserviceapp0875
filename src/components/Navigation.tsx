import React from 'react';
import {
  Compass,
  Calendar,
  Users,
  BookOpen,
  MessageSquare,
  User,
  PlusCircle,
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
  onOpenHost: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 0,
  onOpenHost,
}) => {
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'play', label: 'Play & Slots', icon: Calendar },
    { id: 'communities', label: 'Squads', icon: Users },
    { id: 'people', label: 'Players', icon: Users },
    { id: 'rules', label: 'Rules & Guide', icon: BookOpen },
    { id: 'chat', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#121316]/90 border-r border-slate-800/80 p-4 gap-6 shrink-0 h-[calc(100vh-5rem)] sticky top-20">
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#0197FF]/15 text-[#0197FF] border border-[#0197FF]/30 shadow-sm shadow-[#0197FF]/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#0197FF]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FD7040] text-white rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Quick Host CTA in Sidebar */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#18181b] to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#0197FF]/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Host Lobby
              </span>
            </div>
            <h4 className="text-sm font-bold text-white leading-snug">
              Need players for a match?
            </h4>
            <p className="text-xs text-slate-400">
              Post an open slot and fill your team in minutes.
            </p>
            <button
              onClick={onOpenHost}
              id="sidebar-host-match-btn"
              className="w-full mt-2 py-2 px-3 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0197FF]/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Match Slot</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121316]/95 backdrop-blur-xl border-t border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? 'text-[#0197FF]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="absolute top-0 right-1 w-2 h-2 bg-[#FD7040] rounded-full"></span>
              ) : null}
            </button>
          );
        })}
        <button
          onClick={() => onTabChange('chat')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'chat' ? 'text-[#0197FF]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Chat</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 bg-[#FD7040] rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'profile' ? 'text-[#0197FF]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </nav>
    </>
  );
};
