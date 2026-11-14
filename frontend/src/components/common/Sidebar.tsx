import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  Compass, 
  Globe, 
  Map, 
  Building2, 
  Code2, 
  Zap, 
  CheckSquare, 
  MessageSquare, 
  Briefcase, 
  ShieldCheck, 
  Bot, 
  LogOut, 
  Sparkles,
  Flame,
  Award,
  LucideIcon
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    setIsAgentDrawerOpen, 
    setIsOnboardingModalOpen,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: LucideIcon }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'careers', label: '12 Career Paths', icon: Globe },
    { id: 'roadmap', label: 'Adaptive Roadmap', icon: Map },
    { id: 'companies', label: 'Company Prep', icon: Building2 },
    { id: 'workspace', label: 'Coding Lab', icon: Code2 },
    { id: 'sprint', label: '7-Day Gap Sprint', icon: Zap },
    { id: 'assessments', label: 'Assessments', icon: CheckSquare },
    { id: 'community', label: 'Community & Projects', icon: MessageSquare },
    { id: 'jobmatch', label: 'Job Market Matcher', icon: Briefcase },
    { id: 'passport', label: 'Skill Passport', icon: ShieldCheck },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-neutral-200/80 h-screen sticky top-0 z-30 select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-neutral-200/70">
        <button 
          onClick={() => setActiveTab('dashboard')}
          aria-label="Job Way AI Home - Navigate to Dashboard"
          className="flex items-center gap-3 text-left w-full group focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none rounded-xl"
        >
          <div className="h-9 w-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white shadow-subtle group-hover:bg-neutral-800 transition-colors">
            <Compass className="h-5 w-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-neutral-900">
                JOB WAY
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-full border border-neutral-200/70">
                AI
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 -mt-0.5 truncate">
              Career Acceleration
            </p>
          </div>
        </button>
      </div>

      {/* Main Navigation List */}
      <nav aria-label="Main Navigation" className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none ${
                isActive
                  ? 'bg-neutral-900 text-white font-semibold shadow-subtle'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
              }`}
            >
              <Icon className={`h-4 w-4 stroke-[1.8] ${isActive ? 'text-white' : 'text-neutral-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Area: AI Agents Pill & User Account */}
      <div className="p-4 border-t border-neutral-200/70 space-y-3 bg-[#FAF9F6]/60">
        
        {/* Autonomous Agents Status Button */}
        <button
          onClick={() => setIsAgentDrawerOpen(true)}
          aria-label="Open AI Agents Activity Drawer (4 active agents)"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 transition-colors shadow-subtle text-xs focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Bot className="h-3.5 w-3.5 text-neutral-700 stroke-[1.8]" />
            <span className="font-semibold text-neutral-900">4 AI Agents</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Active
          </span>
        </button>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/70">
          <button
            onClick={() => setActiveTab('passport')}
            aria-label={`View ${user.name}'s profile and skill passport`}
            className="flex items-center gap-2.5 text-left truncate flex-1 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none rounded-lg"
          >
            <img
              src={user.avatarUrl}
              alt=""
              aria-hidden="true"
              className="h-7 w-7 rounded-full object-cover border border-neutral-200"
            />
            <div className="truncate">
              <span className="block text-xs font-bold text-neutral-900 truncate">
                {user.name}
              </span>
              <span className="block text-[10px] text-neutral-500 truncate">
                {user.currentRole}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setAuthMode('login');
              setIsAuthModalOpen(true);
            }}
            title="Log in / switch account"
            aria-label="Log in or switch account"
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <LogOut className="h-3.5 w-3.5 stroke-[1.8]" />
          </button>
        </div>

      </div>

    </aside>
  );
};
