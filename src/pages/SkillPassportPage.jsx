import React from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Award, ShieldCheck, CheckCircle, Zap, Clock, Star, Calendar, BookOpen, Target, FileText, ExternalLink, Plus } from 'lucide-react';

export default function SkillPassportPage() {
  const { currentUser, openAddSkillModal } = useSkillX();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner & Profile Passport Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-8">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          <div className="flex items-center space-x-5">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-brand-violet/50 shadow-2xl" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">DIGITAL SKILL PASSPORT</span>
                <span className="px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet text-[10px] font-bold">VERIFIED IDENTITY</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{currentUser.name}</span>
                <CheckCircle size={22} className="text-brand-cyan fill-brand-cyan/20" />
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{currentUser.role} · {currentUser.institution}</p>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 mt-2 max-w-xl italic">
                "{currentUser.bio}"
              </p>
            </div>
          </div>

          {/* Trust Score circular gauge card */}
          <div className="w-full md:w-auto p-6 rounded-3xl bg-slate-900/80 light:bg-slate-100 border border-emerald-500/30 text-center space-y-2 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VERIFIED TRUST SCORE</span>
            <div className="text-5xl font-black text-emerald-400 flex items-center justify-center space-x-1">
              <span>{currentUser.trustScore}</span>
              <span className="text-lg text-slate-400 font-semibold">/100</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-300 flex items-center justify-center space-x-1">
              <ShieldCheck size={14} />
              <span>Top 5% Community Trust</span>
            </div>
          </div>

        </div>

        {/* Passport Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Knowledge Shared</span>
            <div className="text-xl font-black text-white flex items-center space-x-1">
              <Clock size={16} className="text-brand-violet" />
              <span>{currentUser.hoursShared} hrs</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Completed Sessions</span>
            <div className="text-xl font-black text-white flex items-center space-x-1">
              <Calendar size={16} className="text-brand-cyan" />
              <span>{currentUser.sessionsCompleted} sessions</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Learner Rating</span>
            <div className="text-xl font-black text-white flex items-center space-x-1">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span>{currentUser.rating} / 5.0</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">SkillX Credits</span>
            <div className="text-xl font-black text-white flex items-center space-x-1">
              <Zap size={16} className="text-brand-violet fill-brand-violet" />
              <span>{currentUser.creditsBalance}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Skills Inventory & Verification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Verified Skills List */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Verified Skill Credentials</h3>
              <p className="text-xs text-slate-400">Skills logged on your immutable platform passport.</p>
            </div>
            <button
              onClick={() => openAddSkillModal('teach')}
              className="px-3 py-1.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet-hover transition flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentUser.skillsTeach.map((s) => (
              <div
                key={s.name}
                className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-violet font-bold text-xs">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                      <span>{s.name}</span>
                      {s.verified && <CheckCircle size={14} className="text-brand-cyan" />}
                    </h4>
                    <span className="text-[11px] text-slate-400">{s.category} · {s.hoursTaught} hours taught</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-brand-violet/20 text-brand-violet text-xs font-bold border border-brand-violet/30">
                    {s.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Source Proofs */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification Sources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.verificationSources.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-xs space-y-1">
                  <div className="font-bold text-slate-200 flex items-center space-x-1">
                    <CheckCircle size={12} className="text-emerald-400" />
                    <span>{v.type}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{v.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Activity Timeline */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Badges Box */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Award size={18} className="text-amber-400" />
              <span>Earned Community Badges</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              {currentUser.badges.map((b) => (
                <div key={b} className="p-3 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-amber-400/20 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{b}</div>
                    <div className="text-[10px] text-slate-400">Awarded for high session ratings & contribution</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Passport Activity Log */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Activity Timeline</h3>
            <div className="space-y-3 pl-2 border-l-2 border-brand-violet/30 text-xs">
              
              <div className="relative pl-4 space-y-0.5">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-violet" />
                <div className="font-bold text-white">Taught Java OOP Patterns</div>
                <div className="text-[11px] text-slate-400">Session with Arun K. · +120 Credits</div>
              </div>

              <div className="relative pl-4 space-y-0.5">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                <div className="font-bold text-white">Learned UI/UX Auto-Layout</div>
                <div className="text-[11px] text-slate-400">Session with Arun K. · -80 Credits</div>
              </div>

              <div className="relative pl-4 space-y-0.5">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div className="font-bold text-white">Verified Java Expert Credential</div>
                <div className="text-[11px] text-slate-400">Passed Community Code Check</div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
