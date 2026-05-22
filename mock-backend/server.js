const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const userData = {
  u1: {
    profile: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      initials: "JD"
    },
    dashboard: {
      subscriptionPlan: null,
      usage: {
        apiCalls: 0,
        apiCallsLimit: 1000,
        storage: 0,
        storageLimit: 1000
      },
      notes: {
        total: 0,
        recent: []
      },
      vocabTerms: {
        total: 0
      },
      knowledgeBase: {
        total: 0,
        updated: new Date().toISOString()
      }
    },
    callStats: {
      totalSessions: 0,
      averageDuration: 0,
      aiInteractions: 0,
      lastSessionDate: null
    },
    callSessions: []
  },
  u2: {
    profile: {
      id: "u2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      initials: "SS"
    },
    dashboard: {
      subscriptionPlan: {
        name: "Pro",
        status: "active",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      usage: {
        apiCalls: 342,
        apiCallsLimit: 1000,
        storage: 256,
        storageLimit: 1000
      },
      notes: {
        total: 12,
        recent: ["Meeting notes", "Project ideas", "Quick reminder"]
      },
      vocabTerms: {
        total: 45
      },
      knowledgeBase: {
        total: 8,
        updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    },
    callStats: {
      totalSessions: 24,
      averageDuration: 1800,
      aiInteractions: 156,
      lastSessionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    callSessions: [
      {
        id: "cs-001",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 2400,
        participants: ["Sarah", "Alex"],
        notes: "Discussed Q2 goals",
        aiInteractions: 12
      },
      {
        id: "cs-002",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 1200,
        participants: ["Sarah"],
        notes: "Solo brainstorming",
        aiInteractions: 8
      },
      {
        id: "cs-003",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 3600,
        participants: ["Sarah", "Mike", "Emily"],
        notes: "Team sync meeting",
        aiInteractions: 24
      }
    ]
  }
};

app.get('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  res.json(userData[userId]?.profile || userData.u1.profile);
});

app.get('/api/auth/dashboard', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  res.json(userData[userId]?.dashboard || userData.u1.dashboard);
});

app.get('/api/call-sessions/stats', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  res.json(userData[userId]?.callStats || userData.u1.callStats);
});

app.get('/api/call-sessions', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const limit = parseInt(req.query.limit) || 10;
  const sessions = userData[userId]?.callSessions || userData.u1.callSessions;
  res.json(sessions.slice(0, limit));
});

app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});
