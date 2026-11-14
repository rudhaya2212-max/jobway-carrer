import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Brain,
  LucideIcon
} from 'lucide-react';
import { AgentName } from '../../types';

export const AgentCollaborationDrawer: React.FC = () => {
  const { isAgentDrawerOpen, setIsAgentDrawerOpen, agentEvents } = useApp();

  if (!isAgentDrawerOpen) return null;

  const agentProfiles: { name: AgentName; role: string; icon: LucideIcon }[] = [
    {
      name: 'Agent 1: Profile & Skill Analyzer',
      role: 'Parses resumes, GitHub profiles, and extracts grounded skill evidence',
      icon: ShieldCheck,
    },
    {
      name: 'Agent 2: Career & Skill Gap Matcher',
      role: 'Calculates explainable readiness %, radar metrics & pivot simulations',
      icon: GitBranch,
    },
    {
      name: 'Agent 3: Adaptive Curriculum Builder',
      role: 'Synthesizes personalized roadmaps & 7-Day Company Gap Sprints',
      icon: Sparkles,
    },
    {
      name: 'Agent 4: Socratic AI Mentor',
      role: 'Progressive hints, failure intervention & remedial concept drills',
      icon: Brain,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/40 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200/80 shadow-dropdown flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800">
                <Bot className="h-4 w-4 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  AI Multi-Agent Collaboration Log
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </h2>
                <p className="text-[11px] text-neutral-400">
                  Shared learner context & event-driven coordination
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAgentDrawerOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 4 Agents Roster Grid */}
          <div className="px-5 py-3 border-b border-neutral-100 bg-[#FAF9F6]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Autonomous Agent Roster (4 Online)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {agentProfiles.map(agent => {
                const Icon = agent.icon;
                return (
                  <div
                    key={agent.name}
                    className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-subtle text-xs"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-neutral-900 mb-0.5">
                      <Icon className="h-3 w-3 text-neutral-700 stroke-[1.8]" />
                      <span className="truncate">{agent.name.split(':')[0]}</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-tight line-clamp-2">
                      {agent.role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Collaboration Event Stream */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-none">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-neutral-700" />
                Live Collaboration Bus ({agentEvents.length} Events)
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                Grounded
              </span>
            </div>

            <div className="space-y-2.5 mt-2">
              {agentEvents.map(evt => (
                <div
                  key={evt.id}
                  className="rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-subtle text-xs space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-neutral-900 flex items-center gap-1">
                      <Bot className="h-3 w-3 text-neutral-600 stroke-[1.8]" />
                      {evt.agentName}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {evt.timestamp}
                    </span>
                  </div>

                  <div className="font-semibold text-neutral-800 text-[11px]">
                    {evt.task}
                  </div>

                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    {evt.activity}
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-neutral-100">
                    <div className="flex items-center gap-1">
                      {evt.result === 'success' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Certified
                        </span>
                      )}
                      {evt.result === 'running' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-700 bg-neutral-100 px-1.5 py-0.2 rounded border border-neutral-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 animate-ping"></span> Active
                        </span>
                      )}
                      {evt.result === 'warning' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          <AlertCircle className="h-2.5 w-2.5" /> Intervened
                        </span>
                      )}
                    </div>

                    {evt.handoffTo && (
                      <div className="flex items-center gap-1 text-[10px] text-neutral-600 font-medium bg-neutral-50 px-2 py-0.5 rounded-full border border-neutral-200">
                        <span>Handoff to</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                        <span className="truncate max-w-[100px]">{evt.handoffTo.split(':')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100 px-6 py-3 bg-[#FAF9F6] flex items-center justify-between text-xs text-neutral-500">
            <span>Event-Driven Collaboration Bus</span>
            <button
              onClick={() => setIsAgentDrawerOpen(false)}
              className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 text-xs font-semibold"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
