# 🔧 Fix DNS Issue - Website Not Loading

## ❌ Current Problem:
- Domain shows "DNS_PROBE_FINISHED_NXDOMAIN"
- Vercel shows domains as "verified" but site doesn't load
- DNS lookup fails

## 🎯 Root Cause:
You changed nameservers to Vercel's (`ns1.vercel-dns.com`) but Vercel nameservers take 24-48 hours to fully activate and configure.

---

## ✅ SOLUTION: Use Hostinger DNS (Fastest - 15 minutes)

### Step 1: Reset Nameservers in Hostinger

1. Go to: https://hpanel.hostinger.com
2. Click: Domains → roshnilife.com
3. Find: "Nameservers" section
4. **Change back to:** "Use Hostinger nameservers"
5. Click "Save"

### Step 2: Add DNS Records in Hostinger

1. Go to: Domains → roshnilife.com → DNS / Name Servers
2. Click: "Manage DNS Records"
3. **Delete any existing A or CNAME records for @ and www**
4. **Add these NEW records:**

#### Record 1: Root Domain (@)
```
Type: A
Name: @ (or leave blank)
Points to: 76.76.21.21
TTL: 3600
```

#### Record 2: WWW Subdomain
```
Type: CNAME
Name: www
Points to: cname.vercel-dns.com
TTL: 3600
```

5. Click "Add Record" for each
6. Click "Save Changes"

### Step 3: Wait & Test

- **Wait:** 5-15 minutes
- **Test:** Visit https://roshnilife.com
- **Verify:** Should load your website!

---

## 🔍 Verify DNS is Working:

Run this command in Command Prompt:
```
nslookup roshnilife.com 8.8.8.8
```

You should see: `76.76.21.21` in the response

---

## 📋 Quick Summary:

| Setting | Value |
|---------|-------|
| Nameservers | Use Hostinger nameservers |
| A Record (@) | 76.76.21.21 |
| CNAME (www) | cname.vercel-dns.com |

---

## ⚡ Why This Works:

- ❌ Vercel nameservers: 24-48 hours to activate
- ✅ Hostinger DNS + A records: 5-15 minutes
- ✅ You keep email control in Hostinger
- ✅ Vercel still hosts your website

---

## 🆘 Still Not Working After 30 Minutes?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private browsing
3. Flush DNS again: `ipconfig /flushdns`
4. Try from mobile phone (different network)
5. Check DNS propagation: https://www.whatsmydns.net/#A/roshnilife.com

---

**Follow these steps and your website will be live in 15 minutes!** 🚀
