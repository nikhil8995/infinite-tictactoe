# 🚀 Deployment Guide

Your app is now configured for free deployment! Choose one:

## Option 1: Render (Recommended - Easiest)

1. **Create a GitHub repository** (if you haven't):
   ```bash
   cd /home/nikhil/Documents/Projects/X0
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create infinite-tictactoe --public --source=. --remote=origin --push
   ```
   
   Or manually:
   - Go to https://github.com/new
   - Create a new repository
   - Push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/infinite-tictactoe.git
     git branch -M main
     git push -u origin main
     ```

2. **Deploy on Render**:
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Render will auto-detect the settings from `render.yaml`
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://YOUR-APP-NAME.onrender.com`

**Free tier**: 750 hours/month, sleeps after 15 min of inactivity (first request takes ~30s to wake)

---

## Option 2: Railway

1. **Create GitHub repo** (same as above)

2. **Deploy on Railway**:
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Python and uses `Procfile`
   - Click "Deploy"
   - Go to Settings → Generate Domain
   - Your app will be live!

**Free tier**: $5 credit/month, no sleeping

---

## Option 3: Fly.io

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Deploy**:
   ```bash
   cd /home/nikhil/Documents/Projects/X0
   fly auth login
   fly launch
   # Follow prompts, say yes to defaults
   fly deploy
   ```

**Free tier**: 3 small VMs, always on

---

## Quick Git Setup (if needed)

```bash
cd /home/nikhil/Documents/Projects/X0

# Initialize git
git init
git add .
git commit -m "Infinite Tic-Tac-Toe game"

# Create repo on GitHub (easiest with gh CLI)
gh repo create infinite-tictactoe --public --source=. --remote=origin --push

# Or manually create on github.com and then:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## What I've Added:

- ✅ `Procfile` - For Railway/Render
- ✅ `render.yaml` - Render configuration
- ✅ `runtime.txt` - Python version
- ✅ `gunicorn_config.py` - Production server config
- ✅ Updated `requirements.txt` with gunicorn
- ✅ Modified `app.py` to use PORT env variable

---

## Recommended: Render
Easiest and most reliable free option. Just connect GitHub and deploy!
