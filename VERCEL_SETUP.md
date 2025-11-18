# Vercel Setup - Quick Guide

## 🚀 Deploy in 2 Minutes

### Method 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project directory
cd path/to/virtual-memory-simulator

# 3. Deploy!
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? virtual-memory-simulator
# - Directory? ./
# - Override settings? N

# 4. Done! Your URL is displayed
```

### Method 2: Vercel Dashboard (No CLI)

1. **Go to** [vercel.com/new](https://vercel.com/new)
2. **Sign in** with GitHub/GitLab/Bitbucket
3. **Import Git Repository** or **drag & drop** this folder
4. **Click Deploy** (Vercel auto-detects everything)
5. **Done!** Get your live URL

### Method 3: GitHub Integration (Best)

```bash
# 1. Create GitHub repo and push
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 2. Import to Vercel
# - Go to vercel.com/new
# - Select "Import Git Repository"
# - Choose your repo
# - Click Deploy

# 3. Auto-deploy enabled!
# Every push to main = automatic deployment
```

## 🎯 What Happens During Deploy

Vercel automatically:

- ✅ Detects static site
- ✅ Serves `index.html`
- ✅ Enables HTTPS
- ✅ Provides global CDN
- ✅ Gives you a `.vercel.app` domain

## 🌐 Your Live URLs

After deployment, you get:

- **Production:** `your-project.vercel.app`
- **Preview:** Unique URL for each git branch/PR
- **Custom Domain:** Add your own domain in settings

## ⚙️ Configuration

The `vercel.json` file is already configured:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

No changes needed!

## 🔧 Common Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm PROJECT_NAME
```

## 📱 Features You Get

- ✅ **Instant deploys** - Live in seconds
- ✅ **HTTPS by default** - Automatic SSL
- ✅ **Global CDN** - Fast worldwide
- ✅ **Zero config** - Works out of the box
- ✅ **Preview URLs** - Test before production
- ✅ **Analytics** - Built-in (optional)
- ✅ **Custom domains** - Free SSL included

## 🎨 Custom Domain Setup

1. Go to project settings on Vercel
2. Click "Domains"
3. Add your domain (e.g., `simulator.yourdomain.com`)
4. Update DNS records:
   ```
   Type: CNAME
   Name: simulator (or @)
   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (5-30 minutes)
6. Done! Auto-SSL enabled

## 🔄 Update Your Site

### With Git Integration:

```bash
git add .
git commit -m "Update simulator"
git push
# Automatically deploys!
```

### With CLI:

```bash
vercel --prod
# Deploys immediately
```

## 🐛 Troubleshooting

**Issue:** `vercel: command not found`

```bash
npm install -g vercel
# Or use npx: npx vercel
```

**Issue:** Deployment fails

- Check `vercel.json` exists
- Ensure `index.html` is in root
- Try: `vercel --debug`

**Issue:** Styles not loading

- Check internet connection (Tailwind CDN)
- Clear browser cache
- Check browser console for errors

## 💡 Pro Tips

1. **Environment Variables:** None needed for this project
2. **Build Time:** ~5 seconds (it's just static files)
3. **Free Tier:** Unlimited personal projects
4. **Team Collaboration:** Invite team members in settings
5. **Analytics:** Enable in project settings (optional)

## 📊 Performance

Your deployed site will have:

- ⚡ **Load time:** < 1 second
- 🌍 **Global CDN:** 70+ edge locations
- 📱 **Mobile optimized:** Responsive design
- 🔒 **Secure:** HTTPS by default
- ♿ **Accessible:** Semantic HTML

## 🎓 Next Steps

After deployment:

1. Share your live URL
2. Add custom domain (optional)
3. Enable analytics (optional)
4. Set up GitHub integration for auto-deploy

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Custom Domains Guide](https://vercel.com/docs/custom-domains)

---

**Need help?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for more deployment options.
