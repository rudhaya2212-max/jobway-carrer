import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANIES_DATA } from '../../data/companiesData';
import { agentBus } from '../../services/agentBus';
import { 
  Building2, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ChevronRight
} from 'lucide-react';
import { Company } from '../../types';

export const CompaniesView: React.FC = () => {
  const { user, currentCareer, setActiveSprint, setActiveTab, showToast } = useApp();
  
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [activeCompanyModal, setActiveCompanyModal] = useState<Company | null>(null);

  const tiers = ['All', 'High Chance', 'Within Reach', 'Reach / Ambition'];

  const filteredCompanies = selectedTier === 'All'
    ? COMPANIES_DATA
    : COMPANIES_DATA.filter(c => c.tier === selectedTier);

  const handleLaunchCompanySprint = (comp: Company) => {
    const missingSkills = comp.techStack.filter(
      skill => !user.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    );

    const newSprint = agentBus.generateCustomSprint(currentCareer.id, comp.name, missingSkills);
    setActiveSprint(newSprint);
    setActiveCompanyModal(null);
    setActiveTab('sprint');
    showToast(`7-Day Gap Sprint launched for ${comp.name}!`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            Target Company Preparation Hub
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Grounded hiring criteria categorized by your readiness for {currentCareer.title}
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTier === tier
                  ? 'bg-neutral-900 text-white shadow-subtle'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Tier Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle text-xs">
          <span className="font-bold text-neutral-900 block mb-1">
            High Chance (40 - 55% Readiness)
          </span>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            High-volume hiring cohorts where current verified baseline skills provide an immediate advantage.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle text-xs">
          <span className="font-bold text-neutral-900 block mb-1">
            Within Reach (60 - 75% Readiness)
          </span>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            Rapidly growing product firms requiring focused 7-Day sprint bridge tasks for system design.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle text-xs">
          <span className="font-bold text-neutral-900 block mb-1">
            Reach / Ambition (80%+ Readiness)
          </span>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            Tier-1 leaders demanding advanced algorithmic proofs, concurrency, and planetary scale design.
          </p>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(comp => {
          const userSkillNames = new Set(user.skills.map(s => s.name.toLowerCase()));
          const matchedSkills = comp.techStack.filter(s => userSkillNames.has(s.toLowerCase()));

          return (
            <div
              key={comp.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-neutral-100 border border-neutral-200">
                      {comp.logo}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900">{comp.name}</h3>
                      <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {comp.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                    {comp.tier}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2">
                  {comp.description}
                </p>

                {/* Tech Stack Match */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Tech Stack ({matchedSkills.length}/{comp.techStack.length} Matched)
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {comp.techStack.map(st => {
                      const isMatched = userSkillNames.has(st.toLowerCase());
                      return (
                        <span
                          key={st}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            isMatched
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                              : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                          }`}
                        >
                          {st}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-neutral-500 pt-2.5 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span>Estimated CTC:</span>
                    <strong className="text-neutral-900 font-mono">{comp.salaryRange.split('(')[0]}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveCompanyModal(comp)}
                  className="text-xs font-semibold text-neutral-700 hover:text-neutral-900"
                >
                  Blueprint
                </button>

                <button
                  onClick={() => handleLaunchCompanySprint(comp)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
                >
                  <Zap className="h-3 w-3 fill-white" />
                  <span>Prepare (Sprint)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint Modal */}
      {activeCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200/80 shadow-dropdown p-6 space-y-4">
            
            <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1.5 rounded-xl bg-neutral-100 border border-neutral-200">
                  {activeCompanyModal.logo}
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {activeCompanyModal.name} Interview Blueprint
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Grounded interview rounds and syllabus for {currentCareer.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCompanyModal(null)}
                className="text-neutral-400 hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Rounds Focus */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-900 block">
                Target Interview Evaluation Focus
              </span>
              <ul className="space-y-1 text-neutral-600">
                {activeCompanyModal.interviewFocus.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-900 block">
                Curated Practice Action Items
              </span>
              <ul className="space-y-1 text-neutral-600">
                {activeCompanyModal.prepTasks.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
              <button
                onClick={() => setActiveCompanyModal(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                Close
              </button>

              <button
                onClick={() => handleLaunchCompanySprint(activeCompanyModal)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
              >
                <Zap className="h-3.5 w-3.5 fill-white" />
                <span>Launch 7-Day Sprint</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
