import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Settings, User, Bell, Globe, Moon, Sun, Save, CheckCircle, Camera, Upload } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, setCurrentUser, theme, toggleTheme, lang, setLang, openCameraModal } = useSkillX();

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
          Manage your Skill Passport profile, camera avatar photo, notifications, and language preferences.
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

        {/* Profile Picture Camera / Upload Bar */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
          <div className="relative group cursor-pointer" onClick={() => openCameraModal('avatar')}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-violet"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
              <Camera size={18} />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Profile Photo & Avatar</h4>
            <p className="text-[11px] text-slate-400">Upload an image file or snap a live selfie with your device camera</p>
            <button
              type="button"
              onClick={() => openCameraModal('avatar')}
              className="mt-2 px-3 py-1.5 rounded-xl bg-brand-violet/20 hover:bg-brand-violet/30 text-brand-violet text-xs font-bold transition flex items-center space-x-1.5 border border-brand-violet/30"
            >
              <Camera size={13} />
              <span>Change Photo via Camera / File</span>
            </button>
          </div>
        </div>

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
          <label className="block text-xs font-semibold text-slate-300 mb-1">Personal Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Campus / Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Weekly Availability</label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-white light:text-slate-800"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-black shadow-lg hover:opacity-95 transition flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Profile Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
