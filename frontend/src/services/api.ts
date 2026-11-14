/**
 * JOB WAY AI - Unified API Client Service
 * Connects frontend directly to backend REST endpoints (Node.js port 5000 / FastAPI port 8000)
 * Gracefully handles offline fallback so the application ALWAYS works smoothly during live demos!
 */

const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = {
  // Check backend server health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend API server unreachable, running on client-side state engine.', err);
      return { status: 'offline', mode: 'client-fallback' };
    }
  },

  // Agent 1: Submit resume text for analysis
  async analyzeResume(text: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/skill-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Skill analysis API failed');
      return await res.json();
    } catch (err) {
      return null; // Fallback to local agentBus logic
    }
  },

  // Agent 4: Query Socratic Mentor
  async askSocraticMentor(query: string, challengeId?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/socratic-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, challengeId })
      });
      if (!res.ok) throw new Error('Mentor API failed');
      return await res.json();
    } catch (err) {
      return null; // Fallback to local agentBus logic
    }
  },

  // Sync approved skills to backend database
  async syncSkills(skills: any[]) {
    try {
      const res = await fetch(`${API_BASE_URL}/profile/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills })
      });
      if (!res.ok) throw new Error('Skill sync failed');
      return await res.json();
    } catch (err) {
      return { success: true, offline: true };
    }
  },

  // Get agent collaboration events
  async getAgentEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return await res.json();
    } catch (err) {
      return [];
    }
  }
};

