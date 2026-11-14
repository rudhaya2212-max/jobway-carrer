import { CareerPath } from '../types';

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Developer',
    slug: 'fullstack-web-developer',
    iconName: 'Globe',
    category: 'Software Engineering',
    description: 'Master client-side interfaces and scalable server architectures to build complete end-to-end web applications.',
    averageSalary: '$115,000 / yr (₹14 - 24 LPA)',
    demandLevel: 'Very High',
    difficulty: 'Intermediate',
    estimatedMonths: 6,
    prerequisites: ['Basic HTML/CSS', 'Programming Fundamentals'],
    requiredSkills: [
      { name: 'JavaScript', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'TypeScript', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'React', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Node.js', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Express', weight: 4, category: 'Frameworks', minLevel: 'Intermediate' },
      { name: 'PostgreSQL', weight: 4, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'MongoDB', weight: 3, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'REST APIs', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Docker', weight: 3, category: 'Cloud & DevOps', minLevel: 'Beginner' },
      { name: 'Git & GitHub', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
    ],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Stripe', 'Atlassian', 'TCS'],
    typicalRoles: ['Full Stack Engineer', 'MERN Stack Developer', 'Software Engineer II'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Core Frontend & Web Fundamentals',
        description: 'Understand the DOM, modern JavaScript (ES6+), async patterns, and responsive UI design.',
        durationWeeks: 6,
        milestones: [
          {
            id: 'fs-m1',
            title: 'Modern JS, Scope & Async Programming',
            description: 'Master Closures, Event Loop, Promises, and async/await in real-world API consumption.',
            skillsTaught: ['JavaScript', 'HTML5', 'CSS3'],
            completed: false,
            resources: [
              { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org', type: 'doc' },
              { title: 'JavaScript Event Loop Visualized', url: 'https://youtube.com', type: 'video' },
            ]
          },
          {
            id: 'fs-m2',
            title: 'React Fundamentals & Component Architecture',
            description: 'JSX, State Management, useEffect, Custom Hooks, and Tailwind CSS styling.',
            skillsTaught: ['React', 'CSS3'],
            completed: false,
            resources: [
              { title: 'Official React Documentation', url: 'https://react.dev', type: 'doc' },
              { title: 'Build a Reactive Task Board', url: '#', type: 'project' },
            ]
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Backend APIs & Relational Databases',
        description: 'Build robust REST APIs using Node.js/Express, relational database modeling with PostgreSQL, and JWT auth.',
        durationWeeks: 8,
        milestones: [
          {
            id: 'fs-m3',
            title: 'Server-Side Architecture with Node & Express',
            description: 'Routing, middleware pipelines, rate-limiting, error handling, and structured logging.',
            skillsTaught: ['Node.js', 'Express', 'REST APIs'],
            completed: false,
            resources: [
              { title: 'Express Production Best Practices', url: 'https://expressjs.com', type: 'doc' },
              { title: 'E-Commerce Backend API Project', url: '#', type: 'project' },
            ]
          },
          {
            id: 'fs-m4',
            title: 'Database Schema Design & ORM Query Optimization',
            description: 'PostgreSQL indexing, joins, migrations, transactions, and Prisma/Drizzle ORM.',
            skillsTaught: ['PostgreSQL', 'Databases'],
            completed: false,
            resources: [
              { title: 'PostgreSQL Tutorial & Indexing', url: 'https://postgresqltutorial.com', type: 'doc' },
            ]
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Full Stack Integration, Containerization & CI/CD',
        description: 'Deploy full stack apps with Docker, CI/CD GitHub Actions, Redis caching, and automated testing.',
        durationWeeks: 10,
        milestones: [
          {
            id: 'fs-m5',
            title: 'Containerization & Cloud Deployment',
            description: 'Multi-stage Docker builds, docker-compose, and deploy to AWS / Google Cloud Run.',
            skillsTaught: ['Docker', 'Cloud & DevOps'],
            completed: false,
            resources: [
              { title: 'Docker Handbook', url: 'https://docs.docker.com', type: 'doc' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    iconName: 'Layout',
    category: 'Software Engineering',
    description: 'Craft lightning-fast, accessible, and delightful interactive user experiences on the modern web.',
    averageSalary: '$105,000 / yr (₹10 - 18 LPA)',
    demandLevel: 'High',
    difficulty: 'Beginner Friendly',
    estimatedMonths: 5,
    prerequisites: ['HTML & CSS basics'],
    requiredSkills: [
      { name: 'JavaScript', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'TypeScript', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'React', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Next.js', weight: 4, category: 'Frameworks', minLevel: 'Intermediate' },
      { name: 'Tailwind CSS', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Web Performance & Core Vitals', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'State Management (Redux/Zustand)', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Testing (Jest/Playwright)', weight: 3, category: 'Tools', minLevel: 'Beginner' }
    ],
    topCompanies: ['Netflix', 'Airbnb', 'Uber', 'Spotify', 'Shopify', 'Razorpay'],
    typicalRoles: ['Frontend Engineer', 'UI Developer', 'React Specialist'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Semantic Web & Reactive UI',
        description: 'Deep dive into HTML5 semantics, CSS Grid/Flexbox, and modern component systems.',
        durationWeeks: 5,
        milestones: [
          { id: 'fe-m1', title: 'Deep CSS Grid & Flexbox Mastery', description: 'Fluid responsive designs without layout shifts.', skillsTaught: ['CSS3', 'Tailwind CSS'], resources: [], completed: false },
          { id: 'fe-m2', title: 'React Lifecycle & Hooks', description: 'Functional components, memoization, and custom hooks.', skillsTaught: ['React', 'JavaScript'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Type Safety & State Machines',
        description: 'Add TypeScript generics, Zustand global state, and SSR with Next.js.',
        durationWeeks: 7,
        milestones: [
          { id: 'fe-m3', title: 'TypeScript with React', description: 'Typing props, events, and complex store models.', skillsTaught: ['TypeScript', 'React'], resources: [], completed: false },
          { id: 'fe-m4', title: 'Next.js 14 App Router & SSR', description: 'Server components, streaming, and SEO optimizations.', skillsTaught: ['Next.js'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Web Vitals, Animations & Micro-Frontends',
        description: 'Framer Motion animations, performance audits, and E2E testing with Playwright.',
        durationWeeks: 6,
        milestones: [
          { id: 'fe-m5', title: 'Lighthouse & Core Web Vitals Optimization', description: 'LCP, FID, CLS debugging and code splitting.', skillsTaught: ['Web Performance & Core Vitals'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    slug: 'backend-developer',
    iconName: 'Server',
    category: 'Software Engineering',
    description: 'Architect high-throughput microservices, secure authentication, resilient databases, and scalable distributed systems.',
    averageSalary: '$118,000 / yr (₹14 - 26 LPA)',
    demandLevel: 'Very High',
    difficulty: 'Intermediate',
    estimatedMonths: 6,
    prerequisites: ['Basic Python or Java or Node.js'],
    requiredSkills: [
      { name: 'Python', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'Node.js', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'FastAPI / Express', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'PostgreSQL', weight: 5, category: 'Databases', minLevel: 'Advanced' },
      { name: 'Redis Caching', weight: 4, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'Kafka / RabbitMQ', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'System Design', weight: 5, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Docker & Kubernetes', weight: 4, category: 'Cloud & DevOps', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Amazon', 'Google', 'PayPal', 'Uber', 'Goldman Sachs', 'Cisco'],
    typicalRoles: ['Backend Engineer', 'API Developer', 'Distributed Systems Engineer'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Server Fundamentals & Database Architecture',
        description: 'HTTP protocols, REST API standards, SQL CRUD operations, and transaction management.',
        durationWeeks: 6,
        milestones: [
          { id: 'be-m1', title: 'HTTP/HTTPS, REST & API Design', description: 'Status codes, headers, idempotent methods, and OpenAPI specs.', skillsTaught: ['REST APIs', 'FastAPI / Express'], resources: [], completed: false },
          { id: 'be-m2', title: 'Relational Database Engineering', description: 'ACID compliance, normalization, foreign keys, and indexes.', skillsTaught: ['PostgreSQL'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Caching, Auth & Asynchronous Queues',
        description: 'Redis in-memory caching, JWT with refresh tokens, background jobs with Celery/BullMQ.',
        durationWeeks: 8,
        milestones: [
          { id: 'be-m3', title: 'Distributed Caching with Redis', description: 'Cache-aside pattern, rate limiting, and session stores.', skillsTaught: ['Redis Caching'], resources: [], completed: false },
          { id: 'be-m4', title: 'Message Brokers & Event Driven Architecture', description: 'Kafka/RabbitMQ event streams and asynchronous workers.', skillsTaught: ['Kafka / RabbitMQ'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: High-Scale System Design & Microservices',
        description: 'Load balancing, sharding, consistency models, and fault-tolerant architecture.',
        durationWeeks: 8,
        milestones: [
          { id: 'be-m5', title: 'System Design for 10M+ Users', description: 'Partitioning, CDN edge caching, and replication topologies.', skillsTaught: ['System Design'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    slug: 'ai-machine-learning-engineer',
    iconName: 'Cpu',
    category: 'Artificial Intelligence',
    description: 'Develop intelligent systems, train predictive neural networks, and deploy LLM applications with retrieval-augmented generation.',
    averageSalary: '$135,000 / yr (₹18 - 35 LPA)',
    demandLevel: 'Very High',
    difficulty: 'Advanced',
    estimatedMonths: 7,
    prerequisites: ['Python basics', 'Linear Algebra & Calculus'],
    requiredSkills: [
      { name: 'Python', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'PyTorch', weight: 5, category: 'Frameworks', minLevel: 'Intermediate' },
      { name: 'NumPy & Pandas', weight: 4, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Scikit-Learn', weight: 4, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'LLM & LangChain', weight: 5, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Vector Databases (Pinecone/Chroma)', weight: 4, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'MLOps & Model Serving', weight: 4, category: 'Cloud & DevOps', minLevel: 'Intermediate' }
    ],
    topCompanies: ['OpenAI', 'Google DeepMind', 'NVIDIA', 'Anthropic', 'Microsoft', 'Adobe'],
    typicalRoles: ['AI Engineer', 'Machine Learning Scientist', 'LLM Application Developer'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Mathematical Foundations & Classical ML',
        description: 'Vector calculus, linear algebra, regression, classification, and feature engineering.',
        durationWeeks: 6,
        milestones: [
          { id: 'ai-m1', title: 'Data Manipulation & Exploratory Data Analysis', description: 'Pandas dataframes, vectorized NumPy operations, and Matplotlib.', skillsTaught: ['Python', 'NumPy & Pandas'], resources: [], completed: false },
          { id: 'ai-m2', title: 'Supervised & Unsupervised Machine Learning', description: 'Random Forests, Gradient Boosting, SVM, and clustering algorithms.', skillsTaught: ['Scikit-Learn'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Deep Learning & Neural Architectures',
        description: 'Neural networks, backpropagation, CNNs, RNNs, and Transformers using PyTorch.',
        durationWeeks: 8,
        milestones: [
          { id: 'ai-m3', title: 'Deep Neural Networks with PyTorch', description: 'Tensors, autograd, custom training loops, and loss function tuning.', skillsTaught: ['PyTorch'], resources: [], completed: false },
          { id: 'ai-m4', title: 'Transformer Models & Attention Mechanisms', description: 'BERT, GPT architectures, tokenization, and fine-tuning embeddings.', skillsTaught: ['PyTorch', 'LLM & LangChain'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Generative AI, RAG & MLOps Deployment',
        description: 'Build enterprise RAG pipelines, fine-tune open-weights LLMs, and serve via vLLM/Triton.',
        durationWeeks: 8,
        milestones: [
          { id: 'ai-m5', title: 'Enterprise Retrieval-Augmented Generation (RAG)', description: 'Semantic chunking, hybrid search, rerankers, and vector DBs.', skillsTaught: ['Vector Databases (Pinecone/Chroma)', 'LLM & LangChain'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science & Big Data Analytics',
    slug: 'data-science-analytics',
    iconName: 'BarChart2',
    category: 'Data & Analytics',
    description: 'Transform petabytes of raw signals into actionable predictive intelligence, forecasting models, and executive dashboards.',
    averageSalary: '$120,000 / yr (₹15 - 28 LPA)',
    demandLevel: 'High',
    difficulty: 'Intermediate',
    estimatedMonths: 6,
    prerequisites: ['Basic Statistics', 'Python or SQL familiarity'],
    requiredSkills: [
      { name: 'SQL & Data Warehousing', weight: 5, category: 'Databases', minLevel: 'Advanced' },
      { name: 'Python', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'Pandas & NumPy', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'Tableau / Power BI', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Apache Spark', weight: 4, category: 'Frameworks', minLevel: 'Intermediate' },
      { name: 'Statistical Hypothesis Testing', weight: 4, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Predictive Modeling', weight: 4, category: 'Frameworks', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Target', 'Walmart Labs', 'JPMorgan Chase', 'Fractal Analytics', 'McKinsey', 'Mu Sigma'],
    typicalRoles: ['Data Scientist', 'Business Intelligence Engineer', 'Data Analyst Lead'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: SQL Mastery & Statistical Analysis',
        description: 'Advanced window functions, CTEs, distributions, and A/B test power analysis.',
        durationWeeks: 5,
        milestones: [
          { id: 'ds-m1', title: 'Advanced SQL & Analytical Queries', description: 'Window functions, self-joins, pivots, and BigQuery optimization.', skillsTaught: ['SQL & Data Warehousing'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Predictive Analytics & Storytelling',
        description: 'Time series forecasting, churn prediction, and interactive executive reporting.',
        durationWeeks: 8,
        milestones: [
          { id: 'ds-m2', title: 'Predictive Modeling with Python', description: 'Logistic regression, decision trees, and hyperparameter tuning.', skillsTaught: ['Predictive Modeling', 'Python'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Big Data Distributed Processing',
        description: 'Distributed data processing using PySpark, Databricks, and automated ETL pipelines.',
        durationWeeks: 7,
        milestones: [
          { id: 'ds-m3', title: 'PySpark & Data Lakehouse Architecture', description: 'RDDs, DataFrames, Spark SQL, and Delta Lake.', skillsTaught: ['Apache Spark'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    slug: 'cloud-devops-engineer',
    iconName: 'Cloud',
    category: 'Infrastructure & Operations',
    description: 'Automate zero-downtime infrastructure with Infrastructure as Code, CI/CD pipelines, Kubernetes, and cloud security.',
    averageSalary: '$125,000 / yr (₹15 - 30 LPA)',
    demandLevel: 'Very High',
    difficulty: 'Intermediate',
    estimatedMonths: 6,
    prerequisites: ['Linux command line', 'Basic networking concepts'],
    requiredSkills: [
      { name: 'Linux Administration', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'Docker', weight: 5, category: 'Cloud & DevOps', minLevel: 'Advanced' },
      { name: 'Kubernetes', weight: 5, category: 'Cloud & DevOps', minLevel: 'Intermediate' },
      { name: 'Terraform (IaC)', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'CI/CD (GitHub Actions/GitLab)', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'AWS / GCP / Azure', weight: 5, category: 'Cloud & DevOps', minLevel: 'Advanced' },
      { name: 'Monitoring (Prometheus/Grafana)', weight: 4, category: 'Tools', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Amazon Web Services', 'Red Hat', 'HashiCorp', 'Microsoft', 'Datadog', 'Infosys'],
    typicalRoles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Linux, Networking & Containers',
        description: 'Bash scripting, systemd, SSH security, DNS, subnets, and Docker containers.',
        durationWeeks: 6,
        milestones: [
          { id: 'do-m1', title: 'Linux System Administration & Bash', description: 'File systems, permissions, networking diagnostics, and automated cron jobs.', skillsTaught: ['Linux Administration'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: CI/CD Automation & Terraform',
        description: 'Continuous integration pipelines, automated semantic versioning, and Terraform modules.',
        durationWeeks: 7,
        milestones: [
          { id: 'do-m2', title: 'Infrastructure as Code with Terraform', description: 'State management, remote backends, and cloud provisioning.', skillsTaught: ['Terraform (IaC)', 'AWS / GCP / Azure'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Kubernetes Orchestration & Observability',
        description: 'Deploy resilient clusters with Helm charts, ingress controllers, and Grafana monitoring.',
        durationWeeks: 8,
        milestones: [
          { id: 'do-m3', title: 'Production Kubernetes Administration', description: 'Pods, deployments, statefulsets, HPA, and service meshes.', skillsTaught: ['Kubernetes', 'Monitoring (Prometheus/Grafana)'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst & Ethical Hacker',
    slug: 'cybersecurity-analyst',
    iconName: 'Shield',
    category: 'Security',
    description: 'Safeguard enterprise networks, simulate red-team intrusions, perform threat hunting, and implement zero-trust security postures.',
    averageSalary: '$118,000 / yr (₹13 - 26 LPA)',
    demandLevel: 'High',
    difficulty: 'Intermediate',
    estimatedMonths: 6,
    prerequisites: ['Computer Networking (OSI model, TCP/IP)'],
    requiredSkills: [
      { name: 'Network Security & Wireshark', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Linux & Bash Scripting', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'Penetration Testing (Burp Suite/Metasploit)', weight: 5, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'OWASP Top 10 & AppSec', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'SIEM & SOC Analysis (Splunk)', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Cryptography Fundamentals', weight: 4, category: 'Tools', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Cloudflare', 'Mandiant', 'TCS Cyber'],
    typicalRoles: ['Security Analyst', 'Penetration Tester', 'SOC Engineer'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Security Foundations & Network Traffic Analysis',
        description: 'Deep dive into packet analysis, TCP handshakes, TLS certificates, and port scanning.',
        durationWeeks: 6,
        milestones: [
          { id: 'sec-m1', title: 'Network Protocols & Packet Inspection', description: 'Wireshark filters, ARP poisoning defense, and firewall configuration.', skillsTaught: ['Network Security & Wireshark'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Application Security & Vulnerability Assessment',
        description: 'Audit web applications against SQL injection, XSS, CSRF, and broken access controls.',
        durationWeeks: 8,
        milestones: [
          { id: 'sec-m2', title: 'OWASP Top 10 Exploitation & Remediation', description: 'Burp Suite proxying, payload fuzzing, and secure code review.', skillsTaught: ['OWASP Top 10 & AppSec', 'Penetration Testing (Burp Suite/Metasploit)'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Threat Hunting & Incident Response',
        description: 'SIEM alerting rules, forensic memory analysis, and zero-trust perimeter configuration.',
        durationWeeks: 7,
        milestones: [
          { id: 'sec-m3', title: 'SOC Incident Response & SIEM Log Correlation', description: 'Splunk queries, MITRE ATT&CK mapping, and triage playbooks.', skillsTaught: ['SIEM & SOC Analysis (Splunk)'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer (iOS & Android)',
    slug: 'mobile-app-developer',
    iconName: 'Smartphone',
    category: 'Mobile Engineering',
    description: 'Build polished, native-grade cross-platform and iOS/Android applications with fluid gestures and offline-first data sync.',
    averageSalary: '$110,000 / yr (₹12 - 22 LPA)',
    demandLevel: 'High',
    difficulty: 'Intermediate',
    estimatedMonths: 5,
    prerequisites: ['Basic JavaScript or Swift/Kotlin'],
    requiredSkills: [
      { name: 'React Native / Flutter', weight: 5, category: 'Frameworks', minLevel: 'Advanced' },
      { name: 'TypeScript / Dart', weight: 4, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'Mobile State Management', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Offline Storage (SQLite/WatermelonDB)', weight: 4, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'Push Notifications & Deep Linking', weight: 3, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'App Store & Play Store Deployment', weight: 4, category: 'Tools', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Apple', 'DoorDash', 'Zomato', 'Swiggy', 'Flipkart', 'Snapchat'],
    typicalRoles: ['Mobile Application Engineer', 'React Native Developer', 'iOS/Android Specialist'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Core Mobile UI & Gesture Systems',
        description: 'Component lifecycles, flexbox layout on mobile, touch gestures, and navigation stacks.',
        durationWeeks: 5,
        milestones: [
          { id: 'mob-m1', title: 'React Native Core Architecture', description: 'Views, scroll components, native bridges, and safe area handling.', skillsTaught: ['React Native / Flutter'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Offline-First Architecture & APIs',
        description: 'Persistent local storage, caching layer, camera/location hardware access, and push alerts.',
        durationWeeks: 7,
        milestones: [
          { id: 'mob-m2', title: 'Local Persistence & Sync Queues', description: 'SQLite caching, network reconnection handlers, and biometric auth.', skillsTaught: ['Offline Storage (SQLite/WatermelonDB)'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Native Modules, Performance & Release CI',
        description: 'Fastlane release automation, bridge profiling, and memory leak profiling.',
        durationWeeks: 6,
        milestones: [
          { id: 'mob-m3', title: 'Automated CI/CD for App Stores', description: 'Code signing, Fastlane pipelines, and Play Console releases.', skillsTaught: ['App Store & Play Store Deployment'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'uiux-designer',
    title: 'UI/UX & Digital Product Designer',
    slug: 'ui-ux-product-designer',
    iconName: 'PenTool',
    category: 'Design & Product',
    description: 'Transform user research into accessible, high-conversion visual designs, responsive design systems, and clickable prototypes.',
    averageSalary: '$98,000 / yr (₹10 - 20 LPA)',
    demandLevel: 'Moderate',
    difficulty: 'Beginner Friendly',
    estimatedMonths: 4,
    prerequisites: ['Visual aesthetics & empathy'],
    requiredSkills: [
      { name: 'Figma Mastery', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Design Systems & Tokens', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'User Research & Personas', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Wireframing & Prototyping', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Accessibility (WCAG 2.1)', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'HTML/CSS Basics for Designers', weight: 3, category: 'Languages', minLevel: 'Beginner' }
    ],
    topCompanies: ['Figma', 'Canva', 'Airbnb', 'Notion', 'CRED', 'Swiggy'],
    typicalRoles: ['Product Designer', 'UI/UX Designer', 'Interaction Architect'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: UX Principles & Visual Design Hierarchy',
        description: 'Typography scales, contrast ratios, cognitive psychology, and user empathy maps.',
        durationWeeks: 4,
        milestones: [
          { id: 'ui-m1', title: 'Visual Hierarchy & Auto Layout in Figma', description: 'Components, variants, auto layout, and responsive constraints.', skillsTaught: ['Figma Mastery'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Scalable Design Systems & Usability',
        description: 'Color tokens, typography tokens, component libraries, and usability testing protocols.',
        durationWeeks: 6,
        milestones: [
          { id: 'ui-m2', title: 'Atomic Design Systems in Production', description: 'Building tokenized component systems for engineering handoff.', skillsTaught: ['Design Systems & Tokens', 'Accessibility (WCAG 2.1)'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Micro-Interactions & Usability Testing',
        description: 'Interactive smart animations, user journey mapping, and conversion optimization.',
        durationWeeks: 5,
        milestones: [
          { id: 'ui-m3', title: 'High-Fidelity Prototyping & User Testing', description: 'Interactive variables, conditionals, and moderated research sessions.', skillsTaught: ['Wireframing & Prototyping'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'product-manager',
    title: 'Technical Product Manager',
    slug: 'technical-product-manager',
    iconName: 'Compass',
    category: 'Product & Management',
    description: 'Bridge business goals, user needs, and engineering execution to drive product strategy from concept to market dominance.',
    averageSalary: '$130,000 / yr (₹18 - 32 LPA)',
    demandLevel: 'High',
    difficulty: 'Intermediate',
    estimatedMonths: 5,
    prerequisites: ['Basic software development understanding'],
    requiredSkills: [
      { name: 'Product Strategy & Vision', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'PRD & Feature Specification', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Agile & Scrum Methodologies', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Data-Driven Decision Making (SQL/Mixpanel)', weight: 4, category: 'Databases', minLevel: 'Intermediate' },
      { name: 'Market Research & Competitor Analysis', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Technical Architecture Basics', weight: 3, category: 'Tools', minLevel: 'Intermediate' }
    ],
    topCompanies: ['Google', 'Microsoft', 'Atlassian', 'Uber', 'Amazon', 'MakeMyTrip'],
    typicalRoles: ['Associate Product Manager', 'Technical Product Manager', 'Product Owner'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Problem Discovery & Customer Development',
        description: 'Conduct user interviews, map customer journeys, and prioritize features using RICE/MoSCoW.',
        durationWeeks: 4,
        milestones: [
          { id: 'pm-m1', title: 'Writing Flawless Product Requirement Docs (PRDs)', description: 'User stories, edge cases, success metrics (KPIs), and acceptance criteria.', skillsTaught: ['PRD & Feature Specification'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Product Analytics & Experimentation',
        description: 'Cohort retention analysis, funnel drop-off diagnostics, and statistical A/B testing.',
        durationWeeks: 6,
        milestones: [
          { id: 'pm-m2', title: 'A/B Testing & Funnel Optimization', description: 'Hypothesis framing, sample sizing, and metric trade-off evaluation.', skillsTaught: ['Data-Driven Decision Making (SQL/Mixpanel)'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Go-To-Market (GTM) Strategy & Scaling',
        description: 'Pricing models, competitive positioning, and cross-functional engineering leadership.',
        durationWeeks: 6,
        milestones: [
          { id: 'pm-m3', title: 'Product Launch & Post-Launch Iterations', description: 'Rollout rings, feature flags, feedback loops, and stakeholder alignment.', skillsTaught: ['Product Strategy & Vision'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'blockchain-web3',
    title: 'Blockchain & Web3 Architect',
    slug: 'blockchain-web3-architect',
    iconName: 'Link',
    category: 'Emerging Tech',
    description: 'Design secure smart contracts, decentralized finance protocols, and Web3 infrastructure with gas optimization.',
    averageSalary: '$140,000 / yr (₹20 - 40 LPA)',
    demandLevel: 'Moderate',
    difficulty: 'Advanced',
    estimatedMonths: 6,
    prerequisites: ['Strong programming background (JavaScript or C++/Rust)'],
    requiredSkills: [
      { name: 'Solidity / Rust', weight: 5, category: 'Languages', minLevel: 'Advanced' },
      { name: 'Smart Contract Security Auditing', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Ethers.js / Viem', weight: 4, category: 'Frameworks', minLevel: 'Intermediate' },
      { name: 'Hardhat & Foundry', weight: 5, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'DeFi & Tokenomics Mechanisms', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'Decentralized Storage (IPFS)', weight: 3, category: 'Databases', minLevel: 'Beginner' }
    ],
    topCompanies: ['Consensys', 'Polygon', 'Coinbase', 'Chainlink', 'Binance', 'Uniswap Labs'],
    typicalRoles: ['Smart Contract Engineer', 'Web3 Full Stack Developer', 'Blockchain Security Auditor'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Cryptography & EVM Fundamentals',
        description: 'Hashing, asymmetric cryptography, consensus mechanisms, and EVM opcodes.',
        durationWeeks: 5,
        milestones: [
          { id: 'bc-m1', title: 'Solidity Syntax & ERC Standards', description: 'ERC-20, ERC-721, modifiers, events, and reentrancy prevention.', skillsTaught: ['Solidity / Rust'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Testing & Gas Optimization with Foundry',
        description: 'Fuzz testing, invariant testing, gas benchmarking, and proxy upgrade patterns.',
        durationWeeks: 7,
        milestones: [
          { id: 'bc-m2', title: 'Foundry Framework & Security Testing', description: 'Write unit tests, simulate attacks, and optimize assembly slots.', skillsTaught: ['Hardhat & Foundry', 'Smart Contract Security Auditing'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: DeFi Protocols & Cross-Chain Bridges',
        description: 'Automated Market Makers (AMMs), lending protocols, and oracles.',
        durationWeeks: 7,
        milestones: [
          { id: 'bc-m3', title: 'Building a Decentralized Exchange (DEX)', description: 'Constant product formula, liquidity pools, and flash loan defense.', skillsTaught: ['DeFi & Tokenomics Mechanisms', 'Ethers.js / Viem'], resources: [], completed: false }
        ]
      }
    ]
  },
  {
    id: 'qa-automation',
    title: 'QA Automation & Test Engineer',
    slug: 'qa-automation-test-engineer',
    iconName: 'CheckSquare',
    category: 'Quality Engineering',
    description: 'Ensure software reliability through automated end-to-end testing frameworks, API performance audits, and CI/CD quality gates.',
    averageSalary: '$95,000 / yr (₹9 - 18 LPA)',
    demandLevel: 'High',
    difficulty: 'Beginner Friendly',
    estimatedMonths: 4,
    prerequisites: ['Basic programming in JavaScript or Python'],
    requiredSkills: [
      { name: 'JavaScript / Python', weight: 5, category: 'Languages', minLevel: 'Intermediate' },
      { name: 'Playwright / Cypress', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'API Testing (Postman/REST Assured)', weight: 5, category: 'Tools', minLevel: 'Advanced' },
      { name: 'Load & Performance Testing (k6/JMeter)', weight: 4, category: 'Tools', minLevel: 'Intermediate' },
      { name: 'CI/CD Pipeline Quality Gates', weight: 4, category: 'Cloud & DevOps', minLevel: 'Intermediate' },
      { name: 'Test-Driven Development (TDD)', weight: 4, category: 'Tools', minLevel: 'Intermediate' }
    ],
    topCompanies: ['BrowserStack', 'Postman', 'TCS', 'Wipro', 'Accenture', 'Microsoft'],
    typicalRoles: ['QA Automation Engineer', 'SDET (Software Development Engineer in Test)', 'Test Lead'],
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Beginner: Test Automation Fundamentals & API Testing',
        description: 'Test strategies, defect life cycles, automated REST API verification, and Postman test scripts.',
        durationWeeks: 4,
        milestones: [
          { id: 'qa-m1', title: 'Automated REST API Testing with Postman & Newman', description: 'Assertions, environment variables, authentication headers, and CI runs.', skillsTaught: ['API Testing (Postman/REST Assured)'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Intermediate: Modern E2E UI Testing with Playwright',
        description: 'Page Object Models (POM), parallel test runners, visual regression, and network mocking.',
        durationWeeks: 6,
        milestones: [
          { id: 'qa-m2', title: 'Playwright E2E Framework Architecture', description: 'Cross-browser execution, auto-waiting locators, and headless execution.', skillsTaught: ['Playwright / Cypress', 'JavaScript / Python'], resources: [], completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Advanced: Performance Benchmarking & Shift-Left CI Gates',
        description: 'Load testing with k6, stress testing, and GitHub Actions PR blocker quality gates.',
        durationWeeks: 5,
        milestones: [
          { id: 'qa-m3', title: 'k6 Performance Testing & CI/CD Gating', description: 'Virtual users, thresholds, latency distribution, and automated regression alerts.', skillsTaught: ['Load & Performance Testing (k6/JMeter)', 'CI/CD Pipeline Quality Gates'], resources: [], completed: false }
        ]
      }
    ]
  }
];

