import React, { useState, useEffect } from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle, Crown, KeyRound, Building2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const {
    loginUser,
    registerUser,
    setIsOnboardingOpen,
    setCurrentView,
    initialAuthRole,
    initialAuthMode
  } = useSkillX();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('user'); // 'user' | 'admin'

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync role and mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setRole(initialAuthRole || 'user');
      setMode(initialAuthMode || 'login');
      setErrorMessage('');
    }
  }, [isOpen, initialAuthRole, initialAuthMode]);

  if (!isOpen) return null;

  const handleQuickDemoLogin = (demoRole) => {
    if (demoRole === 'admin') {
      setEmail('admin@thiraninai.edu');
      setPassword('admin123');
      setRole('admin');
      loginUser('admin@thiraninai.edu', 'admin123', 'admin');
    } else {
      setEmail('vaishnavi@ceg.edu');
      setPassword('user123');
      setRole('user');
      loginUser('vaishnavi@ceg.edu', 'user123', 'user');
    }
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'login') {
      const res = loginUser(email, password, role);
      if (res.success) {
        onClose();
      } else {
        setErrorMessage(res.message || 'Invalid credentials.');
      }
    } else {
      if (!name || !email || !password) {
        setErrorMessage('Please fill in all required registration fields.');
        return;
      }
      const res = registerUser({
        name,
        email,
        password,
        role: role === 'admin' ? 'Admin' : 'User',
        authRole: role,
        institution: institution || 'College of Engineering'
      });
      
      onClose();
      if (role === 'user') {
        setIsOnboardingOpen(true);
      } else {
        setCurrentView('admin');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-white/10">
          <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">AUTHENTICATION PORTAL</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <span>{mode === 'login' ? `${role === 'admin' ? 'Campus Admin' : 'User Profile'} Login` : `Register ${role === 'admin' ? 'Admin' : 'User'} Account`}</span>
            <Sparkles size={18} className={role === 'admin' ? 'text-amber-400' : 'text-brand-violet'} />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {role === 'admin' ? 'Access Campus Analytics, Verifications & Directory' : 'Access Skill Passport, Swap Requests & Credits'}
          </p>
        </div>

        {/* Mode Tabs (Log In vs Register) */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-xl text-xs font-bold transition ${
              mode === 'login'
                ? role === 'admin' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'bg-brand-violet text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl text-xs font-bold transition ${
              mode === 'register'
                ? 'bg-brand-cyan text-slate-950 shadow font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up (Register)
          </button>
        </div>

        {/* DISTINCT TWO SEPARATE PROFILE CARDS */}
        <div className="space-y-2 mb-4">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Choose Profile Login Type</label>
          <div className="grid grid-cols-2 gap-3">
            
            {/* User Profile Card */}
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`p-3.5 rounded-2xl border text-left transition relative overflow-hidden ${
                role === 'user'
                  ? 'border-brand-violet bg-brand-violet/20 text-white font-bold ring-2 ring-brand-violet/40 shadow-lg'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <User size={18} className={role === 'user' ? 'text-brand-violet' : 'text-slate-400'} />
                <span className="text-xs font-extrabold text-white">👤 User Profile</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Student, Learner & Peer Teacher</p>
              {role === 'user' && <CheckCircle size={14} className="absolute top-3 right-3 text-brand-violet" />}
            </button>

            {/* Admin Profile Card */}
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-3.5 rounded-2xl border text-left transition relative overflow-hidden ${
                role === 'admin'
                  ? 'border-amber-400 bg-amber-500/20 text-white font-bold ring-2 ring-amber-400/40 shadow-lg'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Crown size={18} className={role === 'admin' ? 'text-amber-400' : 'text-slate-400'} />
                <span className="text-xs font-extrabold text-amber-300">🛡️ Admin Portal</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Campus Administrator Console</p>
              {role === 'admin' && <CheckCircle size={14} className="absolute top-3 right-3 text-amber-400" />}
            </button>

          </div>
        </div>

        {/* Quick Demo Credentials Banner */}
        {mode === 'login' && (
          <div className="mb-4 p-3 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Quick Demo Login:</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user')}
                className="px-3 py-1 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 text-brand-violet text-[10px] font-bold transition flex items-center space-x-1"
              >
                <User size={12} />
                <span>User Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold transition flex items-center space-x-1"
              >
                <Crown size={12} />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {role === 'admin' ? 'Admin Full Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'admin' ? 'E.g., Dr. S. Raman' : 'E.g., Vaishnavi Raman'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {role === 'admin' ? 'Admin Email Address' : 'User Email Address'}
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@thiraninai.edu' : 'name@college.edu'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">College / Campus Name</label>
              <div className="relative">
                <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="E.g., College of Engineering Guindy / IIT Madras"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3.5 rounded-2xl text-xs font-black shadow-xl transition flex items-center justify-center space-x-2 ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:opacity-95'
                  : 'bg-gradient-to-r from-brand-violet to-brand-cyan text-white hover:opacity-95'
              }`}
            >
              <KeyRound size={16} />
              <span>{mode === 'login' ? `Log In to ${role === 'admin' ? 'Admin Console' : 'User Account'}` : `Complete ${role === 'admin' ? 'Admin' : 'User'} Registration`}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
