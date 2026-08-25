import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { BookOpen, Target, Plus, CheckCircle, Trash2, Edit3, Award, Clock } from 'lucide-react';

export default function MySkillsPage() {
  const { currentUser, openAddSkillModal, removeSkillTeach, removeSkillLearn } = useSkillX();
  const [activeTab, setActiveTab] = useState('teach');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">SKILL PASSPORT INVENTORY</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Manage My Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure skills you teach to earn credits or skills you want to learn from others.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => openAddSkillModal('teach')}
            className="px-4 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold shadow-md hover:bg-brand-violet-hover transition flex items-center space-x-1.5"
          >
            <Plus size={16} />
            <span>Add Teaching Skill</span>
          </button>

          <button
            onClick={() => openAddSkillModal('learn')}
            className="px-4 py-2.5 rounded-xl bg-brand-cyan text-slate-950 text-xs font-bold shadow-md hover:bg-cyan-400 transition flex items-center space-x-1.5"
          >
            <Plus size={16} />
            <span>Add Learning Goal</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('teach')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
            activeTab === 'teach'
              ? 'bg-brand-violet text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen size={16} />
          <span>I CAN TEACH ({currentUser.skillsTeach.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
            activeTab === 'learn'
              ? 'bg-brand-cyan text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Target size={16} />
          <span>I WANT TO LEARN ({currentUser.skillsLearn.length})</span>
        </button>
      </div>

      {/* Skills Grid */}
      {activeTab === 'teach' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUser.skillsTeach.map((s) => (
            <div key={s.id || s.name} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-brand-violet/50 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-brand-violet/20 text-brand-violet text-xs font-bold border border-brand-violet/30">
                  {s.level}
                </span>
                {s.verified ? (
                  <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle size={14} />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Unverified</span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{s.name}</h3>
                <p className="text-xs text-slate-400">{s.category || 'General'}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                <span className="flex items-center space-x-1">
                  <Clock size={14} className="text-brand-violet" />
                  <span>{s.hoursTaught || 0} Hours Taught</span>
                </span>
                <button
                  onClick={() => removeSkillTeach(s.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Remove Skill"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUser.skillsLearn.map((s) => (
            <div key={s.id || s.name} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-brand-cyan/50 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-bold border border-brand-cyan/30">
                  Target: {s.targetLevel}
                </span>
                <span className="text-xs font-bold text-brand-cyan">{s.progress || 0}%</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{s.name}</h3>
                <p className="text-xs text-slate-400">{s.category || 'General'}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${s.progress || 0}%` }} />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                <span className="text-[11px] text-slate-400">Current Level: {s.level || 'Beginner'}</span>
                <button
                  onClick={() => removeSkillLearn(s.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Remove Learning Goal"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
