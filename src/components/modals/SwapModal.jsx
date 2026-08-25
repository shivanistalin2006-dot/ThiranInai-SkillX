import React, { useState } from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Calendar, Clock, Video, MapPin, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export default function SwapModal() {
  const {
    isSwapModalOpen,
    closeSwapModal,
    selectedPeerForSwap,
    currentUser,
    sendSwapRequest,
    calculateMatchScore
  } = useSkillX();

  if (!isSwapModalOpen || !selectedPeerForSwap) return null;

  const matchScore = calculateMatchScore(selectedPeerForSwap);

  const [teachSkill, setTeachSkill] = useState(currentUser.skillsTeach[0]?.name || 'Java');
  const [learnSkill, setLearnSkill] = useState(selectedPeerForSwap.skillsTeach[0]?.name || 'UI/UX Design');
  const [date, setDate] = useState('2026-08-28');
  const [time, setTime] = useState('06:00 PM - 07:00 PM');
  const [mode, setMode] = useState('Online (SKILLX Live Room)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSwapRequest({
      teachSkill,
      learnSkill,
      date,
      time,
      mode,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={closeSwapModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X size={20} />
        </button>

        {/* Top Compatibility Match Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-violet/20 via-brand-indigo/15 to-brand-cyan/20 border border-brand-violet/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center text-brand-violet font-black text-lg shadow-lg">
              {matchScore}%
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">MATCH COMPATIBILITY</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Perfect Reciprocal Swap Match</h3>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold uppercase border border-brand-cyan/30 hidden sm:inline-block">
            High Confidence
          </span>
        </div>

        {/* Side-by-side Peer Exchange Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">You Offer</span>
            <div className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>{teachSkill}</span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">{selectedPeerForSwap.name.split(' ')[0]} Offers</span>
            <div className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center justify-end space-x-1">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span>{learnSkill}</span>
            </div>
          </div>
        </div>

        {/* Swap Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Skill Selections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Skill You Will Teach</label>
              <select
                value={teachSkill}
                onChange={(e) => setTeachSkill(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
              >
                {currentUser.skillsTeach.map(s => (
                  <option key={s.id || s.name} value={s.name}>{s.name} ({s.level})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Skill You Want to Learn</label>
              <select
                value={learnSkill}
                onChange={(e) => setLearnSkill(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-cyan"
              >
                {selectedPeerForSwap.skillsTeach.map(s => (
                  <option key={s.name} value={s.name}>{s.name} ({s.level || 'Expert'})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                <Calendar size={13} className="text-brand-violet" />
                <span>Preferred Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
                <Clock size={13} className="text-brand-cyan" />
                <span>Time Slot</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-cyan"
              >
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                <option value="07:30 PM - 08:30 PM">07:30 PM - 08:30 PM</option>
                <option value="08:00 AM - 09:00 AM (Weekend)">08:00 AM - 09:00 AM (Weekend)</option>
              </select>
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Session Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
            >
              <option value="Online (SKILLX Live Room)">Online (SKILLX Live Room Video Call)</option>
              <option value="Online (Google Meet)">Online (Google Meet Link)</option>
              <option value="Offline Campus Library">Offline (Campus Library Study Room)</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Message to {selectedPeerForSwap.name}</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Looking forward to swapping Java and Figma prototyping concepts!"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan hover:from-brand-violet-hover hover:to-brand-cyan text-white text-xs font-black shadow-xl shadow-brand-violet/30 transition transform active:scale-98 flex items-center justify-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Send Swap Request to {selectedPeerForSwap.name.split(' ')[0]}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
