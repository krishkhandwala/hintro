# Deployment Guide

Comprehensive guide for deploying the Hintro Dashboard to production environments.

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Production Build](#production-build)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Monitoring & Logging](#monitoring--logging)
7. [Performance Optimization](#performance-optimization)
8. [Security Considerations](#security-considerations)

## 🏠 Local Development Setup

### Prerequisites
```bash
# Check versions
node --version  # v18.17.0 or higher
npm --version   # v9.0.0 or higher
git --version   # Any recent version
```

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/hintro-dashboard.git
cd hintro-dashboard

# Install frontend dependencies
npm install

# Install backend dependencies
cd mock-backend
npm install
cd ..

# Create environment file
cp .env.example .env.local
```

### Start Development Servers
```bash
# Terminal 1: Backend
cd mock-backend
npm run dev
# Runs on http://localhost:4000

# Terminal 2: Frontend
npm run dev
# Runs on http://localhost:3000
```

## 🏗️ Production Build

### Frontend Build

```bash
# Build Next.js application
npm run build

# Start production server locally
npm start
```

### Backend Build

The backend is a simple Express.js server that doesn't require compilation:

```bash
cd mock-backend
npm run dev  # Same for production
```

## 🌐 Backend Deployment

### Option 1: Render.com (Recommended)

**Benefits:**
- Free tier available
- Auto-deploys from GitHub
- Easy environment variables
- Built-in monitoring

**Steps:**

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Select branch: `main`

3. **Configure Service**
   - **Name:** `hintro-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install` (in mock-backend directory)
   - **Start Command:** `npm run dev`
   - **Region:** Choose closest to users

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your URL: `https://hintro-backend.onrender.com`

5. **Environment Variables**
   - Add in Render dashboard if needed
   - Example: `PORT=4000`

### Option 2: Railway.app

**Benefits:**
- Simple setup
- Good performance
- GitHub integration
- Generous free tier

**Steps:**

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure**
   - Railway auto-detects Node.js
   - Set variables if needed
   - Deploy automatically

4. **Get URL**
   - View project → Deployments
   - URL will be generated automatically

### Option 3: Heroku

**Setup:**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create hintro-backend

# Create Procfile in mock-backend/
echo "web: npm run dev" > mock-backend/Procfile

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 4: AWS / Azure / GCP

For cloud platforms, containerize with Docker:

**Create mock-backend/Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
```

**Deploy with:**
```bash
docker build -t hintro-backend .
docker run -p 4000:4000 hintro-backend
```

## 🚀 Frontend Deployment

### Vercel (Recommended)

**Setup:**

1. **Connect Repository**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Select repository

2. **Configure Project**
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm ci`

3. **Environment Variables**
   - Add in Project Settings:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
     NEXT_PUBLIC_USER_ID=u2
     ```

4. **Deploy**
   - Click "Deploy"
   - URL: `https://hintro-dashboard.vercel.app`

### Netlify

**Setup:**

1. **Connect Repository**
   - https://netlify.com
   - Click "Add new site" → "Import from Git"
   - Select repository

2. **Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `out/` (for static export)

3. **Environment Variables**
   - Go to Settings → Build & Deploy
   - Add environment variables

4. **Deploy**
   - Netlify auto-deploys on push

### GitHub Pages

For static export:

```bash
# Update next.config.ts
export const output = 'export'

# Build
npm run build

# Deploy to gh-pages branch
npx gh-pages -d out
```

### Self-Hosted (VPS/Dedicated Server)

**Setup with PM2:**

```bash
# Install PM2
npm install -g pm2

# Build application
npm run build

# Start with PM2
pm2 start "npm start" --name "hintro-dashboard"

# Monitor
pm2 logs hintro-dashboard

# Auto-restart on reboot
pm2 startup
pm2 save
```

## 🔑 Environment Variables

### Frontend Variables

```env
# Required
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Optional
NEXT_PUBLIC_USER_ID=u2
NEXT_PUBLIC_ENVIRONMENT=production
```

### Backend Variables

```env
# Required
PORT=4000

# Optional
NODE_ENV=production
CORS_ORIGIN=https://hintro-dashboard.example.com
```

### Managing Variables

**Local Development:**
- Create `.env.local` file (never commit)
- Variables loaded automatically

**Staging/Production:**
- Use platform-specific dashboard
- Vercel: Settings → Environment Variables
- Render: Environment
- Railway: Variables
- Heroku: Config Vars

## 📊 Monitoring & Logging

### Application Monitoring

**Sentry (Error Tracking)**

```bash
# Install
npm install @sentry/nextjs

# Configure in next.config.ts
import { withSentryConfig } from "@sentry/nextjs";

# Add to environment variables
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

**Vercel Analytics** (Built-in)
- Automatic performance metrics
- View in Vercel Dashboard

### Backend Logging

**Simple Logging:**

```javascript
console.log(`[${new Date().toISOString()}] Request:`, req.path);
console.error(`[ERROR] ${message}`, error);
```

**Advanced: Winston Logger**

```bash
npm install winston
```

### Uptime Monitoring

Use services like:
- **Uptime Robot** (free tier)
- **Pingdom**
- **Healthchecks.io**

Set monitoring on:
- `https://your-backend.com/health`
- `https://your-frontend.com`

## ⚡ Performance Optimization

### Frontend Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Automatic optimization
   - Lazy loading enabled

2. **Code Splitting**
   - Next.js automatic route splitting
   - Dynamic imports for large components

3. **Caching Strategy**
   ```env
   # Vercel automatically caches:
   - Static pages
   - API responses (via React Query)
   - Images
   ```

4. **Bundle Analysis**
   ```bash
   npm run build
   # Check .next/static for bundle size
   ```

### Backend Optimization

1. **Response Caching**
   ```javascript
   app.get('/api/data', (req, res) => {
     res.set('Cache-Control', 'public, max-age=300');
     res.json(data);
   });
   ```

2. **Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

3. **Load Testing**
   ```bash
   npm install -g artillery
   artillery quick -d 60 -r 10 https://your-backend.com
   ```

## 🔒 Security Considerations

### Frontend Security

1. **HTTPS Only**
   - All domains should use HTTPS
   - Redirect HTTP to HTTPS

2. **CSP Headers**
   - Set Content-Security-Policy headers
   - Prevent XSS attacks

3. **Input Validation**
   - Validate all user inputs
   - Sanitize before displaying

4. **Dependency Security**
   ```bash
   # Check for vulnerabilities
   npm audit
   
   # Fix automatically
   npm audit fix
   ```

### Backend Security

1. **CORS Configuration**
   ```javascript
   app.use(cors({
     origin: ['https://your-domain.com'],
     credentials: true
   }));
   ```

2. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Helmet.js**
   ```bash
   npm install helmet
   app.use(helmet());
   ```

4. **Environment Secrets**
   - Never commit `.env` files
   - Use platform secrets management
   - Rotate keys regularly

### Database & API Security

1. **Authentication**
   - Implement proper auth (JWT recommended)
   - Validate tokens on backend

2. **Data Validation**
   - Validate all input
   - Implement schema validation

3. **Secrets Management**
   - Use AWS Secrets Manager
   - HashiCorp Vault
   - Platform-provided solutions

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Run tests
      run: npm test
```

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All tests passing locally
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] Backend deployed and accessible
- [ ] Frontend environment variables point to production backend
- [ ] Security audit completed (`npm audit`)
- [ ] Performance tested (`npm run build` time)
- [ ] Database/API accessible from production
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rollback plan documented
- [ ] Team notified of deployment

## 🆘 Troubleshooting Deployment

### Frontend Won't Build
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
npm ci

# Try build again
npm run build
```

### Backend Connection Issues
- Check CORS settings
- Verify API URL in environment variables
- Test API endpoint manually
- Check firewall/security groups

### Performance Issues
- Check bundle size: `npm run build`
- Monitor database queries
- Enable caching where possible
- Use CDN for static assets

### Memory Issues
- Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`
- Implement pagination
- Add database indexing

## 📞 Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

**Need help? Check the main README.md or create a GitHub issue!**
