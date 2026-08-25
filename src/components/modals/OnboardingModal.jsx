import React, { useState } from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, BookOpen, Award, Globe, Clock, Target } from 'lucide-react';
import { allSkillOptions } from '../../data/mockData';

export default function OnboardingModal() {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    onboardingStep,
    setOnboardingStep,
    setCurrentView,
    addSkillTeach,
    addSkillLearn
  } = useSkillX();

  const [teachSkills, setTeachSkills] = useState(['Java', 'Python']);
  const [learnSkills, setLearnSkills] = useState(['UI/UX Design', 'React']);
  const [myLevel, setMyLevel] = useState('Intermediate');
  const [selectedLangs, setSelectedLangs] = useState(['English', 'Tamil']);
  const [availability, setAvailability] = useState('Evenings & Weekends');
  const [preference, setPreference] = useState('Online 1-on-1');

  if (!isOnboardingOpen) return null;

  const toggleTeachSkill = (skill) => {
    if (teachSkills.includes(skill)) {
      setTeachSkills(teachSkills.filter(s => s !== skill));
    } else {
      setTeachSkills([...teachSkills, skill]);
    }
  };

  const toggleLearnSkill = (skill) => {
    if (learnSkills.includes(skill)) {
      setLearnSkills(learnSkills.filter(s => s !== skill));
    } else {
      setLearnSkills([...learnSkills, skill]);
    }
  };

  const handleFinish = () => {
    // Add selected skills
    teachSkills.forEach(s => addSkillTeach({ name: s, level: myLevel }));
    learnSkills.forEach(s => addSkillLearn({ name: s, targetLevel: 'Intermediate' }));

    setIsOnboardingOpen(false);
    setOnboardingStep(1);
    setCurrentView('aimatch');
  };

  const totalSteps = 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">ONBOARDING WIZARD</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Setup Your Skill Passport</span>
              <Sparkles size={18} className="text-brand-violet" />
            </h2>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="my-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Step 0{onboardingStep} of 0{totalSteps}</span>
            <span className="text-brand-violet">{Math.round((onboardingStep / totalSteps) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-300"
              style={{ width: `${(onboardingStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: What can you teach? */}
        {onboardingStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-violet">
              <BookOpen size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 1 — What can you teach?</h3>
            </div>
            <p className="text-xs text-slate-400">Select skills you feel comfortable teaching to others.</p>
            
            <div className="flex flex-wrap gap-2.5 max-h-56 overflow-y-auto p-1">
              {allSkillOptions.map((skill) => {
                const selected = teachSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleTeachSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
                      selected
                        ? 'bg-brand-violet text-white shadow-lg shadow-brand-violet/30 border border-brand-violet'
                        : 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span>{skill}</span>
                    {selected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: What do you want to learn? */}
        {onboardingStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-cyan">
              <Target size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 2 — What do you want to learn?</h3>
            </div>
            <p className="text-xs text-slate-400">Choose skills you are excited to learn or improve.</p>
            
            <div className="flex flex-wrap gap-2.5 max-h-56 overflow-y-auto p-1">
              {allSkillOptions.map((skill) => {
                const selected = learnSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleLearnSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
                      selected
                        ? 'bg-brand-cyan text-slate-950 shadow-lg shadow-brand-cyan/30 font-bold border border-brand-cyan'
                        : 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span>{skill}</span>
                    {selected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Your Skill Level */}
        {onboardingStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Award size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 3 — Your Teaching Level</h3>
            </div>
            <p className="text-xs text-slate-400">How would you describe your expertise in what you teach?</p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setMyLevel(lvl)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    myLevel === lvl
                      ? 'border-brand-violet bg-brand-violet/15 text-white font-bold'
                      : 'border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-sm font-bold">{lvl}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {lvl === 'Beginner' && 'Foundational knowledge & ready to mentor newcomers.'}
                    {lvl === 'Intermediate' && 'Solid practical experience & projects.'}
                    {lvl === 'Advanced' && 'Deep hands-on experience & industry projects.'}
                    {lvl === 'Expert' && 'Professional mastery & high confidence.'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Languages Spoken */}
        {onboardingStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <Globe size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 4 — Spoken Languages</h3>
            </div>
            <p className="text-xs text-slate-400">Select languages you are comfortable speaking in session.</p>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              {['English', 'Tamil (தமிழ்)', 'Hindi (हिन्दी)', 'Telugu', 'Kannada', 'Malayalam'].map((langItem) => {
                const isSel = selectedLangs.some(l => langItem.includes(l));
                return (
                  <button
                    key={langItem}
                    onClick={() => {
                      const clean = langItem.split(' ')[0];
                      if (selectedLangs.includes(clean)) setSelectedLangs(selectedLangs.filter(l => l !== clean));
                      else setSelectedLangs([...selectedLangs, clean]);
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                      isSel
                        ? 'border-brand-violet bg-brand-violet/20 text-white font-bold'
                        : 'border-white/10 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {langItem}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Availability */}
        {onboardingStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-violet">
              <Clock size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 5 — Availability</h3>
            </div>
            <p className="text-xs text-slate-400">When are you typically free for learning swaps?</p>
            
            <div className="space-y-2 pt-2">
              {['Weekdays 5-8 PM', 'Evenings & Weekends', 'Weekends Only', 'Flexible Schedule'].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setAvailability(slot)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                    availability === slot
                      ? 'border-brand-violet bg-brand-violet/20 text-white'
                      : 'border-white/10 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{slot}</span>
                  {availability === slot && <Check size={16} className="text-brand-violet" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Learning Preference */}
        {onboardingStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-cyan">
              <Sparkles size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 6 — Learning Format</h3>
            </div>
            <p className="text-xs text-slate-400">How do you prefer conducting your exchange sessions?</p>
            
            <div className="space-y-2.5 pt-2">
              {['Online 1-on-1 (Google Meet / SKILLX Room)', 'Group Peer Jam', 'Hybrid (Online & Offline Campus)', 'In-Person Campus Library'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setPreference(fmt)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                    preference === fmt
                      ? 'border-brand-cyan bg-brand-cyan/20 text-white'
                      : 'border-white/10 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{fmt}</span>
                  {preference === fmt && <Check size={16} className="text-brand-cyan" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => setOnboardingStep(prev => Math.max(prev - 1, 1))}
            disabled={onboardingStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              onboardingStep === 1 ? 'opacity-40 cursor-not-allowed text-slate-500' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          {onboardingStep < totalSteps ? (
            <button
              onClick={() => setOnboardingStep(prev => Math.min(prev + 1, totalSteps))}
              className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold shadow-lg shadow-brand-violet/30 flex items-center space-x-2 transition"
            >
              <span>Next Step</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-black text-xs shadow-xl shadow-brand-violet/40 flex items-center space-x-2 transition transform active:scale-95"
            >
              <Sparkles size={16} />
              <span>Find My First Match</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
