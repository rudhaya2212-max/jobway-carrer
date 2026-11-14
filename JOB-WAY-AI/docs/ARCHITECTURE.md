# JOB WAY AI – Architecture & Multi-Agent Specifications

## System Architecture

```mermaid
flowchart TD
    subgraph Client [Frontend - React 18 + Vite]
        UI[User Interface & Dashboard]
        Router[8 Active Views]
        Context[AppContext & State Store]
        Editor[Monaco Coding Playground]
        BusUI[AI Agents Collaboration Drawer]
    end

    subgraph Agents [Autonomous Multi-Agent System]
        A1[Agent 1: Profile & Skill Analyzer]
        A2[Agent 2: Career & Skill Gap Matcher]
        A3[Agent 3: Adaptive Curriculum Builder]
        A4[Agent 4: Socratic AI Mentor]
    end

    subgraph Backend [Backend API Service]
        REST[REST API Endpoints]
        Bus[Event-Driven Agent Collaboration Bus]
        DB[(Supabase / SQLite Database)]
    end

    UI --> Context
    Context --> Router
    Editor --> A4
    UI --> BusUI
    
    A1 -->|Verified Skills Evidence| A2
    A2 -->|Readiness % & Skill Gap Matrix| A3
    A3 -->|7-Day Sprint & Roadmap Stages| A4
    A4 -->|Progressive Hints & Remedial Micro-Drills| Context

    Context <--> REST
    REST <--> Bus
    REST <--> DB
```

## The Four Specialized Autonomous Agents

1. **Agent 1 – Profile & Skill Analyzer**:
   - Parses resume text, Markdown, and public GitHub repositories.
   - Extracts programming languages, frameworks, databases, and DevOps tools.
   - Detects skill proficiencies (Beginner, Intermediate, Advanced) and confidence scores.
   - Requires explicit human-in-the-loop review and approval before persisting skills.
   - **Grounding Rule**: Never invents certifications or unvalidated experience.

2. **Agent 2 – Career & Skill Gap Matcher**:
   - Analyzes learner skills against 12 industry career paths.
   - Computes explainable readiness percentage: `(Acquired Weights / Required Weights) * 100`.
   - Generates multi-axis Skill Gap Radar Charts.
   - Powers the "Simulate Career Pivot" tool to contrast transferrable vs missing skills.
   - Categorizes top companies into "High Chance", "Within Reach", and "Reach/Ambition".

3. **Agent 3 – Adaptive Curriculum Builder**:
   - Synthesizes personalized roadmaps across Beginner, Intermediate, and Advanced tiers.
   - Adapts pacing dynamically according to user's weekly study commitment (5 - 40 hrs).
   - Generates high-impact 7-Day Gap Sprints for targeted companies.
   - Inserts prerequisite micro-lessons following failed assessments.

4. **Agent 4 – Socratic AI Mentor**:
   - Operates directly inside the Coding Workspace.
   - Employs Socratic inquiry: guides through hints and questions without dumping raw code.
   - Consecutive Failure Watchdog: 2 failed submissions unlocks progressive Hint #1/#2/#3.
   - Remedial Intervention: Generates a 3-question conceptual micro-drill with immediate rationale feedback.

