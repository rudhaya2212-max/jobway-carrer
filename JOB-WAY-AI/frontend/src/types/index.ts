export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillCategory = 'Languages' | 'Frameworks' | 'Databases' | 'Cloud & DevOps' | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  confidence: number; // 0 - 100
  source: 'manual' | 'resume' | 'github' | 'assessment';
  verified: boolean;
  evidence?: string;
}

export interface CareerSkillRequirement {
  name: string;
  weight: number; // 1 - 5 importance
  category: SkillCategory;
  minLevel: SkillLevel;
}

export interface LearningResource {
  title: string;
  url: string;
  type: 'video' | 'doc' | 'interactive' | 'project';
  duration?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  skillsTaught: string[];
  resources: LearningResource[];
  completed: boolean;
  isPrerequisite?: boolean;
}

export interface RoadmapStage {
  stageNumber: number;
  title: string; // 'Beginner', 'Intermediate', 'Advanced'
  description: string;
  durationWeeks: number;
  milestones: Milestone[];
}

export interface CareerPath {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  category: string;
  description: string;
  averageSalary: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  estimatedMonths: number;
  prerequisites: string[];
  requiredSkills: CareerSkillRequirement[];
  roadmapStages: RoadmapStage[];
  topCompanies: string[];
  typicalRoles: string[];
}

export interface SprintDay {
  day: number;
  title: string;
  focus: string;
  estimatedHours: number;
  tasks: string[];
  completed: boolean;
}

export interface SevenDaySprint {
  id: string;
  targetCareerId: string;
  targetCompany?: string;
  createdAt: string;
  days: SprintDay[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  tier: 'High Chance' | 'Within Reach' | 'Reach / Ambition';
  location: string;
  minReadiness: number;
  salaryRange: string;
  techStack: string[];
  openRoles: string[];
  description: string;
  interviewFocus: string[];
  prepTasks: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  targetCareerId: string;
  currentRole: string;
  education: string;
  weeklyHours: number;
  preferredFormat: 'Project-based' | 'Video Tutorials' | 'Reading & Docs' | 'Interactive Coding';
  skills: Skill[];
  streakDays: number;
  totalPoints: number;
  completedMilestones: string[];
  badges: Badge[];
}

export type AgentName = 
  | 'Agent 1: Profile & Skill Analyzer'
  | 'Agent 2: Career & Skill Gap Matcher'
  | 'Agent 3: Adaptive Curriculum Builder'
  | 'Agent 4: Socratic AI Mentor';

export interface AgentEvent {
  id: string;
  agentName: AgentName;
  task: string;
  activity: string;
  timestamp: string;
  result: 'success' | 'running' | 'pending' | 'warning';
  handoffTo?: AgentName;
  details?: Record<string, any>;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface RemedialQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starterCode: Record<string, string>; // { python: '...', javascript: '...' }
  solutionCode?: string;
  testCases: TestCase[];
  hints: string[];
  remedialDrill: RemedialQuestion[];
}

export interface CodingAttempt {
  id: string;
  challengeId: string;
  code: string;
  language: string;
  passed: boolean;
  output: string;
  timestamp: string;
  error?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchScore: number;
  source: string;
  postedDate: string;
  url: string;
  description: string;
}

