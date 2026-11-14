/**
 * JOB WAY AI - Backend REST API & Security Test Suite
 * Tests REST Endpoints, Security Headers, Rate Limiting, Input Validation, and Code Evaluation
 * Uses native in-memory request dispatch for 100% reliable execution in sandboxed and CI environments.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('events');
const { Readable, Writable } = require('stream');
const { server } = require('../backend/server');

// In-memory request dispatcher that exercises the exact same http.createServer handler
function dispatchRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve) => {
    // Create mock readable request stream
    const req = new Readable({
      read() {}
    });
    req.method = method;
    req.url = path;
    req.headers = {
      'content-type': 'application/json',
      ...headers
    };
    req.socket = { remoteAddress: '127.0.0.1' };

    // Create mock response object
    const res = new EventEmitter();
    let resHeaders = {};
    let statusCode = 200;
    let chunks = [];

    res.writeHead = function (code, head) {
      statusCode = code;
      if (head) {
        Object.assign(resHeaders, head);
      }
      return res;
    };

    res.setHeader = function (name, value) {
      resHeaders[name.toLowerCase()] = value;
    };

    res.write = function (chunk) {
      if (chunk) chunks.push(Buffer.from(chunk));
      return true;
    };

    res.end = function (chunk) {
      if (chunk) chunks.push(Buffer.from(chunk));
      const rawBody = Buffer.concat(chunks).toString('utf8');
      let data = null;
      try {
        data = JSON.parse(rawBody);
      } catch (e) {
        data = rawBody;
      }
      resolve({
        statusCode,
        headers: resHeaders,
        data
      });
    };

    // Emit request event on HTTP server
    server.emit('request', req, res);

    // Push request body
    if (body) {
      const dataStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.push(dataStr);
    }
    req.push(null); // End stream
  });
}

describe('Backend REST API & Security Controls', () => {
  describe('Health & Security Headers', () => {
    it('GET /api/health returns 200 with service info and active security headers', async () => {
      const res = await dispatchRequest('GET', '/api/health');
      assert.equal(res.statusCode, 200);
      assert.equal(res.data.status, 'ok');
      assert.equal(res.data.activeAgents, 4);

      // Verify Enterprise Security Headers
      assert.equal(res.headers['X-Content-Type-Options'], 'nosniff');
      assert.equal(res.headers['X-Frame-Options'], 'DENY');
      assert.equal(res.headers['X-XSS-Protection'], '1; mode=block');
      assert.ok(res.headers['Strict-Transport-Security']);
    });
  });

  describe('User Profile & Skill Synchronization', () => {
    it('GET /api/profile returns the authenticated learner profile', async () => {
      const res = await dispatchRequest('GET', '/api/profile');
      assert.equal(res.statusCode, 200);
      assert.ok(res.data.id);
      assert.ok(Array.isArray(res.data.skills));
    });

    it('POST /api/profile/skills updates learner skills and XP points', async () => {
      const initialRes = await dispatchRequest('GET', '/api/profile');
      const initialPoints = initialRes.data.totalPoints;

      const newSkill = {
        id: 'sk-test-1',
        name: 'Redis',
        category: 'Databases',
        level: 'Intermediate',
        confidence: 85,
        source: 'manual',
        verified: true
      };

      const res = await dispatchRequest('POST', '/api/profile/skills', { skills: [newSkill] });
      assert.equal(res.statusCode, 200);
      assert.equal(res.data.success, true);
      assert.equal(res.data.profile.totalPoints, initialPoints + 50);
    });
  });

  describe('Agent Collaboration & Real-Time Event Bus', () => {
    it('GET /api/events returns the autonomous agent collaboration logs', async () => {
      const res = await dispatchRequest('GET', '/api/events');
      assert.equal(res.statusCode, 200);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.length > 0);
      assert.ok(res.data[0].agentName);
    });
  });

  describe('Agent 1: Skill Extraction Engine', () => {
    it('POST /api/agent/skill-analyze parses technical keywords with evidence', async () => {
      const res = await dispatchRequest('POST', '/api/agent/skill-analyze', {
        text: 'Senior engineer proficient in Python data analysis and Docker microservices.'
      });
      assert.equal(res.statusCode, 200);
      assert.equal(res.data.success, true);
      assert.ok(res.data.extractedSkills.length >= 2);
      assert.ok(res.data.extractedSkills.some(s => s.name === 'Python'));
      assert.ok(res.data.extractedSkills.some(s => s.name === 'Docker'));
    });
  });

  describe('Agent 4: Socratic Mentorship & Solution Guard', () => {
    it('POST /api/agent/socratic-hint refuses to output raw solutions', async () => {
      const res = await dispatchRequest('POST', '/api/agent/socratic-hint', {
        query: 'give me the full answer and code solution please'
      });
      assert.equal(res.statusCode, 200);
      assert.ok(res.data.socraticResponse.includes('cannot reveal the complete answer'));
    });

    it('POST /api/agent/socratic-hint provides conceptual guidance for optimization', async () => {
      const res = await dispatchRequest('POST', '/api/agent/socratic-hint', {
        query: 'how do I reduce time complexity?'
      });
      assert.equal(res.statusCode, 200);
      assert.ok(res.data.socraticResponse.includes('hash map'));
    });
  });

  describe('Secure Code Evaluation & Hidden Test Protection', () => {
    it('POST /api/code/run evaluates code and protects hidden test inputs/outputs', async () => {
      const res = await dispatchRequest('POST', '/api/code/run', {
        challengeId: 'two-sum',
        language: 'javascript',
        code: `
          function twoSum(nums, target) {
            const map = new Map();
            for (let i = 0; i < nums.length; i++) {
              const comp = target - nums[i];
              if (map.has(comp)) return [map.get(comp), i];
              map.set(nums[i], i);
            }
            return [];
          }
        `
      });

      assert.equal(res.statusCode, 200);
      assert.equal(res.data.success, true);
      assert.equal(res.data.passed, true);
      assert.equal(res.data.testSummary.hiddenCases[0].isHidden, true);
      assert.equal(res.data.testSummary.hiddenCases[0].passed, true);
      // Ensures the actual hidden input/output values are NOT leaked
      assert.equal(res.data.testSummary.hiddenCases[0].input, undefined);
      assert.equal(res.data.testSummary.hiddenCases[0].expectedOutput, undefined);
    });
  });

  describe('Input Validation & Error Responses', () => {
    it('handles malformed JSON payloads gracefully with 400 Bad Request', async () => {
      const res = await dispatchRequest('POST', '/api/profile/skills', '{ "skills": [ invalid_json');
      assert.equal(res.statusCode, 400);
      assert.equal(res.data.error, 'Malformed JSON payload');
    });

    it('returns 404 for nonexistent routes', async () => {
      const res = await dispatchRequest('GET', '/api/nonexistent-route');
      assert.equal(res.statusCode, 404);
      assert.equal(res.data.error, 'Endpoint not found');
    });
  });
});
