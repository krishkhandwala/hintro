# GitHub Setup & Deployment Guide

This guide walks you through setting up the Hintro Dashboard on GitHub and deploying it to production.

## 📋 Prerequisites

Before you begin, make sure you have:
- A GitHub account (https://github.com)
- Git installed on your local machine
- Node.js 18+ and npm installed
- The local development environment running successfully

## 🚀 Step 1: Create a GitHub Repository

1. **Go to GitHub** and click the "+" icon in the top right, then select "New repository"

2. **Repository Settings:**
   - **Repository name:** `hintro-dashboard` (or your preferred name)
   - **Description:** "Production-ready SaaS dashboard with Next.js, TypeScript, and TailwindCSS"
   - **Visibility:** Choose "Public" for open-source, "Private" if you prefer
   - **Initialize:** Leave unchecked (we'll push existing code)
   - Click **Create repository**

## 🔄 Step 2: Push Existing Code to GitHub

In your project directory, run these commands:

```bash
# Set the remote URL to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/hintro-dashboard.git

# Rename main branch if needed
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

## 📚 Step 3: Documentation Setup

### Add These Files to Your Repository:

1. **CONTRIBUTING.md** - Guidelines for contributors
2. **LICENSE** - Add a license (MIT recommended)
3. **.github/ISSUE_TEMPLATE/bug_report.md** - Bug report template
4. **.github/ISSUE_TEMPLATE/feature_request.md** - Feature request template

## 🌐 Step 4: Deploy Backend to Production

Choose one of these platforms:

### Option A: Deploy to Render (Recommended)

1. **Sign up at render.com**
2. **Create a new "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - Build Command: `npm install` (in mock-backend directory)
   - Start Command: `npm run dev`
   - Add environment variables if needed
5. **Deploy**

Your backend will be at: `https://your-service.onrender.com`

### Option B: Deploy to Heroku

1. **Sign up at heroku.com**
2. **Install Heroku CLI**
3. **Create Procfile in mock-backend:**
   ```
   web: npm run dev
   ```
4. **Deploy:**
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

### Option C: Deploy to Railway.app

1. **Sign up at railway.app**
2. **Connect GitHub repository**
3. **Select the project root**
4. **Railway automatically detects and deploys**

## 🎯 Step 5: Deploy Frontend to Vercel

1. **Go to vercel.com** and sign up with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables:**
   - In the "Environment Variables" section, add:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
     NEXT_PUBLIC_USER_ID=u2
     ```
   - Replace with your actual backend URL from Step 4

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

## 🔑 Step 6: Environment Variables

### Frontend (.env.local or Vercel Dashboard)
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
NEXT_PUBLIC_USER_ID=u2
```

### Backend (if needed)
```env
NODE_ENV=production
PORT=4000
```

## ✅ Step 7: Verify Deployment

1. Open your Vercel URL in a browser
2. Verify the dashboard loads
3. Check that data is fetching from your backend
4. Test both user states:
   - Set `NEXT_PUBLIC_USER_ID=u1` for empty state
   - Set `NEXT_PUBLIC_USER_ID=u2` for populated state

## 🔐 Step 8: Add Repository Protection

1. **Go to Settings → Branches**
2. **Add a branch protection rule:**
   - Branch name pattern: `main`
   - Require pull request reviews: ✓
   - Require status checks to pass: ✓
   - Require branches to be up to date: ✓

## 📊 Step 9: Add GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: npx vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 🏷️ Step 10: Create a Release

1. **Go to Releases** on GitHub
2. **Click "Create a new release"**
3. **Tag:** v1.0.0
4. **Title:** "Production Release v1.0.0"
5. **Description:**
   ```markdown
   ## Release Notes
   
   - ✨ Initial production release
   - 🎨 Responsive dashboard UI
   - 🔄 Mock backend API integration
   - 📱 Mobile-optimized design
   - ⚡ React Query caching
   - 🎯 TypeScript type safety
   ```
6. **Publish**

## 🐛 Troubleshooting

### Backend Not Connecting
- Check that `NEXT_PUBLIC_API_BASE_URL` is correct
- Verify backend is running and accessible
- Check browser console for CORS errors
- Ensure backend is publicly accessible (not localhost)

### Build Failures on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation works locally: `npm run build`

### Environment Variables Not Loading
- On Vercel: Ensure variables are added in Dashboard → Settings → Environment Variables
- Variables must be prefixed with `NEXT_PUBLIC_` to be client-side
- Redeploy after adding variables

## 📈 Monitoring & Analytics

Add these optional services:

1. **Sentry** (Error tracking) - https://sentry.io
2. **Vercel Analytics** (Built-in with Vercel)
3. **Google Analytics** (Custom implementation)

## 🤝 Collaboration

To contribute to this project:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/my-feature`
3. **Make changes and commit:** `git commit -am 'Add feature'`
4. **Push to your fork:** `git push origin feature/my-feature`
5. **Create a Pull Request** on GitHub

## 📝 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)

## 🎓 Best Practices

1. **Always test locally before pushing**
2. **Use meaningful commit messages**
3. **Keep secrets out of version control**
4. **Review pull requests thoroughly**
5. **Keep dependencies updated**
6. **Monitor production deployments**
7. **Document significant changes**
8. **Use semantic versioning for releases**

## 📞 Support

For issues or questions:
1. Check the README.md
2. Search existing GitHub issues
3. Create a new GitHub issue with details
4. Contact the development team

---

**Happy coding! 🚀**
