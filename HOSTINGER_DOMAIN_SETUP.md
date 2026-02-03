# Connect roshnilife.com to Vercel via Hostinger

## ✅ What I've Done:
- ✅ Updated email to: info@roshnilife.com
- ✅ Redeployed website to production
- ✅ Website ready for custom domain

---

## 🌐 Vercel Nameservers for Hostinger

### Copy these nameservers and paste them in Hostinger:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 📋 Step-by-Step Instructions for Hostinger:

### 1. Login to Hostinger
- Go to: https://hpanel.hostinger.com
- Login with your account

### 2. Navigate to Domain Settings
- Click on "Domains" in the left sidebar
- Find and click on **roshnilife.com**

### 3. Change Nameservers
- Look for "Nameservers" section
- Click "Change Nameservers"
- Select "Use custom nameservers"
- Enter:
  - **Nameserver 1:** `ns1.vercel-dns.com`
  - **Nameserver 2:** `ns2.vercel-dns.com`
- Click "Save" or "Update"

### 4. Add Domain in Vercel
After changing nameservers in Hostinger:

1. Go to: https://vercel.com/sabirs-projects-29265fa2/multigrain-nextjs/settings/domains
2. Click "Add Domain"
3. Enter: `roshnilife.com`
4. Click "Add"
5. Also add: `www.roshnilife.com`
6. Click "Add"

Vercel will automatically:
- Detect the nameservers
- Configure DNS records
- Issue SSL certificate
- Make your site live at roshnilife.com

---

## ⏱️ Timeline:

- **Nameserver propagation:** 5 minutes to 48 hours (usually 30 minutes)
- **SSL certificate:** Automatic after DNS propagates
- **Website live:** As soon as DNS propagates

---

## ✅ Verification:

Check if nameservers are updated:
- Go to: https://www.whatsmydns.net/#NS/roshnilife.com
- You should see `ns1.vercel-dns.com` and `ns2.vercel-dns.com`

---

## 🎯 Final URLs:

Once DNS propagates, your website will be accessible at:
- **https://roshnilife.com** (main domain)
- **https://www.roshnilife.com** (www version)
- **https://multigrain-nextjs-zeta.vercel.app** (Vercel backup URL)

---

## 📧 Email Setup (Optional):

Your website now shows: **info@roshnilife.com**

To receive emails at this address:
1. Go to Hostinger → Email
2. Create email account: info@roshnilife.com
3. Set up email forwarding or use webmail

---

## 🆘 Troubleshooting:

**Domain not working after 24 hours?**
- Check nameservers in Hostinger are correct
- Verify domain is added in Vercel
- Check DNS propagation at whatsmydns.net

**SSL certificate not issued?**
- Wait for DNS to fully propagate
- Vercel auto-issues SSL (Let's Encrypt)
- Usually takes 5-10 minutes after DNS propagates

---

## 🎉 You're Done!

Once you paste the nameservers in Hostinger, everything else is automatic!

**Current Status:**
- ✅ Website deployed and ready
- ✅ Email updated to info@roshnilife.com
- ⏳ Waiting for you to update nameservers in Hostinger
