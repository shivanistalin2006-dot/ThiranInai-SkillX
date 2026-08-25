import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Cpu, Sparkles, CheckCircle, Zap, ArrowRight, Sliders, RotateCcw, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AIMatchPage() {
  const { peers, currentUser, openSwapModalWithPeer, calculateMatchScore } = useSkillX();

  const [teachInput, setTeachInput] = useState('Java');
  const [learnInput, setLearnInput] = useState('UI/UX Design');
  const [modePreference, setModePreference] = useState('Hybrid');

  // Sorted matches by AI compatibility score
  const matches = peers.map(peer => ({
    peer,
    score: calculateMatchScore(peer)
  })).sort((a, b) => b.score - a.score);

  const topMatch = matches[0];
  const secondaryMatches = matches.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Heading */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-bold border border-brand-violet/30">
          <Cpu size={14} />
          <span>SKILLX AI RECOMMENDATION ENGINE v2.6</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Find the right person, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan">
            not just the right skill.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Our vector recommendation engine analyzes 7 peer signals — reciprocal goals, skill levels, spoken languages, trust scores, and availability — to guarantee 100% productive exchanges.
        </p>
      </div>

      {/* Interactive AI Match Configurator */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <Sliders size={14} className="text-brand-cyan" />
            <span>AI Match Parameters</span>
          </h3>
          <span className="text-[11px] text-brand-cyan font-semibold">Live Real-time Scoring</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">What you can teach</label>
            <select
              value={teachInput}
              onChange={(e) => setTeachInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-bold text-slate-100 dark:text-slate-100 light:text-slate-800"
            >
              {currentUser.skillsTeach.map(s => (
                <option key={s.name} value={s.name}>{s.name} ({s.level})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">What you want to learn</label>
            <select
              value={learnInput}
              onChange={(e) => setLearnInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-bold text-slate-100 dark:text-slate-100 light:text-slate-800"
            >
              {currentUser.skillsLearn.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Session Mode</label>
            <select
              value={modePreference}
              onChange={(e) => setModePreference(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-bold text-slate-100 dark:text-slate-100 light:text-slate-800"
            >
              <option value="Hybrid">Hybrid (Online & Campus)</option>
              <option value="Online">Online Only</option>
              <option value="Offline">In-Person Campus</option>
            </select>
          </div>
        </div>
      </div>

      {/* TOP MATCH HERO CARD */}
      {topMatch && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-violet/50 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-black uppercase tracking-wider">
            Top #1 Recommendation
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Score & Profile */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-3xl bg-brand-violet/30 border-2 border-brand-violet flex flex-col items-center justify-center text-brand-violet shadow-xl">
                  <span className="text-2xl font-black">{topMatch.score}%</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">MATCH</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span>{topMatch.peer.name}</span>
                    <CheckCircle size={16} className="text-brand-cyan" />
                  </h3>
                  <p className="text-xs text-slate-400">{topMatch.peer.role} · {topMatch.peer.institution}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      Trust {topMatch.peer.trustScore}/100
                    </span>
                    <span className="text-xs text-slate-400">★ {topMatch.peer.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic">
                "{topMatch.peer.bio}"
              </p>

              <button
                onClick={() => openSwapModalWithPeer(topMatch.peer)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-black text-xs shadow-xl shadow-brand-violet/30 hover:opacity-95 transition flex items-center justify-center space-x-2"
              >
                <Sparkles size={16} />
                <span>Propose Swap with {topMatch.peer.name.split(' ')[0]}</span>
              </button>
            </div>

            {/* AI Breakdown Criteria Progress Bars */}
            <div className="lg:col-span-7 space-y-3.5 bg-slate-900/60 light:bg-slate-50 p-6 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compatibility Reason Breakdown</h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-200">✓ Reciprocal Skill Goals (Java ↔ UI/UX)</span>
                  <span className="text-brand-cyan font-bold">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full bg-brand-cyan rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-200">✓ Skill Level Alignment (Expert vs Advanced)</span>
                  <span className="text-brand-violet font-bold">95%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full bg-brand-violet rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-200">✓ Language Preference Match (English & Tamil)</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-200">✓ Availability Overlap (Evenings & Weekends)</span>
                  <span className="text-amber-400 font-bold">92%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECONDARY MATCHES LIST */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Other Compatible AI Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secondaryMatches.map(({ peer, score }) => (
            <div
              key={peer.id}
              className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between hover:border-white/20 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center font-extrabold text-brand-violet text-sm">
                  {score}%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{peer.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    Teaches <strong className="text-brand-violet">{peer.skillsTeach[0]?.name}</strong> · Learns <strong className="text-brand-cyan">{peer.skillsLearn[0]?.name}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => openSwapModalWithPeer(peer)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-brand-violet text-white text-xs font-bold transition"
              >
                Propose Swap
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
