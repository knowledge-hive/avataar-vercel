# Sense Dashboard - Vercel Deployment Guide

## Overview
This React application with Express backend is configured for deployment on Vercel. The setup includes both frontend and backend in a single deployment.

## Prerequisites
- Vercel account
- OpenAI API key
- Git repository (push your code to GitHub/GitLab/Bitbucket)

## Deployment Steps

### 1. Push to Git Repository
```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Vercel will auto-detect the configuration from `vercel.json`

### 3. Environment Variables
Set the following environment variable in Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key

**Important**: In Vercel dashboard, create the environment variable as a secret:
1. Go to Project Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your actual API key
3. Set it for all environments (Development, Preview, Production)

### 4. Custom Domain (Optional)
- In Vercel dashboard, go to Settings → Domains
- Add your custom domain

## Architecture
- **Frontend**: React app built with Create React App
- **Backend**: Express.js API running on Vercel serverless functions
- **API Routes**: `/api/*` routes are handled by the backend
- **Static Assets**: Served from the React build directory

## Local Development
```bash
# Install dependencies for both frontend and backend
npm install
cd backend && npm install && cd ..

# Run both frontend and backend concurrently
npm run dev
```

## API Endpoints
- `POST /api/chat` - AI chat endpoint
- `POST /api/generate-questions` - Generate follow-up questions

## Configuration Files
- `vercel.json` - Vercel deployment configuration
- `package.json` - Frontend dependencies and build scripts
- `backend/package.json` - Backend dependencies

## Troubleshooting
1. **Build Errors**: Check that all dependencies are listed in `package.json`
2. **API Errors**: Ensure `OPENAI_API_KEY` environment variable is set
3. **Route Issues**: Verify API calls use relative paths (`/api/*`)

## Production URL
After deployment, your app will be available at:
`https://your-project-name.vercel.app`