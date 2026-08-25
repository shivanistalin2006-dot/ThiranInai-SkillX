import React, { useState } from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Plus, BookOpen, Target, Sparkles } from 'lucide-react';
import { skillCategories, allSkillOptions } from '../../data/mockData';

export default function AddSkillModal() {
  const {
    isAddSkillModalOpen,
    closeAddSkillModal,
    addSkillType,
    addSkillTeach,
    addSkillLearn
  } = useSkillX();

  const [skillName, setSkillName] = useState('React');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Intermediate');
  const [targetLevel, setTargetLevel] = useState('Advanced');

  if (!isAddSkillModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addSkillType === 'teach') {
      addSkillTeach({ name: skillName, category, level });
    } else {
      addSkillLearn({ name: skillName, category, targetLevel });
    }
    closeAddSkillModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            {addSkillType === 'teach' ? (
              <BookOpen size={18} className="text-brand-violet" />
            ) : (
              <Target size={18} className="text-brand-cyan" />
            )}
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {addSkillType === 'teach' ? 'Add Skill You Can Teach' : 'Add Skill You Want to Learn'}
            </h3>
          </div>
          <button onClick={closeAddSkillModal} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select or Type Skill Name</label>
            <input
              type="text"
              list="skill-options"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="E.g., React, UI/UX, Python..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
              required
            />
            <datalist id="skill-options">
              {allSkillOptions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
            >
              {skillCategories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {addSkillType === 'teach' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Proficiency Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Proficiency Goal</label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-cyan"
              >
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Mastery">Mastery</option>
              </select>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold shadow-lg shadow-brand-violet/30 transition flex items-center justify-center space-x-1.5"
            >
              <Plus size={16} />
              <span>Add to Skill Passport</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
