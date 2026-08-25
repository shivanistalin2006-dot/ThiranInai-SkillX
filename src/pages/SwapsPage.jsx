import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Repeat, Calendar, Clock, CheckCircle, XCircle, MessageSquare, Video, Star, Sparkles } from 'lucide-react';

export default function SwapsPage() {
  const { swaps, acceptSwapRequest, completeSwapSession, setCurrentView, setActiveChatPeerId } = useSkillX();
  const [activeTab, setActiveTab] = useState('All');

  const filteredSwaps = swaps.filter(s => {
    if (activeTab === 'Pending') return s.status === 'Pending';
    if (activeTab === 'Scheduled') return s.status === 'Scheduled';
    if (activeTab === 'Completed') return s.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">EXCHANGE LOG</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          My Skill Swaps
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Track active swap requests, scheduled sessions, and session ratings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        {['All', 'Scheduled', 'Pending', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-brand-violet text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab} Swaps
          </button>
        ))}
      </div>

      {/* Swaps Grid */}
      <div className="space-y-4">
        {filteredSwaps.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center text-slate-400 text-xs">
            No swap requests in this status view.
          </div>
        ) : (
          filteredSwaps.map((swap) => (
            <div
              key={swap.id}
              className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-violet/40 transition"
            >
              {/* Peer Info & Exchange Details */}
              <div className="flex items-start space-x-4">
                <img src={swap.peer.avatar} alt={swap.peer.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-violet" />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-white">{swap.peer.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet font-bold text-[10px]">
                      {swap.matchScore}% Match
                    </span>
                  </div>
                  
                  <div className="text-xs font-bold text-brand-cyan">
                    {swap.teachSkill} <span className="text-slate-400">↔</span> {swap.learnSkill}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar size={13} />
                      <span>{swap.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={13} />
                      <span>{swap.time}</span>
                    </span>
                    <span>{swap.mode}</span>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                
                {swap.status === 'Pending' && (
                  <button
                    onClick={() => acceptSwapRequest(swap.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow transition flex items-center space-x-1"
                  >
                    <CheckCircle size={14} />
                    <span>Accept Swap</span>
                  </button>
                )}

                {swap.status === 'Scheduled' && (
                  <>
                    <button
                      onClick={() => {
                        setActiveChatPeerId(swap.peer.id);
                        setCurrentView('messaging');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold shadow transition flex items-center space-x-1"
                    >
                      <Video size={14} />
                      <span>Open SKILLX Room</span>
                    </button>

                    <button
                      onClick={() => completeSwapSession(swap.id, 5.0)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition"
                    >
                      Mark Complete (+120 Credits)
                    </button>
                  </>
                )}

                {swap.status === 'Completed' && (
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                    <Star size={16} className="fill-amber-400" />
                    <span>Rating: {swap.ratingGiven || 5.0} / 5.0 (+120 Credits)</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setActiveChatPeerId(swap.peer.id);
                    setCurrentView('messaging');
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Message Peer"
                >
                  <MessageSquare size={16} />
                </button>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
