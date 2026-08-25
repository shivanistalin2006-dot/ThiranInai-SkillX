import React from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { Zap, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useSkillX();

  return (
    <footer className="w-full bg-brand-dark/95 dark:bg-brand-dark light:bg-slate-900 text-slate-400 border-t border-brand-border dark:border-white/10 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-cyan flex items-center justify-center font-bold text-white text-lg">
                SX
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-brand-cyan font-bold uppercase block">THIRANINAI</span>
                <span className="text-lg font-black text-white tracking-tight">SKILLX</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              SKILLX is the premier peer-to-peer skill exchange platform. Teach what you know, earn platform learning credits, and learn from a global network of peers.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-cyan font-bold">
              <Zap size={14} className="fill-brand-cyan" />
              <span>Your Skills Are Your Currency.</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setCurrentView('discover')} className="hover:text-white transition">Discover Skills</button></li>
              <li><button onClick={() => setCurrentView('aimatch')} className="hover:text-white transition">AI Match Engine</button></li>
              <li><button onClick={() => setCurrentView('passport')} className="hover:text-white transition">Skill Passport</button></li>
              <li><button onClick={() => setCurrentView('credits')} className="hover:text-white transition">SkillX Credits</button></li>
              <li><button onClick={() => setCurrentView('pricing')} className="hover:text-white transition">Pricing Tiers</button></li>
            </ul>
          </div>

          {/* Column 2: Community & Network */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setCurrentView('community')} className="hover:text-white transition">Community Feed</button></li>
              <li><button onClick={() => setCurrentView('community')} className="hover:text-white transition">Top Mentors</button></li>
              <li><button onClick={() => setCurrentView('community')} className="hover:text-white transition">Campus Jams</button></li>
              <li><a href="#trust" onClick={() => setCurrentView('passport')} className="hover:text-white transition">Trust & Safety</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Brand */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition">About THIRANINAI</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Security Audit</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <span>© 2026</span>
            <strong className="text-slate-300">THIRANINAI</strong>
            <span>· SKILLX Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Made with</span>
              <Heart size={12} className="text-rose-500 fill-rose-500" />
              <span>for learners worldwide</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
