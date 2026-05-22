const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Helper function to generate random data
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDates = (count = 3) => {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.now() - getRandomInt(1, 60) * 24 * 60 * 60 * 1000);
    dates.push(date.toISOString());
  }
  return dates;
};

const clients = ["Acme Corp", "TechStart", "BigCorp", "StartupXYZ", "Enterprise Inc"];
const descriptions = ["Sales call", "Product demo", "Discovery call", "Support session"];
const participants = [
  { name: "Jane Smith", isUser: true },
  { name: "John Davis", isUser: false },
  { name: "Client", isUser: false }
];

// Generate random sessions for u2
const generateSessions = () => {
  const sessions = [];
  const count = getRandomInt(1, 10);
  for (let i = 0; i < count; i++) {
    const startDate = new Date(Date.now() - getRandomInt(1, 60) * 24 * 60 * 60 * 1000);
    const duration = getRandomInt(300, 3600);
    const endDate = new Date(startDate.getTime() + duration * 1000);
    
    sessions.push({
      _id: `cs-${i}`,
      user_id: "u2",
      status: "ended",
      client: clients[Math.floor(Math.random() * clients.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      started_at: startDate.toISOString(),
      ended_at: endDate.toISOString(),
      total_duration_seconds: duration,
      language: ["en"],
      auto_gen_ai_response: false,
      save_transcript: true,
      transcript: null,
      transcript_final: false,
      ai_interactions: getRandomInt(1, 5),
      call_framework_id: null,
      participants: [participants[0], participants[Math.floor(Math.random() * (participants.length - 1)) + 1]],
      ended_reason: "user_ended",
      createdAt: startDate.toISOString(),
      updatedAt: endDate.toISOString()
    });
  }
  return sessions;
};

const userData = {
  u1: {
    profile: {
      id: "u1",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z"
    },
    dashboard: {
      user: {
        id: "u1",
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe"
      },
      subscription: null,
      usage: {
        kb_files: { used: 0, limit: 100, percentage: 0 },
        vocab_terms: 0,
        notes: 0
      }
    },
    callStats: {
      totalSessions: 0,
      averageDuration: 0,
      totalAIInteractions: 0,
      lastSession: []
    },
    callSessions: {
      callSessions: [],
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  },
  u2: {
    profile: {
      id: "u2",
      email: "sarah@example.com",
      firstName: "Sarah",
      lastName: "Smith",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2023-06-15T08:00:00Z",
      updatedAt: new Date().toISOString()
    },
    dashboard: {
      user: {
        id: "u2",
        email: "sarah@example.com",
        firstName: "Sarah",
        lastName: "Smith"
      },
      subscription: {
        plan: "professional",
        billing_cycle: "monthly",
        status: "active"
      },
      usage: {
        kb_files: { used: getRandomInt(50, 200), limit: 1000, percentage: getRandomInt(5, 30) },
        vocab_terms: getRandomInt(50, 150),
        notes: getRandomInt(10, 50)
      }
    },
    callStats: {
      totalSessions: getRandomInt(50, 200),
      averageDuration: getRandomInt(1000, 8000),
      totalAIInteractions: getRandomInt(10, 70),
      lastSession: getRandomDates(3)
    },
    callSessions: null // Will be generated on demand
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Profile endpoint
app.get('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const user = userData[userId];
  res.json(user?.profile || userData.u1.profile);
});

// Dashboard endpoint
app.get('/api/auth/dashboard', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const user = userData[userId];
  res.json(user?.dashboard || userData.u1.dashboard);
});

// Call stats endpoint
app.get('/api/call-sessions/stats', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const user = userData[userId];
  res.json(user?.callStats || userData.u1.callStats);
});

// Call sessions endpoint with pagination
app.get('/api/call-sessions', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  
  let user = userData[userId];
  if (!user) {
    user = userData.u1;
  }
  
  // For u2, generate sessions if not already generated
  if (userId === 'u2' && !user.callSessionsList) {
    user.callSessionsList = generateSessions();
  }
  
  const sessions = userId === 'u2' ? (user.callSessionsList || []) : [];
  const totalCount = sessions.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  res.json({
    callSessions: sessions.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});
