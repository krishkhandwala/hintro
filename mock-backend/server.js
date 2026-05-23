const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - x-user-id: ${req.headers['x-user-id'] || 'none'}`);
  next();
});

const userData = {
  u1: {
    profile: {
      id: "u1",
      email: "soumya@example.com",
      firstName: "Soumya Shekhar",
      lastName: "Jain",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z"
    },
    dashboard: {
      user: {
        id: "u1",
        email: "soumya@example.com",
        firstName: "Soumya Shekhar",
        lastName: "Jain"
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
      email: "krish@example.com",
      firstName: "Krish",
      lastName: "Khandwala",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-06-22T16:45:00Z"
    },
    dashboard: {
      user: {
        id: "u2",
        email: "krish@example.com",
        firstName: "Krish",
        lastName: "Khandwala"
      },
      subscription: {
        plan: "pro",
        billing_cycle: "monthly",
        status: "active"
      },
      usage: {
        kb_files: { used: 8, limit: 100, percentage: 8 },
        vocab_terms: 45,
        notes: 12
      }
    },
    callStats: {
      totalSessions: 24,
      averageDuration: 1800,
      totalAIInteractions: 156,
      lastSession: [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()]
    },
    callSessions: {
      callSessions: [
        {
          _id: "cs-001",
          user_id: "u2",
          status: "completed",
          client: "Alex Johnson",
          description: "Discussed Q2 goals and project milestones",
          started_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 3600 * 1000).toISOString(),
          ended_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          total_duration_seconds: 3600,
          language: ["English"],
          ai_interactions: 12,
          participants: [
            { name: "Krish Khandwala", isUser: true },
            { name: "Alex Johnson", isUser: false }
          ],
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 3600 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "cs-002",
          user_id: "u2",
          status: "completed",
          client: "Solo Session",
          description: "Brainstorming session for new product ideas",
          started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 1800 * 1000).toISOString(),
          ended_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          total_duration_seconds: 1800,
          language: ["English"],
          ai_interactions: 8,
          participants: [
            { name: "Krish Khandwala", isUser: true }
          ],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 1800 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "cs-003",
          user_id: "u2",
          status: "completed",
          client: "Team Sync",
          description: "Weekly team synchronization meeting",
          started_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 7200 * 1000).toISOString(),
          ended_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          total_duration_seconds: 7200,
          language: ["English"],
          ai_interactions: 24,
          participants: [
            { name: "Krish Khandwala", isUser: true },
            { name: "Mike Chen", isUser: false },
            { name: "Emily Davis", isUser: false }
          ],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 7200 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 3,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
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
  const data = userData[userId]?.callSessions || userData.u1.callSessions;
  res.json({
    ...data,
    callSessions: data.callSessions.slice(0, limit)
  });
});

app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});
