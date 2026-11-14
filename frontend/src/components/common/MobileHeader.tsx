import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Bot, Upload } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const { 
    setActiveTab, 
    user, 
    setIsAgentDrawerOpen, 
    setIsOnboardingModalOpen 
  } = useApp();

  return (
    <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <button 
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-2 text-left"
      >
        <div className="h-7 w-7 rounded-lg bg-neutral-950 flex items-center justify-center text-white">
          <Compass className="h-4 w-4 stroke-[1.8]" />
        </div>
        <span className="font-bold text-sm tracking-tight text-neutral-900">
          JOB WAY
        </span>
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsAgentDrawerOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <Bot className="h-3 w-3 stroke-[1.8]" />
          <span className="text-[11px] font-semibold">4 Agents</span>
        </button>

        <button
          onClick={() => setIsOnboardingModalOpen(true)}
          title="Import resume / GitHub"
          className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200"
        >
          <Upload className="h-3.5 w-3.5 stroke-[1.8]" />
        </button>

        <button
          onClick={() => setActiveTab('passport')}
          className="rounded-full border border-neutral-200 p-0.5"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-6 w-6 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

