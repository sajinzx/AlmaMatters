# AlmaMatters - Supabase (PostgreSQL) Migration & Production Deployment Guide

This guide walks you through setting up **PostgreSQL on Supabase**, deploying the **Node.js Express Backend**, and deploying the **React Frontend**.

---

## 1. Supabase Database Setup

### Step 1.1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **"New Project"**.
3. Fill in your project details:
   - **Name**: `almamatters-db` (or your preferred name)
   - **Database Password**: Choose a strong password and save it securely.
   - **Region**: Choose the region closest to your users / backend server.
4. Click **"Create new project"** and wait 1-2 minutes for provisioning.

### Step 1.2: Apply the PostgreSQL Schema
1. In the Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **"+ New Query"**.
3. Open [`backend/schema.sql`](./backend/schema.sql) from this repository, copy its entire contents, and paste it into the SQL Editor.
4. Click **"Run"** (or press `Ctrl+Enter`).
5. Verify success: Open **Table Editor** on the left menu. You should see all 20+ tables (`students`, `alumni`, `admins`, `posts`, `post_likes`, `jobs`, `sessions`, `communities`, `messages`, etc.).

### Step 1.3: Retrieve Connection String
1. Go to **Project Settings** (gear icon) $\rightarrow$ **Database**.
2. Scroll to **Connection string**:
   - Select **URI** mode (or **Connection Pooling** for serverless environments).
   - Copy the string:
     ```text
     postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
     ```
   - Replace `[YOUR-PASSWORD]` with your actual database password.

---

## 2. Backend Deployment (e.g., Render / Railway / Fly.io)

### Deploying to Render:
1. Push your repository to GitHub.
2. Log in to [Render](https://render.com) and click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server.js`)
5. Under **Environment Variables**, add:
   - `DATABASE_URL`: Your Supabase connection string from Step 1.3.
   - `JWT_SECRET`: A secure random string (e.g., `2f98e04b1257d0f3900...`).
   - `PORT`: `3000` (Render assigns its own port automatically, but setting 3000 as default is good practice).
   - `NODE_ENV`: `production`
6. Click **"Create Web Service"**.
7. Once deployed, note your backend URL (e.g., `https://almamatters-api.onrender.com`).

---

## 3. Frontend Deployment (e.g., Vercel / Netlify)

### Deploying to Vercel:
1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** $\rightarrow$ **Project**.
2. Import your GitHub repository.
3. Set the following configuration:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Create React App`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Under **Environment Variables**, add:
   - `REACT_APP_API_URL`: `https://almamatters-api.onrender.com/api` (your deployed backend URL + `/api`).
5. Click **"Deploy"**.

---

## 4. Local Development & Testing

### Running Backend with Supabase
1. In `backend/.env`, set:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
   ```
2. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

### Running Frontend
1. In `frontend/.env`, set:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

---

## 5. Verification Checklist

- [x] Schema contains all primary keys as `BIGSERIAL` / `SERIAL`.
- [x] Foreign keys configured with `ON DELETE CASCADE`.
- [x] Automatic timestamp update triggers active on all required tables.
- [x] Automated like, comment, and share counter triggers active on `posts`.
- [x] Backend connects via `pg` pool with SSL enabled for Supabase.
- [x] Placeholder converter converts `?` to `$1, $2, ...` seamlessly.
- [x] `insertId` returned reliably across all `INSERT` queries using `RETURNING *`.
- [x] Error handling captures PostgreSQL `23505` duplicate key constraint violations.
