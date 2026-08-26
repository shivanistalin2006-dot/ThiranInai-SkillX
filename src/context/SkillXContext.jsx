import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import {
  initialCurrentUser,
  mockUsers,
  initialSwaps,
  initialTransactions,
  initialMessages,
  initialNotifications,
  initialCommunityPosts
} from '../data/mockData';

const SkillXContext = createContext();

export const SkillXProvider = ({ children }) => {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('skillx_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Language state: en / ta / hi
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('skillx_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  // Active main view navigation
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'discover', 'aimatch', 'passport', 'credits', 'dashboard', 'myskills', 'swaps', 'messaging', 'community', 'pricing', 'settings'

  // User & Domain State
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [peers, setPeers] = useState(mockUsers);
  const [swaps, setSwaps] = useState(initialSwaps);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [messages, setMessages] = useState(initialMessages);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);

  // Modals & Active Selections
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedPeerForSwap, setSelectedPeerForSwap] = useState(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [addSkillType, setAddSkillType] = useState('teach'); // 'teach' | 'learn'
  const [activeChatPeerId, setActiveChatPeerId] = useState('user-arun');
  const [unreadNotifCount, setUnreadNotifCount] = useState(2);

  // Effect: Theme class toggling on html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('skillx_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Effect: Language persistence
  useEffect(() => {
    try {
      localStorage.setItem('skillx_lang', lang);
    } catch (e) {}
  }, [lang]);

  // Translation helper function
  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations.en[key] || key;
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // AI Matching Compatibility Score Engine
  const calculateMatchScore = (peer) => {
    if (!peer) return 0;
    
    let score = 60; // Base score
    
    // 1. Reciprocal Skill Match (Check if peer teaches what user wants & user teaches what peer wants)
    const userWants = currentUser.skillsLearn.map(s => s.name.toLowerCase());
    const peerTeaches = peer.skillsTeach.map(s => s.name.toLowerCase());
    const userTeaches = currentUser.skillsTeach.map(s => s.name.toLowerCase());
    const peerWants = peer.skillsLearn.map(s => s.name.toLowerCase());

    const userGetsMatch = userWants.some(w => peerTeaches.some(t => t.includes(w) || w.includes(t)));
    const peerGetsMatch = peerWants.some(w => userTeaches.some(t => t.includes(w) || w.includes(t)));

    if (userGetsMatch && peerGetsMatch) score += 25;
    else if (userGetsMatch || peerGetsMatch) score += 15;

    // 2. Trust Score Alignment
    if (peer.trustScore >= 90) score += 8;
    else if (peer.trustScore >= 80) score += 5;

    // 3. Language & Mode Match
    const sharedLang = peer.languages?.some(l => currentUser.languages.includes(l));
    if (sharedLang) score += 4;

    return Math.min(score, 98);
  };

  // Actions
  const openSwapModalWithPeer = (peer) => {
    setSelectedPeerForSwap(peer);
    setIsSwapModalOpen(true);
  };

  const closeSwapModal = () => {
    setIsSwapModalOpen(false);
    setSelectedPeerForSwap(null);
  };

  const openAddSkillModal = (type = 'teach') => {
    setAddSkillType(type);
    setIsAddSkillModalOpen(true);
  };

  const closeAddSkillModal = () => {
    setIsAddSkillModalOpen(false);
  };

  const addSkillTeach = (skillObj) => {
    const newSkill = {
      id: `st-${Date.now()}`,
      name: skillObj.name,
      category: skillObj.category || 'General',
      level: skillObj.level || 'Intermediate',
      verified: false,
      hoursTaught: 0
    };
    setCurrentUser(prev => ({
      ...prev,
      skillsTeach: [...prev.skillsTeach, newSkill]
    }));
  };

  const addSkillLearn = (skillObj) => {
    const newSkill = {
      id: `sl-${Date.now()}`,
      name: skillObj.name,
      category: skillObj.category || 'General',
      level: 'Beginner',
      targetLevel: skillObj.targetLevel || 'Intermediate',
      progress: 0
    };
    setCurrentUser(prev => ({
      ...prev,
      skillsLearn: [...prev.skillsLearn, newSkill]
    }));
  };

  const removeSkillTeach = (id) => {
    setCurrentUser(prev => ({
      ...prev,
      skillsTeach: prev.skillsTeach.filter(s => s.id !== id)
    }));
  };

  const removeSkillLearn = (id) => {
    setCurrentUser(prev => ({
      ...prev,
      skillsLearn: prev.skillsLearn.filter(s => s.id !== id)
    }));
  };

  const sendSwapRequest = (swapData) => {
    const newSwap = {
      id: `swap-${Date.now()}`,
      peer: selectedPeerForSwap,
      teachSkill: swapData.teachSkill,
      learnSkill: swapData.learnSkill,
      matchScore: calculateMatchScore(selectedPeerForSwap),
      status: 'Pending',
      date: swapData.date,
      time: swapData.time,
      mode: swapData.mode,
      proposedBy: currentUser.id,
      createdAt: new Date().toISOString()
    };

    setSwaps(prev => [newSwap, ...prev]);

    // Push notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Swap Request Sent! 🚀',
        message: `Your request was sent to ${selectedPeerForSwap.name} for ${swapData.teachSkill} ↔ ${swapData.learnSkill}.`,
        time: 'Just now',
        read: false,
        type: 'swap'
      },
      ...prev
    ]);

    setUnreadNotifCount(prev => prev + 1);
    closeSwapModal();
  };

  const acceptSwapRequest = (swapId) => {
    setSwaps(prev => prev.map(s => s.id === swapId ? { ...s, status: 'Scheduled' } : s));
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Swap Confirmed!',
        message: 'Your learning session has been officially scheduled.',
        time: 'Just now',
        read: false,
        type: 'swap'
      },
      ...prev
    ]);
  };

  const completeSwapSession = (swapId, rating = 5.0) => {
    setSwaps(prev => prev.map(s => s.id === swapId ? { ...s, status: 'Completed', ratingGiven: rating } : s));
    
    // Credit reward
    const creditBonus = 120;
    setCurrentUser(prev => ({
      ...prev,
      creditsBalance: prev.creditsBalance + creditBonus,
      hoursShared: prev.hoursShared + 1,
      sessionsCompleted: prev.sessionsCompleted + 1
    }));

    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        type: 'EARNED',
        amount: creditBonus,
        description: 'Completed skill exchange session',
        date: 'Just now',
        category: 'Teaching Session',
        counterpart: 'Peer Learner'
      },
      ...prev
    ]);
  };

  const sendMessage = (peerId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), newMsg]
    }));
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadNotifCount(0);
  };

  return (
    <SkillXContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        t,
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        peers,
        swaps,
        transactions,
        messages,
        notifications,
        unreadNotifCount,
        markNotificationsRead,
        communityPosts,
        calculateMatchScore,
        isOnboardingOpen,
        setIsOnboardingOpen,
        onboardingStep,
        setOnboardingStep,
        isSwapModalOpen,
        selectedPeerForSwap,
        openSwapModalWithPeer,
        closeSwapModal,
        isAddSkillModalOpen,
        addSkillType,
        openAddSkillModal,
        closeAddSkillModal,
        addSkillTeach,
        addSkillLearn,
        removeSkillTeach,
        removeSkillLearn,
        sendSwapRequest,
        acceptSwapRequest,
        completeSwapSession,
        sendMessage,
        activeChatPeerId,
        setActiveChatPeerId
      }}
    >
      {children}
    </SkillXContext.Provider>
  );
};

export const useSkillX = () => useContext(SkillXContext);
