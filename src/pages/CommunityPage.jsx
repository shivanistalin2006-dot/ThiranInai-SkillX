import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Users, Flame, ThumbsUp, MessageSquare, Plus, Sparkles, Award, Search } from 'lucide-react';

export default function CommunityPage() {
  const { communityPosts, peers, openSwapModalWithPeer, setIsOnboardingOpen } = useSkillX();
  const [likes, setLikes] = useState({});

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const trendingSkills = ['React', 'UI/UX Design', 'Public Speaking', 'Python', 'Digital Marketing', 'Figma'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">PEER COMMUNITY HUB</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            SKILLX Community & Jams
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Discover peer learning threads, study jams, and top mentor leaderboards.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-bold shadow-lg flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Post Skill Request</span>
        </button>
      </div>

      {/* Trending Skills Pills Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center space-x-3 overflow-x-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-1 whitespace-nowrap">
          <Flame size={16} />
          <span>Trending Skills:</span>
        </span>
        {trendingSkills.map((s) => (
          <span key={s} className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-semibold whitespace-nowrap border border-white/5">
            #{s}
          </span>
        ))}
      </div>

      {/* Main Grid: Feed & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Community Posts Feed */}
        <div className="lg:col-span-8 space-y-6">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-brand-violet/40 transition"
            >
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-violet" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{post.author.name}</h4>
                    <span className="text-[10px] text-slate-400">{post.author.institution} · {post.time}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-brand-violet/20 text-brand-violet text-[10px] font-bold border border-brand-violet/30">
                  {post.tag}
                </span>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-base font-bold text-white mb-1">{post.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-violet font-semibold transition"
                  >
                    <ThumbsUp size={14} />
                    <span>{post.likes + (likes[post.id] || 0)} Upvotes</span>
                  </button>

                  <button className="flex items-center space-x-1.5 text-slate-400 hover:text-white font-semibold transition">
                    <MessageSquare size={14} />
                    <span>{post.comments} Replies</span>
                  </button>
                </div>

                <button
                  onClick={() => openSwapModalWithPeer(post.author)}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet-hover transition flex items-center space-x-1"
                >
                  <Sparkles size={12} />
                  <span>Find a Match</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Top Teachers Leaderboard */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center space-x-2">
            <Award size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">Top Community Mentors</h3>
          </div>

          <div className="space-y-3">
            {peers.map((peer, idx) => (
              <div key={peer.id} className="p-3 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center font-black text-amber-400 text-xs">#{idx + 1}</span>
                  <img src={peer.avatar} alt={peer.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{peer.name}</div>
                    <div className="text-[10px] text-slate-400">{peer.hoursShared} hrs shared</div>
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-emerald-400">
                  {peer.trustScore} Trust
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
