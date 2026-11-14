import React from 'react';
import { useApp } from '../../context/AppContext';
import { agentBus } from '../../services/agentBus';
import {
  Compass,
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  ArrowRight,
  Zap,
  Code2,
  Building2,
  Bot,
  Sparkles,
  Target,
  Briefcase,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { COMPANIES_DATA } from '../../data/companiesData';

export const DashboardView: React.FC = () => {
  const { user, currentCareer, setActiveTab, activeSprint, setIsOnboardingModalOpen } = useApp();

  const matchData = agentBus.matchCareer(user.skills, currentCareer);
  const targetCompanies = COMPANIES_DATA.filter(c => currentCareer.topCompanies.includes(c.name));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">

      {/* Top Greeting & Career Summary Banner */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover border border-neutral-200 shadow-subtle shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/70">
                Active Goal: {currentCareer.title}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                {user.weeklyHours}h/week
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Good morning, {user.name}
            </h1>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl leading-relaxed">
              Agent 2 calculated your career readiness at <strong className="text-neutral-900 font-bold">{matchData.readiness}%</strong>.
              You possess {matchData.acquiredSkills.length} of {currentCareer.requiredSkills.length} core technical requirements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('careers')}
            className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold border border-neutral-200 transition-colors"
          >
            Switch Career
          </button>
          <button
            onClick={() => setActiveTab('sprint')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>7-Day Sprint</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">

        {/* Career Readiness */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] font-semibold">Career Readiness</span>
            <TrendingUp className="h-3.5 w-3.5 stroke-[1.8] text-neutral-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-neutral-900 font-mono">{matchData.readiness}%</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">+8%</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-neutral-900 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${matchData.readiness}%` }}
            ></div>
          </div>
        </div>

        {/* Skill Inventory */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] font-semibold">Skill Inventory</span>
            <Award className="h-3.5 w-3.5 stroke-[1.8] text-neutral-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-neutral-900 font-mono">{matchData.acquiredSkills.length}</span>
            <span className="text-[11px] text-neutral-400">/ {currentCareer.requiredSkills.length} skills</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-2 truncate">
            Missing: {matchData.missingSkills.slice(0, 2).join(', ') || 'None'}
          </p>
        </div>

        {/* Learning Streak */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] font-semibold">Study Streak</span>
            <Flame className="h-3.5 w-3.5 stroke-[1.8] text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-neutral-900 font-mono">{user.streakDays} Days</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-2 truncate">
            Goal: {user.weeklyHours}h/week
          </p>
        </div>

        {/* Experience Points */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] font-semibold">Learner Points</span>
            <Sparkles className="h-3.5 w-3.5 stroke-[1.8] text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-neutral-900 font-mono">{user.totalPoints}</span>
            <span className="text-[11px] text-neutral-400">XP</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-2 truncate">
            {user.completedMilestones.length} Milestones Complete
          </p>
        </div>

      </div>

      {/* Main Grid: Radar Chart & Next Action Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column: Skill Gap Radar (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Skill Alignment Matrix
                </h3>
                <p className="text-xs text-neutral-500">
                  Current proficiency versus industry standards for {currentCareer.title}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <span className="h-2 w-2 rounded-full bg-neutral-300"></span> Required
                </span>
                <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
                  <span className="h-2 w-2 rounded-full bg-neutral-900"></span> Profile
                </span>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={matchData.radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#E8E7E2" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#737067', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#A3A096', fontSize: 9 }} />
                  <Radar name="Required" dataKey="Required" stroke="#D6D4CC" fill="#F3F2ED" fillOpacity={0.6} />
                  <Radar name="Current" dataKey="Current" stroke="#141412" fill="#242320" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Socratic Recommendation Bar */}
          <div className="rounded-xl bg-neutral-50 p-3.5 border border-neutral-200/80 mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0">
                <Bot className="h-4 w-4 stroke-[1.8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                  Agent 2 Next Best Action
                </span>
                <p className="text-xs text-neutral-800">
                  {matchData.nextBestAction}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors shadow-subtle"
            >
              <span>Learn</span>
              <ArrowRight className="h-3 w-3 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Right Column: Active 7-Day Sprint & Quick Launch (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">

          {/* Active Sprint Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 stroke-[1.8] text-amber-500 fill-amber-500" />
                7-Day Gap Sprint: {activeSprint.targetCompany || 'Razorpay'}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                {activeSprint.days.filter(d => d.completed).length}/7 Days
              </span>
            </div>

            <h4 className="text-xs font-bold text-neutral-800">
              {activeSprint.days.find(d => !d.completed)?.title || 'All Sprint Days Completed!'}
            </h4>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
              {activeSprint.days.find(d => !d.completed)?.focus || 'Congratulations on completing this targeted sprint.'}
            </p>

            <button
              onClick={() => setActiveTab('sprint')}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
            >
              <span>Continue Day {activeSprint.days.find(d => !d.completed)?.day || 7} Tasks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Action Tiles */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setActiveTab('workspace')}
              className="p-3.5 rounded-xl bg-white border border-neutral-200/80 text-left hover:border-neutral-300 transition-all shadow-subtle group"
            >
              <Code2 className="h-4 w-4 stroke-[1.8] text-neutral-700 mb-1.5 group-hover:scale-105 transition-transform" />
              <span className="block text-xs font-bold text-neutral-900">Coding Lab</span>
              <span className="block text-[10px] text-neutral-500">Socratic hint mentor</span>
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className="p-3.5 rounded-xl bg-white border border-neutral-200/80 text-left hover:border-neutral-300 transition-all shadow-subtle group"
            >
              <Building2 className="h-4 w-4 stroke-[1.8] text-neutral-700 mb-1.5 group-hover:scale-105 transition-transform" />
              <span className="block text-xs font-bold text-neutral-900">Company Prep</span>
              <span className="block text-[10px] text-neutral-500">Grounded blueprints</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className="p-3.5 rounded-xl bg-white border border-neutral-200/80 text-left hover:border-neutral-300 transition-all shadow-subtle group"
            >
              <BookOpen className="h-4 w-4 stroke-[1.8] text-neutral-700 mb-1.5 group-hover:scale-105 transition-transform" />
              <span className="block text-xs font-bold text-neutral-900">Community</span>
              <span className="block text-[10px] text-neutral-500">Showcase projects</span>
            </button>

            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="p-3.5 rounded-xl bg-white border border-neutral-200/80 text-left hover:border-neutral-300 transition-all shadow-subtle group"
            >
              <Sparkles className="h-4 w-4 stroke-[1.8] text-neutral-700 mb-1.5 group-hover:scale-105 transition-transform" />
              <span className="block text-xs font-bold text-neutral-900">Import Profile</span>
              <span className="block text-[10px] text-neutral-500">Resume / GitHub</span>
            </button>
          </div>

        </div>

      </div>

      {/* Target Companies Preview */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Top Hiring Companies for {currentCareer.title}
            </h3>
            <p className="text-xs text-neutral-500">
              Categorized into High Chance and Within Reach based on verified readiness
            </p>
          </div>
          <button
            onClick={() => setActiveTab('companies')}
            className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.8]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {targetCompanies.slice(0, 3).map(comp => (
            <div
              key={comp.id}
              className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 flex flex-col justify-between hover:bg-neutral-50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{comp.logo}</span>
                  <span className="text-[10px] font-semibold text-neutral-600 bg-white px-2 py-0.5 rounded-full border border-neutral-200">
                    {comp.tier}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-neutral-900">{comp.name}</h4>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                  {comp.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-200/60 flex items-center justify-between text-[11px]">
                <span className="font-mono text-neutral-700">{comp.salaryRange.split('(')[0]}</span>
                <button
                  onClick={() => setActiveTab('companies')}
                  className="font-semibold text-neutral-900 hover:underline"
                >
                  Prepare →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
