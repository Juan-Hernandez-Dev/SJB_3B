# Deploy to Vercel

## Simple Steps

1. **Push to GitHub** (if not already)

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Go to** [vercel.com/new](https://vercel.com/new)

3. **Import your GitHub repository**

4. **Click Deploy** (Vercel auto-detects it's a static site)

5. **Done!** Your site is live.

## Important Notes

- ❌ **NO npm install needed** - This is pure HTML/CSS/JS
- ❌ **NO build step needed** - Static files only
- ✅ **Just deploy** - Vercel serves index.html automatically

## If It Doesn't Work

1. **Check browser console** (F12) for errors
2. **Verify files are in root:**
   - index.html
   - script.js
3. **Test locally first:** Open index.html in browser
4. **Check Vercel logs** in dashboard

## Troubleshooting

**UI shows but doesn't work?**

- Open browser console (F12)
- Look for JavaScript errors
- Check if script.js is loading

**Blank page?**

- Check Vercel deployment logs
- Ensure index.html is in root directory
- Try redeploying

**Styles missing?**

- Check internet connection (Tailwind CDN)
- Check browser console for CDN errors
