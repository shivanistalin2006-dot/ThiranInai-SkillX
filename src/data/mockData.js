export const initialCurrentUser = {
  id: 'user-vaishnavi',
  name: 'Vaishnavi R.',
  username: 'vaishnavi_tech',
  role: 'Computer Science Student',
  institution: 'College of Engineering, Guindy',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  bio: 'CS Undergrad passionate about Java, Backend Systems, and Algorithms. Eager to master UI/UX design and modern frontend workflows.',
  trustScore: 94,
  creditsBalance: 1240,
  hoursShared: 86,
  sessionsCompleted: 38,
  rating: 4.9,
  location: 'Chennai, India',
  modePreference: 'Hybrid (Online & Offline)',
  languages: ['English', 'Tamil'],
  availability: 'Weekdays 5-8 PM, Weekends Flexible',
  badges: ['Verified Teacher', 'Community Mentor', 'Top Contributor'],
  verificationSources: [
    { type: 'Assessments', detail: 'Passed Java SE 17 Expert Assessment' },
    { type: 'Peer Ratings', detail: '38/38 positive peer session reviews' },
    { type: 'Certificates', detail: 'Oracle Certified Professional' },
    { type: 'Portfolio', detail: 'GitHub 450+ commits verified' }
  ],
  skillsTeach: [
    { id: 'st-1', name: 'Java', category: 'Programming', level: 'Expert', verified: true, hoursTaught: 52 },
    { id: 'st-2', name: 'Python', category: 'Programming', level: 'Intermediate', verified: true, hoursTaught: 24 },
    { id: 'st-3', name: 'Public Speaking', category: 'Communication', level: 'Advanced', verified: false, hoursTaught: 10 }
  ],
  skillsLearn: [
    { id: 'sl-1', name: 'UI/UX Design', category: 'Design', level: 'Beginner', targetLevel: 'Intermediate', progress: 45 },
    { id: 'sl-2', name: 'React', category: 'Programming', level: 'Beginner', targetLevel: 'Advanced', progress: 30 },
    { id: 'sl-3', name: 'Digital Marketing', category: 'Marketing', level: 'Beginner', targetLevel: 'Intermediate', progress: 15 }
  ]
};

export const mockUsers = [
  {
    id: 'user-arun',
    name: 'Arun Kumar',
    username: 'arun_ux',
    role: 'Product Design Intern',
    institution: 'National Institute of Design',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    bio: 'Crafting pixel-perfect design systems in Figma. Looking to master Java for backend service development.',
    trustScore: 97,
    creditsBalance: 980,
    hoursShared: 64,
    sessionsCompleted: 29,
    rating: 4.95,
    location: 'Bengaluru, India',
    modePreference: 'Online',
    languages: ['English', 'Tamil', 'Hindi'],
    availability: 'Evenings & Weekends',
    badges: ['Verified Teacher', 'UI Specialist'],
    skillsTeach: [
      { name: 'UI/UX Design', level: 'Expert', verified: true, hoursTaught: 48 },
      { name: 'Figma Prototyping', level: 'Advanced', verified: true, hoursTaught: 16 }
    ],
    skillsLearn: [
      { name: 'Java', targetLevel: 'Advanced' },
      { name: 'Data Structures', targetLevel: 'Intermediate' }
    ]
  },
  {
    id: 'user-priya',
    name: 'Priya Sharma',
    username: 'priya_code',
    role: 'AI Researcher',
    institution: 'IIT Madras',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    bio: 'Python and Machine Learning nerd. Wanting to learn digital photography and video storytelling.',
    trustScore: 92,
    creditsBalance: 760,
    hoursShared: 42,
    sessionsCompleted: 19,
    rating: 4.8,
    location: 'Chennai, India',
    modePreference: 'Hybrid',
    languages: ['English', 'Hindi'],
    availability: 'Weekends Only',
    badges: ['Verified Teacher', 'AI Pioneer'],
    skillsTeach: [
      { name: 'Python', level: 'Expert', verified: true, hoursTaught: 30 },
      { name: 'Machine Learning', level: 'Advanced', verified: true, hoursTaught: 12 }
    ],
    skillsLearn: [
      { name: 'Photography', targetLevel: 'Intermediate' },
      { name: 'Video Editing', targetLevel: 'Beginner' }
    ]
  },
  {
    id: 'user-rahul',
    name: 'Rahul Verma',
    username: 'rahul_edits',
    role: 'Creative Lead & Student',
    institution: 'St. Xavier College',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Premiere Pro & DaVinci Resolve wizard. Passionate about stage presence and public speaking.',
    trustScore: 89,
    creditsBalance: 1100,
    hoursShared: 70,
    sessionsCompleted: 31,
    rating: 4.75,
    location: 'Mumbai, India',
    modePreference: 'Online',
    languages: ['English', 'Hindi'],
    availability: 'Mon, Wed, Fri 6-9 PM',
    badges: ['Top Contributor', 'Video Guru'],
    skillsTeach: [
      { name: 'Video Editing', level: 'Expert', verified: true, hoursTaught: 50 },
      { name: 'Public Speaking', level: 'Advanced', verified: false, hoursTaught: 20 }
    ],
    skillsLearn: [
      { name: 'React', targetLevel: 'Intermediate' },
      { name: 'Node.js', targetLevel: 'Beginner' }
    ]
  },
  {
    id: 'user-ananya',
    name: 'Ananya Roy',
    username: 'ananya_snap',
    role: 'Visual Arts Major',
    institution: 'Symbiosis Pune',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
    bio: 'Capturing moments with DSLR & Mirrorless. Looking for frontend web design mentors.',
    trustScore: 87,
    creditsBalance: 640,
    hoursShared: 35,
    sessionsCompleted: 15,
    rating: 4.88,
    location: 'Pune, India',
    modePreference: 'Offline',
    languages: ['English', 'Hindi', 'Bengali'],
    availability: 'Weekdays 2-6 PM',
    badges: ['Verified Teacher'],
    skillsTeach: [
      { name: 'Photography', level: 'Advanced', verified: true, hoursTaught: 25 },
      { name: 'Creative Writing', level: 'Intermediate', verified: false, hoursTaught: 10 }
    ],
    skillsLearn: [
      { name: 'Web Design', targetLevel: 'Intermediate' },
      { name: 'Photoshop', targetLevel: 'Advanced' }
    ]
  },
  {
    id: 'user-karthik',
    name: 'Karthik Raja',
    username: 'karthik_fin',
    role: 'Finance & Analytics Undergrad',
    institution: 'PSG College of Tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Data modeling, Excel VBA, and financial analysis. Want to get hands-on with Python scripts.',
    trustScore: 95,
    creditsBalance: 1450,
    hoursShared: 98,
    sessionsCompleted: 44,
    rating: 4.92,
    location: 'Coimbatore, India',
    modePreference: 'Online',
    languages: ['English', 'Tamil'],
    availability: 'Flexible Schedule',
    badges: ['Verified Teacher', 'Community Mentor'],
    skillsTeach: [
      { name: 'Advanced Excel', level: 'Expert', verified: true, hoursTaught: 60 },
      { name: 'Financial Modeling', level: 'Advanced', verified: true, hoursTaught: 38 }
    ],
    skillsLearn: [
      { name: 'Python', targetLevel: 'Intermediate' },
      { name: 'Java', targetLevel: 'Beginner' }
    ]
  }
];

export const initialSwaps = [
  {
    id: 'swap-1',
    peer: mockUsers[0], // Arun
    teachSkill: 'Java',
    learnSkill: 'UI/UX Design',
    matchScore: 97,
    status: 'Scheduled',
    date: '2026-08-27',
    time: '06:00 PM - 07:00 PM',
    mode: 'Online (Google Meet)',
    proposedBy: 'user-vaishnavi',
    createdAt: '2026-08-25T14:30:00Z'
  },
  {
    id: 'swap-2',
    peer: mockUsers[1], // Priya
    teachSkill: 'Public Speaking',
    learnSkill: 'Python',
    matchScore: 92,
    status: 'Pending',
    date: '2026-08-29',
    time: '04:00 PM - 05:00 PM',
    mode: 'Online (SKILLX Live Room)',
    proposedBy: 'user-priya',
    createdAt: '2026-08-24T18:10:00Z'
  },
  {
    id: 'swap-3',
    peer: mockUsers[3], // Ananya
    teachSkill: 'Java',
    learnSkill: 'Photography',
    matchScore: 87,
    status: 'Completed',
    date: '2026-08-21',
    time: '05:00 PM - 06:30 PM',
    mode: 'Offline Campus Library',
    proposedBy: 'user-vaishnavi',
    ratingGiven: 5.0,
    creditsTransacted: 120,
    createdAt: '2026-08-20T10:00:00Z'
  }
];

export const initialTransactions = [
  {
    id: 'tx-1',
    type: 'EARNED',
    amount: 120,
    description: 'Taught Java to Ananya R.',
    date: 'Today, 03:45 PM',
    category: 'Teaching Session',
    counterpart: 'Ananya Roy'
  },
  {
    id: 'tx-2',
    type: 'SPENT',
    amount: 80,
    description: 'Learned UI/UX Fundamentals from Arun K.',
    date: 'Yesterday, 06:00 PM',
    category: 'Learning Session',
    counterpart: 'Arun Kumar'
  },
  {
    id: 'tx-3',
    type: 'EARNED',
    amount: 150,
    description: 'Mentored Python Data Structures group jam',
    date: 'Aug 21, 2026',
    category: 'Peer Mentorship',
    counterpart: 'IIT Madras Group'
  },
  {
    id: 'tx-4',
    type: 'EARNED',
    amount: 50,
    description: 'Weekly Top Contributor Community Bonus',
    date: 'Aug 18, 2026',
    category: 'Platform Bonus',
    counterpart: 'SKILLX Rewards'
  },
  {
    id: 'tx-5',
    type: 'SPENT',
    amount: 100,
    description: 'Booked Figma Prototyping Masterclass',
    date: 'Aug 15, 2026',
    category: 'Special Workshop',
    counterpart: 'Design Guild'
  }
];

export const initialMessages = {
  'user-arun': [
    {
      id: 'm-1',
      senderId: 'user-arun',
      text: 'Hey Vaishnavi! I saw your Java profile. I really want to learn Spring Boot & Object-Oriented design!',
      timestamp: 'Yesterday 5:20 PM'
    },
    {
      id: 'm-2',
      senderId: 'user-vaishnavi',
      text: 'Hi Arun! That works out great because I want to learn Figma prototyping and component auto-layout from you.',
      timestamp: 'Yesterday 5:25 PM'
    },
    {
      id: 'm-3',
      senderId: 'user-arun',
      text: 'Awesome! I accepted the swap request for Thursday at 6 PM. Shall we use the SKILLX Live Room?',
      timestamp: 'Yesterday 5:30 PM'
    },
    {
      id: 'm-4',
      senderId: 'user-vaishnavi',
      text: 'Yes! Perfect. I will prepare code examples for Java classes and collections.',
      timestamp: 'Yesterday 5:32 PM'
    }
  ]
};

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Swap Request Accepted! 🎉',
    message: 'Arun Kumar accepted your Java ↔ UI/UX Skill Swap for Thursday 6:00 PM.',
    time: '2 hours ago',
    read: false,
    type: 'swap'
  },
  {
    id: 'notif-2',
    title: 'Credits Received! ⚡',
    message: 'You earned +120 SkillX Credits for teaching Java to Ananya Roy.',
    time: '5 hours ago',
    read: false,
    type: 'credit'
  },
  {
    id: 'notif-3',
    title: 'New 97% AI Match Discovered',
    message: 'We found Arun Kumar who matches your reciprocal skill goals!',
    time: '1 day ago',
    read: true,
    type: 'match'
  },
  {
    id: 'notif-4',
    title: 'Skill Verified! Badge Unlocked',
    message: 'Your Java skill was verified through community assessment.',
    time: '2 days ago',
    read: true,
    type: 'badge'
  }
];

export const initialCommunityPosts = [
  {
    id: 'post-1',
    author: mockUsers[0],
    title: 'Hosting a weekend UI/UX & Figma design jam for CS students! 🎨',
    content: 'Looking to teach 3 students how to convert wireframes into production React Tailwind components. In return, I want to learn Java Spring Boot basics.',
    likes: 24,
    comments: 8,
    time: '3 hours ago',
    tag: 'Design & Code'
  },
  {
    id: 'post-2',
    author: mockUsers[1],
    title: 'Python for Data Science peer study group opening up! 🐍',
    content: 'We meet every Saturday 5 PM online. Free for all SKILLX members. Looking for someone who can teach Public Speaking or Slide Presentation skills.',
    likes: 38,
    comments: 14,
    time: '6 hours ago',
    tag: 'Peer Jam'
  },
  {
    id: 'post-3',
    author: mockUsers[3],
    title: 'How I earned 500 SkillX Credits in my first month teaching Photography 📷',
    content: 'The secret is breaking down sessions into 45-minute practical tasks with instant peer feedback. Ask me anything about building your Skill Passport!',
    likes: 67,
    comments: 21,
    time: '1 day ago',
    tag: 'Success Story'
  }
];

export const skillCategories = [
  'All',
  'Programming',
  'Design',
  'Business',
  'Languages',
  'Music',
  'Photography',
  'Marketing',
  'Academics',
  'Communication',
  'Creative Skills'
];

export const allSkillOptions = [
  'Java', 'Python', 'React', 'UI/UX Design', 'Figma Prototyping',
  'Digital Marketing', 'Video Editing', 'Photography', 'Public Speaking',
  'Advanced Excel', 'Financial Modeling', 'Data Structures', 'Machine Learning',
  'Node.js', 'Spanish Language', 'Guitar', 'Creative Writing', 'Photoshop'
];
