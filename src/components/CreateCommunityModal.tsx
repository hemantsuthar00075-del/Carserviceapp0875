import React, { useState } from 'react';
import {
  X,
  Users,
  Shield,
  MapPin,
  Calendar,
  Sparkles,
  Plus,
} from 'lucide-react';
import { Community, Player, SportType } from '../types';
import { SPORTS_METADATA } from '../data/mockData';

interface CreateCommunityModalProps {
  currentUser: Player;
  currentCity: string;
  onClose: () => void;
  onCreateCommunity: (newCommunity: Partial<Community>) => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  currentUser,
  currentCity,
  onClose,
  onCreateCommunity,
}) => {
  const [name, setName] = useState('');
  const [sport, setSport] = useState<SportType>('volleyball');
  const [logo, setLogo] = useState('⚡');
  const [homeVenue, setHomeVenue] = useState('Sindhu Bhavan Sports Complex, ' + currentCity);
  const [scheduleDays, setScheduleDays] = useState('Tue & Thu, 7:00 PM');
  const [description, setDescription] = useState('');

  const emojiOptions = ['⚡', '🐯', '🦅', '🔥', '🏆', '🏐', '🏏', '⚽', '🎾', '🏸'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateCommunity({
      name: name.trim(),
      sport,
      logo,
      homeVenue: homeVenue.trim() || 'Central Turf, ' + currentCity,
      scheduleDays: [scheduleDays.trim() || 'Weekly Pickups'],
      memberCount: 1,
      isJoined: true,
      description:
        description.trim() ||
        `Official ${sport} community in ${currentCity}. Join our weekly slots and tournaments!`,
      members: [currentUser],
      adminId: currentUser.id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-[#FD7040]/15 text-[#FD7040] px-2.5 py-0.5 rounded-full">
              New Community
            </span>
            <h2 className="text-base font-bold text-white mt-1">Found a Sports Squad</h2>
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
          {/* Logo Emoji Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">
              Squad Icon / Badge
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {emojiOptions.map((em) => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setLogo(em)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg border transition-all ${
                    logo === em
                      ? 'bg-[#FD7040]/20 border-[#FD7040] scale-110'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Squad Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Squad / Community Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Community HHS or Thunder Strikers"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FD7040]"
            />
          </div>

          {/* Sport Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Primary Sport
            </label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value as SportType)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#FD7040] capitalize"
            >
              {SPORTS_METADATA.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Home Turf */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Home Turf Ground / Complex
            </label>
            <input
              type="text"
              value={homeVenue}
              onChange={(e) => setHomeVenue(e.target.value)}
              placeholder="e.g. Decathlon Arena, Sindhu Bhavan Road"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FD7040]"
            />
          </div>

          {/* Regular Schedule Days */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Usual Play Routine
            </label>
            <input
              type="text"
              value={scheduleDays}
              onChange={(e) => setScheduleDays(e.target.value)}
              placeholder="e.g. Tue, Thu & Sat at 7:00 PM"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FD7040]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Squad Bio & Philosophy
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell other athletes why they should join your community..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FD7040]"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-create-squad-btn"
              className="w-full py-3 bg-gradient-to-r from-[#FD7040] to-[#e65c2c] hover:from-[#ff7c4f] hover:to-[#FD7040] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#FD7040]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Launch Squad in {currentCity}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
