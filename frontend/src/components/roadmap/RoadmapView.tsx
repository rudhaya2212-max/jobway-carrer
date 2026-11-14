import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Play, 
  FileText, 
  Code2, 
  Sparkles, 
  Clock, 
  Zap, 
  BookOpen 
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { user, currentCareer, toggleMilestone, setActiveTab } = useApp();

  const allMilestones = currentCareer.roadmapStages.flatMap(s => s.milestones);
  const completedCount = allMilestones.filter(m => user.completedMilestones.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / Math.max(1, allMilestones.length)) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              Agent 3: Adaptive Curriculum
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {user.weeklyHours}h/week study pace
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Map className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            Learning Roadmap: {currentCareer.title}
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Paced deliberately across 3 milestone stages from foundations to production delivery
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('sprint')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>7-Day Gap Sprint</span>
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
          >
            Coding Lab
          </button>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Curriculum Completion
          </span>
          <h3 className="text-base font-bold text-neutral-900">
            {completedCount} of {allMilestones.length} Milestones Verified ({progressPercent}%)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Target weekly deliberate practice: {user.weeklyHours} hours
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-neutral-900 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Production</span>
          </div>
        </div>
      </div>

      {/* 3 Stages Accordion / Feed */}
      <div className="space-y-6">
        {currentCareer.roadmapStages.map(stage => (
          <div
            key={stage.stageNumber}
            className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-subtle space-y-4"
          >
            {/* Stage Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                    Stage {stage.stageNumber}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    ~{stage.durationWeeks} Weeks
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {stage.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stage.description}
                </p>
              </div>

              <span className="text-xs text-neutral-500 font-mono self-start sm:self-center">
                {stage.milestones.filter(m => user.completedMilestones.includes(m.id)).length}/{stage.milestones.length} Completed
              </span>
            </div>

            {/* Milestones List */}
            <div className="space-y-3">
              {stage.milestones.map(milestone => {
                const isCompleted = user.completedMilestones.includes(milestone.id);

                return (
                  <div
                    key={milestone.id}
                    className={`rounded-2xl border p-4 transition-all ${
                      isCompleted
                        ? 'bg-neutral-50/60 border-neutral-200'
                        : 'bg-white border-neutral-200/80 hover:border-neutral-300 shadow-subtle'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleMilestone(milestone.id)}
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                            isCompleted
                              ? 'border-neutral-900 bg-neutral-900 text-white'
                              : 'border-neutral-300 bg-white hover:border-neutral-900'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 text-neutral-400" />}
                        </button>

                        <div>
                          <h4 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>
                            {milestone.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                            {milestone.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {milestone.skillsTaught.map(s => (
                              <span
                                key={s}
                                className="text-[10px] font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-neutral-400 shrink-0 font-mono">
                        +100 XP
                      </span>
                    </div>

                    {/* Resources */}
                    {milestone.resources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap gap-2 text-xs">
                        {milestone.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] transition-colors"
                          >
                            {res.type === 'video' && <Play className="h-3 w-3 text-neutral-600" />}
                            {res.type === 'doc' && <FileText className="h-3 w-3 text-neutral-600" />}
                            {res.type === 'project' && <Code2 className="h-3 w-3 text-neutral-600" />}
                            <span>{res.title}</span>
                            <ExternalLink className="h-2.5 w-2.5 text-neutral-400" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
