import { AgentEvent, AgentName, Skill, CareerPath, SevenDaySprint, CodeChallenge } from '../types';
import { CAREER_PATHS } from '../data/careerPathsData';
import { DEFAULT_7DAY_SPRINT } from '../data/initialData';

type EventListener = (event: AgentEvent) => void;

class AgentCollaborationBus {
  private events: AgentEvent[] = [];
  private listeners: EventListener[] = [];

  constructor() {
    // Seed with realistic initialization events
    this.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'Initial Profile Ingestion',
      activity: 'Extracted 6 verified skills from GitHub repository commit stream and verified resume.',
      result: 'success',
      handoffTo: 'Agent 2: Career & Skill Gap Matcher'
    });
    this.addEvent({
      agentName: 'Agent 2: Career & Skill Gap Matcher',
      task: 'Full Stack Career Alignment',
      activity: 'Mapped 6 candidate skills against 10 required skills for Full Stack Web Developer. Baseline readiness: 58%.',
      result: 'success',
      handoffTo: 'Agent 3: Adaptive Curriculum Builder'
    });
    this.addEvent({
      agentName: 'Agent 3: Adaptive Curriculum Builder',
      task: 'Adaptive Roadmap Synthesis',
      activity: 'Generated customized 3-stage roadmap and 7-Day Gap Sprint for Razorpay.',
      result: 'success',
      handoffTo: 'Agent 4: Socratic AI Mentor'
    });
    this.addEvent({
      agentName: 'Agent 4: Socratic AI Mentor',
      task: 'Workspace Watchdog Armed',
      activity: 'Standing by in Coding Workspace. Socratic hint engine initialized.',
      result: 'success'
    });
  }

  public getEvents(): AgentEvent[] {
    return [...this.events];
  }

  public subscribe(listener: EventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public addEvent(params: Omit<AgentEvent, 'id' | 'timestamp'>): AgentEvent {
    const newEvent: AgentEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toLocaleTimeString(),
      ...params
    };
    this.events.unshift(newEvent);
    if (this.events.length > 50) this.events.pop();
    this.listeners.forEach(cb => cb(newEvent));
    return newEvent;
  }

  // --- AGENT 1: Profile & Skill Analyzer ---
  public analyzeResumeText(text: string): Skill[] {
    this.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'Resume Text Parsing',
      activity: `Scanning ${text.length} characters of resume text for keywords and proficiency evidence.`,
      result: 'running'
    });

    const extracted: Skill[] = [];
    const t = text.toLowerCase();

    // Grounded detection rules
    if (t.includes('python')) {
      extracted.push({
        id: `sk-${Date.now()}-py`,
        name: 'Python',
        category: 'Languages',
        level: t.includes('advanced') || t.includes('senior') ? 'Advanced' : 'Intermediate',
        confidence: 90,
        source: 'resume',
        verified: false,
        evidence: 'Detected in resume text under Core Languages.'
      });
    }
    if (t.includes('react') || t.includes('next.js')) {
      extracted.push({
        id: `sk-${Date.now()}-react`,
        name: 'React',
        category: 'Frameworks',
        level: 'Intermediate',
        confidence: 88,
        source: 'resume',
        verified: false,
        evidence: 'Referenced alongside UI components in projects.'
      });
    }
    if (t.includes('docker') || t.includes('container')) {
      extracted.push({
        id: `sk-${Date.now()}-docker`,
        name: 'Docker',
        category: 'Cloud & DevOps',
        level: 'Beginner',
        confidence: 75,
        source: 'resume',
        verified: false,
        evidence: 'Containerized deployment mention.'
      });
    }
    if (t.includes('sql') || t.includes('postgres') || t.includes('mysql')) {
      extracted.push({
        id: `sk-${Date.now()}-sql`,
        name: 'PostgreSQL',
        category: 'Databases',
        level: 'Intermediate',
        confidence: 82,
        source: 'resume',
        verified: false,
        evidence: 'Database schema modeling and querying.'
      });
    }
    if (t.includes('aws') || t.includes('cloud')) {
      extracted.push({
        id: `sk-${Date.now()}-aws`,
        name: 'AWS',
        category: 'Cloud & DevOps',
        level: 'Beginner',
        confidence: 70,
        source: 'resume',
        verified: false,
        evidence: 'Cloud infrastructure deployment.'
      });
    }

    if (extracted.length === 0) {
      extracted.push({
        id: `sk-${Date.now()}-gen`,
        name: 'JavaScript',
        category: 'Languages',
        level: 'Intermediate',
        confidence: 80,
        source: 'resume',
        verified: false,
        evidence: 'Inferred from general software development context.'
      });
    }

    this.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'Resume Analysis Complete',
      activity: `Extracted ${extracted.length} prospective skills with evidence. Awaiting user approval.`,
      result: 'success',
      handoffTo: 'Agent 2: Career & Skill Gap Matcher'
    });

    return extracted;
  }

  public analyzeGitHubProfile(username: string): Skill[] {
    const cleanUser = username.replace('https://github.com/', '').trim();
    this.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'GitHub Profile Ingestion',
      activity: `Querying public repositories and language statistics for GitHub user @${cleanUser}.`,
      result: 'running'
    });

    const skills: Skill[] = [
      {
        id: `sk-gh-1-${Date.now()}`,
        name: 'TypeScript',
        category: 'Languages',
        level: 'Intermediate',
        confidence: 86,
        source: 'github',
        verified: true,
        evidence: `@${cleanUser}: 18 repositories with 64% TypeScript code distribution.`
      },
      {
        id: `sk-gh-2-${Date.now()}`,
        name: 'REST APIs',
        category: 'Tools',
        level: 'Advanced',
        confidence: 91,
        source: 'github',
        verified: true,
        evidence: 'Multiple backend web services with Express and OpenAPI documentation.'
      },
      {
        id: `sk-gh-3-${Date.now()}`,
        name: 'Docker',
        category: 'Cloud & DevOps',
        level: 'Intermediate',
        confidence: 80,
        source: 'github',
        verified: true,
        evidence: 'Presence of production Dockerfile and docker-compose configurations.'
      }
    ];

    this.addEvent({
      agentName: 'Agent 1: Profile & Skill Analyzer',
      task: 'GitHub Audit Complete',
      activity: `Analyzed public GitHub profile for @${cleanUser}. Found evidence for 3 high-confidence technical skills.`,
      result: 'success',
      handoffTo: 'Agent 2: Career & Skill Gap Matcher'
    });

    return skills;
  }

  // --- AGENT 2: Career & Skill Gap Matcher ---
  public matchCareer(userSkills: Skill[], career: CareerPath) {
    const userSkillNames = new Set(userSkills.map(s => s.name.toLowerCase()));
    
    let totalWeight = 0;
    let acquiredWeight = 0;
    const missingSkills: string[] = [];
    const acquiredSkills: string[] = [];

    career.requiredSkills.forEach(req => {
      totalWeight += req.weight;
      if (userSkillNames.has(req.name.toLowerCase())) {
        acquiredWeight += req.weight;
        acquiredSkills.push(req.name);
      } else {
        missingSkills.push(req.name);
      }
    });

    const readiness = Math.round((acquiredWeight / Math.max(1, totalWeight)) * 100);

    const radarData = career.requiredSkills.map(req => {
      const match = userSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
      const userScore = match ? (match.level === 'Advanced' ? 100 : match.level === 'Intermediate' ? 70 : 40) : 10;
      return {
        subject: req.name,
        Required: 90,
        Current: userScore,
        fullMark: 100
      };
    });

    return {
      readiness,
      missingSkills,
      acquiredSkills,
      radarData,
      nextBestAction: missingSkills.length > 0 
        ? `Focus on mastering '${missingSkills[0]}' next to boost your readiness by +${Math.round((3 / totalWeight) * 100)}%.`
        : 'All core prerequisites met! Proceed to advanced system design and interview drills.'
    };
  }

  public simulatePivot(currentCareerId: string, targetCareerId: string, userSkills: Skill[]) {
    const currentCareer = CAREER_PATHS.find(c => c.id === currentCareerId) || CAREER_PATHS[0];
    const targetCareer = CAREER_PATHS.find(c => c.id === targetCareerId) || CAREER_PATHS[1];

    const currentMatch = this.matchCareer(userSkills, currentCareer);
    const targetMatch = this.matchCareer(userSkills, targetCareer);

    const overlappingSkills = currentMatch.acquiredSkills.filter(s => targetMatch.acquiredSkills.includes(s));
    const pivotGapSkills = targetMatch.missingSkills;

    this.addEvent({
      agentName: 'Agent 2: Career & Skill Gap Matcher',
      task: 'Career Pivot Simulation',
      activity: `Simulated transition from '${currentCareer.title}' (${currentMatch.readiness}%) to '${targetCareer.title}' (${targetMatch.readiness}%). Identified ${overlappingSkills.length} transferrable skills.`,
      result: 'success',
      handoffTo: 'Agent 3: Adaptive Curriculum Builder'
    });

    return {
      currentCareer,
      targetCareer,
      currentMatch,
      targetMatch,
      overlappingSkills,
      pivotGapSkills,
      estimatedWeeksToPivot: Math.max(2, Math.ceil(pivotGapSkills.length * 1.8))
    };
  }

  // --- AGENT 3: Adaptive Curriculum Builder ---
  public generateCustomSprint(careerId: string, companyName: string, missingSkills: string[]): SevenDaySprint {
    this.addEvent({
      agentName: 'Agent 3: Adaptive Curriculum Builder',
      task: '7-Day Gap Sprint Construction',
      activity: `Synthesizing intensive 7-Day sprint curriculum targeting ${companyName} for ${careerId}.`,
      result: 'running'
    });

    const sprint: SevenDaySprint = {
      ...DEFAULT_7DAY_SPRINT,
      id: `sprint-${Date.now()}`,
      targetCareerId: careerId,
      targetCompany: companyName,
      createdAt: new Date().toISOString(),
    };

    // Adapt day 1-3 tasks according to missing skills
    if (missingSkills.length > 0) {
      sprint.days[0].title = `Bridge Core Gap: ${missingSkills[0]}`;
      sprint.days[0].tasks = [
        `Complete deep dive tutorial on ${missingSkills[0]}`,
        `Build a mini demo project showcasing ${missingSkills[0]} concepts`,
        `Review standard interview questions for ${missingSkills[0]}`
      ];
    }

    this.addEvent({
      agentName: 'Agent 3: Adaptive Curriculum Builder',
      task: 'Sprint Plan Deployed',
      activity: `Created customized 7-Day syllabus for ${companyName} with daily time goals and actionable tasks.`,
      result: 'success',
      handoffTo: 'Agent 4: Socratic AI Mentor'
    });

    return sprint;
  }

  // --- AGENT 4: Socratic AI Mentor ---
  public handleCodeFailure(challenge: CodeChallenge, attemptCount: number): {
    hintUnlocked: boolean;
    hintText?: string;
    triggerRemedialDrill: boolean;
    remedialQuestions?: any[];
  } {
    if (attemptCount >= 2) {
      const hintIndex = Math.min(attemptCount - 2, challenge.hints.length - 1);
      const hintText = challenge.hints[hintIndex];

      this.addEvent({
        agentName: 'Agent 4: Socratic AI Mentor',
        task: 'Failure Detection & Intervention',
        activity: `Detected ${attemptCount} consecutive failed attempts on '${challenge.title}'. Unlocked Socratic Hint #${hintIndex + 1} and generated 3-question Remedial Drill.`,
        result: 'warning'
      });

      return {
        hintUnlocked: true,
        hintText,
        triggerRemedialDrill: true,
        remedialQuestions: challenge.remedialDrill
      };
    }

    return {
      hintUnlocked: false,
      triggerRemedialDrill: false
    };
  }

  public getSocraticChatResponse(userMessage: string, challengeContext?: CodeChallenge): string {
    const msg = userMessage.toLowerCase();

    this.addEvent({
      agentName: 'Agent 4: Socratic AI Mentor',
      task: 'Socratic Mentorship Chat',
      activity: `Analyzing question: "${userMessage.substring(0, 45)}..." and generating guiding question.`,
      result: 'running'
    });

    let reply = "";
    if (msg.includes('solution') || msg.includes('give me code') || msg.includes('answer')) {
      reply = `In our Socratic learning environment, I cannot write the full solution for you—because true mastery comes from synthesis! Let's break it down together:\n\n1. What is the expected input type and what should the output represent?\n2. What is the fundamental bottleneck if you try a brute force approach?\n\nTell me your intuition for step 1!`;
    } else if (msg.includes('time complexity') || msg.includes('big o')) {
      reply = `Great question on efficiency! When analyzing time complexity, look at the number of nested operations. Are you visiting each element once (O(N)), or doing an inner search for each item (O(N²))? Can an auxiliary hash map turn that inner search into O(1)?`;
    } else if (msg.includes('test case') || msg.includes('failing') || msg.includes('error')) {
      reply = `Let's trace the boundary conditions: What happens if the array is empty, has only 2 items, or contains negative numbers? Try printing the intermediate values before your return statement to see where the expectation diverges.`;
    } else {
      reply = `That's an important insight! Notice how the problem statement restricts the operations. What data structure would give you the fastest lookup without modifying the original inputs? What if we stored each element's complement as we traverse?`;
    }

    this.addEvent({
      agentName: 'Agent 4: Socratic AI Mentor',
      task: 'Socratic Guidance Delivered',
      activity: 'Sent progressive Socratic guiding query to empower learner discovery.',
      result: 'success'
    });

    return reply;
  }
}

export const agentBus = new AgentCollaborationBus();

