import { Company } from '../types';

export const COMPANIES_DATA: Company[] = [
  // High Chance Tier
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    logo: '🏢',
    tier: 'High Chance',
    location: 'Bangalore / Mumbai / Remote',
    minReadiness: 45,
    salaryRange: '₹4.5 - 9.0 LPA',
    techStack: ['Java', 'JavaScript', 'React', 'SQL', 'Python', 'AWS'],
    openRoles: ['Systems Engineer', 'Full Stack Developer', 'Cloud Associate'],
    description: 'Global IT services leader hiring massive cohorts for enterprise web development, cloud migration, and client solutions.',
    interviewFocus: ['Core CS Fundamentals (OOP, DBMS)', 'Basic Problem Solving', 'Technical Communication', 'Aptitude & Logical Reasoning'],
    prepTasks: [
      'Master Object-Oriented Principles in Java or C++',
      'Solve 25 Easy LeetCode questions on Arrays and Strings',
      'Review SQL Joins, Group By, and Indexing queries',
      'Prepare project walkthrough with architectural explanations'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys Ltd',
    logo: '🌐',
    tier: 'High Chance',
    location: 'Bangalore / Pune / Hyderabad',
    minReadiness: 50,
    salaryRange: '₹5.0 - 9.5 LPA',
    techStack: ['Python', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    openRoles: ['Specialist Programmer', 'Digital Specialist Engineer', 'Frontend Engineer'],
    description: 'Pioneering technology consulting partner building next-generation digital services and cloud infrastructure.',
    interviewFocus: ['Data Structures (Stacks, Queues, Binary Trees)', 'SQL Query Optimization', 'REST API Architecture'],
    prepTasks: [
      'Practice HackWithInfy algorithmic challenges',
      'Build a full-stack CRUD application with JWT authentication',
      'Understand Git workflows (branching, PRs, merge conflict resolution)'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture Technology',
    logo: '⚡',
    tier: 'High Chance',
    location: 'Chennai / Gurgaon / Pune',
    minReadiness: 50,
    salaryRange: '₹5.5 - 11 LPA',
    techStack: ['JavaScript', 'TypeScript', 'Node.js', 'Cloud Services', 'DevOps'],
    openRoles: ['Associate Software Engineer', 'Application Development Analyst'],
    description: 'Global powerhouse specializing in cloud solutions, enterprise modernizations, and digital transformation.',
    interviewFocus: ['Cloud Fundamentals', 'System Architecture Overview', 'Behavioral Leadership & Team Problem Solving'],
    prepTasks: [
      'Review AWS/GCP foundational services (EC2, S3, IAM, Cloud Run)',
      'Prepare STAR-method answers for behavioral scenarios',
      'Understand Agile sprint lifecycle and Jira workflows'
    ]
  },

  // Within Reach Tier
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '💳',
    tier: 'Within Reach',
    location: 'Bangalore (Hybrid)',
    minReadiness: 65,
    salaryRange: '₹18 - 28 LPA',
    techStack: ['Go', 'Node.js', 'React', 'PostgreSQL', 'Kafka', 'Redis'],
    openRoles: ['Software Development Engineer 1', 'Frontend Platform Engineer'],
    description: 'India’s premier fintech neo-banking and payments infrastructure platform handling billions in daily transactional volume.',
    interviewFocus: ['High-Concurrency Systems', 'Database Locking & ACID Guarantees', 'Idempotent Payment APIs'],
    prepTasks: [
      'Design an idempotent webhook delivery system',
      'Solve medium-tier Tree and Graph traversal problems',
      'Explain Distributed Caching strategies using Redis'
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: '🛵',
    tier: 'Within Reach',
    location: 'Bangalore / Remote',
    minReadiness: 68,
    salaryRange: '₹16 - 26 LPA',
    techStack: ['Java', 'Go', 'React Native', 'AWS', 'Kubernetes'],
    openRoles: ['SDE-1 Mobile', 'SDE-1 Backend', 'Data Analyst'],
    description: 'Hyperlocal commerce and convenience powerhouse operating millions of real-time geospatial logistics deliveries.',
    interviewFocus: ['Low-Level System Design (LLD)', 'Concurrency & Threading', 'Geospatial Indexing Basics (H3/Quadtree)'],
    prepTasks: [
      'Write clean, modular code following SOLID principles',
      'Implement an in-memory Rate Limiter with Sliding Window algorithm',
      'Optimize React Native rendering loops and memory consumption'
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    logo: '🔷',
    tier: 'Within Reach',
    location: 'Bangalore (Remote-First)',
    minReadiness: 72,
    salaryRange: '₹22 - 38 LPA',
    techStack: ['TypeScript', 'React', 'Java', 'Kotlin', 'AWS', 'GraphQL'],
    openRoles: ['Software Engineer (Growth)', 'Frontend Engineer (Jira Core)'],
    description: 'Global maker of work collaboration tools including Jira, Confluence, Trello, and Bitbucket.',
    interviewFocus: ['Code Craftsmanship & Clean Code', 'System Design (Microservices)', 'Collaborative Values Interview'],
    prepTasks: [
      'Practice live pair programming with automated unit testing',
      'Design a collaborative rich-text editor or task board data model',
      'Study Atlassian’s 5 Core Values and give real project examples'
    ]
  },

  // Reach / Ambition Tier
  {
    id: 'google',
    name: 'Google',
    logo: '🔍',
    tier: 'Reach / Ambition',
    location: 'Hyderabad / Bangalore / Mountain View',
    minReadiness: 85,
    salaryRange: '₹35 - 55 LPA ($140k - $210k)',
    techStack: ['C++', 'Python', 'Go', 'TypeScript', 'Angular', 'Kubernetes', 'Spanner'],
    openRoles: ['Software Engineer II', 'Machine Learning Engineer', 'Site Reliability Engineer'],
    description: 'Global tech titan organizing worldwide information with planetary-scale infrastructure, AI search, and cloud computing.',
    interviewFocus: ['Algorithmic Prowess (DP, Graphs, Heaps)', 'Planetary Distributed System Design', 'Googleyness & Ambiguity Handling'],
    prepTasks: [
      'Solve 75+ Hard/Medium LeetCode algorithmic problems with time/space proofs',
      'Master Distributed Systems design (CAP Theorem, Consistent Hashing, MapReduce)',
      'Prepare concrete situations where you handled technical ambiguity'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '🪟',
    tier: 'Reach / Ambition',
    location: 'Hyderabad / Noida / Redmond',
    minReadiness: 82,
    salaryRange: '₹30 - 50 LPA ($130k - $190k)',
    techStack: ['C#', '.NET', 'TypeScript', 'React', 'Azure', 'Python', 'CosmosDB'],
    openRoles: ['Software Engineer (Azure)', 'Full Stack Engineer (Teams)', 'AI Platform Engineer'],
    description: 'Global enterprise software leader driving AI transformation with Azure, OpenAI integration, Windows, and Office 365.',
    interviewFocus: ['Data Structures & Algorithmic Rigor', 'Microservice Design on Azure', 'Production Debugging & Root Cause Analysis'],
    prepTasks: [
      'Implement Trie, Segment Tree, and Topological Sort algorithms',
      'Design high-throughput message streaming systems',
      'Simulate production incidents and trace bottleneck latency'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '📦',
    tier: 'Reach / Ambition',
    location: 'Hyderabad / Bangalore / Seattle',
    minReadiness: 80,
    salaryRange: '₹32 - 48 LPA ($135k - $200k)',
    techStack: ['Java', 'AWS', 'Python', 'React', 'DynamoDB', 'Distributed Systems'],
    openRoles: ['Software Development Engineer I/II', 'DevOps Cloud Engineer'],
    description: 'Earth’s most customer-centric company and world leader in cloud computing via AWS and global logistics e-commerce.',
    interviewFocus: ['16 Leadership Principles (Customer Obsession, Ownership, Deep Dive)', 'Object-Oriented Design (OOD)', 'Scalable System Architecture'],
    prepTasks: [
      'Draft 16 STAR stories mapped directly to Amazon Leadership Principles',
      'Master Object-Oriented Design (e.g. Parking Lot, Elevator System, Amazon Locker)',
      'Design high-traffic cache-backed key-value stores'
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '🎬',
    tier: 'Reach / Ambition',
    location: 'Los Gatos / Remote',
    minReadiness: 88,
    salaryRange: '₹55 - 90 LPA ($220k - $380k)',
    techStack: ['Node.js', 'React', 'Java', 'Spring Boot', 'Kafka', 'GraphQL'],
    openRoles: ['Senior Software Engineer - Streaming Platform', 'UI Platform Engineer'],
    description: 'World’s entertainment streaming vanguard known for pioneering microservices, chaos engineering, and high-performance frontend UI.',
    interviewFocus: ['Client-Side Performance & Web Vitals', 'Chaos Engineering & Fault Tolerance', 'Culture of Freedom & Responsibility'],
    prepTasks: [
      'Study Simian Army and circuit breaker architectural patterns',
      'Optimize Web Vitals (sub-50ms interaction latencies, zero layout shifts)',
      'Demonstrate high autonomy, mature judgment, and self-direction'
    ]
  }
];

