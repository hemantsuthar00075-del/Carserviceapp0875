import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Users,
  Search,
  CheckCheck,
  Calendar,
  MapPin,
  ArrowRight,
  Shield,
  Smile,
  Paperclip,
  MoreVertical,
  ChevronLeft,
} from 'lucide-react';
import { ChatConversation, ChatMessage, Player } from '../types';

interface ChatViewProps {
  conversations?: ChatConversation[];
  chatThreads?: ChatConversation[];
  currentUser: Player;
  onSendMessage: (conversationId: string, text: string) => void;
  onOpenMatchBookingFromChat?: (matchId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  chatThreads,
  currentUser,
  onSendMessage,
  onOpenMatchBookingFromChat,
}) => {
  const conversationList = chatThreads || conversations || [];
  const [activeChatId, setActiveChatId] = useState<string>(
    conversationList[0]?.id || 'conv_1'
  );
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    conversationList.find((c) => c.id === activeChatId) || conversationList[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const filteredConversations = conversationList.filter((c) =>
    (c.name || c.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col md:flex-row bg-[#18181b] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Left Sidebar: Conversations List */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-slate-800/80 flex flex-col shrink-0 ${
          activeChatId ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Header Search */}
        <div className="p-4 border-b border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Messages & Squad Chats</h2>
            <span className="px-2 py-0.5 bg-[#0197FF]/15 text-[#0197FF] text-[10px] font-bold rounded-full">
              {conversationList.length} Active
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat or player..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:border-[#0197FF] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
          {filteredConversations.map((conv) => {
            const isSelected = activeConversation?.id === conv.id;
            return (
              <button
                key={conv.id}
                id={`conversation-item-${conv.id}`}
                onClick={() => setActiveChatId(conv.id)}
                className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                  isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-700"
                  />
                  {conv.type === 'community' && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 bg-slate-900 rounded-full">
                      <Users className="w-3 h-3 text-[#FD7040]" />
                    </span>
                  )}
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#FD7040] text-white text-[9px] font-bold rounded-full border-2 border-[#18181b]">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs font-bold text-white truncate">{conv.name}</h4>
                    <span className="text-[10px] text-slate-500 shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Chat Room */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-slate-950/40 min-w-0">
          {/* Chat Top Bar */}
          <div className="p-4 bg-[#18181b]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setActiveChatId('')}
                className="md:hidden p-1.5 rounded-xl bg-slate-800 text-slate-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <img
                src={activeConversation.avatar}
                alt={activeConversation.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-2xl object-cover border border-slate-700 shrink-0"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">
                    {activeConversation.name}
                  </h3>
                  {activeConversation.sportTag && (
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[9px] font-bold rounded uppercase">
                      {activeConversation.sportTag}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active Now • Next Game Today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {activeConversation.messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                    />
                  )}

                  <div className={`max-w-[85%] sm:max-w-[70%] space-y-1.5`}>
                    {!isMe && activeConversation.type === 'community' && (
                      <span className="text-[10px] font-bold text-[#8BF3F5] pl-1 block">
                        {msg.senderName}
                      </span>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#0197FF] text-white rounded-br-none shadow-md shadow-[#0197FF]/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Match Invite Embed Card if message contains slot invitation */}
                      {msg.matchInvite && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#0197FF] uppercase">
                              🎮 Match Lobby Invite
                            </span>
                            <span className="text-[10px] font-extrabold text-emerald-400">
                              ₹{msg.matchInvite.price}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold">{msg.matchInvite.title}</h5>
                          <div className="text-[10px] text-slate-400 space-y-0.5">
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#0197FF]" />
                              {msg.matchInvite.venue}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#8BF3F5]" />
                              {msg.matchInvite.time}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              onOpenMatchBookingFromChat &&
                              onOpenMatchBookingFromChat(msg.matchInvite!.matchId)
                            }
                            className="w-full mt-1 py-1.5 bg-[#0197FF] hover:bg-[#0081dd] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
                          >
                            <span>Book Slot</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex items-center gap-1 text-[9px] text-slate-500 px-1 ${
                        isMe ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-[#8BF3F5]" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Message Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3.5 bg-[#18181b] border-t border-slate-800 flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>

            <input
              type="text"
              id="chat-message-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConversation.name}...`}
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#0197FF] rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              type="submit"
              id="chat-send-message-btn"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#0197FF] hover:bg-[#0081dd] disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-[#0197FF]/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
          <p className="text-xs">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};
