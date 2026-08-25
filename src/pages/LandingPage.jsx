import React from 'react';
import { useSkillX } from '../context/SkillXContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  ShieldCheck,
  RotateCw,
  Search,
  BookOpen,
  Award,
  Star,
  Check,
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  const {
    t,
    setCurrentView,
    setIsOnboardingOpen,
    openSwapModalWithPeer,
    peers
  } = useSkillX();

  const vaishnavi = {
    name: 'VAISHNAVI',
    teach: 'Java',
    learn: 'UI/UX',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  };

  const arun = {
    name: 'ARUN',
    teach: 'UI/UX',
    learn: 'Java',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-violet/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-brand-cyan/20 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-bold">
              <Sparkles size={14} className="text-brand-violet" />
              <span>POWERED BY THIRANINAI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span className="text-slate-300">2026 STARTUP MVP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Your Skills Are <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan">
                Your Currency.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium max-w-2xl leading-relaxed">
              "{t('hero_copy')}"
            </p>

            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
              {t('hero_secondary')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan hover:from-brand-violet-hover hover:to-brand-cyan text-white font-black text-sm shadow-xl shadow-brand-violet/30 hover:shadow-brand-violet/50 transition transform active:scale-95 flex items-center justify-center space-x-2.5"
              >
                <span>{t('cta_start_swapping')}</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setCurrentView('discover')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-surface/60 dark:bg-brand-surface/60 light:bg-slate-100 border border-brand-border dark:border-white/10 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 font-bold text-sm hover:border-brand-violet transition flex items-center justify-center space-x-2"
              >
                <Search size={16} />
                <span>{t('cta_explore_skills')}</span>
              </button>
            </div>

            {/* Micro Stats Row */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-black text-white">4.9/5</div>
                <div className="text-[11px] text-slate-400 font-medium">Learner Trust Rating</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-cyan">100%</div>
                <div className="text-[11px] text-slate-400 font-medium">Credit Backed Swaps</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-violet">97%</div>
                <div className="text-[11px] text-slate-400 font-medium">AI Match Score</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Match Visual (Vaishnavi ↔ Arun) */}
          <div className="lg:col-span-5 relative z-10">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-brand-violet/40 transition duration-500">
              
              {/* Top Match Tag */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">LIVE AI RECOMMENDATION</span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-black text-xs shadow-md animate-pulse">
                  {t('match_badge')}
                </span>
              </div>

              {/* Two User Cards Exchange Interface */}
              <div className="py-6 grid grid-cols-2 gap-4 relative">
                
                {/* Connecting Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-10 h-10 rounded-full bg-brand-violet border-2 border-brand-dark flex items-center justify-center text-white shadow-xl">
                    <RotateCw size={18} className="animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>

                {/* Vaishnavi Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-center space-y-2">
                  <img src={vaishnavi.avatar} alt={vaishnavi.name} className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-brand-violet" />
                  <h3 className="text-xs font-black text-white light:text-slate-900">{vaishnavi.name}</h3>
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] text-slate-400">Can teach:</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet font-bold text-[11px]">
                      {vaishnavi.teach}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400">Wants:</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold text-[11px]">
                      {vaishnavi.learn}
                    </span>
                  </div>
                </div>

                {/* Arun Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-center space-y-2">
                  <img src={arun.avatar} alt={arun.name} className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-brand-cyan" />
                  <h3 className="text-xs font-black text-white light:text-slate-900">{arun.name}</h3>
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] text-slate-400">Can teach:</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold text-[11px]">
                      {arun.teach}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400">Wants:</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet font-bold text-[11px]">
                      {arun.learn}
                    </span>
                  </div>
                </div>

              </div>

              {/* Match Reason Checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>{t('match_reason_reciprocal')} (Java ↔ UI/UX)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>{t('match_reason_levels')} (Expert ↔ Advanced)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>{t('match_reason_availability')} (Weekdays 6-8 PM)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>{t('match_reason_language')} (English & Tamil)</span>
                </div>
              </div>

              {/* Action Button inside Card */}
              <div className="pt-6">
                <button
                  onClick={() => openSwapModalWithPeer(peers[0])}
                  className="w-full py-3 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Zap size={14} />
                  <span>Propose Direct Swap with Arun</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-8">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-cyan">THE LEARNING GAP</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t('problem_heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Person A knows Java. Person B wants to learn Java. But traditional platforms force expensive courses, static videos, or unvetted tutoring marketplaces.
            </p>
          </div>

          {/* Visual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
            
            {/* Traditional Path Card */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-rose-300">Traditional Course Model</h3>
                <XCircle size={20} className="text-rose-400" />
              </div>
              <div className="text-xs font-mono bg-black/40 p-3 rounded-xl text-rose-200">
                {t('traditional_model')}
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>High upfront monetary cost per course</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Passive 10-hour pre-recorded videos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Zero live feedback or peer interaction</span>
                </li>
              </ul>
            </div>

            {/* SKILLX Model Card */}
            <div className="p-6 rounded-2xl bg-brand-violet/15 border border-brand-violet/40 space-y-4 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-cyan/20 rounded-full blur-xl" />
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-brand-cyan">SKILLX Peer Exchange Model</h3>
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <div className="text-xs font-mono bg-brand-violet/30 p-3 rounded-xl text-brand-cyan font-bold">
                {t('skillx_model')}
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Zero monetary barrier — use skills as currency</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Interactive 1-on-1 human-to-human sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Earn SkillX Credits for teaching & spend anytime</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW SKILLX WORKS (4 STEPS) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">FOUR-STEP ENGINE</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t('how_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-brand-violet/50 transition">
            <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 text-brand-violet flex items-center justify-center font-extrabold text-lg">
              01
            </div>
            <h3 className="text-sm font-bold text-white">{t('how_step1_title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t('how_step1_desc')}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Java</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Photoshop</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Python</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-brand-cyan/50 transition">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-extrabold text-lg">
              02
            </div>
            <h3 className="text-sm font-bold text-white">{t('how_step2_title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t('how_step2_desc')}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">UI/UX</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">React</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Marketing</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-amber-400/50 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-extrabold text-lg">
              03
            </div>
            <h3 className="text-sm font-bold text-white">{t('how_step3_title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t('how_step3_desc')}</p>
            <div className="p-2 rounded-xl bg-slate-900 text-[10px] text-amber-300 font-mono">
              Vector Match: 97% Match Score
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-emerald-400/50 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
              04
            </div>
            <h3 className="text-sm font-bold text-white">{t('how_step4_title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t('how_step4_desc')}</p>
            <div className="p-2 rounded-xl bg-emerald-950/40 text-[10px] text-emerald-300 font-bold">
              +120 SkillX Credits Earned
            </div>
          </div>

        </div>

        {/* Animated Loop Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan text-white text-center font-black text-lg sm:text-xl tracking-wider shadow-2xl uppercase">
          {t('loop_banner')}
        </div>
      </section>

      {/* 4. LANDING PAGE DIFFERENTIATION MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">PRODUCT DIFFERENTIATION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why SKILLX Reinvents Peer Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              "Others connect people to content, services, jobs or communities. SKILLX connects people through mutual knowledge."
            </p>
          </div>

          {/* Table Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-3">Feature</th>
                  <th className="p-3">Course Platforms (Udemy)</th>
                  <th className="p-3">Tutoring (Wyzant)</th>
                  <th className="p-3">Freelance (Fiverr)</th>
                  <th className="p-3 bg-brand-violet/20 text-white font-bold rounded-t-xl">SKILLX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3 font-bold text-white">Reciprocal Skill Matching</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 bg-brand-violet/10 font-bold text-emerald-400">✓ 100% Reciprocal</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Learning Currency</td>
                  <td className="p-3">Cash ($$)</td>
                  <td className="p-3">Cash ($$)</td>
                  <td className="p-3">Cash ($$)</td>
                  <td className="p-3 bg-brand-violet/10 font-bold text-brand-cyan">✓ SkillX Credits</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Skill Verification Passport</td>
                  <td className="p-3 text-rose-400">✕ Course Certs</td>
                  <td className="p-3 text-rose-400">✕ Unverified</td>
                  <td className="p-3 text-rose-400">✕ Star Rating</td>
                  <td className="p-3 bg-brand-violet/10 font-bold text-emerald-400">✓ Trust Score (94/100)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Indirect Swaps (A→B→C)</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 text-rose-400">✕ No</td>
                  <td className="p-3 bg-brand-violet/10 font-bold text-emerald-400">✓ Supported</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Human-to-Human Live Session</td>
                  <td className="p-3 text-rose-400">✕ Pre-recorded</td>
                  <td className="p-3 text-emerald-400">✓ Paid Tutors</td>
                  <td className="p-3 text-rose-400">✕ Gig deliverables</td>
                  <td className="p-3 bg-brand-violet/10 font-bold text-emerald-400">✓ 1-on-1 Peer Sessions</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. TRUST & SAFETY TEASER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center space-x-1.5">
              <ShieldCheck size={16} />
              <span>COMMUNITY SAFETY & CREDIBILITY</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Trust Score: Powered by 4 Verification Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every learner and teacher builds a public **Skill Passport**. Trust is earned transparently through community assessment, completed swap logs, certificates, and learner ratings.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                <div className="font-bold text-white">Peer Session Ratings</div>
                <div className="text-[11px] text-slate-400">Verified 1-on-1 session reviews</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                <div className="font-bold text-white">Skill Assessments</div>
                <div className="text-[11px] text-slate-400">Interactive peer knowledge checks</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-slate-900 to-brand-surface border border-emerald-500/30 text-center space-y-4 shadow-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">PUBLIC TRUST METRIC</div>
              <div className="text-6xl font-black text-emerald-400">94 <span className="text-2xl text-slate-400">/ 100</span></div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Verified Community Mentor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION CTA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to turn your skills into currency?
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-medium">
            Join thousands of college students, creators, and engineers swapping knowledge on SKILLX.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-9 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-100 transition transform active:scale-95 flex items-center space-x-2"
            >
              <Sparkles size={18} className="text-brand-violet" />
              <span>Start Swapping Free</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
