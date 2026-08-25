import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Settings, User, Bell, Globe, Moon, Sun, Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, setCurrentUser, theme, toggleTheme, lang, setLang } = useSkillX();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [role, setRole] = useState(currentUser.role);
  const [location, setLocation] = useState(currentUser.location);
  const [availability, setAvailability] = useState(currentUser.availability);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      bio,
      role,
      location,
      availability
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">PREFERENCES</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage your Skill Passport profile, notifications, theme, and spoken language preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle size={18} />
          <span>Your settings and Skill Passport profile have been successfully saved!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        
        <h3 className="text-base font-bold text-white flex items-center space-x-2 pb-3 border-b border-white/10">
          <User size={18} className="text-brand-violet" />
          <span>Profile & Skill Passport Identity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Academic Program</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Skill Passport Statement</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs text-white light:text-slate-800 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Typical Availability</label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>
        </div>

        {/* Theme & Language Controls */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interface Preferences</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Theme Toggle */}
            <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white light:text-slate-800">
                {theme === 'dark' ? <Moon size={16} className="text-brand-violet" /> : <Sun size={16} className="text-amber-400" />}
                <span>Theme Mode: {theme === 'dark' ? 'Dark' : 'Light'}</span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet-hover transition"
              >
                Switch Theme
              </button>
            </div>

            {/* Language Selection */}
            <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white light:text-slate-800">
                <Globe size={16} className="text-brand-cyan" />
                <span>Language</span>
              </div>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 light:bg-white text-white light:text-slate-800 text-xs font-bold border border-white/10"
              >
                <option value="en">English (EN)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="hi">हिन्दी (HI)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-violet hover:bg-brand-violet-hover text-white font-bold text-xs shadow-lg transition flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Profile Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
