import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CareerPath, SevenDaySprint, Skill, AgentEvent, CodeChallenge, CodingAttempt } from '../types';
import { INITIAL_USER_PROFILE, DEFAULT_7DAY_SPRINT } from '../data/initialData';
import { CAREER_PATHS } from '../data/careerPathsData';
import { CODING_CHALLENGES } from '../data/codingChallengesData';
import { agentBus } from '../services/agentBus';

export type ActiveTab =
  | 'dashboard'
  | 'careers'
  | 'roadmap'
  | 'companies'
  | 'workspace'
  | 'sprint'
  | 'assessments'
  | 'community'
  | 'jobmatch'
  | 'passport';

export interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  avatarUrl: string;
  careerTag: string;
  timestamp: string;
  content: string;
  projectSnippet?: {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  };
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
}

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Priya Sharma',
    authorHandle: '@priya_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    careerTag: 'Full Stack Web Developer',
    timestamp: '2h ago',
    content: 'Just certified Day 5 of the Razorpay 7-Day Sprint on Job Way! Built an idempotent webhook retry pipeline with exponential backoff. The Socratic AI Mentor guided me through Redis cache eviction without spoiling the logic.',
    projectSnippet: {
      title: 'Fintech Idempotent Webhook Engine',
      description: 'Distributed webhook dispatch with unique event idempotency keys, sliding window rate limiting, and PostgreSQL transactions.',
      techStack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      link: 'https://github.com/priyadev/idempotent-webhooks'
    },
    likesCount: 24,
    repliesCount: 6,
    isLiked: false
  },
  {
    id: 'post-2',
    authorName: 'Rohan Verma',
    authorHandle: '@rohan_ml',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    careerTag: 'AI & Machine Learning Engineer',
    timestamp: '4h ago',
    content: 'Completed the 3-question Remedial Micro-Drill after struggling with Transformer attention masks. The explanation on causal vs bidirectional attention finally clicked. Loving this Socratic approach over regular coding test sites!',
    likesCount: 18,
    repliesCount: 3,
    isLiked: true
  },
  {
    id: 'post-3',
    authorName: 'Ananya Iyer',
    authorHandle: '@ananya_ux',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    careerTag: 'UI/UX & Digital Product Designer',
    timestamp: '7h ago',
    content: 'Exported my verified Skill Passport with 8 evidence-backed competencies to share with Swiggy and CRED recruiters. Clean dual-layer separation between self-reported and verified work is a game changer for freshers.',
    likesCount: 42,
    repliesCount: 9,
    isLiked: false
  }
];

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentCareer: CareerPath;
  setCurrentCareerId: (id: string) => void;
  activeSprint: SevenDaySprint;
  setActiveSprint: React.Dispatch<React.SetStateAction<SevenDaySprint>>;
  isAgentDrawerOpen: boolean;
  setIsAgentDrawerOpen: (open: boolean) => void;
  agentEvents: AgentEvent[];
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  activeChallenge: CodeChallenge;
  setActiveChallenge: (ch: CodeChallenge) => void;
  codingAttempts: CodingAttempt[];
  addCodingAttempt: (attempt: Omit<CodingAttempt, 'id' | 'timestamp'>) => void;
  addSkills: (newSkills: Skill[]) => void;
  toggleMilestone: (milestoneId: string) => void;
  toggleSprintTask: (dayNum: number, taskIdx: number) => void;
  communityPosts: CommunityPost[];
  addCommunityPost: (content: string, projectTitle?: string, techStack?: string[]) => void;
  toggleLikePost: (postId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [currentCareerId, setCurrentCareerIdState] = useState<string>(INITIAL_USER_PROFILE.targetCareerId);
  const [activeSprint, setActiveSprint] = useState<SevenDaySprint>(DEFAULT_7DAY_SPRINT);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState<boolean>(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [agentEvents, setAgentEvents] = useState<AgentEvent[]>(agentBus.getEvents());
  const [activeChallenge, setActiveChallenge] = useState<CodeChallenge>(CODING_CHALLENGES[0]);
  const [codingAttempts, setCodingAttempts] = useState<CodingAttempt[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = agentBus.subscribe(() => {
      setAgentEvents(agentBus.getEvents());
    });
    return unsubscribe;
  }, []);

  const currentCareer = CAREER_PATHS.find(c => c.id === currentCareerId) || CAREER_PATHS[0];

  const setCurrentCareerId = (id: string) => {
    setCurrentCareerIdState(id);
    setUser(prev => ({ ...prev, targetCareerId: id }));

    const newCareer = CAREER_PATHS.find(c => c.id === id);
    if (newCareer) {
      agentBus.addEvent({
        agentName: 'Agent 2: Career & Skill Gap Matcher',
        task: 'Career Goal Calibration',
        activity: `Goal switched to '${newCareer.title}'. Recalculating readiness and gap analysis.`,
        result: 'success',
        handoffTo: 'Agent 3: Adaptive Curriculum Builder'
      });
      showToast(`Selected career: ${newCareer.title}`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addSkills = (newSkills: Skill[]) => {
    setUser(prev => {
      const existingNames = new Set(prev.skills.map(s => s.name.toLowerCase()));
      const filtered = newSkills.filter(s => !existingNames.has(s.name.toLowerCase()));
      const updated = [...prev.skills, ...filtered];
      return {
        ...prev,
        skills: updated,
        totalPoints: prev.totalPoints + (filtered.length * 50)
      };
    });

    agentBus.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'Approved Skills Persisted',
      activity: `Added ${newSkills.length} verified/approved skills to learner profile.`,
      result: 'success',
      handoffTo: 'Agent 2: Career & Skill Gap Matcher'
    });

    showToast(`Added ${newSkills.length} skills to profile`);
  };

  const toggleMilestone = (milestoneId: string) => {
    setUser(prev => {
      const isCompleted = prev.completedMilestones.includes(milestoneId);
      const nextMilestones = isCompleted
        ? prev.completedMilestones.filter(id => id !== milestoneId)
        : [...prev.completedMilestones, milestoneId];

      const pointsDelta = isCompleted ? -100 : 100;

      if (!isCompleted) {
        agentBus.addEvent({
          agentName: 'Agent 3: Adaptive Curriculum Builder',
          task: 'Milestone Certified',
          activity: `Completed milestone '${milestoneId}' (+100 XP)`,
          result: 'success'
        });
        showToast('Milestone completed (+100 XP)');
      }

      return {
        ...prev,
        completedMilestones: nextMilestones,
        totalPoints: Math.max(0, prev.totalPoints + pointsDelta)
      };
    });
  };

  const toggleSprintTask = (dayNum: number, _taskIdx: number) => {
    setActiveSprint(prev => {
      const updatedDays = prev.days.map(d => {
        if (d.day === dayNum) {
          return { ...d, completed: !d.completed };
        }
        return d;
      });
      return { ...prev, days: updatedDays };
    });
    showToast(`Updated progress for Day ${dayNum}`);
  };

  const addCodingAttempt = (attemptData: Omit<CodingAttempt, 'id' | 'timestamp'>) => {
    const newAttempt: CodingAttempt = {
      id: `att-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...attemptData
    };
    setCodingAttempts(prev => [newAttempt, ...prev]);
  };

  const addCommunityPost = (content: string, projectTitle?: string, techStack?: string[]) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorHandle: `@${user.name.toLowerCase().replace(/\s+/g, '_')}`,
      avatarUrl: user.avatarUrl,
      careerTag: currentCareer.title,
      timestamp: 'Just now',
      content,
      projectSnippet: projectTitle ? {
        title: projectTitle,
        description: 'Verified capstone project submission on Job Way platform.',
        techStack: techStack || ['React', 'TypeScript', 'Node.js']
      } : undefined,
      likesCount: 1,
      repliesCount: 0,
      isLiked: true
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    showToast('Posted to community feed');
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        setUser,
        currentCareer,
        setCurrentCareerId,
        activeSprint,
        setActiveSprint,
        isAgentDrawerOpen,
        setIsAgentDrawerOpen,
        agentEvents,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        activeChallenge,
        setActiveChallenge,
        codingAttempts,
        addCodingAttempt,
        addSkills,
        toggleMilestone,
        toggleSprintTask,
        communityPosts,
        addCommunityPost,
        toggleLikePost,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
