import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckSquare, 
  Award, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { agentBus } from '../../services/agentBus';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface AssessmentItem {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skillRewarded: string;
  questions: Question[];
}

const mockAssessments: AssessmentItem[] = [
  {
    id: 'assess-js-react',
    title: 'Modern JavaScript & React Concurrency',
    category: 'Frontend Engineering',
    durationMinutes: 10,
    difficulty: 'Intermediate',
    skillRewarded: 'React',
    questions: [
      {
        id: 1,
        question: 'What is the primary benefit of the React `useCallback` hook?',
        options: [
          'It runs an asynchronous side effect after every DOM paint',
          'It returns a memoized version of a callback that only changes if dependencies change, preventing unnecessary child re-renders',
          'It caches expensive calculation values synchronously during render',
          'It replaces the need for useState in functional components'
        ],
        correctIndex: 1,
        explanation: '`useCallback` caches a function definition between renders, ensuring referential equality when passed to memoized child components.'
      },
      {
        id: 2,
        question: 'In modern JavaScript, what does `Promise.allSettled()` return compared to `Promise.all()`?',
        options: [
          'It immediately rejects as soon as any promise in the array fails',
          'It waits for all promises to either resolve or reject, returning an array of object statuses without short-circuiting',
          'It converts promises to synchronous execution',
          'It runs promises strictly in serial sequence'
        ],
        correctIndex: 1,
        explanation: '`Promise.allSettled()` never rejects early; it collects all outcomes (fulfilled or rejected) for robust error handling.'
      },
      {
        id: 3,
        question: 'Which of the following is true regarding React 18 Concurrent Rendering?',
        options: [
          'It makes all DOM updates synchronous and blocking',
          'It allows React to interrupt, pause, or resume rendering work to keep the browser responsive to user inputs',
          'It deprecates the virtual DOM completely',
          'It requires rewriting class components into Redux actions'
        ],
        correctIndex: 1,
        explanation: 'Concurrent rendering lets React yield execution back to the browser main thread during large component tree reconciliations.'
      }
    ]
  },
  {
    id: 'assess-dsa',
    title: 'Algorithms: Sliding Window & Two Pointers',
    category: 'Computer Science',
    durationMinutes: 12,
    difficulty: 'Intermediate',
    skillRewarded: 'Data Structures',
    questions: [
      {
        id: 1,
        question: 'What is the standard time complexity of finding the maximum sum subarray of fixed size K using a Sliding Window?',
        options: [
          'O(N^2) quadratic time',
          'O(N) linear time',
          'O(N log N) logarithmic time',
          'O(K^2) time'
        ],
        correctIndex: 1,
        explanation: 'A sliding window maintains a running sum by subtracting the outgoing element and adding the incoming element in O(1) per step, totaling O(N).'
      },
      {
        id: 2,
        question: 'When is the Two-Pointer technique suitable for the Two-Sum problem?',
        options: [
          'Only when the input array is strictly unsorted',
          'When the input array is sorted, allowing left and right pointers to converge based on comparison with target',
          'When using a hash table is strictly prohibited by space constraints',
          'Both B and C'
        ],
        correctIndex: 3,
        explanation: 'When sorted, converging pointers achieve O(N) time with O(1) extra auxiliary memory.'
      }
    ]
  },
  {
    id: 'assess-backend-api',
    title: 'Scalable REST & System Architecture',
    category: 'Backend & Systems',
    durationMinutes: 15,
    difficulty: 'Advanced',
    skillRewarded: 'System Design',
    questions: [
      {
        id: 1,
        question: 'What does idempotency mean in the context of HTTP methods?',
        options: [
          'The endpoint responds in under 100 milliseconds',
          'Making multiple identical requests has the same intended effect on server state as making a single request (e.g. GET, PUT, DELETE)',
          'The endpoint requires multi-factor authentication tokens',
          'The payload is encrypted end-to-end with TLS 1.3'
        ],
        correctIndex: 1,
        explanation: 'Idempotent methods guarantee that repeated executions produce identical side effects on the resource.'
      },
      {
        id: 2,
        question: 'In distributed caching, what problem does a "Cache Stampede" (Thundering Herd) describe?',
        options: [
          'When Redis runs out of memory and crashes the host',
          'When a popular cached key expires, and thousands of concurrent requests all hit the underlying database simultaneously',
          'When multiple read replicas get out of sync with the primary',
          'When cache invalidation takes longer than TTL expiration'
        ],
        correctIndex: 1,
        explanation: 'A cache stampede overwhelms database servers when many concurrent queries attempt to recompute the same expired cache entry simultaneously.'
      }
    ]
  }
];

export const AssessmentsView: React.FC = () => {
  const { user, setUser, showToast } = useApp();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedAssessments, setCompletedAssessments] = useState<string[]>([]);

  const handleStart = (assessment: AssessmentItem) => {
    setSelectedAssessment(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    if (!selectedAssessment) return;
    setIsSubmitted(true);

    let correctCount = 0;
    selectedAssessment.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / selectedAssessment.questions.length) * 100);
    const passed = scorePct >= 66;

    if (passed) {
      setCompletedAssessments(prev => [...prev, selectedAssessment.id]);
      
      // Award XP & verify skill
      setUser(prev => {
        const skillName = selectedAssessment.skillRewarded;
        const existingIdx = prev.skills.findIndex(s => s.name.toLowerCase() === skillName.toLowerCase());
        let updatedSkills = [...prev.skills];
        
        if (existingIdx >= 0) {
          updatedSkills[existingIdx] = {
            ...updatedSkills[existingIdx],
            verified: true,
            level: 'Advanced',
            confidence: 96,
            source: 'github' // verified benchmark
          };
        } else {
          updatedSkills.push({
            id: `sk-assess-${Date.now()}`,
            name: skillName,
            category: 'Languages',
            level: 'Intermediate',
            confidence: 90,
            source: 'resume',
            verified: true
          });
        }

        return {
          ...prev,
          totalPoints: prev.totalPoints + 200,
          skills: updatedSkills
        };
      });

      agentBus.addEvent({
        agentName: 'Agent 1: Profile & Skill Analyzer',
        task: 'Assessment Verification Passed',
        activity: `User Alex Rivera passed ${selectedAssessment.title} with ${scorePct}%. Skill "${selectedAssessment.skillRewarded}" verified in Skill Passport.`,
        result: 'success',
        handoffTo: 'Agent 2: Career & Skill Gap Matcher'
      });

      showToast(`Passed with ${scorePct}%! +200 XP awarded & ${selectedAssessment.skillRewarded} verified!`);
    } else {
      agentBus.addEvent({
        agentName: 'Agent 4: Socratic AI Mentor',
        task: 'Assessment Diagnostics Recorded',
        activity: `User achieved ${scorePct}% on ${selectedAssessment.title}. Recommending prerequisite review.`,
        result: 'success',
        handoffTo: 'Agent 3: Adaptive Curriculum Builder'
      });
      showToast(`Score: ${scorePct}%. Review the explanations below and try again!`);
    }
  };

  const handleReset = () => {
    setSelectedAssessment(null);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Active Quiz View
  if (selectedAssessment) {
    const q = selectedAssessment.questions[currentQuestionIndex];
    const totalQ = selectedAssessment.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    let correctCount = 0;
    if (isSubmitted) {
      selectedAssessment.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctIndex) {
          correctCount += 1;
        }
      });
    }
    const scorePct = Math.round((correctCount / totalQ) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
          <button
            onClick={handleReset}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
          >
            ← Back to Assessments
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              {selectedAssessment.category}
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Question {currentQuestionIndex + 1} of {totalQ}
            </span>
          </div>
        </div>

        {/* Title Card */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-card">
          <h2 className="text-lg font-bold text-neutral-950 mb-1">{selectedAssessment.title}</h2>
          <p className="text-xs text-neutral-500">
            Passing this diagnostic benchmark automatically verifies <strong className="text-neutral-800">{selectedAssessment.skillRewarded}</strong> on your Skill Passport (+200 XP).
          </p>
        </div>

        {/* Question Body */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-card space-y-5">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold shrink-0 mt-0.5">
              {currentQuestionIndex + 1}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
              {q.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswers[q.id] === idx;
              const isCorrect = q.correctIndex === idx;
              
              let optionClass = "border-neutral-200/80 hover:bg-neutral-50 text-neutral-800";
              if (isSelected) {
                optionClass = "border-neutral-900 bg-neutral-50 text-neutral-950 font-medium";
              }
              if (isSubmitted) {
                if (isCorrect) {
                  optionClass = "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium";
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-rose-400 bg-rose-50/60 text-rose-950";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(q.id, idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionClass}`}
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                  }`}>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/90 text-xs text-neutral-700 leading-relaxed">
              <strong className="block text-neutral-900 font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-neutral-700" />
                Socratic Explanation:
              </strong>
              {q.explanation}
            </div>
          )}

          {/* Step Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Previous
            </button>

            {currentQuestionIndex < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Next Question
              </button>
            ) : !isSubmitted ? (
              <button
                disabled={answeredCount < totalQ}
                onClick={handleSubmit}
                className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-subtle flex items-center gap-1.5"
              >
                <CheckSquare className="h-3.5 w-3.5" />
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>

        {/* Results Banner */}
        {isSubmitted && (
          <div className={`p-5 rounded-2xl border ${
            scorePct >= 66 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-neutral-100 border-neutral-200 text-neutral-900'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">
                  {scorePct >= 66 ? '🎉 Benchmark Passed!' : 'Benchmark Incomplete'}
                </h4>
                <p className="text-xs mt-0.5">
                  You scored {scorePct}% ({correctCount} / {totalQ} correct). {scorePct >= 66 ? 'Your skill passport has been updated!' : 'Review the concepts and take the micro-drill below.'}
                </p>
              </div>
              <div className="text-right font-mono font-bold text-2xl">
                {scorePct}%
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // List View
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              Agent 1 & Agent 2 Validated
            </span>
            <span className="text-xs text-neutral-400">
              Verified Benchmark Assessments
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-neutral-900 stroke-[1.8]" />
            Skill Assessments & Micro-Drills
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Take grounded diagnostic benchmarks to verify your skills, earn XP, and prove real-world proficiency
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 bg-white border border-neutral-200/80 px-3.5 py-1.5 rounded-full shadow-card">
          <Award className="h-4 w-4 text-amber-500" />
          <span>{completedAssessments.length} / {mockAssessments.length} Completed</span>
        </div>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAssessments.map(item => {
          const isDone = completedAssessments.includes(item.id);
          return (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-card flex flex-col justify-between hover:border-neutral-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    item.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-950 mb-1.5">{item.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  Evaluates {item.skillRewarded} proficiency, error handling, and design tradeoffs through multi-choice scenarios.
                </p>

                <div className="flex items-center gap-4 text-[11px] text-neutral-400 mt-4 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.durationMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    {item.questions.length} questions
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <Award className="h-3 w-3" />
                    +200 XP
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                {isDone ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Passed & Verified
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-400">Not Attempted</span>
                )}

                <button
                  onClick={() => handleStart(item)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
                >
                  <span>{isDone ? 'Retake' : 'Start Assessment'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Remedial Micro-Drill Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-9 w-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-amber-600 fill-amber-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-950">Agent 4: Socratic Remedial Micro-Drills</h4>
            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
              Struggled on a test case in the Coding Lab? Socratic Mentor automatically generates targeted 3-question conceptual drills to reinforce knowledge.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleStart(mockAssessments[0])}
          className="shrink-0 px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors"
        >
          Take Quick Drill
        </button>
      </div>

    </div>
  );
};

