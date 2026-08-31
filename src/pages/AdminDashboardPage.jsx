import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import {
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
  Zap,
  TrendingUp,
  Search,
  Award,
  AlertTriangle,
  FileCheck,
  BarChart3,
  UserCheck,
  Plus,
  Crown
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { peers, swaps, currentUser, setCurrentUser } = useSkillX();

  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'verifications' | 'disputes' | 'analytics'
  const [userSearch, setUserSearch] = useState('');
  const [userList, setUserList] = useState([
    { id: 'user-vaishnavi', name: 'Vaishnavi R.', email: 'vaishnavi@ceg.edu', role: 'User', status: 'Active', credits: 1240, trustScore: 94 },
    { id: 'admin-1', name: 'Dr. S. Raman (Admin)', email: 'admin@thiraninai.edu', role: 'Admin', status: 'Active', credits: 5000, trustScore: 99 },
    { id: 'user-arun', name: 'Arun Kumar', email: 'arun@nid.edu', role: 'User', status: 'Active', credits: 980, trustScore: 97 },
    { id: 'user-priya', name: 'Priya Sharma', email: 'priya@iitm.ac.in', role: 'User', status: 'Active', credits: 760, trustScore: 92 },
    { id: 'user-rahul', name: 'Rahul Verma', email: 'rahul@xaviers.edu', role: 'User', status: 'Active', credits: 1100, trustScore: 89 },
  ]);

  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 'v-1', userName: 'Arun Kumar', skill: 'Figma Auto-Layout Prototyping', proof: 'Oracle & NID Certification #49281', date: 'Today 10:15 AM' },
    { id: 'v-2', userName: 'Priya Sharma', skill: 'Python Data Science Pipelines', proof: 'IIT Madras Course Completion', date: 'Yesterday 4:30 PM' },
    { id: 'v-3', userName: 'Karthik Raja', skill: 'Advanced Excel Financial Models', proof: 'CFA Institute Financial Modeling Certificate', date: 'Aug 28, 2026' },
  ]);

  // Grant Credits function for Admin
  const handleGrantCredits = (userId, amount = 100) => {
    setUserList(prev => prev.map(u => u.id === userId ? { ...u, credits: u.credits + amount } : u));
    alert(`Granted +${amount} SkillX Credits to user!`);
  };

  // Toggle user status (Active / Frozen)
  const handleToggleStatus = (userId) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Frozen' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Approve Skill Verification
  const handleApproveVerification = (id) => {
    setPendingVerifications(prev => prev.filter(v => v.id !== id));
    alert('Skill credential approved & verified badge added to user passport!');
  };

  // Reject Skill Verification
  const handleRejectVerification = (id) => {
    setPendingVerifications(prev => prev.filter(v => v.id !== id));
  };

  const filteredUsers = userList.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Admin Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
              <ShieldCheck size={14} />
              <span>CAMPUS ADMINISTRATOR PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 flex items-center space-x-2">
              <span>Admin Console</span>
              <Crown size={24} className="text-amber-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage platform users, verify skill credentials, grant credits, and review campus skill-gap analytics.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Logged in as Admin
            </span>
          </div>
        </div>

        {/* Top Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Total Users</span>
              <Users size={14} className="text-brand-violet" />
            </span>
            <div className="text-2xl font-black text-white">{userList.length + 38}</div>
            <span className="text-[10px] text-emerald-400 font-semibold">+12% this week</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Active Swaps</span>
              <FileCheck size={14} className="text-brand-cyan" />
            </span>
            <div className="text-2xl font-black text-white">{swaps.length + 14}</div>
            <span className="text-[10px] text-slate-400">97% completion</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Credits Circulated</span>
              <Zap size={14} className="text-amber-400" />
            </span>
            <div className="text-2xl font-black text-white">48,250</div>
            <span className="text-[10px] text-slate-400">SkillX Currency</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Pending Proofs</span>
              <Award size={14} className="text-amber-400" />
            </span>
            <div className="text-2xl font-black text-white">{pendingVerifications.length}</div>
            <span className="text-[10px] text-amber-400 font-semibold">Requires Approval</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Trust Index</span>
              <ShieldCheck size={14} className="text-emerald-400" />
            </span>
            <div className="text-2xl font-black text-white">96.4</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Top Quality Rating</span>
          </div>

        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
            activeTab === 'users' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users size={16} />
          <span>User Directory ({userList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition relative ${
            activeTab === 'verifications' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award size={16} />
          <span>Verification Queue ({pendingVerifications.length})</span>
          {pendingVerifications.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
            activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 size={16} />
          <span>Campus Skill-Gap Analytics</span>
        </button>
      </div>

      {/* TAB 1: USER MANAGEMENT DIRECTORY */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <UserCheck size={18} className="text-amber-400" />
              <span>Registered Accounts Directory</span>
            </h3>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user or email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/10 text-xs text-white light:text-slate-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">SkillX Credits</th>
                  <th className="p-3">Trust Score</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-white flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-brand-violet/20 text-brand-violet font-black flex items-center justify-center text-xs">
                        {u.name.substring(0, 1)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-3 text-slate-400">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'Admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-brand-violet/20 text-brand-violet'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-amber-400">{u.credits}</td>
                    <td className="p-3 font-bold text-emerald-400">{u.trustScore} / 100</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleGrantCredits(u.id, 100)}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[10px] transition"
                        title="Grant +100 SkillX Credits"
                      >
                        +100 Credits
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-2.5 py-1 rounded font-bold text-[10px] transition ${
                          u.status === 'Active'
                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300'
                        }`}
                      >
                        {u.status === 'Active' ? 'Freeze' : 'Unfreeze'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFICATION QUEUE */}
      {activeTab === 'verifications' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Award size={18} className="text-amber-400" />
              <span>Pending Skill Credential Verification Submissions</span>
            </h3>
            <p className="text-xs text-slate-400">Review submitted certificates and portfolio proofs before unlocking Verified Badges.</p>
          </div>

          <div className="space-y-4">
            {pendingVerifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">All skill verification requests have been processed!</div>
            ) : (
              pendingVerifications.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{v.userName}</h4>
                      <span className="text-[10px] text-slate-400">Submitted {v.date}</span>
                    </div>
                    <div className="text-xs font-bold text-brand-cyan">Skill: {v.skill}</div>
                    <div className="text-xs text-slate-300 font-mono bg-black/40 p-2 rounded-lg">
                      Proof Evidence: {v.proof}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleApproveVerification(v.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow flex items-center space-x-1 transition"
                    >
                      <CheckCircle size={14} />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => handleRejectVerification(v.id)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 font-bold text-xs transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CAMPUS SKILL-GAP ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart3 size={18} className="text-amber-400" />
              <span>Campus Skill-Gap Analytical Report</span>
            </h3>
            <p className="text-xs text-slate-400">Comparison of high-demand target skills vs available peer supply across colleges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Requested Skills */}
            <div className="p-5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-3">
              <h4 className="text-xs font-bold uppercase text-brand-cyan tracking-wider">🔥 High-Demand Target Skills (Learners Want)</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>UI/UX & Figma Prototyping</span>
                    <span>340 Requests</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full bg-brand-cyan rounded-full w-4/5" /></div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>Java Backend Systems</span>
                    <span>290 Requests</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full bg-brand-violet rounded-full w-3/4" /></div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>Python & Machine Learning</span>
                    <span>240 Requests</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full bg-amber-400 rounded-full w-2/3" /></div>
                </div>
              </div>
            </div>

            {/* Supply Matrix */}
            <div className="p-5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 space-y-3">
              <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider">🎓 Verified Teaching Supply (Teachers Available)</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>Java Programming</span>
                    <span>180 Verified Teachers</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full bg-emerald-400 rounded-full w-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>Advanced Excel & Data Analytics</span>
                    <span>140 Verified Teachers</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full bg-emerald-400 rounded-full w-3/4" /></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
