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
  // Preset Theme state: 'black-gold' | 'pastel-mixture' | 'white-gold' | 'dark' | 'light'
  const [themePreset, setThemePreset] = useState(() => {
    try {
      return localStorage.getItem('skillx_theme_preset') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Base Theme mode state: dark / light
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('skillx_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Accent Color state: 'violet' | 'emerald' | 'cyan' | 'amber' | 'rose'
  const [accentColor, setAccentColor] = useState(() => {
    try {
      return localStorage.getItem('skillx_accent') || 'violet';
    } catch (e) {
      return 'violet';
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
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'discover', 'aimatch', 'passport', 'credits', 'dashboard', 'myskills', 'swaps', 'messaging', 'community', 'pricing', 'settings', 'admin'

  // User & Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('skillx_auth_user');
      return saved ? JSON.parse(saved) : initialCurrentUser;
    } catch (e) {
      return initialCurrentUser;
    }
  });

  const [authRole, setAuthRole] = useState(() => {
    try {
      return localStorage.getItem('skillx_auth_role') || 'user'; // 'user' | 'admin'
    } catch (e) {
      return 'user';
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('skillx_registered_users');
      return saved ? JSON.parse(saved) : [
        { email: 'vaishnavi@ceg.edu', password: 'user123', name: 'Vaishnavi R.', role: 'User', authRole: 'user' },
        { email: 'admin@thiraninai.edu', password: 'admin123', name: 'Campus Admin', role: 'Admin', authRole: 'admin' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [peers, setPeers] = useState(mockUsers);
  const [swaps, setSwaps] = useState(initialSwaps);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [messages, setMessages] = useState(initialMessages);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);

  // Modals & Active Selections
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedPeerForSwap, setSelectedPeerForSwap] = useState(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [addSkillType, setAddSkillType] = useState('teach'); // 'teach' | 'learn'
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [activeChatPeerId, setActiveChatPeerId] = useState('user-arun');
  const [unreadNotifCount, setUnreadNotifCount] = useState(2);

  // Effect: Apply theme preset classes on documentElement
  useEffect(() => {
    const root = document.documentElement;
    
    // Reset all theme classes first
    root.classList.remove('dark', 'light', 'theme-black-gold', 'theme-pastel-mixture', 'theme-white-gold');

    if (themePreset === 'black-gold') {
      root.classList.add('dark', 'theme-black-gold');
      setTheme('dark');
    } else if (themePreset === 'pastel-mixture') {
      root.classList.add('light', 'theme-pastel-mixture');
      setTheme('light');
    } else if (themePreset === 'white-gold') {
      root.classList.add('light', 'theme-white-gold');
      setTheme('light');
    } else if (themePreset === 'light') {
      root.classList.add('light');
      setTheme('light');
    } else {
      root.classList.add('dark');
      setTheme('dark');
    }

    root.setAttribute('data-accent', accentColor);

    try {
      localStorage.setItem('skillx_theme_preset', themePreset);
      localStorage.setItem('skillx_theme', theme);
      localStorage.setItem('skillx_accent', accentColor);
    } catch (e) {}
  }, [themePreset, theme, accentColor]);

  // Effect: Persist Authentication
  useEffect(() => {
    try {
      localStorage.setItem('skillx_auth_user', JSON.stringify(currentUser));
      localStorage.setItem('skillx_auth_role', authRole);
      localStorage.setItem('skillx_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [currentUser, authRole, registeredUsers]);

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
    setThemePreset(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Functions
  const loginUser = (email, password, role) => {
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    const targetRole = role || (found ? found.authRole : 'user');

    if (found && found.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }

    let loggedUser = {
      ...initialCurrentUser,
      name: found ? found.name : email.split('@')[0],
      email: email,
      role: targetRole === 'admin' ? 'Campus Administrator' : 'Computer Science Student',
      trustScore: targetRole === 'admin' ? 99 : 94,
      creditsBalance: targetRole === 'admin' ? 5000 : 1240
    };

    setCurrentUser(loggedUser);
    setAuthRole(targetRole);

    if (targetRole === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }

    return { success: true };
  };

  const registerUser = (userData) => {
    const newUserRecord = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role || 'User',
      authRole: userData.authRole || 'user',
      institution: userData.institution || 'College of Engineering'
    };

    setRegisteredUsers(prev => [...prev, newUserRecord]);

    const loggedUser = {
      ...initialCurrentUser,
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.authRole === 'admin' ? 'Campus Administrator' : 'Skill Exchange Student',
      institution: userData.institution || 'College of Engineering',
      trustScore: userData.authRole === 'admin' ? 99 : 85,
      creditsBalance: userData.authRole === 'admin' ? 5000 : 500,
      skillsTeach: userData.authRole === 'admin' ? [] : [
        { id: `st-${Date.now()}`, name: 'General Mentorship', category: 'Academics', level: 'Intermediate', verified: true, hoursTaught: 0 }
      ],
      skillsLearn: userData.authRole === 'admin' ? [] : [
        { id: `sl-${Date.now()}`, name: 'UI/UX Design', category: 'Design', level: 'Beginner', targetLevel: 'Intermediate', progress: 10 }
      ]
    };

    setCurrentUser(loggedUser);
    setAuthRole(userData.authRole || 'user');

    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(initialCurrentUser);
    setAuthRole('user');
    setCurrentView('landing');
  };

  const switchRole = (newRole) => {
    setAuthRole(newRole);
    if (newRole === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  // AI Matching Compatibility Score Engine
  const calculateMatchScore = (peer) => {
    if (!peer) return 0;
    
    let score = 60; // Base score
    
    // 1. Reciprocal Skill Match
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
        themePreset,
        setThemePreset,
        theme,
        setTheme,
        toggleTheme,
        accentColor,
        setAccentColor,
        isThemeModalOpen,
        setIsThemeModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRole,
        setAuthRole,
        loginUser,
        registerUser,
        logoutUser,
        switchRole,
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
