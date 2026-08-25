import React from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Zap, Clock, Calendar, Star, ShieldCheck, Sparkles, BookOpen, Target, ArrowRight, Video, MessageSquare } from 'lucide-react';

export default function DashboardPage() {
  const {
    currentUser,
    peers,
    swaps,
    setCurrentView,
    openSwapModalWithPeer,
    openAddSkillModal,
    setActiveChatPeerId
  } = useSkillX();

  const recommendedPeers = peers.slice(0, 3);
  const upcomingSwap = swaps.find(s => s.status === 'Scheduled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Greeting & Main Stats Row */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">MEMBER DASHBOARD</span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Good morning, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">Here is your live peer skill exchange overview.</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openAddSkillModal('teach')}
              className="px-4 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet-hover shadow-md transition flex items-center space-x-1.5"
            >
              <BookOpen size={14} />
              <span>+ Add Teaching Skill</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-brand-violet/30">
            <div className="flex items-center justify-between text-brand-violet">
              <span className="text-[10px] uppercase font-bold text-slate-400">Credits</span>
              <Zap size={14} className="fill-brand-violet" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{currentUser.creditsBalance}</div>
            <span className="text-[10px] text-slate-400">SkillX Currency</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
            <div className="flex items-center justify-between text-brand-cyan">
              <span className="text-[10px] uppercase font-bold text-slate-400">Shared</span>
              <Clock size={14} />
            </div>
            <div className="text-2xl font-black text-white mt-1">{currentUser.hoursShared}h</div>
            <span className="text-[10px] text-slate-400">Knowledge Hours</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sessions</span>
              <Calendar size={14} />
            </div>
            <div className="text-2xl font-black text-white mt-1">{currentUser.sessionsCompleted}</div>
            <span className="text-[10px] text-slate-400">Completed Swaps</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-[10px] uppercase font-bold text-slate-400">Trust Score</span>
              <ShieldCheck size={14} />
            </div>
            <div className="text-2xl font-black text-white mt-1">{currentUser.trustScore}</div>
            <span className="text-[10px] text-slate-400">Top 5% Rated</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400">Rating</span>
              <Star size={14} className="text-amber-400 fill-amber-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{currentUser.rating} ★</div>
            <span className="text-[10px] text-slate-400">38 Reviews</span>
          </div>

        </div>

      </div>

      {/* Main Grid: Upcoming Session & Recommended AI Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upcoming Session & Skill Progress */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Upcoming Scheduled Session Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Calendar size={14} className="text-brand-cyan" />
                <span>Next Upcoming Swap Session</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                SCHEDULED CONFIRMED
              </span>
            </div>

            {upcomingSwap ? (
              <div className="p-4 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={upcomingSwap.peer.avatar} alt={upcomingSwap.peer.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-violet" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{upcomingSwap.peer.name}</h4>
                      <p className="text-[11px] text-brand-cyan font-semibold">
                        Exchange: {upcomingSwap.teachSkill} ↔ {upcomingSwap.learnSkill}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs font-bold text-amber-400">
                    97% Match
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-slate-400">Time:</span> <strong>{upcomingSwap.date} @ {upcomingSwap.time}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Mode:</span> <strong>{upcomingSwap.mode}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => {
                      setActiveChatPeerId(upcomingSwap.peer.id);
                      setCurrentView('messaging');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold shadow hover:bg-brand-violet-hover transition flex items-center justify-center space-x-1.5"
                  >
                    <Video size={14} />
                    <span>Join SKILLX Room</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveChatPeerId(upcomingSwap.peer.id);
                      setCurrentView('messaging');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition flex items-center space-x-1"
                  >
                    <MessageSquare size={14} />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">No upcoming sessions. Request a swap from Discover!</div>
            )}
          </div>

          {/* Skill Progress Tracker */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Goal Progress</h3>
            
            <div className="space-y-4">
              {currentUser.skillsLearn.map((s) => (
                <div key={s.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-200">{s.name} (Target: {s.targetLevel})</span>
                    <span className="text-brand-cyan font-bold">{s.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full transition-all duration-300"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Recommended AI Matches */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles size={14} className="text-brand-violet" />
              <span>Recommended AI Matches</span>
            </h3>
            <button
              onClick={() => setCurrentView('aimatch')}
              className="text-[11px] font-bold text-brand-violet hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedPeers.map((peer) => (
              <div
                key={peer.id}
                className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-violet" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{peer.name}</h4>
                      <p className="text-[10px] text-slate-400">{peer.role}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet text-[10px] font-bold">
                    97% Match
                  </span>
                </div>

                <div className="text-[11px] text-slate-300">
                  Teaches <strong className="text-brand-violet">{peer.skillsTeach[0]?.name}</strong> · Wants <strong className="text-brand-cyan">{peer.skillsLearn[0]?.name}</strong>
                </div>

                <button
                  onClick={() => openSwapModalWithPeer(peer)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-brand-violet text-white text-xs font-bold transition text-center"
                >
                  Propose Swap
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
