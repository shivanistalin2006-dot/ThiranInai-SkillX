import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Search, Filter, Star, CheckCircle, Zap, Globe, MapPin, Calendar, BookOpen, Target, Sparkles } from 'lucide-react';
import { skillCategories } from '../data/mockData';

export default function DiscoverPage() {
  const { peers, setCurrentView, openSwapModalWithPeer, calculateMatchScore } = useSkillX();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [minTrustScore, setMinTrustScore] = useState(80);

  // Filter peers
  const filteredPeers = peers.filter(peer => {
    // Search query check against name, teach skills, want skills
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      peer.name.toLowerCase().includes(query) ||
      peer.skillsTeach.some(s => s.name.toLowerCase().includes(query)) ||
      peer.skillsLearn.some(s => s.name.toLowerCase().includes(query));

    // Category check
    const matchesCategory =
      selectedCategory === 'All' ||
      peer.skillsTeach.some(s => s.category === selectedCategory || selectedCategory === 'Programming' || selectedCategory === 'Design');

    // Level check
    const matchesLevel =
      selectedLevel === 'All' ||
      peer.skillsTeach.some(s => s.level === selectedLevel);

    // Language check
    const matchesLang =
      selectedLang === 'All' ||
      peer.languages.includes(selectedLang);

    // Mode check
    const matchesMode =
      selectedMode === 'All' ||
      peer.modePreference.includes(selectedMode);

    // Trust score
    const matchesTrust = peer.trustScore >= minTrustScore;

    return matchesQuery && matchesCategory && matchesLevel && matchesLang && matchesMode && matchesTrust;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">PEER DIRECTORY</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Discover Teachers & Skill Peers
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Connect directly with students and professionals offering hands-on knowledge exchanges.
        </p>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/10 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a skill (e.g. Java, UI/UX, Python, Photography, React)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 focus:outline-none focus:border-brand-violet transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-violet text-white font-bold shadow-md shadow-brand-violet/30'
                  : 'bg-slate-800/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Advanced Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Language</label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mode</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-white/10 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800"
            >
              <option value="All">Online & Offline</option>
              <option value="Online">Online Only</option>
              <option value="Offline">Offline Campus</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
              <span>Min Trust Score</span>
              <span className="text-brand-cyan font-bold">{minTrustScore}</span>
            </label>
            <input
              type="range"
              min="50"
              max="95"
              value={minTrustScore}
              onChange={(e) => setMinTrustScore(Number(e.target.value))}
              className="w-full accent-brand-cyan mt-1"
            />
          </div>

        </div>

      </div>

      {/* Peer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeers.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-panel rounded-3xl space-y-3">
            <Search size={32} className="mx-auto text-slate-500" />
            <h3 className="text-sm font-bold text-white">No skill peers match your current search filters.</h3>
            <p className="text-xs text-slate-400">Try clearing filters or searching for alternative terms like "Java" or "UI/UX".</p>
          </div>
        ) : (
          filteredPeers.map((peer) => {
            const matchScore = calculateMatchScore(peer);
            return (
              <div
                key={peer.id}
                className="glass-card p-6 rounded-3xl border border-white/10 space-y-5 hover:border-brand-violet/50 transition duration-300 flex flex-col justify-between"
              >
                
                {/* Header Profile Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={peer.avatar} alt={peer.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-violet" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                        <span>{peer.name}</span>
                        {peer.badges.includes('Verified Teacher') && (
                          <CheckCircle size={14} className="text-brand-cyan" title="Verified Teacher" />
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-400">{peer.role} · {peer.institution}</p>
                    </div>
                  </div>

                  {/* Trust Score Gauge Badge */}
                  <div className="text-right">
                    <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {peer.trustScore} / 100
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{peer.rating} ★ ({peer.sessionsCompleted} sessions)</span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 line-clamp-2 italic">
                  "{peer.bio}"
                </p>

                {/* Skills Teaches vs Wants */}
                <div className="space-y-3 pt-1 border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet flex items-center space-x-1">
                      <BookOpen size={12} />
                      <span>Teaches</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {peer.skillsTeach.map(st => (
                        <span key={st.name} className="px-2.5 py-1 rounded-lg bg-brand-violet/15 text-brand-violet font-bold text-[11px] border border-brand-violet/20">
                          {st.name} ({st.level})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan flex items-center space-x-1">
                      <Target size={12} />
                      <span>Wants to Learn</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {peer.skillsLearn.map(sl => (
                        <span key={sl.name} className="px-2.5 py-1 rounded-lg bg-brand-cyan/15 text-brand-cyan font-bold text-[11px] border border-brand-cyan/20">
                          {sl.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span className="flex items-center space-x-1">
                    <Globe size={12} />
                    <span>{peer.languages.join(', ')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{peer.modePreference}</span>
                  </span>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setCurrentView('passport')}
                    className="py-2.5 rounded-xl bg-slate-800/80 light:bg-slate-100 hover:bg-slate-800 text-slate-200 dark:text-slate-200 light:text-slate-800 font-bold text-xs transition text-center"
                  >
                    View Passport
                  </button>

                  <button
                    onClick={() => openSwapModalWithPeer(peer)}
                    className="py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1"
                  >
                    <Sparkles size={13} />
                    <span>Request Swap</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
