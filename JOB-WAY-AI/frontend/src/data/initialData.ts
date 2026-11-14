import { UserProfile, Badge, SevenDaySprint } from '../types';

export const INITIAL_BADGES: Badge[] = [
  { id: 'first-code', name: 'First Compile', description: 'Executed code successfully in the workspace', icon: '⚡', category: 'Coding', unlockedAt: '2026-11-10T10:00:00Z' },
  { id: 'skill-approved', name: 'Verified Talent', description: 'Reviewed and approved skills with evidence', icon: '🛡️', category: 'Profile', unlockedAt: '2026-11-12T14:30:00Z' },
  { id: 'roadmap-pioneer', name: 'Pathfinder', description: 'Generated a personalized AI learning curriculum', icon: '🗺️', category: 'Learning', unlockedAt: '2026-11-13T09:15:00Z' },
  { id: 'streak-master', name: 'Consistency Champion', description: 'Maintained a 5-day continuous learning streak', icon: '🔥', category: 'Streaks', unlockedAt: '2026-11-14T08:00:00Z' },
  { id: 'socratic-disciple', name: 'Critical Thinker', description: 'Solved a challenge using Socratic progressive hints', icon: '🧠', category: 'Mentorship' },
  { id: 'sprint-finisher', name: 'Sprint Finisher', description: 'Completed all 7 days of a targeted company gap sprint', icon: '🏆', category: 'Career' },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-hackathon-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@jobway.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetCareerId: 'fullstack-dev',
  currentRole: 'Aspiring Software Engineer',
  education: 'B.Tech Computer Science (3rd Year)',
  weeklyHours: 15,
  preferredFormat: 'Interactive Coding',
  streakDays: 5,
  totalPoints: 1240,
  completedMilestones: ['fs-m1'],
  badges: INITIAL_BADGES,
  skills: [
    {
      id: 'sk-1',
      name: 'JavaScript',
      category: 'Languages',
      level: 'Intermediate',
      confidence: 85,
      source: 'github',
      verified: true,
      evidence: 'Extracted from GitHub repo "react-task-board": 12,000+ lines of ES6+ JS.'
    },
    {
      id: 'sk-2',
      name: 'HTML5',
      category: 'Languages',
      level: 'Advanced',
      confidence: 95,
      source: 'resume',
      verified: true,
      evidence: 'Validated through 4 web development projects and semantic SEO audits.'
    },
    {
      id: 'sk-3',
      name: 'CSS3',
      category: 'Languages',
      level: 'Intermediate',
      confidence: 80,
      source: 'resume',
      verified: true,
      evidence: 'Flexbox, CSS Grid layouts, and responsive media queries across portfolio.'
    },
    {
      id: 'sk-4',
      name: 'React',
      category: 'Frameworks',
      level: 'Intermediate',
      confidence: 78,
      source: 'github',
      verified: true,
      evidence: 'GitHub: 3 production repos utilizing React 18, custom hooks, and Tailwind CSS.'
    },
    {
      id: 'sk-5',
      name: 'Node.js',
      category: 'Frameworks',
      level: 'Beginner',
      confidence: 60,
      source: 'manual',
      verified: false,
      evidence: 'Self-reported: built basic Express server with 4 REST endpoints.'
    },
    {
      id: 'sk-6',
      name: 'Git & GitHub',
      category: 'Tools',
      level: 'Intermediate',
      confidence: 82,
      source: 'github',
      verified: true,
      evidence: '42 commits in the past 60 days with feature branch workflows.'
    }
  ]
};

export const DEFAULT_7DAY_SPRINT: SevenDaySprint = {
  id: 'sprint-fs-01',
  targetCareerId: 'fullstack-dev',
  targetCompany: 'Razorpay',
  createdAt: '2026-11-14T06:00:00Z',
  days: [
    {
      day: 1,
      title: 'PostgreSQL Schema & ACID Transactions',
      focus: 'Bridge the database knowledge gap',
      estimatedHours: 2.5,
      tasks: [
        'Study relational modeling: 1-to-many & many-to-many foreign keys',
        'Write raw SQL queries with INNER and LEFT joins',
        'Review database transactions (BEGIN, COMMIT, ROLLBACK) for financial data'
      ],
      completed: true
    },
    {
      day: 2,
      title: 'Indexing & High-Concurrency Query Tuning',
      focus: 'Prepare for fintech performance demands',
      estimatedHours: 2.0,
      tasks: [
        'Understand B-Tree indexes, composite indexes, and EXPLAIN ANALYZE',
        'Benchmark query execution before and after index creation',
        'Read Razorpay engineering blog on handling transaction spikes'
      ],
      completed: true
    },
    {
      day: 3,
      title: 'REST API Security & JWT Refresh Tokens',
      focus: 'Production backend security',
      estimatedHours: 3.0,
      tasks: [
        'Implement HttpOnly cookie storage for secure JWT tokens',
        'Build token refresh rotation mechanism in Express',
        'Implement sliding-window API rate limiting middleware'
      ],
      completed: false
    },
    {
      day: 4,
      title: 'Redis Caching & Cache-Aside Architecture',
      focus: 'Distributed low-latency responses',
      estimatedHours: 2.5,
      tasks: [
        'Set up local Redis container with Docker',
        'Implement cache-aside pattern with TTL cache invalidation',
        'Benchmark endpoint throughput with Apache Benchmark / k6'
      ],
      completed: false
    },
    {
      day: 5,
      title: 'Dockerizing the Full Stack App',
      focus: 'Containerization & reproducible environments',
      estimatedHours: 2.0,
      tasks: [
        'Write multi-stage Dockerfile for React and Node.js',
        'Configure docker-compose.yml with backend, postgres, and redis services',
        'Verify cross-container networking and volume persistence'
      ],
      completed: false
    },
    {
      day: 6,
      title: 'Fintech System Design: Idempotency & Webhooks',
      focus: 'Razorpay specific interview preparation',
      estimatedHours: 3.0,
      tasks: [
        'Design idempotent API request headers with unique idempotency keys',
        'Implement retry backoff with jitter for webhook delivery failures',
        'Review low-level class diagram for a Payment Gateway service'
      ],
      completed: false
    },
    {
      day: 7,
      title: 'Full Mock Interview & Code Certification',
      focus: 'Synthesize all gap sprint learnings',
      estimatedHours: 2.5,
      tasks: [
        'Complete 45-minute timed coding assessment on LRU Cache & Hashing',
        'Participate in Socratic AI Mentor mock system design review',
        'Generate and download updated verified Skill Passport'
      ],
      completed: false
    }
  ]
};

