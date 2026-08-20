import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Trophy,
  HelpCircle,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { SPORT_RULES_DATA, SPORTS_METADATA } from '../data/mockData';
import { SportType } from '../types';

interface SportRulesViewProps {
  initialSport?: SportType;
  onSelectSportForMatch?: (sport: SportType) => void;
}

export const SportRulesView: React.FC<SportRulesViewProps> = ({
  initialSport = 'volleyball',
  onSelectSportForMatch,
}) => {
  const [selectedSport, setSelectedSport] = useState<SportType>(initialSport);

  const ruleData = SPORT_RULES_DATA[selectedSport] || SPORT_RULES_DATA.volleyball;
  const currentSportMeta = SPORTS_METADATA.find((s) => s.id === selectedSport);

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0197FF]/15 border border-[#0197FF]/30 text-[#0197FF] text-[10px] font-extrabold uppercase">
              Sports Knowledge Base
            </span>
            <span className="text-xs text-slate-400 font-medium">• Official Rules & Court Guides</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Rules, Regulations & Court Tactics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Learn standard scoring rules, player rotations, and pro strategies before stepping onto the turf.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <span className="px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            9 Sports Supported
          </span>
        </div>
      </div>

      {/* Sport Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
        {SPORTS_METADATA.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              id={`rulebook-sport-btn-${sport.id}`}
              onClick={() => setSelectedSport(sport.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#0197FF] text-white border-[#0197FF] shadow-lg shadow-[#0197FF]/20 scale-105'
                  : 'bg-[#18181b] text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSelected ? '#ffffff' : sport.color }}
              ></span>
              <span className="capitalize">{sport.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Bento Grid for Selected Sport */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Bento Card 1: Sport Summary & Quick Specs (Col 1-8) */}
        <div className="md:col-span-8 bg-[#18181b] border border-slate-800 rounded-3xl p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: currentSportMeta?.color || '#0197FF' }}
              ></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Guide
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">{ruleData.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{ruleData.summary}</p>
          </div>

          {/* Key Specs Bento Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                <Users className="w-3.5 h-3.5 text-[#0197FF]" />
                <span>Team Format</span>
              </div>
              <p className="text-xs font-bold text-white">{ruleData.playersPerTeam}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                <Layers className="w-3.5 h-3.5 text-[#FD7040]" />
                <span>Court Specs</span>
              </div>
              <p className="text-xs font-bold text-white">{ruleData.courtDimensions}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Match Duration</span>
              </div>
              <p className="text-xs font-bold text-white">{ruleData.duration}</p>
            </div>
          </div>

          {/* Key Rules & Regulations Accordion/List */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Key Rules and Regulations:
            </h3>
            <div className="space-y-3">
              {ruleData.keyRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <h4 className="text-xs font-bold text-[#8BF3F5] mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8BF3F5]"></span>
                    {rule.heading}:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3.5">{rule.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Card 2: Right Column (Court Rotations, Scoring, & Tips) (Col 9-12) */}
        <div className="md:col-span-4 space-y-4">
          {/* Rotations / Positions if available */}
          {ruleData.rotationsAndPositions && (
            <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0197FF]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Court Rotations & Positions
                </h3>
              </div>
              <div className="space-y-2">
                {ruleData.rotationsAndPositions.map((pos, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] font-bold text-[#8BF3F5] block">{pos.title}</span>
                    <span className="text-[10px] text-slate-400">{pos.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scoring System */}
          <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Scoring System
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{ruleData.scoringSystem}</p>
          </div>

          {/* Equipment Recommended */}
          <div className="bg-[#18181b] border border-slate-800 rounded-3xl p-5 space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Recommended Gear
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ruleData.equipment.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-semibold rounded-lg"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-[#0197FF]/15 to-transparent border border-[#0197FF]/30 rounded-3xl p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8BF3F5]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Pro Court Tips
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {ruleData.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0197FF] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
