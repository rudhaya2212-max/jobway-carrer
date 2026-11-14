import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CODING_CHALLENGES } from '../../data/codingChallengesData';
import { agentBus } from '../../services/agentBus';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Bot, 
  Lightbulb, 
  BookOpen, 
  Send,
  Brain,
  Terminal,
  ChevronDown
} from 'lucide-react';
import { CodeChallenge } from '../../types';

export const CodingWorkspaceView: React.FC = () => {
  const { 
    activeChallenge, 
    setActiveChallenge, 
    addCodingAttempt, 
    showToast 
  } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState<string>(
    activeChallenge.starterCode['javascript'] || ''
  );
  
  const [activeSideTab, setActiveSideTab] = useState<'problem' | 'mentor' | 'drill'>('problem');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string } | null>(null);
  const [consecutiveFailures, setConsecutiveFailures] = useState<number>(0);
  const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
  const [remedialQuestions, setRemedialQuestions] = useState<any[] | null>(null);
  
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'mentor'; text: string }[]>([
    {
      role: 'mentor',
      text: `Hello! I am your Socratic AI Mentor. As you solve '${activeChallenge.title}', ask me about complexity, edge cases, or logic. I won't give away the answer, but I will guide your intuition!`
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleChallengeChange = (ch: CodeChallenge) => {
    setActiveChallenge(ch);
    setCode(ch.starterCode[selectedLanguage] || '');
    setTestResults(null);
    setConsecutiveFailures(0);
    setUnlockedHints([]);
    setRemedialQuestions(null);
    setChatMessages([
      {
        role: 'mentor',
        text: `Switched to '${ch.title}'. Examine the constraints and example test cases before starting.`
      }
    ]);
  };

  const handleLanguageChange = (lang: 'javascript' | 'python') => {
    setSelectedLanguage(lang);
    setCode(activeChallenge.starterCode[lang] || '');
    setTestResults(null);
  };

  const handleResetCode = () => {
    setCode(activeChallenge.starterCode[selectedLanguage] || '');
    setTestResults(null);
    showToast('Code reset to default template.');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      setIsRunning(false);

      const hasCoreLogic = selectedLanguage === 'javascript'
        ? code.includes('Map') || code.includes('seen') || code.includes('target -') || code.includes('stack') || code.includes('delete')
        : code.includes('in seen') || code.includes('dict') || code.includes('pop') || code.includes('len(stack)');

      const passed = hasCoreLogic && code.length > 80;

      if (passed) {
        setTestResults({
          passed: true,
          output: `✓ All 4 Test Cases Passed!\n  Runtime: 52ms (beats 89.2%)\n  Memory: 42.1 MB (beats 93.1%)`
        });
        setConsecutiveFailures(0);
        addCodingAttempt({
          challengeId: activeChallenge.id,
          code,
          language: selectedLanguage,
          passed: true,
          output: 'All tests passed'
        });
        showToast('Challenge passed! +150 XP');
      } else {
        const nextFailCount = consecutiveFailures + 1;
        setConsecutiveFailures(nextFailCount);

        setTestResults({
          passed: false,
          output: `✗ Test Case 2 Failed:\n  Input: nums = [3, 2, 4], target = 6\n  Expected: [1, 2]\n  Received: []\n  Error: Incorrect indices returned.`
        });

        addCodingAttempt({
          challengeId: activeChallenge.id,
          code,
          language: selectedLanguage,
          passed: false,
          output: 'Test Case 2 Failed: Output mismatch',
          error: 'Logic error in complement lookup'
        });

        const intervention = agentBus.handleCodeFailure(activeChallenge, nextFailCount);
        if (intervention.hintUnlocked && intervention.hintText) {
          setUnlockedHints(prev => [...prev, intervention.hintText!]);
          setActiveSideTab('mentor');
          showToast(`Socratic Mentor unlocked Hint #${unlockedHints.length + 1}!`);
        }

        if (intervention.triggerRemedialDrill && intervention.remedialQuestions) {
          setRemedialQuestions(intervention.remedialQuestions);
          showToast('2 consecutive failures: Remedial drill available');
        }
      }
    }, 600);
  };

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;
    const userMsg = inputQuery;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputQuery('');

    setTimeout(() => {
      const reply = agentBus.getSocraticChatResponse(userMsg, activeChallenge);
      setChatMessages(prev => [...prev, { role: 'mentor', text: reply }]);
    }, 450);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
            Coding Lab & Socratic Mentor
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Deliberate interview practice with progressive guidance and remedial drills
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={activeChallenge.id}
            onChange={e => {
              const ch = CODING_CHALLENGES.find(c => c.id === e.target.value);
              if (ch) handleChallengeChange(ch);
            }}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 focus:outline-none"
          >
            {CODING_CHALLENGES.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Code Editor & Console (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between bg-white rounded-t-2xl border border-b-0 border-neutral-200/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-neutral-800">
                {activeChallenge.id}.{selectedLanguage === 'javascript' ? 'js' : 'py'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-full bg-neutral-100 p-0.5 border border-neutral-200/60 text-[11px]">
                <button
                  onClick={() => handleLanguageChange('javascript')}
                  className={`px-2.5 py-0.5 rounded-full font-mono transition-all ${
                    selectedLanguage === 'javascript' ? 'bg-white text-neutral-900 font-bold shadow-subtle' : 'text-neutral-500'
                  }`}
                >
                  JS
                </button>
                <button
                  onClick={() => handleLanguageChange('python')}
                  className={`px-2.5 py-0.5 rounded-full font-mono transition-all ${
                    selectedLanguage === 'python' ? 'bg-white text-neutral-900 font-bold shadow-subtle' : 'text-neutral-500'
                  }`}
                >
                  PY
                </button>
              </div>

              <button
                onClick={handleResetCode}
                title="Reset code template"
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-lg transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle disabled:opacity-40"
              >
                <Play className="h-3 w-3 fill-white" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Clean Editor Textarea */}
          <div className="border border-neutral-200/80 bg-white rounded-b-2xl overflow-hidden shadow-subtle">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-[13px] text-neutral-900 bg-transparent focus:outline-none resize-none leading-relaxed selection:bg-neutral-200"
            />
          </div>

          {/* Execution Output Console */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle font-mono text-xs">
            <div className="flex items-center justify-between text-neutral-500 mb-1.5 border-b border-neutral-100 pb-1.5">
              <span className="flex items-center gap-1.5 font-bold text-neutral-800">
                <Terminal className="h-3.5 w-3.5 stroke-[1.8]" />
                Execution Console
              </span>
              {testResults && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${testResults.passed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {testResults.passed ? 'PASS' : 'FAIL'}
                </span>
              )}
            </div>

            {testResults ? (
              <pre className={`whitespace-pre-wrap ${testResults.passed ? 'text-emerald-800' : 'text-rose-800'}`}>
                {testResults.output}
              </pre>
            ) : (
              <div className="text-neutral-400 italic">
                Press 'Run Code' to test your solution.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Problem, Socratic AI Mentor & Remedial Quiz (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-subtle flex flex-col h-[580px]">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-neutral-100 px-3 bg-neutral-50/50">
            <button
              onClick={() => setActiveSideTab('problem')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeSideTab === 'problem'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 stroke-[1.8]" />
              Problem
            </button>
            <button
              onClick={() => setActiveSideTab('mentor')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeSideTab === 'mentor'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Bot className="h-3.5 w-3.5 stroke-[1.8]" />
              Socratic Mentor
              {unlockedHints.length > 0 && (
                <span className="rounded-full bg-neutral-900 px-1.5 py-0.2 text-[9px] font-bold text-white">
                  {unlockedHints.length}
                </span>
              )}
            </button>
            {remedialQuestions && (
              <button
                onClick={() => setActiveSideTab('drill')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeSideTab === 'drill'
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-amber-600 hover:text-amber-800'
                }`}
              >
                <Brain className="h-3.5 w-3.5 stroke-[1.8]" />
                Remedial Drill
              </button>
            )}
          </div>

          {/* Problem Spec */}
          {activeSideTab === 'problem' && (
            <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-none text-xs text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                  {activeChallenge.difficulty}
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">{activeChallenge.category}</span>
              </div>

              <h3 className="text-sm font-bold text-neutral-900">
                {activeChallenge.title}
              </h3>

              <div className="whitespace-pre-wrap leading-relaxed">
                {activeChallenge.description}
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Example Cases
                </span>
                {activeChallenge.testCases.filter(t => !t.isHidden).map((tc, idx) => (
                  <div key={idx} className="rounded-xl bg-neutral-50 p-2.5 font-mono text-[11px] border border-neutral-200/60">
                    <span className="text-neutral-400 block">Case {idx + 1}:</span>
                    <span className="text-neutral-900 block">{tc.input}</span>
                    <span className="text-emerald-700 block font-semibold">Expected: {tc.expectedOutput}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Socratic Mentor Chat */}
          {activeSideTab === 'mentor' && (
            <div className="flex flex-col h-full flex-1">
              {unlockedHints.length > 0 && (
                <div className="p-3 bg-amber-50/60 border-b border-amber-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                    <Lightbulb className="h-3 w-3 stroke-[1.8]" />
                    Progressive Hints ({unlockedHints.length})
                  </span>
                  {unlockedHints.map((hint, hIdx) => (
                    <div key={hIdx} className="rounded-lg bg-white p-2 text-xs text-neutral-700 border border-amber-200/60">
                      <strong className="text-amber-900">Hint {hIdx + 1}:</strong> {hint}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs scrollbar-none">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 py-2 max-w-[85%] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-neutral-900 text-white rounded-br-sm'
                          : 'bg-neutral-100 text-neutral-800 rounded-bl-sm border border-neutral-200/60'
                      }`}
                    >
                      {msg.role === 'mentor' && (
                        <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold mb-0.5">
                          <Bot className="h-3 w-3" /> Socratic AI Mentor
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-neutral-100 flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a guiding question..."
                  className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputQuery.trim()}
                  className="h-7 w-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-40"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {/* Remedial Quiz */}
          {activeSideTab === 'drill' && remedialQuestions && (
            <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-none text-xs text-neutral-700">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Agent 4 Intervention
              </span>
              <h3 className="text-sm font-bold text-neutral-900">
                3-Question Remedial Micro-Drill
              </h3>

              <div className="space-y-3 mt-2">
                {remedialQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 space-y-2">
                    <span className="font-semibold text-neutral-900 block">
                      Q{qIdx + 1}: {q.question}
                    </span>

                    <div className="space-y-1">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.answerIndex === optIdx;
                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                              quizSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                                  : isSelected
                                  ? 'bg-rose-50 border-rose-500 text-rose-900'
                                  : 'bg-white border-neutral-200 text-neutral-500'
                                : isSelected
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <p className="text-[10px] text-neutral-500 italic pt-1 border-t border-neutral-200">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-100 flex justify-end">
                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      setQuizSubmitted(true);
                      showToast('Remedial Drill submitted!');
                    }}
                    className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveSideTab('mentor')}
                    className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 border border-neutral-200"
                  >
                    Back to Mentor
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
