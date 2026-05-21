# Hintro Frontend Dashboard

A production-grade SaaS dashboard built with modern frontend technologies. This project demonstrates clean architecture, pixel-perfect UI, and professional engineering practices.

## 🎯 Features

- **Responsive Design** - Works perfectly on mobile, tablet, laptop, and desktop
- **Real API Integration** - Uses actual backend APIs (not hardcoded data)
- **Empty & Populated States** - Handles both new users and active users elegantly
- **Loading States** - Skeleton loaders for smooth UX
- **Error Handling** - Graceful error states with retry functionality
- **localStorage Persistence** - Sidebar feedback flow with persistent storage
- **Professional UI** - Tailwind CSS with shadcn/ui components
- **Type-Safe** - Full TypeScript implementation
- **Scalable Architecture** - Modular folder structure for easy expansion

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Component Library**: Radix UI

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages & layouts
├── components/       # React components
│   ├── dashboard/   # Main dashboard component
│   ├── cards/       # Card components (StatCard, UsageCard, etc.)
│   ├── tables/      # Table components (SessionsTable)
│   ├── layout/      # Layout components (Sidebar, TopNavbar)
│   ├── modals/      # Modal components (FeedbackModal)
│   ├── empty-states/# Empty & error states
│   └── ui/          # Base UI components (Button, Card, Dialog, etc.)
├── hooks/           # Custom React hooks
├── services/        # API client and services
├── utils/           # Utility functions (formatting, storage)
├── lib/             # Library configurations (QueryClient)
├── types/           # TypeScript type definitions
├── constants/       # Constants and configuration
└── styles/          # Global styles
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
