import React from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Sun, Moon, Palette, Check, Sparkles, Crown, Heart, Star } from 'lucide-react';

export default function ThemeModal({ isOpen, onClose }) {
  const {
    themePreset,
    setThemePreset,
    theme,
    setTheme,
    accentColor,
    setAccentColor
  } = useSkillX();

  if (!isOpen) return null;

  const specialThemes = [
    {
      id: 'black-gold',
      name: 'Gold & Black Combination 👑',
      tagline: 'Luxury Obsidian Black & Metallic Gold',
      icon: Crown,
      badge: 'GOLD & BLACK',
      bgClass: 'bg-black text-amber-300 border-amber-500/50',
      previewGradient: 'from-amber-500 via-yellow-500 to-amber-700'
    },
    {
      id: 'pastel-mixture',
      name: 'Pastel Purple & White 💜',
      tagline: 'Dreamy Soft Pastel Lavender & Pristine White',
      icon: Heart,
      badge: 'PASTEL PURPLE & WHITE',
      bgClass: 'bg-purple-100 text-purple-900 border-purple-300',
      previewGradient: 'from-purple-500 via-purple-300 to-white'
    },
    {
      id: 'white-gold',
      name: 'White & Gold Combination ✨',
      tagline: 'Royal White & Warm Gold Foil',
      icon: Star,
      badge: 'WHITE & GOLD',
      bgClass: 'bg-amber-50/50 text-amber-900 border-amber-300',
      previewGradient: 'from-amber-400 to-yellow-500'
    }
  ];

  const standardModes = [
    { id: 'dark', name: 'Dark Navy', icon: Moon, desc: 'Deep 2026 startup navy background' },
    { id: 'light', name: 'Light Clean', icon: Sun, desc: 'Warm off-white clean background' },
  ];

  const colorPalettes = [
    { id: 'violet', name: 'Electric Violet', hex: '#6366f1' },
    { id: 'emerald', name: 'Emerald Mint', hex: '#10b981' },
    { id: 'cyan', name: 'Cyber Cyan', hex: '#06b6d4' },
    { id: 'amber', name: 'Sunset Amber', hex: '#f59e0b' },
    { id: 'rose', name: 'Neon Rose', hex: '#f43f5e' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-violet">
              <Palette size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">THEME SYSTEM</span>
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

        <div className="space-y-6 pt-6 max-h-[75vh] overflow-y-auto pr-1">
          
          {/* FEATURED THEME COMBINATIONS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <Crown size={14} />
                <span>Featured Theme Combinations</span>
              </label>
              <span className="text-[10px] font-bold text-brand-cyan uppercase">Custom Presets</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {specialThemes.map((st) => {
                const Icon = st.icon;
                const active = themePreset === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setThemePreset(st.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-center justify-between relative overflow-hidden ${
                      active
                        ? 'border-amber-400 ring-2 ring-amber-400/50 bg-amber-500/10 text-white font-bold shadow-xl'
                        : 'border-white/10 bg-slate-900/60 light:bg-slate-100 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 z-10">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${st.previewGradient} text-white flex items-center justify-center font-bold shadow-md`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                          <span>{st.name}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 font-bold uppercase border border-amber-400/30">
                            {st.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{st.tagline}</div>
                      </div>
                    </div>

                    <div className="z-10">
                      {active ? (
                        <span className="p-1.5 rounded-full bg-amber-400 text-slate-950 font-bold block">
                          <Check size={16} />
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 hover:text-white">Apply</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STANDARD MODES */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Standard Modes</label>
            <div className="grid grid-cols-2 gap-3">
              {standardModes.map((m) => {
                const Icon = m.icon;
                const active = themePreset === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setThemePreset(m.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center space-x-3 ${
                      active
                        ? 'border-brand-violet bg-brand-violet/15 text-white font-bold shadow-lg'
                        : 'border-white/10 bg-slate-900/60 light:bg-slate-100 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${active ? 'bg-brand-violet text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                        <span>{m.name}</span>
                        {active && <Check size={12} className="text-brand-violet" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Accent Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {colorPalettes.map((cp) => {
                const active = accentColor === cp.id;
                return (
                  <button
                    key={cp.id}
                    onClick={() => setAccentColor(cp.id)}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                      active
                        ? 'border-brand-violet bg-brand-violet/20 text-white font-bold'
                        : 'border-white/10 bg-slate-900/60 light:bg-slate-100 hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: cp.hex }}
                    />
                    <span className="text-[10px] text-slate-400 font-semibold">{cp.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan text-white text-xs font-black shadow-xl hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Apply & Save Theme Settings</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
