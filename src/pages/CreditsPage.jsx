import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Zap, ArrowUpRight, ArrowDownRight, History, Sparkles, HelpCircle, ShieldCheck, Repeat, Users, RefreshCw } from 'lucide-react';

export default function CreditsPage() {
  const { currentUser, transactions, setCurrentView } = useSkillX();
  const [filterType, setFilterType] = useState('ALL');

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'EARNED') return tx.type === 'EARNED';
    if (filterType === 'SPENT') return tx.type === 'SPENT';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Heading */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-bold border border-brand-violet/30">
          <Zap size={14} className="fill-brand-violet" />
          <span>PLATFORM LEARNING CURRENCY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Knowledge Has Value.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          SkillX Credits are utility learning credits powering peer-to-peer exchanges across the network. Credits cannot be bought with money — they are earned solely through teaching.
        </p>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-brand-violet/40 relative overflow-hidden space-y-6">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-violet/20 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">AVAILABLE BALANCE</span>
            <div className="text-4xl sm:text-6xl font-black text-white flex items-center space-x-3 mt-1">
              <Zap size={44} className="text-brand-violet fill-brand-violet" />
              <span>{currentUser.creditsBalance.toLocaleString()}</span>
              <span className="text-lg font-bold text-brand-cyan uppercase">SkillX Credits</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('discover')}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-bold shadow-lg shadow-brand-violet/30 hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <ArrowUpRight size={16} />
              <span>Earn Credits (Teach)</span>
            </button>

            <button
              onClick={() => setCurrentView('discover')}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-slate-800/80 light:bg-slate-100 hover:bg-slate-800 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-bold border border-white/10 transition flex items-center justify-center space-x-2"
            >
              <ArrowDownRight size={16} />
              <span>Spend Credits (Learn)</span>
            </button>
          </div>
        </div>

        {/* Currency Rules Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span className="text-slate-300">Non-cryptocurrency utility token</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span className="text-slate-300">Earned purely through teaching</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span className="text-slate-300">1 Hour Session = ~100–150 Credits</span>
          </div>
        </div>
      </div>

      {/* INDIRECT SWAP FLOW EXPLANATION (A -> B -> C -> D -> A) */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-cyan uppercase tracking-widest">
            <Repeat size={14} />
            <span>INDIRECT EXCHANGE ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Not every swap needs to be one-to-one.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            If Person A teaches Person B, but Person B doesn't know what Person A wants to learn — SkillX Credits bridge the network! Person A earns credits and learns from Person C.
          </p>
        </div>

        {/* Interactive Flow Visual */}
        <div className="p-6 rounded-3xl bg-slate-900/80 light:bg-slate-100 border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center relative">
          
          {/* Node A */}
          <div className="p-4 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 space-y-1">
            <div className="w-8 h-8 rounded-full bg-brand-violet text-white font-black text-xs mx-auto flex items-center justify-center">A</div>
            <div className="text-xs font-bold text-white">Vaishnavi</div>
            <div className="text-[10px] text-brand-cyan">Teaches Java to B</div>
            <div className="text-[10px] font-bold text-emerald-400">+120 Credits</div>
          </div>

          {/* Node B */}
          <div className="p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 space-y-1">
            <div className="w-8 h-8 rounded-full bg-brand-cyan text-slate-950 font-black text-xs mx-auto flex items-center justify-center">B</div>
            <div className="text-xs font-bold text-white">Arun</div>
            <div className="text-[10px] text-brand-cyan">Learns Java from A</div>
            <div className="text-[10px] font-bold text-rose-400">-120 Credits</div>
          </div>

          {/* Node C */}
          <div className="p-4 rounded-2xl bg-amber-400/20 border border-amber-400/40 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">C</div>
            <div className="text-xs font-bold text-white">Priya</div>
            <div className="text-[10px] text-brand-cyan">Teaches UI/UX to A</div>
            <div className="text-[10px] font-bold text-emerald-400">+80 Credits</div>
          </div>

          {/* Node D */}
          <div className="p-4 rounded-2xl bg-emerald-400/20 border border-emerald-400/40 space-y-1">
            <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">D</div>
            <div className="text-xs font-bold text-white">Rahul</div>
            <div className="text-[10px] text-brand-cyan">Network Pool</div>
            <div className="text-[10px] font-bold text-slate-300">Knowledge Flow</div>
          </div>

        </div>
      </div>

      {/* TRANSACTION HISTORY SECTION */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <History size={18} className="text-brand-violet" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Transaction History</h3>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-900/60 p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition ${filterType === 'ALL' ? 'bg-brand-violet text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('EARNED')}
              className={`px-3 py-1 rounded-lg font-bold transition ${filterType === 'EARNED' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              + Earned
            </button>
            <button
              onClick={() => setFilterType('SPENT')}
              className={`px-3 py-1 rounded-lg font-bold transition ${filterType === 'SPENT' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              - Spent
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  tx.type === 'EARNED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {tx.type === 'EARNED' ? '+' : '-'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{tx.description}</h4>
                  <span className="text-[10px] text-slate-400">{tx.date} · {tx.category} ({tx.counterpart})</span>
                </div>
              </div>

              <div className={`text-sm font-black ${tx.type === 'EARNED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {tx.type === 'EARNED' ? `+${tx.amount}` : `-${tx.amount}`} Credits
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
