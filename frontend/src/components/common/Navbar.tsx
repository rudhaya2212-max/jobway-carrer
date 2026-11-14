import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  Compass, 
  Bot, 
  Flame, 
  Award, 
  Upload, 
  Globe, 
  Map, 
  Building2, 
  Code2, 
  Zap, 
  Briefcase, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    setIsAgentDrawerOpen, 
    setIsOnboardingModalOpen,
    agentEvents
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'careers', label: '12 Career Paths', icon: Globe },
    { id: 'roadmap', label: 'Adaptive Roadmap', icon: Map },
    { id: 'companies', label: 'Company Prep', icon: Building2 },
    { id: 'workspace', label: 'Coding Lab', icon: Code2 },
    { id: 'sprint', label: '7-Day Sprint', icon: Zap },
    { id: 'jobmatch', label: 'Live Job Match', icon: Briefcase },
    { id: 'passport', label: 'Skill Passport', icon: ShieldCheck },
  ];

  const recentEvent = agentEvents[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#070b14]">
                <Compass className="h-5 w-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-sans">
                  JOB<span className="text-cyan-400">WAY</span>
                </span>
                <span className="rounded-md bg-cyan-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-800/60">
                  AI v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
                Personalized Career Acceleration
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-surface-light/60'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* AI Agents Active Pill */}
          <button
            onClick={() => setIsAgentDrawerOpen(true)}
            className="flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/40 px-3 py-1 text-xs font-medium text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all shadow-md shadow-cyan-950/40 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Bot className="h-3.5 w-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold text-white">4 AI Agents</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">Active</span>
          </button>

          {/* Import / Onboarding Button */}
          <button
            onClick={() => setIsOnboardingModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import Resume/GitHub</span>
          </button>

          {/* Gamification Stats */}
          <div className="hidden lg:flex items-center gap-2 bg-surface px-2.5 py-1 rounded-lg border border-surface-border text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-semibold" title="Learning Streak">
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-bounce" />
              <span>{user.streakDays}d</span>
            </div>
            <div className="h-3 w-px bg-slate-700"></div>
            <div className="flex items-center gap-1 text-purple-400 font-semibold" title="Career Experience XP">
              <Award className="h-3.5 w-3.5 text-purple-400" />
              <span>{user.totalPoints} XP</span>
            </div>
          </div>

          {/* User Profile Avatar */}
          <button 
            onClick={() => setActiveTab('passport')}
            className="flex items-center gap-2 rounded-full p-0.5 border border-slate-700 hover:border-cyan-400 transition-all focus:outline-none"
            title={`${user.name} - View Skill Passport`}
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

        </div>
      </div>

      {/* Mobile Second-Tier Navigation Bar */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-surface-border/60 bg-[#090e1c] scrollbar-none">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                isActive
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-3 w-3" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

