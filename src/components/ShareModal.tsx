import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  type: 'match' | 'community' | 'profile' | 'venue';
  item: any;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ type, item, onClose }) => {
  const [copied, setCopied] = useState(false);

  const title =
    type === 'match'
      ? item?.title || 'Sports Match'
      : type === 'community'
      ? item?.name || 'Sports Squad'
      : type === 'venue'
      ? item?.name || 'Turf Arena'
      : 'Athlete Profile';

  const shareUrl = `${window.location.origin}/#${type}-${item?.id || 'share'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Check out this ${type} on Game Grid: "${title}"\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#0197FF]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Share {type}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-[#8BF3F5] block mb-1">
              Invite your teammates
            </span>
            <p className="text-sm font-bold text-white">{title}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase block">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-[#0197FF] hover:bg-[#0081dd] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleWhatsApp}
              className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 text-[#0197FF]" />
              <span>Direct Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
