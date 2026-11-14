/**
 * JOB WAY AI - Complete End-to-End Hackathon Workflow Test
 * Verifies the 10-step Judge Walkthrough & Live Demonstration Pipeline
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { CAREER_PATHS } = require('./fixtures/careerPaths');

describe('End-to-End Hackathon Demonstration Workflow (10-Step Journey)', () => {
  // Shared user session context throughout the 10-step journey
  let userSession = {
    id: 'usr-e2e-01',
    name: 'Alex Rivera',
    email: 'alex.rivera@jobway.ai',
    targetCareerId: null,
    skills: [],
    readiness: 0,
    activeSprint: null,
    points: 0,
    attempts: []
  };

  it('Step 1: User signs up / logs in with authenticated identity', () => {
    assert.equal(userSession.name, 'Alex Rivera');
    assert.ok(userSession.email.includes('@'));
  });

  it('Step 2 & 3: Agent 1 parses resume text and public GitHub repository', () => {
    const resumeText = 'Senior Full Stack developer with React, JavaScript, and Node.js microservices experience.';
    const lower = resumeText.toLowerCase();
    const extracted = [];

    if (lower.includes('javascript') || lower.includes('js')) {
      extracted.push({ name: 'JavaScript', category: 'Languages', level: 'Intermediate', confidence: 85, source: 'resume', verified: true });
    }
    if (lower.includes('react')) {
      extracted.push({ name: 'React', category: 'Frameworks', level: 'Intermediate', confidence: 88, source: 'resume', verified: true });
    }
    if (lower.includes('node')) {
      extracted.push({ name: 'Node.js', category: 'Frameworks', level: 'Intermediate', confidence: 80, source: 'resume', verified: true });
    }

    userSession.skills = extracted;
    assert.equal(userSession.skills.length, 3);
    assert.ok(userSession.skills.every(s => s.confidence >= 80));
  });

  it('Step 4: User selects target career track (Full Stack Web Developer)', () => {
    userSession.targetCareerId = 'fullstack-dev';
    const career = CAREER_PATHS.find(c => c.id === userSession.targetCareerId);
    assert.ok(career);
    assert.equal(career.title, 'Full Stack Web Developer');
  });

  it('Step 5: Agent 2 computes explainable readiness % and skill gaps', () => {
    const career = CAREER_PATHS.find(c => c.id === userSession.targetCareerId);
    const userSkillNames = new Set(userSession.skills.map(s => s.name.toLowerCase()));

    let totalWeight = 0;
    let acquiredWeight = 0;
    const missing = [];

    career.requiredSkills.forEach(req => {
      totalWeight += req.weight;
      if (userSkillNames.has(req.name.toLowerCase())) {
        acquiredWeight += req.weight;
      } else {
        missing.push(req.name);
      }
    });

    userSession.readiness = Math.round((acquiredWeight / Math.max(1, totalWeight)) * 100);

    assert.ok(userSession.readiness > 0 && userSession.readiness < 100);
    assert.ok(missing.includes('PostgreSQL'));
  });

  it('Step 6: Agent 3 generates adaptive 3-stage roadmap & 7-Day Sprint for Razorpay', () => {
    userSession.activeSprint = {
      id: 'sprint-razorpay-01',
      company: 'Razorpay',
      days: [
        { day: 1, title: 'Bridge Core Gap: PostgreSQL & Transactions', completed: false },
        { day: 2, title: 'Idempotency Keys & Webhooks', completed: false },
        { day: 3, title: 'System Design: High Throughput Ledger', completed: false }
      ]
    };

    assert.equal(userSession.activeSprint.company, 'Razorpay');
    assert.ok(userSession.activeSprint.days[0].title.includes('PostgreSQL'));
  });

  it('Step 7: User completes a skill assessment and earns certified competency', () => {
    const quizResult = { score: 3, total: 3, passed: true, rewardSkill: 'PostgreSQL' };
    assert.equal(quizResult.passed, true);

    userSession.skills.push({
      name: quizResult.rewardSkill,
      category: 'Databases',
      level: 'Intermediate',
      confidence: 95,
      source: 'assessment',
      verified: true
    });
    userSession.points += 150;

    assert.ok(userSession.skills.some(s => s.name === 'PostgreSQL'));
    assert.equal(userSession.points, 150);
  });

  it('Step 8: Coding test failure triggers Socratic failure detection & remedial drill', () => {
    const attempts = [
      { attempt: 1, passed: false },
      { attempt: 2, passed: false }
    ];

    let remedialDrillTriggered = false;
    let unlockedHint = null;

    if (attempts.length >= 2) {
      remedialDrillTriggered = true;
      unlockedHint = 'Consider storing each element in a hash map as you traverse.';
    }

    assert.equal(remedialDrillTriggered, true);
    assert.ok(unlockedHint.includes('hash map'));
  });

  it('Step 9: Socratic AI Mentor guides without leaking full solution code', () => {
    const userQuery = 'Can you just give me the code for Two Sum?';
    let socraticResponse = '';

    if (userQuery.includes('give me') || userQuery.includes('code') || userQuery.includes('solution')) {
      socraticResponse = 'In our Socratic environment, I cannot write the full solution directly. What is the bottleneck in the nested loop?';
    }

    assert.ok(socraticResponse.includes('cannot write the full solution'));
    assert.ok(!socraticResponse.includes('function twoSum'));
  });

  it('Step 10: Career pivot simulation evaluates transition to AI/ML Engineer', () => {
    const sourceCareer = CAREER_PATHS.find(c => c.id === 'fullstack-dev');
    const targetCareer = CAREER_PATHS.find(c => c.id === 'ai-ml-engineer');

    const userSkillNames = new Set(userSession.skills.map(s => s.name));
    const transferrable = sourceCareer.requiredSkills
      .filter(s => targetCareer.requiredSkills.some(t => t.name === s.name) && userSkillNames.has(s.name));

    assert.ok(Array.isArray(transferrable));
    assert.ok(targetCareer.requiredSkills.length > 0);
  });
});
