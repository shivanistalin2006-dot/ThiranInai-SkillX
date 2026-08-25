import React from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Check, Sparkles, Zap, ShieldCheck, Building2, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const { setIsOnboardingOpen } = useSkillX();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-bold border border-brand-violet/30">
          <Zap size={14} className="fill-brand-violet" />
          <span>FLEXIBLE PLANS FOR STUDENTS & INSTITUTIONS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Simple, Transparent Pricing.
        </h1>
        <p className="text-xs sm:text-base text-slate-400">
          SKILLX peer exchanges use skills as currency. Choose the plan that fits your learning journey.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Tier 1: FREE */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between hover:border-white/20 transition">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">FREE PLAN</span>
            <div className="text-4xl font-black text-white">
              ₹0 <span className="text-xs font-normal text-slate-400">/ forever</span>
            </div>
            <p className="text-xs text-slate-400">Perfect for students starting out with basic skill exchanges.</p>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Public Skill Passport profile</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Add up to 5 teaching & learning skills</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Basic AI skill matching</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Community feed & discussion access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition text-center"
          >
            Start Free
          </button>
        </div>

        {/* Tier 2: PREMIUM */}
        <div className="glass-panel p-8 rounded-3xl border-2 border-brand-violet shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden transform md:-translate-y-2">
          <div className="absolute top-0 right-0 px-4 py-1 bg-brand-violet text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
            MOST POPULAR
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">PREMIUM PASSPORT</span>
            <div className="text-4xl font-black text-white">
              ₹149 <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-300">For ambitious learners wanting priority matching & verified credentials.</p>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-200">
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span><strong>Unlimited</strong> skill listings & swap requests</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Advanced AI vector compatibility scoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span><strong>Verified Teacher</strong> digital badge</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Priority positioning in Discover directory</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Skill-gap analytics & progress reports</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-black text-xs shadow-xl shadow-brand-violet/30 hover:opacity-95 transition text-center flex items-center justify-center space-x-1.5"
          >
            <Sparkles size={16} />
            <span>Go Premium (₹149/mo)</span>
          </button>
        </div>

        {/* Tier 3: COLLEGE */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between hover:border-white/20 transition">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-1">
              <Building2 size={14} />
              <span>COLLEGE / ENTERPRISE</span>
            </span>
            <div className="text-3xl font-black text-white">
              ₹1–3 Lakh <span className="text-xs font-normal text-slate-400">/ year</span>
            </div>
            <p className="text-xs text-slate-400">Dedicated private peer exchange network for colleges and institutions.</p>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Private campus network (e.g., IIT, Guindy)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Campus Admin dashboard & placement reports</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Institutional Skill-Gap Analytics</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>Single Sign-On (SSO) integration</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => alert("Our campus team will contact your institution admin!")}
            className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition text-center"
          >
            Contact Campus Team
          </button>
        </div>

      </div>

      {/* Optional Platform Fee Note */}
      <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 text-center text-xs text-slate-400 max-w-xl mx-auto">
        💡 Note: Peer-to-peer exchanges use SkillX Credits. Optional professional masterclass sessions may carry a nominal platform transaction fee.
      </div>

    </div>
  );
}
