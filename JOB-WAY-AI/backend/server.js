/**
 * JOB WAY AI - High-Performance Backend Service
 * Zero-dependency Node.js REST API Server
 * Built with native HTTP, CORS, JSON routing, and Multi-Agent coordination
 */

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 5000;

// Shared in-memory database
let learnerProfile = {
  id: 'usr-hackathon-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@jobway.ai',
  targetCareerId: 'fullstack-dev',
  weeklyHours: 15,
  skills: [
    { id: 'sk-1', name: 'JavaScript', category: 'Languages', level: 'Intermediate', confidence: 85, source: 'github', verified: true },
    { id: 'sk-2', name: 'HTML5', category: 'Languages', level: 'Advanced', confidence: 95, source: 'resume', verified: true },
    { id: 'sk-3', name: 'CSS3', category: 'Languages', level: 'Intermediate', confidence: 80, source: 'resume', verified: true },
    { id: 'sk-4', name: 'React', category: 'Frameworks', level: 'Intermediate', confidence: 78, source: 'github', verified: true },
    { id: 'sk-5', name: 'Node.js', category: 'Frameworks', level: 'Beginner', confidence: 60, source: 'manual', verified: false },
    { id: 'sk-6', name: 'Git & GitHub', category: 'Tools', level: 'Intermediate', confidence: 82, source: 'github', verified: true }
  ],
  streakDays: 5,
  totalPoints: 1240,
  completedMilestones: ['fs-m1']
};

let agentEventBus = [
  {
    id: 'evt-init-01',
    agentName: 'Agent 1: Profile & Skill Analyzer',
    task: 'Profile Ingestion Engine',
    activity: 'Initialized grounded skill extraction system.',
    result: 'success',
    timestamp: new Date().toLocaleTimeString(),
    handoffTo: 'Agent 2: Career & Skill Gap Matcher'
  },
  {
    id: 'evt-init-02',
    agentName: 'Agent 2: Career & Skill Gap Matcher',
    task: 'Career Track Calibration',
    activity: 'Loaded 12 standard career paths with weighted skill requirements.',
    result: 'success',
    timestamp: new Date().toLocaleTimeString(),
    handoffTo: 'Agent 3: Adaptive Curriculum Builder'
  },
  {
    id: 'evt-init-03',
    agentName: 'Agent 3: Adaptive Curriculum Builder',
    task: 'Curriculum Generator',
    activity: 'Adaptive pacing configured for weekly available study commitment.',
    result: 'success',
    timestamp: new Date().toLocaleTimeString(),
    handoffTo: 'Agent 4: Socratic AI Mentor'
  },
  {
    id: 'evt-init-04',
    agentName: 'Agent 4: Socratic AI Mentor',
    task: 'Socratic Hint Watchdog',
    activity: 'Online. Monitoring consecutive failed coding submissions for hint delivery.',
    result: 'success',
    timestamp: new Date().toLocaleTimeString()
  }
];

// Helper: send JSON response with standard CORS headers
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Request dispatcher
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // Parse JSON body for POST/PUT requests
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    let payload = {};
    if (body) {
      try {
        payload = JSON.parse(body);
      } catch (err) {
        // payload remains empty or raw
      }
    }

    // --- API ROUTES ---

    // 1. Health Check
    if (pathname === '/api/health' && method === 'GET') {
      return sendJson(res, 200, {
        status: 'ok',
        service: 'JOB WAY Multi-Agent Backend',
        version: '2.4.0',
        activeAgents: 4,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Get User Profile
    if (pathname === '/api/profile' && method === 'GET') {
      return sendJson(res, 200, learnerProfile);
    }

    // 3. Update Profile Skills
    if (pathname === '/api/profile/skills' && method === 'POST') {
      if (Array.isArray(payload.skills)) {
        learnerProfile.skills = [...learnerProfile.skills, ...payload.skills];
        learnerProfile.totalPoints += payload.skills.length * 50;
      }
      return sendJson(res, 200, {
        success: true,
        message: 'Skills updated successfully',
        profile: learnerProfile
      });
    }

    // 4. Agent Collaboration Event Bus
    if (pathname === '/api/events' && method === 'GET') {
      return sendJson(res, 200, agentEventBus);
    }

    // 5. Agent 1: Resume / Skill Analyzer
    if (pathname === '/api/agent/skill-analyze' && method === 'POST') {
      const text = payload.text || '';
      const extracted = [];
      const lower = text.toLowerCase();

      if (lower.includes('python')) {
        extracted.push({ name: 'Python', category: 'Languages', level: 'Intermediate', confidence: 90, source: 'resume', evidence: 'Detected in resume text' });
      }
      if (lower.includes('react')) {
        extracted.push({ name: 'React', category: 'Frameworks', level: 'Intermediate', confidence: 88, source: 'resume', evidence: 'Detected in project work' });
      }
      if (lower.includes('sql') || lower.includes('postgres')) {
        extracted.push({ name: 'PostgreSQL', category: 'Databases', level: 'Intermediate', confidence: 82, source: 'resume', evidence: 'Database querying context' });
      }

      agentEventBus.unshift({
        id: `evt-${Date.now()}`,
        agentName: 'Agent 1: Profile & Skill Analyzer',
        task: 'Resume Text Parsing',
        activity: `Backend parsed ${text.length} characters and extracted ${extracted.length} skills.`,
        result: 'success',
        timestamp: new Date().toLocaleTimeString(),
        handoffTo: 'Agent 2: Career & Skill Gap Matcher'
      });

      return sendJson(res, 200, { success: true, extractedSkills: extracted });
    }

    // 6. Agent 4: Socratic Mentorship Response
    if (pathname === '/api/agent/socratic-hint' && method === 'POST') {
      const query = (payload.query || '').toLowerCase();
      let reply = "";

      if (query.includes('solution') || query.includes('answer')) {
        reply = "In our Socratic environment, I cannot reveal the complete answer directly! Let's examine: What is the required return type, and what intermediate state do we need to store?";
      } else {
        reply = "Notice how the constraints bound the operation. Can an auxiliary hash map turn the nested inner search from O(N) into O(1) time?";
      }

      return sendJson(res, 200, { success: true, socraticResponse: reply });
    }

    // 404 Catch-All
    return sendJson(res, 404, { error: 'Endpoint not found', path: pathname });
  });
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  🚀 JOB WAY AI - Multi-Agent Backend Service`);
  console.log(`  Listening on: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Status: 4 AI Agents Armed & Ready`);
  console.log(`=================================================`);
});

