# ASZ Company FZCO Website - Handoff Guide

## Overview

Your website has been built and tested. This guide walks you through setting up your own hosting infrastructure and going live.

**Live staging preview:** https://asz-website-lac.vercel.app

---

## Step 1: Accept the GitHub Repository

The repository `asz-website` will be transferred to your GitHub organization (`ASZCOMPANYFZCO`). You'll receive a notification to accept it.

Once accepted, the repo will be at: `https://github.com/ASZCOMPANYFZCO/asz-website`

---

## Step 2: Set Up Supabase (Database)

1. Go to https://supabase.com/dashboard/new
2. Create a new project:
   - **Name:** `asz-website`
   - **Region:** Choose the closest to your users
   - **Database password:** Set a strong password and save it
3. Once the project is created, go to **SQL Editor** → **New Query**
4. Copy and paste the contents of `supabase-setup.sql` from the repo and click **Run** (this creates the database tables)
5. Create another new query, copy and paste the contents of `supabase-seed.sql` and click **Run** (this populates your products and blog posts)
6. Go to **Authentication** → **Users** → **Add User**:
   - Email: your admin email (e.g. `admin@aszcompany.com`)
   - Password: a strong password
   - Check **Auto-confirm user**
   - This is your login for the admin panel at `/admin/login`
7. Go to **Settings** → **API** and copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key**

You can now **delete your old Supabase project** (the one that was out of date).

---

## Step 3: Deploy on Vercel

1. Delete your old Vercel project (`asz-website-cyan.vercel.app`)
2. Go to https://vercel.com/new
3. Import the `ASZCOMPANYFZCO/asz-website` repository
4. Add these **Environment Variables** before deploying:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL from Step 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key from Step 2 |
| `SMTP_HOST` | `smtpout.secureserver.net` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | Your GoDaddy email (e.g. `general@aszcompany.com`) |
| `SMTP_PASS` | Your GoDaddy email password |
| `SMTP_FROM` | Same as SMTP_USER |

5. Click **Deploy**
6. Once deployed, go to **Settings** → **Domains** and add your custom domain (`aszcompany.com`)
7. Follow Vercel's instructions to update your DNS records

---

## Step 4: Verify Everything Works

- [ ] Visit your site and check the homepage loads with products
- [ ] Go to `/products` — all 24 products should display
- [ ] Go to `/news` — 3 blog posts should show
- [ ] Go to `/compliance` — 5 policy pages should be linked
- [ ] Go to `/contact` — submit a test enquiry and check:
  - The enquiry appears in `/admin/enquiries`
  - You receive an email notification at `general@aszcompany.com`
  - The submitter receives a confirmation email
- [ ] Go to `/admin/login` — log in with the admin user you created
- [ ] In admin, try creating/editing a product and a blog post
- [ ] Test on mobile

---

## Admin Panel Guide

**URL:** `https://yourdomain.com/admin/login`

| Feature | Path | What it does |
|---------|------|--------------|
| Dashboard | `/admin` | Overview stats, recent enquiries |
| Products | `/admin/products` | Add, edit, delete products |
| Blog | `/admin/blog` | Create and publish blog posts |
| Enquiries | `/admin/enquiries` | View quote requests, mark as read/replied |
| Documents | `/admin/documents` | Manage compliance documents |

---

## Technical Reference

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Web framework |
| React 19 | UI library |
| Tailwind CSS 4 | Styling |
| Supabase | Database + Authentication |
| Vercel | Hosting + Deployment |
| Nodemailer | Email notifications |

**Auto-deployment:** Every push to the `master` branch on GitHub automatically deploys to Vercel.

---

## Support

For any questions or issues, contact Weframe.
