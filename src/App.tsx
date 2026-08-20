import React, { useState } from 'react';
import {
  MOCK_CURRENT_USER,
  INITIAL_MATCHES,
  INITIAL_COMMUNITIES,
  INITIAL_PLAYERS,
  MOCK_VENUES,
  INITIAL_CHATS,
} from './data/mockData';
import {
  MatchSlot,
  Community,
  Player,
  Venue,
  SportType,
  TabType,
  ChatThread,
} from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DiscoverView } from './components/DiscoverView';
import { PlayScheduleView } from './components/PlayScheduleView';
import { CommunityView } from './components/CommunityView';
import { SportRulesView } from './components/SportRulesView';
import { PeopleView } from './components/PeopleView';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { BookingModal } from './components/BookingModal';
import { SlotTicketModal } from './components/SlotTicketModal';
import { HostMatchModal } from './components/HostMatchModal';
import { CreateCommunityModal } from './components/CreateCommunityModal';
import { MatchDetailModal } from './components/MatchDetailModal';
import { ShareModal } from './components/ShareModal';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [currentCity, setCurrentCity] = useState<string>('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data State
  const [currentUser, setCurrentUser] = useState<Player>(MOCK_CURRENT_USER);
  const [matches, setMatches] = useState<MatchSlot[]>(INITIAL_MATCHES);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHATS);

  // Modals State
  const [bookingMatch, setBookingMatch] = useState<MatchSlot | null>(null);
  const [ticketMatch, setTicketMatch] = useState<MatchSlot | null>(null);
  const [inspectMatch, setInspectMatch] = useState<MatchSlot | null>(null);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);
  const [shareData, setShareData] = useState<{ type: any; item: any } | null>(null);

  // Toast / Status Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers for Match Actions
  const handleToggleJoinMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          const isCurrentlyJoined = m.isJoined;
          const nextCount = isCurrentlyJoined
            ? Math.max(1, m.currentPlayers - 1)
            : m.currentPlayers + 1;
          const nextPlayers = isCurrentlyJoined
            ? (m.playersList || []).filter((p) => p.id !== currentUser.id)
            : [...(m.playersList || []), currentUser];

          showToast(
            isCurrentlyJoined
              ? `You left "${m.title}"`
              : `You joined "${m.title}"! Ticket generated.`
          );

          return {
            ...m,
            isJoined: !isCurrentlyJoined,
            currentPlayers: nextCount,
            playersList: nextPlayers,
          };
        }
        return m;
      })
    );
  };

  const handleConfirmBooking = (
    matchId: string,
    _paymentMethod: string,
    finalAmount: number
  ) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            isJoined: true,
            currentPlayers: Math.min(m.maxPlayers, m.currentPlayers + 1),
            playersList: [...(m.playersList || []), currentUser],
          };
        }
        return m;
      })
    );

    const bookedMatch = matches.find((m) => m.id === matchId);
    setBookingMatch(null);
    showToast(`Slot confirmed! Payment of ₹${finalAmount} received.`);

    if (bookedMatch) {
      setTimeout(() => {
        setTicketMatch(bookedMatch);
      }, 300);
    }
  };

  const handleCreateMatch = (newMatchData: Partial<MatchSlot>) => {
    const newMatch: MatchSlot = {
      id: `match-${Date.now()}`,
      title: newMatchData.title || 'Community Game',
      sport: newMatchData.sport || 'volleyball',
      venueName: newMatchData.venueName || 'Sports Arena',
      venueArea: newMatchData.venueArea || currentCity,
      date: newMatchData.date || '2025-11-15',
      time: newMatchData.time || '06:00 PM - 07:30 PM',
      maxPlayers: newMatchData.maxPlayers || 12,
      currentPlayers: 1,
      pricePerPerson: newMatchData.pricePerPerson || 0,
      skillRequired: newMatchData.skillRequired || 'Intermediate / Open',
      description: newMatchData.description || '',
      host: currentUser,
      playersList: [currentUser],
      isJoined: true,
      status: 'upcoming',
    };

    setMatches((prev) => [newMatch, ...prev]);
    setIsHostModalOpen(false);
    showToast(`Game lobby created successfully at ${newMatch.venueName}!`);
  };

  // Handlers for Communities
  const handleToggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          const isJoined = !c.isJoined;
          showToast(
            isJoined
              ? `Welcome to ${c.name}! You are now an active member.`
              : `Left ${c.name}`
          );
          return {
            ...c,
            isJoined,
            memberCount: isJoined ? c.memberCount + 1 : Math.max(1, c.memberCount - 1),
          };
        }
        return c;
      })
    );
  };

  const handleCreateCommunity = (newCommData: Partial<Community>) => {
    const newCommunity: Community = {
      id: `comm-${Date.now()}`,
      name: newCommData.name || 'New Sports Squad',
      sport: newCommData.sport || 'volleyball',
      logo: newCommData.logo || '⚡',
      homeVenue: newCommData.homeVenue || 'City Arena, ' + currentCity,
      scheduleDays: newCommData.scheduleDays || ['Weekly Pickups'],
      memberCount: 1,
      isJoined: true,
      description: newCommData.description || '',
      members: [currentUser],
      adminId: currentUser.id,
      recentMessages: [
        {
          sender: currentUser.name,
          text: 'Welcome everyone! Squad created.',
          time: 'Just now',
        },
      ],
    };

    setCommunities((prev) => [newCommunity, ...prev]);
    setIsCreateCommunityOpen(false);
    showToast(`Squad "${newCommunity.name}" created!`);
  };

  // Handlers for Players / Social
  const handleToggleFollowPlayer = (playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const isFollowed = !p.isFollowed;
          showToast(
            isFollowed ? `Connected with ${p.name}` : `Unfollowed ${p.name}`
          );
          return { ...p, isFollowed };
        }
        return p;
      })
    );
  };

  const handleStartChatWithPlayer = (player: Player) => {
    const existingThread = chatThreads.find(
      (t) => t.type === 'direct' && t.recipient?.id === player.id
    );

    if (existingThread) {
      setActiveTab('chat');
    } else {
      const newThread: ChatThread = {
        id: `chat-${Date.now()}`,
        type: 'direct',
        title: player.name,
        avatar: player.avatar,
        unreadCount: 0,
        recipient: player,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            text: `Hey ${player.name}, saw you play ${player.preferredSport} on Game Grid! Down for a match this week?`,
            timestamp: 'Just now',
            isSelf: true,
          },
        ],
      };
      setChatThreads((prev) => [newThread, ...prev]);
      setActiveTab('chat');
    }
  };

  const handleSendMessage = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            text,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            isSelf: true,
          };
          return {
            ...t,
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );
  };

  const handleUpdateProfile = (updated: Partial<Player>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
    showToast('Profile updated successfully!');
  };

  // Open sharing modal
  const handleOpenShare = (type: any, item: any) => {
    setShareData({ type, item });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col font-sans selection:bg-[#0197FF]/30 selection:text-white">
      {/* Top Header with City selector, Search bar & Quick Actions */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
        currentCity={currentCity}
        onChangeCity={setCurrentCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUser={currentUser}
        onOpenHostModal={() => setIsHostModalOpen(true)}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Toast alert banner */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#18181b] border border-[#0197FF]/50 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#0197FF] animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* View Switcher */}
        {activeTab === 'discover' && (
          <DiscoverView
            matches={matches}
            communities={communities}
            venues={venues}
            selectedSport={selectedSport}
            currentCity={currentCity}
            onSelectSport={setSelectedSport}
            onOpenBookingModal={(match) => setBookingMatch(match)}
            onOpenTicketModal={(match) => setTicketMatch(match)}
            onOpenMatchDetail={(match) => setInspectMatch(match)}
            onToggleJoinCommunity={handleToggleJoinCommunity}
            onOpenHostModal={() => setIsHostModalOpen(true)}
            onOpenCreateCommunityModal={() => setIsCreateCommunityOpen(true)}
            onOpenShareModal={handleOpenShare}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'play' && (
          <PlayScheduleView
            matches={matches}
            venues={venues}
            selectedSport={selectedSport}
            currentCity={currentCity}
            onSelectSport={setSelectedSport}
            onOpenBookingModal={(match) => setBookingMatch(match)}
            onOpenTicketModal={(match) => setTicketMatch(match)}
            onOpenMatchDetail={(match) => setInspectMatch(match)}
            onOpenHostModal={() => setIsHostModalOpen(true)}
            onOpenShareModal={handleOpenShare}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            communities={communities}
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
            currentCity={currentCity}
            onToggleJoinCommunity={handleToggleJoinCommunity}
            onOpenCreateCommunityModal={() => setIsCreateCommunityOpen(true)}
            onOpenShareModal={handleOpenShare}
          />
        )}

        {activeTab === 'people' && (
          <PeopleView
            players={players}
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
            currentCity={currentCity}
            onToggleFollow={handleToggleFollowPlayer}
            onStartChat={handleStartChatWithPlayer}
            onOpenShareModal={handleOpenShare}
          />
        )}

        {activeTab === 'rules' && (
          <SportRulesView
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            player={currentUser}
            onUpdateProfile={handleUpdateProfile}
            matchHistory={matches.filter((m) => m.isJoined)}
            onOpenTicketModal={(m) => setTicketMatch(m)}
            onOpenShareModal={handleOpenShare}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            chatThreads={chatThreads}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile & Quick Tab Switching */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadChatCount={
          chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0)
        }
      />

      {/* Modal: Booking / Slot Checkout */}
      {bookingMatch && (
        <BookingModal
          match={bookingMatch}
          currentUser={currentUser}
          onClose={() => setBookingMatch(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Modal: QR Slot Entry Ticket */}
      {ticketMatch && (
        <SlotTicketModal
          match={ticketMatch}
          onClose={() => setTicketMatch(null)}
          onShare={() => handleOpenShare('match', ticketMatch)}
        />
      )}

      {/* Modal: Match Detail & Roster */}
      {inspectMatch && (
        <MatchDetailModal
          match={inspectMatch}
          currentUser={currentUser}
          onClose={() => setInspectMatch(null)}
          onBookSlot={(m) => {
            setInspectMatch(null);
            setBookingMatch(m);
          }}
          onShare={(m) => handleOpenShare('match', m)}
          onToggleJoin={handleToggleJoinMatch}
        />
      )}

      {/* Modal: Host / Create Game Lobby */}
      {isHostModalOpen && (
        <HostMatchModal
          currentUser={currentUser}
          venues={venues}
          currentCity={currentCity}
          onClose={() => setIsHostModalOpen(false)}
          onCreateMatch={handleCreateMatch}
        />
      )}

      {/* Modal: Create Sports Community / Squad */}
      {isCreateCommunityOpen && (
        <CreateCommunityModal
          currentUser={currentUser}
          currentCity={currentCity}
          onClose={() => setIsCreateCommunityOpen(false)}
          onCreateCommunity={handleCreateCommunity}
        />
      )}

      {/* Modal: Share Link */}
      {shareData && (
        <ShareModal
          type={shareData.type}
          item={shareData.item}
          onClose={() => setShareData(null)}
        />
      )}
    </div>
  );
}
