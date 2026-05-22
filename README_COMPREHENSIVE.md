# Hintro Dashboard

A production-grade SaaS dashboard built with modern frontend technologies. This project demonstrates clean architecture, pixel-perfect UI design, and professional engineering practices.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4)

## 📸 Features

- **✨ Responsive Design** - Perfectly optimized for mobile, tablet, laptop, and desktop
- **🔄 Real API Integration** - Uses mock backend APIs with proper state management (no hardcoded data)
- **👥 Multiple User States** - Seamlessly switch between empty state (u1) and active user (u2)
- **⚡ Smooth Loading States** - Skeleton loaders and transitions for professional UX
- **❌ Error Handling** - Graceful error states with retry functionality
- **💾 Data Persistence** - localStorage integration for feedback and preferences
- **🎨 Professional UI** - Clean design with Tailwind CSS and shadcn/ui components
- **📝 Type-Safe Code** - Full TypeScript for maximum reliability
- **🏗️ Scalable Architecture** - Modular folder structure for easy expansion

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.2.6 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui, Radix UI, Lucide React |
| **State Management** | TanStack Query v5 (React Query) |
| **HTTP Client** | Axios |
| **Animations** | Framer Motion |
| **Backend API** | Express.js + CORS |
| **Database** | In-memory mock data |

## 📁 Project Structure

```
hintro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── providers.tsx      # React Query & User provider
│   ├── components/            # Reusable React components
│   │   ├── cards/             # StatCard, UsageCard, SubscriptionCard
│   │   ├── charts/            # Chart components
│   │   ├── dashboard/         # Main DashboardContent component
│   │   ├── empty-states/      # Empty, Error, LoadingState components
│   │   ├── layout/            # Sidebar, TopNavbar, UserSwitcher
│   │   ├── modals/            # FeedbackModal
│   │   ├── tables/            # SessionsTable
│   │   └── ui/                # Base UI: Button, Card, Dialog, Skeleton
│   ├── contexts/              # React contexts (UserContext)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useProfile.ts      # Fetch user profile
│   │   ├── useDashboard.ts    # Fetch dashboard data
│   │   ├── useCallSessions.ts # Fetch call stats and sessions
│   │   └── index.ts           # Exports
│   ├── services/              # API client
│   │   └── api.ts             # Axios API client with interceptors
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # Type definitions
│   ├── constants/             # Configuration constants
│   │   └── index.ts           # API endpoints, theme colors, etc.
│   ├── utils/                 # Utility functions
│   │   ├── formatting.ts      # Date, duration formatting
│   │   └── storage.ts         # localStorage helpers
│   └── styles/                # Global styles
│       └── globals.css        # Tailwind directives
├── mock-backend/              # Express backend server
│   ├── server.js              # Mock API endpoints
│   └── package.json           # Backend dependencies
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── .env.example               # Environment template
├── next.config.ts             # Next.js config
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.mjs         # PostCSS config
└── package.json               # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ or **yarn** 3+
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hintro-dashboard.git
   cd hintro-dashboard
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd mock-backend
   npm install
   cd ..
   ```

4. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

   The `.env.local` should contain:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   NEXT_PUBLIC_USER_ID=u2
   ```

### Running the Application

**Terminal 1: Start the backend server**
```bash
cd mock-backend
npm run dev
# Backend running on http://localhost:4000
```

**Terminal 2: Start the frontend dev server**
```bash
npm run dev
# Frontend running on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 User States

The dashboard supports two demo user states accessible via the **User Switcher** in the top navigation:

### 1. **Empty State (u1) - John Doe**
```javascript
{
  subscriptionPlan: null,
  usage: { apiCalls: 0, storage: 0 },
  callSessions: [],
  notes: { total: 0 },
  etc.
}
```
- Perfect for onboarding flows
- Shows relevant empty states and CTAs
- Encourages user action

### 2. **Active State (u2) - Sarah Smith (Pro)**
```javascript
{
  subscriptionPlan: { name: "Pro", status: "active" },
  usage: { apiCalls: 342, storage: 256 },
  callSessions: [3 sample sessions],
  notes: { total: 12 },
  etc.
}
```
- Shows fully populated dashboard
- Demonstrates data visualization
- Shows subscription details

### Switching Users
Click the **"Users"** dropdown in the top navigation bar to switch between demo users. All data refetches automatically.

## 🔌 API Endpoints

The mock backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/profile` | Get current user profile |
| `GET` | `/api/auth/dashboard` | Get dashboard data (subscription, usage, etc.) |
| `GET` | `/api/call-sessions/stats` | Get call statistics (total, duration, etc.) |
| `GET` | `/api/call-sessions?limit=10` | Get list of call sessions |

**User Identification:**
- All requests include the `x-user-id` header (set automatically via API client)
- Backend returns data specific to that user
- Default user: `u2` (active user with data)

### Example API Call

```bash
curl -H "x-user-id: u1" http://localhost:4000/api/auth/profile
```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints defined in `src/constants/index.ts`:

- **Mobile**: 390px
- **Tablet**: 768px
- **Laptop**: 1024px
- **Desktop**: 1440px

### Mobile Features
- Collapsible sidebar with hamburger menu
- Touch-optimized buttons and controls
- Full-width cards with proper spacing
- Responsive grid layouts

## 🎯 Component Examples

### Using the User Context

```typescript
import { useUser } from '@/hooks';

export const MyComponent = () => {
  const { userId, switchUser, isLoading } = useUser();
  
  return (
    <button onClick={() => switchUser('u1')} disabled={isLoading}>
      Switch to Empty User
    </button>
  );
};
```

### Using API Hooks

```typescript
import { useProfile, useDashboard, useCallSessions } from '@/hooks';

export const Dashboard = () => {
  const profileQuery = useProfile();
  const dashboardQuery = useDashboard();
  const sessionsQuery = useCallSessions(10);
  
  if (profileQuery.isLoading) return <LoadingState />;
  if (profileQuery.isError) return <ErrorState />;
  
  return (
    <div>
      <h1>{profileQuery.data?.name}</h1>
      {/* ... */}
    </div>
  );
};
```

## 🛠 Development

### Available Scripts

#### Frontend

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

#### Backend

```bash
# Start mock backend server
cd mock-backend
npm run dev
```

### Build Production

```bash
# Build Next.js app
npm run build

# Start production server
npm start
```

## 🔒 Type Safety

All components are fully typed with TypeScript. Key types are defined in `src/types/index.ts`:

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

interface DashboardData {
  subscriptionPlan: SubscriptionPlan | null;
  usage: UsageData;
  notes: NotesData;
  vocabTerms: { total: number };
  knowledgeBase: { total: number; updated: string };
}

interface CallSessionStats {
  totalSessions: number;
  averageDuration: number;
  aiInteractions: number;
  lastSessionDate: string | null;
}

interface CallSession {
  id: string;
  date: string;
  duration: number;
  participants: string[];
  notes: string;
  aiInteractions: number;
}
```

## 🎨 Styling & Design System

### Tailwind CSS Configuration
- **Colors**: Blue, Purple, Green, Red (from THEME_COLORS constant)
- **Spacing**: Standard Tailwind scale
- **Typography**: Inter font family
- **Dark Mode**: Configured but not enabled by default

### Component Composition
- **shadcn/ui**: For base components (Button, Card, Dialog)
- **Lucide React**: 350+ customizable icons
- **Framer Motion**: Smooth animations
- **Radix UI**: Accessibility-first headless components

## 📊 State Management

### React Query Setup
- Centralized query client configuration
- Automatic caching and stale-while-revalidate strategy
- Built-in retry logic and error handling
- Query invalidation on user switch

### User Context
- Global user state management
- Centralized user switching logic
- Query invalidation on user change
- Loading states during transitions

## 🔍 Error Handling

The application handles errors gracefully:

1. **API Errors**: Caught in axios interceptors
2. **Network Errors**: Displayed with retry buttons
3. **Empty States**: Clear messaging and CTAs
4. **Fallbacks**: Skeleton loaders during data fetching

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard

3. **Backend Deployment**
   - Deploy mock backend to a service like Render, Railway, or Heroku
   - Update `NEXT_PUBLIC_API_BASE_URL` in Vercel env vars

### Environment Variables for Production

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
NEXT_PUBLIC_USER_ID=u2
```

## 📝 Assumptions

1. **Single Page Application**: The dashboard is a single-page app with client-side routing
2. **Mock Backend**: All data is in-memory; no persistent database
3. **Authentication**: Currently using hardcoded user IDs (would be JWT in production)
4. **Responsive First**: Mobile-first approach with progressive enhancement
5. **Real-time Updates**: No WebSocket; data fetched on demand
6. **User Context**: User preference stored in memory (would be session in production)

## 🤝 Architecture Decisions

1. **TanStack Query**: Chosen for automatic caching, background refetching, and request deduplication
2. **App Router**: Next.js 16 App Router for modern server/client component patterns
3. **Component Co-location**: Components stored near where they're used for maintainability
4. **Type-First**: TypeScript for runtime safety and developer experience
5. **Tailwind CSS**: Utility-first CSS for rapid UI development
6. **Mock Backend**: Separate Express server to simulate real API behavior

## 🐛 Troubleshooting

### Backend not starting
```bash
# Make sure port 4000 is not in use
netstat -an | grep 4000  # On Unix/Mac
netstat -an | findstr 4000  # On Windows
```

### Frontend not connecting to backend
- Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
- Verify backend is running on `http://localhost:4000`
- Check browser console for CORS errors

### User switcher not working
- Ensure `UserProvider` is in providers.tsx
- Check useUser hook is called within UserProvider context
- Verify queries include userId in their keys

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)

## 📄 License

MIT License - feel free to use this project for any purpose

## 👤 Author

Created as a production-ready dashboard example showcasing modern frontend development practices.

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS dashboards
- UI components from shadcn/ui and Radix UI
- Icons from Lucide React
- Built with Next.js and TypeScript

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
