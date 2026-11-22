
# 🚀 JOB WAY AI – Autonomous Multi-Agent Career & Adaptive Learning Platform

> **"From where you are to where you belong."**  
> *AI-Powered Personalized Learning, Career Gap Analysis, and Continuous Socratic Mentorship for Modern Technologists.*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-24-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

## 🌟 Hackathon Solution Highlights

Built to bridge the critical disconnect between academic curriculum and high-growth industry expectations, **JOB WAY AI** provides an autonomous multi-agent co-pilot that replaces static generic advice with explainable, data-grounded career acceleration:

1. **4 Autonomous Specialized AI Agents**:
   * **Agent 1 (Profile & Skill Analyzer)**: Ingests resumes and public GitHub repositories, classifies skills across 5 categories, assigns proficiency levels with confidence scores, and requires user approval before saving.
   * **Agent 2 (Career & Skill Gap Matcher)**: Analyzes skills against 12 complete industry career paths, calculates mathematical readiness %, renders multi-axis Skill Gap Radar charts, and simulates career pivots.
   * **Agent 3 (Adaptive Curriculum Builder)**: Organizes personalized roadmaps into 3 stages (Beginner, Intermediate, Advanced), paces learning based on weekly available study hours (5 - 40h), and synthesizes high-impact 7-Day Gap Sprints for target companies.
   * **Agent 4 (Socratic AI Mentor)**: Embedded within the Coding Workspace. Guides learners with progressive conceptual hints, monitors consecutive test failures, and triggers 3-question remedial concept drills.
2. **AI Agents Active Indicator & Collaboration Drawer**: Real-time event bus drawer displaying autonomous agent coordination, task execution, timestamped logs, and agent-to-agent handoffs.
3. **12 Comprehensive Career Paths**: Full Stack Web, Frontend, Backend, AI/ML, Data Science, DevOps/Cloud, Cybersecurity, Mobile (iOS/Android), UI/UX Design, Product Management, Blockchain/Web3, and QA Automation.
4. **Company Preparation Hub**: Grounded hiring criteria for top tech companies (Google, Microsoft, Amazon, Netflix, Razorpay, Swiggy, TCS, Infosys) categorized into **High Chance**, **Within Reach**, and **Reach/Ambition**.
5. **Interactive Coding Lab**: Multi-language code runner with test suite verification, Monaco editor, Socratic mentor chat, and consecutive failure detection.
6. **Live Job Market Matcher**: Matches approved skills against real openings with zero fabricated postings, with a real-time Job Description (JD) text analyzer.
7. **Verified Skill Passport**: Strict dual distinction between verified, evidence-backed capabilities and self-reported skills, exportable to JSON.

---

## 📁 Clean Project Architecture

```
JOB-WAY-AI/
├── frontend/                     # Modern React + Vite Single Page Application
│   ├── src/
│   │   ├── components/           # Modular UI Views & Widgets
│   │   │   ├── common/           # Navbar, Footer
│   │   │   ├── dashboard/        # Executive KPI & Radar Summary
│   │   │   ├── career/           # 12 Career Paths & Pivot Simulator
│   │   │   ├── roadmap/          # 3-Stage Curriculum & 7-Day Sprint
│   │   │   ├── companies/        # Grounded Company Cards & Prep Blueprints
│   │   │   ├── workspace/        # Coding Lab & Socratic Mentor
│   │   │   ├── jobmatch/         # Live Job Matcher & JD Analyzer
│   │   │   ├── passport/         # Verified Skill Passport
│   │   │   ├── onboarding/       # Resume & GitHub Ingestion Modal
│   │   │   └── agents/           # Real-Time Collaboration Log Drawer
│   │   ├── context/              # AppContext Global State Store
│   │   ├── data/                 # Catalogs (12 Paths, Companies, Challenges)
│   │   ├── services/             # AgentCollaborationBus & API Services
│   │   ├── types/                # Strict TypeScript Type Definitions
│   │   ├── App.tsx               # Root Application Router
│   │   ├── index.css             # Tailwind Theme Directives & Dark Palette
│   │   └── main.tsx              # React DOM Entrypoint
│   ├── package.json              # Frontend Dependencies
│   └── vite.config.ts            # Vite Configuration
│
├── backend/                      # Production Backend Services
│   ├── server.js                 # Zero-dependency Node.js REST API Server
│   ├── package.json              # Backend Scripts & Config
│   └── fastapi/                  # Python FastAPI Microservice (Cloud Run Ready)
│       ├── main.py               # FastAPI App & Endpoints
│       ├── requirements.txt      # Python Dependencies
│       └── Dockerfile            # Container Definition
│
├── database/                     # Database Definitions & Seeds
│   ├── schema.sql                # Supabase PostgreSQL DDL Schema
│   └── seed_data.sql             # Catalogs for 12 Career Paths
│
├── docs/                         # Architecture & Demonstration Docs
│   ├── ARCHITECTURE.md           # Multi-Agent Coordination Design
│   └── HACKATHON_DEMO.md         # Judge Walkthrough & Demo Script
│
├── .env.example                  # Environment Variables Template
├── .gitignore                    # Git Exclusion Rules
└── README.md                     # Project Presentation
```

---

## 🚀 Quickstart & Execution Guide

### 1. Run the Frontend (Vite + React)
```bash
cd frontend
npm run dev
```
* **Local URL**: [http://localhost:5173/](http://localhost:5173/)

### 2. Run the Backend API
```bash
# Option A: Zero-dependency Node.js Server (Recommended for instant start)
cd backend
npm start
# Or: node server.js
```
* **Backend URL**: [http://localhost:5000/](http://localhost:5000/)
* **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

```bash
# Option B: Python FastAPI Service
cd backend/fastapi
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🧪 Completed Feature Matrix (P0 / P1 / P2)

| Feature Pillar | Priority | Implementation Status | Grounding Verification |
| :--- | :---: | :---: | :--- |
| **All 12 Career Paths** | **P0** | ✅ **COMPLETE** | 12 complete roadmaps with difficulty, salary, prerequisites, and companies |
| **Career Gap Matcher & Radar** | **P0** | ✅ **COMPLETE** | Mathematical readiness % and Recharts Polar Radar visualization |
| **Adaptive 3-Stage Curriculum** | **P0** | ✅ **COMPLETE** | Beginner, Intermediate, and Advanced milestones with progress tracking |
| **Socratic AI Mentor** | **P0** | ✅ **COMPLETE** | Progressive hints, error diagnostics, and refusal to dump raw solutions |
| **Profile & Skill Analyzer** | **P0** | ✅ **COMPLETE** | Resume parser, GitHub profile importer, and user approval workflow |
| **Executive Dashboard & KPIs** | **P0** | ✅ **COMPLETE** | Live readiness meter, active sprint preview, and recommendation card |
| **AI Collaboration Log Drawer** | **P1** | ✅ **COMPLETE** | Live event stream with timestamps, agent handoffs, and status badges |
| **7-Day Gap Sprints** | **P1** | ✅ **COMPLETE** | Daily task syllabus adapted to target companies (e.g. Razorpay, Swiggy) |
| **Interactive Coding Lab** | **P1** | ✅ **COMPLETE** | Multi-language runner, consecutive failure detection, and test suite |
| **Remedial Micro-Drill** | **P1** | ✅ **COMPLETE** | 3-question conceptual quiz triggered after 2 consecutive failures |
| **Company Preparation Cards** | **P1** | ✅ **COMPLETE** | High Chance, Within Reach, Reach/Ambition with interview blueprints |
| **Career Pivot Simulator** | **P1** | ✅ **COMPLETE** | Side-by-side transition analysis with transferrable vs missing skills |
| **Live Job Market Matcher** | **P2** | ✅ **COMPLETE** | Paste JD text analyzer with zero fabricated job postings |
| **Verified Skill Passport** | **P2** | ✅ **COMPLETE** | Dual-layer distinction (Evidence vs Self-Reported) + JSON Export |

---

## ☁️ Google Cloud Run Deployment

To deploy the backend to Google Cloud Run:
```bash
cd backend/fastapi
gcloud builds submit --tag gcr.io/PROJECT_ID/job-way-api
gcloud run deploy job-way-api --image gcr.io/PROJECT_ID/job-way-api --platform managed --allow-unauthenticated
```
