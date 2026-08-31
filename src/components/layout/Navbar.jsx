import React, { useState } from 'react';
import { useSkillX } from '../../context/SkillXContext';
import {
  Sparkles,
  Search,
  Zap,
  Globe,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  CreditCard,
  User,
  MessageSquare,
  Users,
  Compass,
  CheckCircle,
  Cpu,
  Palette,
  Crown,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    accentColor,
    setIsThemeModalOpen,
    setIsAuthModalOpen,
    authRole,
    switchRole,
    logoutUser,
    lang,
    setLang,
    t,
    currentView,
    setCurrentView,
    currentUser,
    setIsOnboardingOpen,
    unreadNotifCount
  } = useSkillX();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const baseNavItems = [
    { id: 'discover', label: t('nav_discover'), icon: Compass },
    { id: 'aimatch', label: t('nav_ai_match'), icon: Cpu },
    { id: 'passport', label: t('nav_passport'), icon: User },
    { id: 'credits', label: t('nav_credits'), icon: Zap },
    { id: 'community', label: t('nav_community'), icon: Users },
    { id: 'pricing', label: t('nav_pricing'), icon: CreditCard }
  ];

  const navItems = authRole === 'admin'
    ? [{ id: 'admin', label: 'Admin Portal', icon: Crown }, ...baseNavItems]
    : baseNavItems;

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-dark/80 dark:bg-brand-dark/85 light:bg-white/85 border-b border-brand-border dark:border-white/10 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-violet/20 font-bold text-white text-xl tracking-wider">
            SX
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs tracking-widest text-brand-cyan font-bold uppercase">THIRANINAI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-violet/20 text-brand-violet font-semibold border border-brand-violet/30">2026</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center">
              SKILLX <span className="text-brand-violet ml-1">.</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-brand-surface/50 dark:bg-brand-surface/60 light:bg-slate-100 p-1.5 rounded-full border border-brand-border dark:border-white/10 light:border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isAdminBadge = item.id === 'admin';
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 ${
                  isActive
                    ? isAdminBadge ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-brand-violet text-white shadow-md font-bold'
                    : isAdminBadge ? 'text-amber-400 font-bold hover:bg-amber-500/10' : 'text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white light:text-slate-600 hover:bg-white/10 light:hover:bg-white'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Role Switcher Pill */}
          <button
            onClick={() => switchRole(authRole === 'admin' ? 'user' : 'admin')}
            className={`hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
              authRole === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-brand-violet/20 text-brand-violet border-brand-violet/40 hover:bg-brand-violet/30'
            }`}
            title="Switch User / Admin View"
          >
            {authRole === 'admin' ? <Crown size={12} /> : <User size={12} />}
            <span>Role: {authRole === 'admin' ? 'Admin' : 'User'}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="p-2 rounded-xl text-slate-400 dark:text-slate-300 hover:text-white light:text-slate-600 hover:bg-slate-800/50 light:hover:bg-slate-100 border border-transparent hover:border-slate-700 transition flex items-center space-x-1 text-xs font-medium"
              title="Select Language"
            >
              <Globe size={18} />
              <span className="uppercase font-bold text-[11px]">{lang}</span>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl py-1 z-50">
                <button
                  onClick={() => { setLang('en'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${lang === 'en' ? 'text-brand-violet font-bold bg-brand-violet/10' : 'text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100'}`}
                >
                  <span>English</span>
                  {lang === 'en' && <CheckCircle size={12} />}
                </button>
                <button
                  onClick={() => { setLang('ta'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${lang === 'ta' ? 'text-brand-violet font-bold bg-brand-violet/10' : 'text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100'}`}
                >
                  <span>தமிழ் (TA)</span>
                  {lang === 'ta' && <CheckCircle size={12} />}
                </button>
                <button
                  onClick={() => { setLang('hi'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${lang === 'hi' ? 'text-brand-violet font-bold bg-brand-violet/10' : 'text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100'}`}
                >
                  <span>हिन्दी (HI)</span>
                  {lang === 'hi' && <CheckCircle size={12} />}
                </button>
              </div>
            )}
          </div>

          {/* Theme & Palette Customizer Button */}
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="p-2 rounded-xl text-slate-400 dark:text-slate-300 hover:text-white light:text-slate-600 hover:bg-slate-800/50 light:hover:bg-slate-100 border border-transparent hover:border-brand-violet/40 transition flex items-center space-x-1"
            title="Theme & Color Customizer"
          >
            <Palette size={18} className="text-brand-violet" />
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl text-slate-400 dark:text-slate-300 hover:text-white light:text-slate-600 hover:bg-slate-800/50 light:hover:bg-slate-100 transition relative"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-cyan" />
              )}
            </button>

            {isNotifOpen && <NotificationCenter onClose={() => setIsNotifOpen(false)} />}
          </div>

          {/* User Credits Counter */}
          <button
            onClick={() => handleNavClick('credits')}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet hover:bg-brand-violet/20 transition text-xs font-bold"
          >
            <Zap size={14} className="fill-brand-violet text-brand-violet" />
            <span>{currentUser.creditsBalance}</span>
          </button>

          {/* Log In & Register Auth Buttons */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-xs font-bold text-slate-300 hover:text-white px-2.5 py-1.5 transition"
          >
            Log In
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan hover:opacity-95 text-white text-xs font-bold shadow-md transition flex items-center space-x-1"
          >
            <Sparkles size={14} />
            <span>Register</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border dark:border-white/10 bg-brand-dark/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  currentView === item.id
                    ? 'bg-brand-violet text-white font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2">
            <button
              onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
              className="text-xs font-bold text-brand-cyan flex items-center space-x-1.5"
            >
              <User size={16} />
              <span>Log In / Register Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
