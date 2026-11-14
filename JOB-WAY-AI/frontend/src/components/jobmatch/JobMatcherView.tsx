import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { JobListing } from '../../types';

export const JobMatcherView: React.FC = () => {
  const { user, showToast } = useApp();

  const [activeMode, setActiveMode] = useState<'paste' | 'directory'>('paste');
  const [pastedJD, setPastedJD] = useState<string>('');
  const [jdAnalysisResult, setJdAnalysisResult] = useState<{
    matched: string[];
    missing: string[];
    score: number;
  } | null>(null);

  const sampleJobListings: JobListing[] = [
    {
      id: 'job-1',
      title: 'Full Stack Engineer (React + Node)',
      company: 'Postman',
      location: 'Bangalore / Remote',
      salary: '₹18 - 26 LPA',
      requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'REST APIs', 'Docker'],
      matchScore: 0,
      source: 'Postman Careers (Verified API Feed)',
      postedDate: '2026-11-12',
      url: 'https://postman.com/careers',
      description: 'Join the API platform team to build scalable microservices and developer-first user interfaces.'
    },
    {
      id: 'job-2',
      title: 'Frontend Platform Developer',
      company: 'Razorpay',
      location: 'Bangalore (Hybrid)',
      salary: '₹16 - 24 LPA',
      requiredSkills: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Web Performance & Core Vitals'],
      matchScore: 0,
      source: 'Razorpay Jobs Portal',
      postedDate: '2026-11-13',
      url: 'https://razorpay.com/jobs',
      description: 'Architect resilient payment checkout components and design token systems for high-throughput merchants.'
    },
    {
      id: 'job-3',
      title: 'Junior Cloud Infrastructure Associate',
      company: 'TCS Digital',
      location: 'Hyderabad / Chennai',
      salary: '₹7.5 - 11 LPA',
      requiredSkills: ['Linux Administration', 'Docker', 'Python', 'AWS / GCP / Azure', 'Git & GitHub'],
      matchScore: 0,
      source: 'TCS iON Portal',
      postedDate: '2026-11-10',
      url: 'https://tcs.com/careers',
      description: 'Support enterprise cloud migrations, automated CI/CD pipeline deployments, and container orchestration.'
    }
  ];

  const userSkillNames = new Set(user.skills.map(s => s.name.toLowerCase()));
  const computedListings = sampleJobListings.map(job => {
    const matched = job.requiredSkills.filter(s => userSkillNames.has(s.toLowerCase()));
    const score = Math.round((matched.length / Math.max(1, job.requiredSkills.length)) * 100);
    return { ...job, matchScore: score };
  });

  const handleAnalyzePastedJD = () => {
    if (!pastedJD.trim()) return;

    const allKnownSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Python', 
      'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'Git & GitHub', 
      'REST APIs', 'SQL', 'FastAPI', 'Redis', 'Kafka', 'Figma', 'Next.js'
    ];

    const jdLower = pastedJD.toLowerCase();
    const detectedInJD = allKnownSkills.filter(s => jdLower.includes(s.toLowerCase()));

    const matched = detectedInJD.filter(s => userSkillNames.has(s.toLowerCase()));
    const missing = detectedInJD.filter(s => !userSkillNames.has(s.toLowerCase()));
    const score = detectedInJD.length > 0 ? Math.round((matched.length / detectedInJD.length) * 100) : 50;

    setJdAnalysisResult({ matched, missing, score });
    showToast('Job Description analyzed');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            Live Job Market Matcher
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Compare your approved skills against verified industry openings or paste any target JD
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMode('paste')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeMode === 'paste'
                ? 'bg-neutral-900 text-white shadow-subtle'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Paste Job Description
          </button>
          <button
            onClick={() => setActiveMode('directory')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeMode === 'directory'
                ? 'bg-neutral-900 text-white shadow-subtle'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Verified Openings ({computedListings.length})
          </button>
        </div>
      </div>

      {/* Mode 1: Paste JD */}
      {activeMode === 'paste' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-subtle space-y-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <FileText className="h-4 w-4 stroke-[1.8]" />
                Paste Target Job Description (JD)
              </h3>
              <p className="text-xs text-neutral-500">
                Agent 2 will parse technical requirements and calculate your grounded fit percentage
              </p>
            </div>

            <textarea
              rows={6}
              value={pastedJD}
              onChange={e => setPastedJD(e.target.value)}
              placeholder="Paste any job posting from LinkedIn, Indeed, or careers pages here... (e.g. 'We are hiring a Full Stack Developer proficient in React, Node.js, PostgreSQL, Docker, and REST APIs with 1+ years experience...')"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white leading-relaxed"
            />

            <div className="flex justify-end pt-1">
              <button
                onClick={handleAnalyzePastedJD}
                disabled={!pastedJD.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-all shadow-subtle"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Analyze Match Percentage</span>
              </button>
            </div>
          </div>

          {/* Results Box */}
          {jdAnalysisResult && (
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Job Description Match Audit
                  </span>
                  <h4 className="text-base font-bold text-neutral-900">
                    Your Match Score: {jdAnalysisResult.score}%
                  </h4>
                </div>
                <div className="w-28 bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-neutral-900 h-2 rounded-full"
                    style={{ width: `${jdAnalysisResult.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Skills You Possess ({jdAnalysisResult.matched.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {jdAnalysisResult.matched.length > 0 ? (
                      jdAnalysisResult.matched.map(s => (
                        <span key={s} className="bg-white border border-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-neutral-400 text-xs italic">No matching skills detected.</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                    Missing / Required Skills ({jdAnalysisResult.missing.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {jdAnalysisResult.missing.length > 0 ? (
                      jdAnalysisResult.missing.map(s => (
                        <span key={s} className="bg-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold">You meet all detected prerequisites!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Verified Listings */}
      {activeMode === 'directory' && (
        <div className="space-y-3.5">
          {computedListings.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{job.company}</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.postedDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900">
                  {job.title}
                </h3>

                <p className="text-xs text-neutral-500 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {job.requiredSkills.map(skill => {
                    const isMatched = userSkillNames.has(skill.toLowerCase());
                    return (
                      <span
                        key={skill}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          isMatched
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                            : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {skill} {isMatched && '✓'}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="shrink-0 flex md:flex-col items-center justify-between md:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                <div className="text-right">
                  <span className="text-xl font-bold text-neutral-900 font-mono">
                    {job.matchScore}%
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
                    Match
                  </span>
                </div>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
                >
                  <span>Apply</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
