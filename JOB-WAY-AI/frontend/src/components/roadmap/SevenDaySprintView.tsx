import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  Building2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { agentBus } from '../../services/agentBus';

export const SevenDaySprintView: React.FC = () => {
  const { activeSprint, setActiveSprint, toggleSprintTask, currentCareer, user, setActiveTab, showToast } = useApp();

  const completedDays = activeSprint.days.filter(d => d.completed).length;
  const progressPercent = Math.round((completedDays / 7) * 100);

  const handleRegenerateSprint = () => {
    const missing = currentCareer.requiredSkills
      .filter(r => !user.skills.some(s => s.name.toLowerCase() === r.name.toLowerCase()))
      .map(r => r.name);
    
    const freshSprint = agentBus.generateCustomSprint(
      currentCareer.id, 
      activeSprint.targetCompany || 'Razorpay', 
      missing
    );
    setActiveSprint(freshSprint);
    showToast('Sprint plan regenerated with latest skill profile');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              Agent 3: Intensive Acceleration
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Target Company: <strong className="text-neutral-800">{activeSprint.targetCompany || 'Razorpay'}</strong>
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500 fill-amber-500 stroke-[1.8]" />
            7-Day Career & Company Gap Sprint
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Targeted daily deliberate practice curriculum to bridge high-priority missing prerequisites
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRegenerateSprint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Select Target Company</span>
          </button>
        </div>
      </div>

      {/* Execution Status Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
            Sprint Execution Status
          </span>
          <h3 className="text-base font-bold text-neutral-900">
            {completedDays} of 7 Days Certified Complete ({progressPercent}%)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            ~2.5 daily hours. Complete all 7 days to unlock verified certification badge.
          </p>
        </div>

        <div className="w-full sm:w-60 space-y-1.5">
          <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-neutral-900 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>Day 1</span>
            <span>Day 7 Capstone</span>
          </div>
        </div>
      </div>

      {/* 7 Days Feed */}
      <div className="space-y-3.5">
        {activeSprint.days.map(day => (
          <div
            key={day.day}
            className={`rounded-2xl border p-5 transition-all ${
              day.completed
                ? 'bg-neutral-50/60 border-neutral-200'
                : 'bg-white border-neutral-200/80 hover:border-neutral-300 shadow-subtle'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleSprintTask(day.day, 0)}
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                    day.completed
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {day.completed ? <CheckCircle2 className="h-4 w-4" /> : `D${day.day}`}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">
                      Day {day.day}: {day.title}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ~{day.estimatedHours}h
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 mt-0.5">
                    {day.focus}
                  </p>

                  <div className="mt-2.5 space-y-1.5">
                    {day.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <span className={`h-1.5 w-1.5 rounded-full ${day.completed ? 'bg-neutral-400' : 'bg-neutral-900'}`}></span>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <button
                  onClick={() => toggleSprintTask(day.day, 0)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    day.completed
                      ? 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-subtle'
                  }`}
                >
                  {day.completed ? 'Mark Incomplete' : 'Complete Day'}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
