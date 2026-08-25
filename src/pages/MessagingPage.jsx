import React, { useState } from 'react';
import { useSkillX } from '../context/SkillXContext';
import { Send, Video, Calendar, CheckCircle, Zap, MessageSquare, PhoneCall, Paperclip, Sparkles } from 'lucide-react';

export default function MessagingPage() {
  const {
    currentUser,
    peers,
    messages,
    sendMessage,
    activeChatPeerId,
    setActiveChatPeerId,
    swaps,
    completeSwapSession
  } = useSkillX();

  const activePeer = peers.find(p => p.id === activeChatPeerId) || peers[0];
  const conversation = messages[activePeer.id] || [];
  const activeSwap = swaps.find(s => s.peer.id === activePeer.id);

  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendMessage(activePeer.id, inputMsg);
    setInputMsg('');
  };

  const handleShareVideoLink = () => {
    const link = `https://meet.skillx.thiraninai.app/room-${Date.now().toString().slice(-6)}`;
    sendMessage(activePeer.id, `📹 I've created our SKILLX Live Room: ${link}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-6rem)]">
      <div className="glass-panel rounded-3xl border border-white/10 h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl">
        
        {/* Left Side: Conversation List (4 columns) */}
        <div className="md:col-span-4 border-r border-white/10 flex flex-col bg-slate-900/60 light:bg-slate-50">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <MessageSquare size={16} className="text-brand-violet" />
              <span>Skill Exchange Chats</span>
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {peers.map((peer) => {
              const isActive = peer.id === activePeer.id;
              const peerMsgs = messages[peer.id] || [];
              const lastMsg = peerMsgs[peerMsgs.length - 1]?.text || 'Start conversation...';
              
              return (
                <button
                  key={peer.id}
                  onClick={() => setActiveChatPeerId(peer.id)}
                  className={`w-full p-4 flex items-center space-x-3 text-left transition ${
                    isActive ? 'bg-brand-violet/20 border-l-4 border-brand-violet' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <img src={peer.avatar} alt={peer.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-violet" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{peer.name}</h4>
                      <span className="text-[10px] text-slate-400">97% Match</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{lastMsg}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation Window (8 columns) */}
        <div className="md:col-span-8 flex flex-col h-full bg-brand-dark/40 light:bg-white">
          
          {/* Active Chat Header with Swap Context */}
          <div className="p-4 border-b border-white/10 bg-slate-900/80 light:bg-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={activePeer.avatar} alt={activePeer.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-violet" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-1">
                  <span>{activePeer.name}</span>
                  <CheckCircle size={14} className="text-brand-cyan" />
                </h3>
                <span className="text-[11px] text-brand-cyan font-bold block">
                  Java ↔ UI/UX Skill Swap (Thursday 6:00 PM)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShareVideoLink}
                className="px-3 py-1.5 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold shadow flex items-center space-x-1"
              >
                <Video size={14} />
                <span>Share Video Room</span>
              </button>

              {activeSwap && activeSwap.status === 'Scheduled' && (
                <button
                  onClick={() => completeSwapSession(activeSwap.id, 5.0)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition"
                >
                  Complete & Rate
                </button>
              )}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {conversation.length === 0 ? (
              <div className="text-center text-slate-400 text-xs py-10">
                No messages yet. Send a message to start coordinating your session!
              </div>
            ) : (
              conversation.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                        isMe
                          ? 'bg-brand-violet text-white rounded-tr-none shadow-md'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none border border-white/10'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`text-[9px] ${isMe ? 'text-brand-violet-200' : 'text-slate-400'} text-right`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Composer Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-slate-900/60 light:bg-slate-100 flex items-center space-x-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Message ${activePeer.name.split(' ')[0]} about Java ↔ UI/UX...`}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 light:bg-white border border-white/10 text-xs font-semibold text-white light:text-slate-800 focus:outline-none focus:border-brand-violet"
            />
            <button
              type="submit"
              className="p-3 rounded-2xl bg-brand-violet hover:bg-brand-violet-hover text-white transition shadow-lg"
            >
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
