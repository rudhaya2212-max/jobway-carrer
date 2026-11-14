import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Upload,
  GitBranch,
  FileText,
  CheckCircle2,
  Plus,
  Sparkles,
  ShieldCheck,
  Clock,
  BookOpen
} from 'lucide-react';
import { agentBus } from '../../services/agentBus';
import { Skill, SkillCategory, SkillLevel } from '../../types';
import { CAREER_PATHS } from '../../data/careerPathsData';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen, addSkills, user, setUser, setCurrentCareerId } = useApp();

  const [activeImportTab, setActiveImportTab] = useState<'resume' | 'github' | 'manual'>('resume');
  const [resumeText, setResumeText] = useState<string>('');
  const [githubInput, setGithubInput] = useState<string>('');

  const [manualSkillName, setManualSkillName] = useState<string>('');
  const [manualCategory, setManualCategory] = useState<SkillCategory>('Languages');
  const [manualLevel, setManualLevel] = useState<SkillLevel>('Intermediate');

  const [candidateSkills, setCandidateSkills] = useState<Skill[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedTargetCareer, setSelectedTargetCareer] = useState<string>(user.targetCareerId);
  const [weeklyHours, setWeeklyHours] = useState<number>(user.weeklyHours);
  const [preferredFormat, setPreferredFormat] = useState<any>(user.preferredFormat);

  if (!isOnboardingModalOpen) return null;

  const handleParseResume = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const skills = agentBus.analyzeResumeText(resumeText);
      setCandidateSkills(skills);
      setIsAnalyzing(false);
    }, 550);
  };

  const handleParseGitHub = () => {
    if (!githubInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const skills = agentBus.analyzeGitHubProfile(githubInput);
      setCandidateSkills(skills);
      setIsAnalyzing(false);
    }, 550);
  };

  const handleAddManualSkill = () => {
    if (!manualSkillName.trim()) return;
    const newSkill: Skill = {
      id: `sk-manual-${Date.now()}`,
      name: manualSkillName.trim(),
      category: manualCategory,
      level: manualLevel,
      confidence: 100,
      source: 'manual',
      verified: true,
      evidence: 'Directly added by learner during onboarding.'
    };
    setCandidateSkills(prev => [...prev, newSkill]);
    setManualSkillName('');
  };

  const toggleCandidateSkill = (id: string) => {
    setCandidateSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleApproveAndSave = () => {
    if (candidateSkills.length > 0) {
      addSkills(candidateSkills);
    }
    setUser(prev => ({
      ...prev,
      targetCareerId: selectedTargetCareer,
      weeklyHours,
      preferredFormat
    }));
    setCurrentCareerId(selectedTargetCareer);
    setIsOnboardingModalOpen(false);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-neutral-200/80 shadow-dropdown overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800">
              <Upload className="h-4 w-4 stroke-[1.8]" />
            </div>
            <div>
              <h2 id="onboarding-modal-title" className="text-sm sm:text-base font-bold text-neutral-900">
                Import Profile & Ingest Skills (Agent 1)
              </h2>
              <p className="text-xs text-neutral-500">
                Review and approve extracted technical skills before committing to profile
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOnboardingModalOpen(false)}
            aria-label="Close dialog"
            className="text-neutral-400 hover:text-neutral-900 p-1 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1 scrollbar-none">

          {/* Source Tabs */}
          <div className="flex rounded-full bg-neutral-100 p-1 border border-neutral-200/60">
            <button
              onClick={() => setActiveImportTab('resume')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${activeImportTab === 'resume'
                  ? 'bg-white text-neutral-900 shadow-subtle'
                  : 'text-neutral-500 hover:text-neutral-800'
                }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume Text</span>
            </button>
            <button
              onClick={() => setActiveImportTab('github')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${activeImportTab === 'github'
                  ? 'bg-white text-neutral-900 shadow-subtle'
                  : 'text-neutral-500 hover:text-neutral-800'
                }`}
            >
              <GitBranch className="h-3.5 w-3.5" />
              <span>GitHub Ingestion</span>
            </button>
            <button
              onClick={() => setActiveImportTab('manual')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${activeImportTab === 'manual'
                  ? 'bg-white text-neutral-900 shadow-subtle'
                  : 'text-neutral-500 hover:text-neutral-800'
                }`}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Manual Entry</span>
            </button>
          </div>

          {/* Resume Tab */}
          {activeImportTab === 'resume' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700">
                Paste Resume Text or Project Summary:
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="e.g. Full Stack Developer skilled in React, JavaScript, Node.js, PostgreSQL, Docker, and REST APIs. Built 3 production projects..."
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/60 p-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white leading-relaxed"
              />
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-neutral-400">
                  Agent 1 will detect languages, frameworks, levels, and evidence.
                </span>
                <button
                  onClick={handleParseResume}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-all shadow-subtle"
                >
                  {isAnalyzing ? 'Extracting...' : 'Extract Skills'}
                </button>
              </div>
            </div>
          )}

          {/* GitHub Tab */}
          {activeImportTab === 'github' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700">
                GitHub Username or Repository URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={githubInput}
                  onChange={e => setGithubInput(e.target.value)}
                  placeholder="e.g. torvalds or https://github.com/facebook/react"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
                <button
                  onClick={handleParseGitHub}
                  disabled={isAnalyzing || !githubInput.trim()}
                  className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-all shadow-subtle"
                >
                  {isAnalyzing ? 'Auditing...' : 'Ingest Profile'}
                </button>
              </div>
            </div>
          )}

          {/* Manual Entry Tab */}
          {activeImportTab === 'manual' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Skill</label>
                <input
                  type="text"
                  value={manualSkillName}
                  onChange={e => setManualSkillName(e.target.value)}
                  placeholder="e.g. Redis, GraphQL"
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Category</label>
                <select
                  value={manualCategory}
                  onChange={e => setManualCategory(e.target.value as SkillCategory)}
                  className="w-full px-2 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
                >
                  <option value="Languages">Languages</option>
                  <option value="Frameworks">Frameworks</option>
                  <option value="Databases">Databases</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Level</label>
                <select
                  value={manualLevel}
                  onChange={e => setManualLevel(e.target.value as SkillLevel)}
                  className="w-full px-2 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="sm:col-span-4 flex justify-end">
                <button
                  onClick={handleAddManualSkill}
                  disabled={!manualSkillName.trim()}
                  className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40"
                >
                  Add Skill
                </button>
              </div>
            </div>
          )}

          {/* Candidate Skills Approval Queue */}
          {candidateSkills.length > 0 && (
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Review & Approve Skills ({candidateSkills.length})
                </span>
                <span className="text-[11px] text-neutral-400">
                  Click 'x' to reject
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {candidateSkills.map(s => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs shadow-subtle"
                  >
                    <span className="font-semibold text-neutral-900">{s.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {s.level}
                    </span>
                    <button
                      onClick={() => toggleCandidateSkill(s.id)}
                      className="text-neutral-400 hover:text-rose-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-100">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Target Career Path
              </label>
              <select
                value={selectedTargetCareer}
                onChange={e => setSelectedTargetCareer(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
              >
                {CAREER_PATHS.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Weekly Study Hours
              </label>
              <select
                value={weeklyHours}
                onChange={e => setWeeklyHours(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
              >
                <option value={5}>5h / week (Light)</option>
                <option value={10}>10h / week (Part-time)</option>
                <option value={15}>15h / week (Standard)</option>
                <option value={25}>25h / week (Intensive)</option>
                <option value={40}>40h / week (Bootcamp)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Preferred Style
              </label>
              <select
                value={preferredFormat}
                onChange={e => setPreferredFormat(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none"
              >
                <option value="Interactive Coding">Interactive Coding Lab</option>
                <option value="Project-based">Practical Projects</option>
                <option value="Video Tutorials">Video Masterclasses</option>
                <option value="Reading & Docs">Official Documentation</option>
              </select>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4 bg-neutral-50/50">
          <span className="text-[11px] text-neutral-400">
            Grounding rule: Unverified claims are never saved to database.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOnboardingModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              onClick={handleApproveAndSave}
              className="px-5 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
            >
              Approve & Update
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
