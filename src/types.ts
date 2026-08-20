export type SportType =
  | 'volleyball'
  | 'cricket'
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'badminton'
  | 'pickleball'
  | 'kabaddi'
  | 'hockey';

export type SkillLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'All Levels'
  | 'All Skill Levels / Casual'
  | 'Intermediate / Open'
  | 'Competitive / High Intensity'
  | string;

export type TabType =
  | 'discover'
  | 'play'
  | 'community'
  | 'people'
  | 'rules'
  | 'profile'
  | 'chat';

export interface SportSkillBreakdown {
  sport: string;
  grade: string;
  level: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  gamesPlayed: number;
  rank: number;
  skillLevel: SkillLevel;
  primarySport: SportType;
  preferredSport?: SportType;
  location: string;
  city?: string;
  phone?: string;
  email?: string;
  bio?: string;
  tournamentsPlayed?: number;
  tournamentsWon?: number;
  winRate?: string;
  isConnection?: boolean;
  isFollowed?: boolean;
  skillsBreakdown?: SportSkillBreakdown[];
}

export interface MatchSlot {
  id: string;
  title: string;
  sport: SportType;
  communityId?: string;
  communityName?: string;
  venueName: string;
  venueAddress?: string;
  venueArea?: string;
  city?: string;
  date: string; // e.g. '17/11/2025' or 'Today, 7:00 PM'
  time: string; // e.g. '7:00 PM'
  rawDate?: string; // ISO date for sorting
  currentPlayers: number;
  maxPlayers: number;
  pricePerPerson: number;
  skillRequired: SkillLevel;
  host: Player;
  playersList: Player[];
  description: string;
  offerBadge?: string;
  originalPrice?: number;
  isJoined?: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  userRankInMatch?: string; // e.g. '1st', '2nd' for history
  scoreSummary?: string;
}

export interface Venue {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  rating: number;
  reviewsCount: number;
  image: string;
  sportsSupported: SportType[];
  pricingPerHour: number;
  openingHours: string;
  amenities: string[];
  slotsAvailable: {
    time: string;
    available: boolean;
    court: string;
    price: number;
  }[];
  mapUrl: string;
  phone: string;
}

export interface Community {
  id: string;
  name: string;
  sport: SportType;
  city?: string;
  memberCount: number;
  maxMembers?: number;
  logo: string;
  description: string;
  homeVenue: string;
  scheduleDays: string[];
  members: Player[];
  isJoined: boolean;
  recentActivity?: string;
  activeMatchesCount?: number;
  adminId?: string;
  recentMessages?: {
    sender: string;
    text: string;
    time: string;
  }[];
}

export interface SportOffer {
  id: string;
  title: string;
  sport: SportType;
  discountPercentage: number;
  venueName: string;
  validTill: string;
  description: string;
  code: string;
  badge: string;
  bgGradient: string;
}

export interface SportRuleSection {
  sport: SportType;
  title: string;
  summary: string;
  playersPerTeam: string;
  courtDimensions: string;
  duration: string;
  keyRules: {
    heading: string;
    detail: string;
  }[];
  rotationsAndPositions?: {
    title: string;
    description: string;
  }[];
  scoringSystem: string;
  equipment: string[];
  proTips: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
  isSelf?: boolean;
  matchInvite?: {
    matchId: string;
    title: string;
    sport: SportType;
    time: string;
  };
}

export interface ChatThread {
  id: string;
  name?: string;
  title?: string;
  avatar: string;
  isGroup?: boolean;
  type?: 'direct' | 'group';
  sport?: SportType;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  messages: ChatMessage[];
  membersCount?: number;
  onlineStatus?: boolean;
  recipient?: Player;
}

export type ChatConversation = ChatThread;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'match_invite' | 'booking_confirmed' | 'community_update' | 'offer';
  read: boolean;
  actionUrl?: string;
}
