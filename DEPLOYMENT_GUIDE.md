# Deploy ROSHNI to Vercel - Step by Step Guide

## ✅ Prerequisites Complete
- ✅ Vercel CLI installed globally
- ✅ Project ready for deployment
- ✅ All files in place

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Open a NEW Command Prompt** (not PowerShell)
   - Press `Win + R`, type `cmd`, press Enter

2. **Navigate to your project:**
   ```cmd
   cd d:\multigrain\multigrain-nextjs
   ```

3. **Run Vercel deployment:**
   ```cmd
   vercel
   ```

4. **Follow the prompts:**
   - **Set up and deploy?** → Press `Y` (Yes)
   - **Which scope?** → Choose your account or create new
   - **Link to existing project?** → Press `N` (No, create new)
   - **Project name?** → Press Enter (use default: `multigrain-nextjs`)
   - **In which directory?** → Press Enter (use current: `./`)
   - **Override settings?** → Press `N` (No)

5. **Wait for deployment** (2-5 minutes)
   - Vercel will build your project on their servers
   - You'll get a deployment URL like: `https://multigrain-nextjs-xxx.vercel.app`

6. **Production deployment:**
   ```cmd
   vercel --prod
   ```
   - This creates your production URL
   - You'll get a final URL like: `https://multigrain-nextjs.vercel.app`

---

### Option 2: Deploy via Vercel Website (Easier)

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub, GitLab, or Bitbucket
3. **Click "Add New Project"**
4. **Import Git Repository:**
   - First, push your code to GitHub:
     ```cmd
     cd d:\multigrain\multigrain-nextjs
     git init
     git add .
     git commit -m "Initial commit - ROSHNI Next.js website"
     git branch -M main
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
5. **In Vercel:**
   - Select your repository
   - Vercel auto-detects Next.js
   - Click "Deploy"
   - Wait 2-5 minutes

---

## 🎯 After Deployment

### Your Website URLs:
- **Preview:** `https://multigrain-nextjs-xxx.vercel.app`
- **Production:** `https://multigrain-nextjs.vercel.app`

### Add Custom Domain (Optional):
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `roshniflour.com`)
3. Update DNS records as instructed
4. SSL certificate auto-configured

---

## 🔧 Environment Variables (If Needed)

If you need to add environment variables:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER=923254187846`
   - Any API keys, etc.

---

## 📊 Deployment Features

✅ **Automatic HTTPS**
✅ **Global CDN**
✅ **Automatic image optimization**
✅ **Zero configuration**
✅ **Free SSL certificate**
✅ **Continuous deployment** (auto-deploy on git push)

---

## 💰 Cost

**Free Tier includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Custom domain support
- **Perfect for your website!**

---

## 🐛 Troubleshooting

**Build fails?**
- Check the build logs in Vercel dashboard
- Make sure all images are in `public/images/`
- Verify `package.json` has all dependencies

**Images not loading?**
- Ensure images are in `public/images/` folder
- Check image paths start with `/images/`

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

## 🎉 Next Steps After Deployment

1. ✅ Test all pages on the live URL
2. ✅ Test cart functionality
3. ✅ Test WhatsApp integration
4. ✅ Check mobile responsiveness
5. ✅ Add custom domain (optional)
6. ✅ Share your website!

---

**Ready to deploy?** Run `vercel` in Command Prompt from your project directory!
