import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  CheckCircle2, 
  Download, 
  Sparkles,
  GitBranch
} from 'lucide-react';

export const SkillPassportView: React.FC = () => {
  const { user, currentCareer, showToast } = useApp();

  const evidenceBackedSkills = user.skills.filter(s => s.verified || s.source === 'github');
  const selfReportedSkills = user.skills.filter(s => !s.verified && s.source !== 'github');

  const handleExportPassport = () => {
    const passportData = {
      applicant: user.name,
      email: user.email,
      targetCareer: currentCareer.title,
      readinessPoints: user.totalPoints,
      verifiedSkills: evidenceBackedSkills,
      selfReportedSkills: selfReportedSkills,
      badges: user.badges,
      certifiedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(passportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JobWay_Skill_Passport_${user.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Skill Passport exported as JSON');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              Verified Candidate Credential
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              ID: {user.id}
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            Verified Skill Passport
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Strict dual-layer distinction separating tamper-proof evidence from self-reported capabilities
          </p>
        </div>

        <button
          onClick={handleExportPassport}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Passport (JSON)</span>
        </button>
      </div>

      {/* Candidate Profile Summary Header Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-14 w-14 rounded-full object-cover border border-neutral-200 shadow-subtle"
          />
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              {user.name}
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Candidate
              </span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {user.education} • Target: <strong className="text-neutral-800">{currentCareer.title}</strong>
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1 text-amber-600">
                <Flame className="h-3.5 w-3.5 fill-amber-500" /> {user.streakDays}d Streak
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-700">
                <Award className="h-3.5 w-3.5" /> {user.totalPoints} XP
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-neutral-100 pt-3 md:pt-0 md:pl-6 text-xs text-neutral-500">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-neutral-400">Evidence-Backed</span>
            <span className="text-lg font-bold text-neutral-900">{evidenceBackedSkills.length} Skills</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-semibold text-neutral-400">Self-Reported</span>
            <span className="text-lg font-bold text-neutral-700">{selfReportedSkills.length} Skills</span>
          </div>
        </div>
      </div>

      {/* Dual Split Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Evidence-Backed */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <h3 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Evidence-Backed Skills ({evidenceBackedSkills.length})
            </h3>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified by Agent 1
            </span>
          </div>

          <div className="space-y-2.5">
            {evidenceBackedSkills.map(skill => (
              <div
                key={skill.id}
                className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 text-xs">{skill.name}</span>
                  <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                    {skill.level} • {skill.confidence}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  <strong>Evidence:</strong> {skill.evidence}
                </p>
                <span className="text-[10px] text-neutral-400 font-mono block">
                  Origin: {skill.source.toUpperCase()} Repository Audit
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Reported */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <h3 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-600" />
              Self-Reported Skills ({selfReportedSkills.length})
            </h3>
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Needs Lab Drill
            </span>
          </div>

          <div className="space-y-2.5">
            {selfReportedSkills.length > 0 ? (
              selfReportedSkills.map(skill => (
                <div
                  key={skill.id}
                  className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-xs">{skill.name}</span>
                    <span className="text-[10px] font-mono font-medium text-neutral-600 bg-white px-2 py-0.2 rounded-full border border-neutral-200">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    <strong>Note:</strong> {skill.evidence || 'Self-reported during onboarding.'}
                  </p>
                  <span className="text-[10px] text-neutral-400 font-mono block">
                    Take an interactive coding assessment in the lab to verify this skill.
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic">All current profile skills have verified evidence.</p>
            )}
          </div>
        </div>

      </div>

      {/* Badges Grid */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-subtle">
        <h3 className="text-xs font-bold text-neutral-900 mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-neutral-700" />
          Verified Badges ({user.badges.filter(b => b.unlockedAt).length} Unlocked)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {user.badges.map(badge => {
            const isUnlocked = !!badge.unlockedAt;
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between ${
                  isUnlocked
                    ? 'bg-neutral-50 border-neutral-200/90 text-neutral-900'
                    : 'bg-neutral-50/40 border-neutral-200/50 text-neutral-400 opacity-60'
                }`}
              >
                <span className="text-xl mb-1">{badge.icon}</span>
                <span className="text-xs font-bold truncate max-w-full">{badge.name}</span>
                <span className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{badge.description}</span>
                {isUnlocked && (
                  <span className="mt-1.5 text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                    Unlocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
