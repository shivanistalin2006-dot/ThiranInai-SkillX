import React from 'react';
import { useSkillX } from '../../context/SkillXContext';
import { Bell, CheckCircle, Zap, Sparkles, Award, Calendar, X } from 'lucide-react';

export default function NotificationCenter({ onClose }) {
  const { notifications, markNotificationsRead } = useSkillX();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'swap':
        return <Calendar size={16} className="text-brand-violet" />;
      case 'credit':
        return <Zap size={16} className="text-brand-cyan" />;
      case 'match':
        return <Sparkles size={16} className="text-amber-400" />;
      case 'badge':
        return <Award size={16} className="text-emerald-400" />;
      default:
        return <Bell size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl z-50 overflow-hidden">
      <div className="p-4 border-b border-brand-border dark:border-white/10 light:border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell size={18} className="text-brand-violet" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markNotificationsRead}
            className="text-[11px] font-semibold text-brand-violet hover:underline flex items-center space-x-1"
          >
            <CheckCircle size={12} />
            <span>Mark all read</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-brand-border dark:divide-white/5 light:divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">No notifications yet.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 flex items-start space-x-3 transition ${
                !n.read ? 'bg-brand-violet/5 dark:bg-brand-violet/10' : 'hover:bg-slate-800/30 light:hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-800/50 light:bg-slate-100 border border-white/5 mt-0.5">
                {getNotifIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-300 light:text-slate-600 mt-0.5 leading-snug">
                  {n.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-slate-900/40 light:bg-slate-100 text-center border-t border-white/5">
        <span className="text-[10px] text-slate-400">Powered by THIRANINAI Engine</span>
      </div>
    </div>
  );
}
