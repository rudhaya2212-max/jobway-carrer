-- =========================================================
-- JOB WAY AI - Seed Data for 12 Career Paths
-- =========================================================

INSERT INTO career_paths (id, title, slug, category, description, average_salary, demand_level, difficulty, estimated_months) VALUES
('fullstack-dev', 'Full Stack Web Developer', 'fullstack-web-developer', 'Software Engineering', 'Master client-side interfaces and scalable server architectures.', '$115,000 / yr', 'Very High', 'Intermediate', 6),
('frontend-dev', 'Frontend Developer', 'frontend-developer', 'Software Engineering', 'Craft lightning-fast, accessible, and delightful interactive user experiences.', '$105,000 / yr', 'High', 'Beginner Friendly', 5),
('backend-dev', 'Backend Developer', 'backend-developer', 'Software Engineering', 'Architect high-throughput microservices and resilient databases.', '$118,000 / yr', 'Very High', 'Intermediate', 6),
('ai-ml-engineer', 'AI & Machine Learning Engineer', 'ai-machine-learning-engineer', 'Artificial Intelligence', 'Develop intelligent neural architectures and enterprise RAG systems.', '$135,000 / yr', 'Very High', 'Advanced', 7),
('data-science', 'Data Science & Big Data Analytics', 'data-science-analytics', 'Data & Analytics', 'Transform petabytes of raw signals into actionable predictive intelligence.', '$120,000 / yr', 'High', 'Intermediate', 6),
('cloud-devops', 'Cloud & DevOps Engineer', 'cloud-devops-engineer', 'Infrastructure & Operations', 'Automate zero-downtime infrastructure with IaC, CI/CD, and Kubernetes.', '$125,000 / yr', 'Very High', 'Intermediate', 6),
('cybersecurity', 'Cybersecurity Analyst & Ethical Hacker', 'cybersecurity-analyst', 'Security', 'Safeguard enterprise networks, simulate red-team attacks, and hunt threats.', '$118,000 / yr', 'High', 'Intermediate', 6),
('mobile-dev', 'Mobile App Developer (iOS & Android)', 'mobile-app-developer', 'Mobile Engineering', 'Build polished cross-platform applications with offline-first data sync.', '$110,000 / yr', 'High', 'Intermediate', 5),
('uiux-designer', 'UI/UX & Digital Product Designer', 'ui-ux-product-designer', 'Design & Product', 'Transform user research into high-conversion design systems and prototypes.', '$98,000 / yr', 'Moderate', 'Beginner Friendly', 4),
('product-manager', 'Technical Product Manager', 'technical-product-manager', 'Product & Management', 'Bridge business strategy, user empathy, and engineering execution.', '$130,000 / yr', 'High', 'Intermediate', 5),
('blockchain-web3', 'Blockchain & Web3 Architect', 'blockchain-web3-architect', 'Emerging Tech', 'Design secure smart contracts, DeFi protocols, and EVM mechanisms.', '$140,000 / yr', 'Moderate', 'Advanced', 6),
('qa-automation', 'QA Automation & Test Engineer', 'qa-automation-test-engineer', 'Quality Engineering', 'Ensure software reliability through automated testing and CI/CD quality gates.', '$95,000 / yr', 'High', 'Beginner Friendly', 4)
ON CONFLICT (id) DO NOTHING;

