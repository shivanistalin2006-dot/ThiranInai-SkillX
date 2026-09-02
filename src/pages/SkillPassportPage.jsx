import React from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Award, ShieldCheck, CheckCircle, Zap, Clock, Star, Calendar, BookOpen, Target, FileText, ExternalLink, Plus, Camera, Upload } from 'lucide-react';

export default function SkillPassportPage() {
  const { currentUser, openAddSkillModal, openCameraModal } = useSkillX();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner & Profile Passport Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-8">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          <div className="flex items-center space-x-5">
            
            {/* Interactive Avatar with Camera Upload Overlay */}
            <div className="relative group cursor-pointer" onClick={() => openCameraModal('avatar')}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-brand-violet/50 shadow-2xl transition group-hover:opacity-80"
              />
              <div className="absolute inset-0 rounded-3xl bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-[10px] font-bold space-y-0.5">
                <Camera size={20} className="text-brand-cyan" />
                <span>Snap / Upload</span>
              </div>
              <button
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-brand-violet text-white shadow-lg border-2 border-slate-900 group-hover:scale-110 transition"
                title="Change Photo via Device Camera or File"
              >
                <Camera size={12} />
              </button>
            </div>

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

              {/* Take/Upload Photo Button */}
              <button
                onClick={() => openCameraModal('avatar')}
                className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-violet/20 hover:bg-brand-violet/30 text-brand-violet text-xs font-bold transition border border-brand-violet/30"
              >
                <Camera size={14} />
                <span>Take Photo / Upload Image</span>
              </button>
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
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Sessions Completed</span>
            <div className="text-xl font-black text-white flex items-center space-x-1">
              <BookOpen size={16} className="text-brand-cyan" />
              <span>{currentUser.sessionsCompleted}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Rating</span>
            <div className="text-xl font-black text-amber-400 flex items-center space-x-1">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span>{currentUser.rating}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">SkillX Balance</span>
            <div className="text-xl font-black text-emerald-400 flex items-center space-x-1">
              <Zap size={16} className="fill-emerald-400" />
              <span>{currentUser.creditsBalance}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Verified Skills + Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Verified Skills & Goals */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Skills Mastered & Teaching */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award className="text-brand-violet" size={20} />
                  <span>Mastered Skills (Can Teach)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Skills verified through peer sessions, tests, and certificates</p>
              </div>
              <button
                onClick={() => openAddSkillModal('teach')}
                className="p-2 rounded-xl bg-brand-violet/20 text-brand-violet hover:bg-brand-violet/30 transition text-xs font-bold flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.skillsTeach.map((skill) => (
                <div key={skill.id} className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10">
                      {skill.category}
                    </span>
                    {skill.verified && (
                      <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-400">
                        <CheckCircle size={12} />
                        <span>VERIFIED</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{skill.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span>Level: <strong className="text-white">{skill.level}</strong></span>
                    <span>Taught: <strong className="text-brand-violet">{skill.hoursTaught} hrs</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Skills Learning */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Target className="text-brand-cyan" size={20} />
                  <span>Target Skills (Currently Learning)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Active goals tracked with peer mentors</p>
              </div>
              <button
                onClick={() => openAddSkillModal('learn')}
                className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30 transition text-xs font-bold flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Goal</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.skillsLearn.map((skill) => (
                <div key={skill.id} className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet px-2 py-0.5 rounded bg-brand-violet/10">
                      {skill.category}
                    </span>
                    <span className="text-xs font-bold text-brand-cyan">{skill.progress}% Progress</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{skill.name}</h4>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-500" style={{ width: `${skill.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Verifications & Badges */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>Verification Proofs</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-white/5 space-y-1">
                <div className="font-bold text-white">Java SE 17 Certified Developer</div>
                <div className="text-slate-400 text-[11px]">Oracle Certificate #948271</div>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold mt-1">Verified Proof</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-white/5 space-y-1">
                <div className="font-bold text-white">College Peer Evaluation (CEG)</div>
                <div className="text-slate-400 text-[11px]">18 Peer Reviews (5.0 Rating)</div>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold mt-1">Peer Endorsed</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
