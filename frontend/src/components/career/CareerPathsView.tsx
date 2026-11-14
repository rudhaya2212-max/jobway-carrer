import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CAREER_PATHS } from '../../data/careerPathsData';
import { agentBus } from '../../services/agentBus';
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  Compass,
  DollarSign,
  Clock,
  Shuffle,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { CareerPath } from '../../types';

export const CareerPathsView: React.FC = () => {
  const { user, currentCareer, setCurrentCareerId, setActiveTab } = useApp();

  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(currentCareer);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isPivotModalOpen, setIsPivotModalOpen] = useState<boolean>(false);
  const [pivotTargetId, setPivotTargetId] = useState<string>(
    CAREER_PATHS.find(c => c.id !== currentCareer.id)?.id || CAREER_PATHS[1].id
  );

  const categories = ['All', 'Software Engineering', 'Artificial Intelligence', 'Data & Analytics', 'Infrastructure & Operations', 'Security', 'Mobile Engineering', 'Design & Product', 'Emerging Tech', 'Quality Engineering'];

  const filteredCareers = filterCategory === 'All'
    ? CAREER_PATHS
    : CAREER_PATHS.filter(c => c.category === filterCategory);

  const selectedMatch = agentBus.matchCareer(user.skills, selectedCareer);
  const totalMissingHours = selectedMatch.missingSkills.length * 25;
  const weeksToReadiness = Math.ceil(totalMissingHours / Math.max(5, user.weeklyHours));
  const pivotResult = agentBus.simulatePivot(currentCareer.id, pivotTargetId, user.skills);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Globe className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            12 Industry Career Paths
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Calibrated against your {user.skills.length} approved technical skills
          </p>
        </div>

        <button
          onClick={() => setIsPivotModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle self-start sm:self-auto"
        >
          <Shuffle className="h-3.5 w-3.5 stroke-[1.8]" />
          Simulate Career Pivot
        </button>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterCategory === cat
                ? 'bg-neutral-900 text-white shadow-subtle'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 12 Career Path Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCareers.map(path => {
          const match = agentBus.matchCareer(user.skills, path);
          const isCurrentGoal = user.targetCareerId === path.id;

          return (
            <div
              key={path.id}
              onClick={() => setSelectedCareer(path)}
              className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${selectedCareer.id === path.id
                  ? 'border-neutral-900 shadow-card ring-1 ring-neutral-900/10'
                  : 'border-neutral-200/80 hover:border-neutral-300 shadow-subtle'
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/70">
                    {path.category}
                  </span>
                  {isCurrentGoal ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active Goal
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {path.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-sm font-bold text-neutral-900">
                    {path.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {match.readiness}%
                  </span>
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3">
                  {path.description}
                </p>

                <div className="w-full bg-neutral-100 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div
                    className="bg-neutral-900 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${match.readiness}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2.5 border-t border-neutral-100">
                  <span className="font-mono text-neutral-800">
                    {path.averageSalary.split('(')[0]}
                  </span>
                  <span>Demand: {path.demandLevel}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between border-t border-neutral-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCareer(path);
                  }}
                  className="text-xs font-semibold text-neutral-700 hover:text-neutral-900"
                >
                  View Details
                </button>

                {!isCurrentGoal && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentCareerId(path.id);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-semibold text-neutral-900 transition-colors"
                  >
                    <span>Set Goal</span>
                    <ArrowRight className="h-3 w-3 stroke-[1.8]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Career Detailed Panel */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                Detailed Inspection
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {selectedCareer.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-neutral-900">
              {selectedCareer.title}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 max-w-xl">
              {selectedCareer.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {user.targetCareerId !== selectedCareer.id ? (
              <button
                onClick={() => setCurrentCareerId(selectedCareer.id)}
                className="px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
              >
                Set as Primary Goal
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Current Active Target
              </span>
            )}
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
            >
              Open Roadmap
            </button>
          </div>
        </div>

        {/* Detailed Grid: Radar + Skill Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-neutral-50/60 rounded-2xl p-4 border border-neutral-200/80 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-neutral-700 mb-2">
              Skill Alignment Matrix
            </span>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={selectedMatch.radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#E8E7E2" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#737067', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#A3A096', fontSize: 9 }} />
                  <Radar name="Required" dataKey="Required" stroke="#D6D4CC" fill="#F3F2ED" fillOpacity={0.6} />
                  <Radar name="Current" dataKey="Current" stroke="#141412" fill="#242320" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-neutral-900 block mb-2">
                ✓ Acquired Skills ({selectedMatch.acquiredSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMatch.acquiredSkills.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs text-emerald-800 font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-neutral-900 block mb-2">
                Missing Prerequisites ({selectedMatch.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMatch.missingSkills.map(s => (
                  <span
                    key={s}
                    className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs text-neutral-700 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs space-y-1">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <Clock className="h-3.5 w-3.5 text-neutral-700 stroke-[1.8]" />
                <span>Estimated Time to Job-Ready: ~{weeksToReadiness} Weeks ({totalMissingHours} Total Study Hours)</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Assumes your committed {user.weeklyHours} hours/week of deliberate practice, with ~25 focused hours per missing core technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Pivot Simulator Modal */}
      {isPivotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200/80 shadow-dropdown p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Shuffle className="h-4 w-4 stroke-[1.8]" />
                Simulate Career Pivot
              </h3>
              <button
                onClick={() => setIsPivotModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">Current Track</span>
                <span className="text-xs font-bold text-neutral-900 block">{currentCareer.title}</span>
                <span className="text-[11px] font-mono text-neutral-600">Readiness: {pivotResult.currentMatch.readiness}%</span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <label className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">Target Pivot</label>
                <select
                  value={pivotTargetId}
                  onChange={e => setPivotTargetId(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-lg p-1 text-neutral-900 focus:outline-none"
                >
                  {CAREER_PATHS.filter(c => c.id !== currentCareer.id).map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <span className="text-[11px] font-mono text-neutral-600 block mt-1">Readiness: {pivotResult.targetMatch.readiness}%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-bold text-neutral-900 block mb-1">
                  Transferrable / Overlapping Skills ({pivotResult.overlappingSkills.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {pivotResult.overlappingSkills.map(s => (
                    <span key={s} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-neutral-900 block mb-1">
                  Skills Needed to Pivot ({pivotResult.pivotGapSkills.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {pivotResult.pivotGapSkills.map(s => (
                    <span key={s} className="bg-neutral-200/80 text-neutral-800 px-2 py-0.5 rounded-full text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
                Estimated Pivot Duration: ~{pivotResult.estimatedWeeksToPivot} weeks based on {user.weeklyHours}h/week study.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setIsPivotModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCurrentCareerId(pivotTargetId);
                  setIsPivotModalOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                Commit Pivot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
