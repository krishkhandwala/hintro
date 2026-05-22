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

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/krishkhandwala/hintro.git
cd hintro
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📋 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://mock-backend-hintro.vercel.app
NEXT_PUBLIC_USER_ID=u2
```

**Note**: Set `NEXT_PUBLIC_USER_ID=u1` for empty state testing, `u2` for populated data.

## 🎨 Architecture Decisions

### API Client Pattern
The `APIClient` class encapsulates all API logic with:
- Centralized error handling
- User ID header injection
- Request/response interceptors
- Type-safe responses

### Custom Hooks
Each API endpoint has a dedicated hook:
- `useProfile()` - User profile data
- `useDashboard()` - Dashboard metrics
- `useCallStats()` - Session statistics
- `useCallSessions()` - Call history

This pattern enables:
- Easy component reusability
- Automatic caching via TanStack Query
- Consistent error handling
- Optimized rendering

### Component Organization
Components are organized by function:
- **ui/** - Reusable base components
- **cards/** - Data display cards
- **tables/** - Data tables
- **empty-states/** - Fallback UI states
- **modals/** - Modal dialogs
- **layout/** - Page structure
- **dashboard/** - Main dashboard orchestration

### State Management
Uses TanStack Query for:
- Server state management
- Automatic caching
- Refetching on window focus
- Loading/error/success states

No Redux needed - Query handles complexity elegantly.

### Styling Strategy
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for semantic colors
- **Responsive Breakpoints**: mobile (390px), tablet (768px), laptop (1024px), desktop (1440px)
- **Consistent Spacing** via Tailwind scales

## 📱 Responsiveness

The dashboard is fully responsive:

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile    | 390px | Single column, collapsed sidebar |
| Tablet    | 768px | 2-column cards |
| Laptop    | 1024px| Sidebar + content |
| Desktop   | 1440px| Full layout |

## 🔄 Data Flow

```
API Endpoints
    ↓
Axios Client (services/api.ts)
    ↓
Custom Hooks (hooks/*)
    ↓
TanStack Query (caching/state)
    ↓
Components (re-render on data)
    ↓
localStorage (feedback persistence)
```

## 🎯 Key Features

### 1. Dual User States
- **u1**: Empty state user (no sessions)
- **u2**: Populated user (active sessions)

Pass via `x-user-id` header.

### 2. Loading States
- Skeleton loaders for smooth UX
- No ugly spinners
- Maintains layout during loading

### 3. Error Handling
- Graceful error messages
- Retry button functionality
- User-friendly error copy

### 4. LocalStorage Integration
- Feedback form data persistence
- Automatic storage on submit
- Display previous feedback in modal

### 5. Time Formatting
- Duration: seconds → "2h 15m"
- Date: "Apr 29, 2026"
- Relative: "2 days ago"

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/profile` | GET | User profile info |
| `/api/auth/dashboard` | GET | Dashboard metrics |
| `/api/call-sessions/stats` | GET | Call statistics |
| `/api/call-sessions?limit=10` | GET | Recent sessions |

All require `x-user-id` header.

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD npm start
```

### Manual Deploy

```bash
npm run build
npm start
```

## 🔐 Best Practices Implemented

- ✅ Strict TypeScript (`strict: true`)
- ✅ No prop drilling (hooks + context)
- ✅ Reusable components
- ✅ No hardcoded values
- ✅ Semantic HTML
- ✅ Accessible UI
- ✅ Performance optimized
- ✅ Code splitting automatic
- ✅ Image optimization ready

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)

## 📝 Notes

### Assumptions Made

1. **API Base URL**: Uses `https://mock-backend-hintro.vercel.app`
2. **User Identity**: Passed via `x-user-id` header
3. **Duration Format**: API returns duration in seconds
4. **Date Format**: ISO 8601 strings from API
5. **Dark Mode**: Not implemented (can be extended via CSS variables)

### Future Enhancements

- [ ] Dark mode toggle
- [ ] Real-time updates via WebSocket
- [ ] Export dashboard as PDF
- [ ] Custom date range filtering
- [ ] Session recording playback
- [ ] Advanced analytics charts
- [ ] User settings/preferences
- [ ] Team collaboration features

## 👨‍💼 Author

Built as a senior frontend engineering assignment for Hintro internship program.

## 📄 License

MIT License - feel free to use for learning or commercial projects.

## 🤝 Support

For issues or questions:
1. Check existing GitHub issues
2. Open a new issue with detailed description
3. Contact: [your-email@example.com]

---

**Built with ❤️ using modern frontend best practices.**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
