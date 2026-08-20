import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  MapPin,
  Calendar,
  Clock,
  Users,
  Shield,
  Tag,
  Check,
} from 'lucide-react';
import { MatchSlot, Player, SportType, Venue } from '../types';
import { SPORTS_METADATA } from '../data/mockData';

interface HostMatchModalProps {
  currentUser: Player;
  venues: Venue[];
  currentCity: string;
  onClose: () => void;
  onCreateMatch: (newMatch: Partial<MatchSlot>) => void;
}

export const HostMatchModal: React.FC<HostMatchModalProps> = ({
  currentUser,
  venues,
  currentCity,
  onClose,
  onCreateMatch,
}) => {
  const [sport, setSport] = useState<SportType>('volleyball');
  const [title, setTitle] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || '');
  const [customVenue, setCustomVenue] = useState('');
  const [date, setDate] = useState('2025-11-12');
  const [time, setTime] = useState('06:00 PM - 07:30 PM');
  const [maxPlayers, setMaxPlayers] = useState(12);
  const [pricePerPerson, setPricePerPerson] = useState(150);
  const [skillRequired, setSkillRequired] = useState('Intermediate / Open');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const venueObj = venues.find((v) => v.id === selectedVenueId);
    const finalVenueName = customVenue.trim() || venueObj?.name || 'Local Sports Arena';
    const finalArea = venueObj?.area || currentCity;

    onCreateMatch({
      sport,
      title: title.trim() || `${sport.toUpperCase()} Pickup Match @ ${finalVenueName}`,
      venueName: finalVenueName,
      venueArea: finalArea,
      date,
      time,
      maxPlayers: Number(maxPlayers),
      currentPlayers: 1,
      pricePerPerson: Number(pricePerPerson),
      skillRequired,
      description:
        description.trim() ||
        `Join us for an exciting ${sport} game! All friendly players welcome. Bring sports shoes.`,
      host: currentUser,
      playersList: [currentUser],
      isJoined: true,
      status: 'upcoming',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-[#0197FF]/15 text-[#0197FF] px-2.5 py-0.5 rounded-full">
              Host Game Lobby
            </span>
            <h2 className="text-base font-bold text-white mt-1">Create an Open Match Slot</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Sport Selector Chips */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">
              Select Sport
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {SPORTS_METADATA.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSport(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    sport === s.id
                      ? 'bg-[#0197FF] text-white border-[#0197FF] shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Match Slot Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wednesday Night 6v6 Volleyball Rush"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0197FF]"
            />
          </div>

          {/* Venue Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Select Partner Turf or Venue
            </label>
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
            >
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.area}, {v.city})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Timing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Match Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="06:00 PM - 07:30 PM"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>
          </div>

          {/* Players & Pricing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Max Players
              </label>
              <input
                type="number"
                min={2}
                max={30}
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Slot Fee per Player (₹)
              </label>
              <input
                type="number"
                min={0}
                max={5000}
                value={pricePerPerson}
                onChange={(e) => setPricePerPerson(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
              />
            </div>
          </div>

          {/* Skill level & Description */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Required Skill Level
            </label>
            <select
              value={skillRequired}
              onChange={(e) => setSkillRequired(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#0197FF]"
            >
              <option value="All Skill Levels / Casual">All Skill Levels / Casual</option>
              <option value="Intermediate / Open">Intermediate / Open</option>
              <option value="Competitive / High Intensity">Competitive / High Intensity</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Match Rules or Guidelines
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Non-marking shoes required, water available at court, rotation strictly followed."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0197FF]"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              id="publish-match-lobby-btn"
              className="w-full py-3 bg-gradient-to-r from-[#0197FF] to-[#0081dd] hover:from-[#21a6ff] hover:to-[#0197FF] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#0197FF]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Match Slot to {currentCity}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
