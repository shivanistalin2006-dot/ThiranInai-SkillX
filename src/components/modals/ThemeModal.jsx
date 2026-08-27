import React from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Sun, Moon, Palette, Check, Sparkles, Monitor } from 'lucide-react';

export default function ThemeModal({ isOpen, onClose }) {
  const { theme, toggleTheme, setTheme, accentColor, setAccentColor } = useSkillX();

  if (!isOpen) return null;

  const colorPalettes = [
    { id: 'violet', name: 'Electric Violet', hex: '#6366f1', gradient: 'from-indigo-600 to-violet-500' },
    { id: 'emerald', name: 'Emerald Mint', hex: '#10b981', gradient: 'from-emerald-600 to-teal-400' },
    { id: 'cyan', name: 'Cyber Cyan', hex: '#06b6d4', gradient: 'from-cyan-500 to-blue-500' },
    { id: 'amber', name: 'Sunset Amber', hex: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
    { id: 'rose', name: 'Neon Rose', hex: '#f43f5e', gradient: 'from-rose-500 to-pink-500' },
  ];

  const modes = [
    { id: 'dark', name: 'Dark Navy', icon: Moon, desc: 'Deep startup navy background' },
    { id: 'light', name: 'Light Clean', icon: Sun, desc: 'Warm off-white background' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-violet">
              <Palette size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">VISUAL SYSTEM</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Theme & Color Customizer</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 pt-6">
          
          {/* Mode Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Appearance Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {modes.map((m) => {
                const Icon = m.icon;
                const active = theme === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setTheme(m.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-center space-x-3 ${
                      active
                        ? 'border-brand-violet bg-brand-violet/15 text-white font-bold shadow-lg'
                        : 'border-white/10 bg-slate-900/60 light:bg-slate-100 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${active ? 'bg-brand-violet text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                        <span>{m.name}</span>
                        {active && <Check size={14} className="text-brand-violet" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Accent Color Theme</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {colorPalettes.map((cp) => {
                const active = accentColor === cp.id;
                return (
                  <button
                    key={cp.id}
                    onClick={() => setAccentColor(cp.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      active
                        ? 'border-brand-violet bg-brand-violet/20 text-white font-bold'
                        : 'border-white/10 bg-slate-900/60 light:bg-slate-100 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                        style={{ backgroundColor: cp.hex }}
                      />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{cp.name}</span>
                    </div>
                    {active && <Check size={16} className="text-brand-violet" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-white/10 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">LIVE THEME PREVIEW</span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Active Theme:</span>
              <span className="font-bold text-brand-violet uppercase">{theme} MODE · {accentColor} PALETTE</span>
            </div>
            <div className="h-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan mt-1" />
          </div>

          {/* Submit */}
          <div>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-black shadow-xl hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Apply & Save Theme</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
