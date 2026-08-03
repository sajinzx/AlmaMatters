# 🎓 AlmaMatters

> **Bridging the Gap Between Institutions, Students, and Alumni.**  
> AlmaMatters is a modern, full-stack alumni management and networking platform engineered to foster vibrant academic and professional communities.

---

## 🌟 Features

### 👤 Role-Based Authentication & Portals
- **Multi-Role Support**: Dedicated dashboards and flows for **Students**, **Alumni**, and **Admins**.
- **Multi-Step Onboarding**: Comprehensive registration covering personal, academic, professional, contact, and address profiles.
- **Secure Authentication**: JWT-based session security and Google OAuth login integration.

### 📰 Dynamic Social Feed & Networking
- **Rich Media Posts**: Share announcements, career milestones, photos, and links.
- **Engaging Interactions**: Real-time likes, comments, and shares with automated count triggers.
- **Follow & Connect**: Build professional networks between students, alumni, and faculty.

### 💼 Job & Internship Portal
- **Career Opportunities**: Alumni and recruiters post full-time jobs, internships, and project openings.
- **One-Click Applications**: Students and alumni can submit applications directly through the platform.

### 🤝 Mentorship & 1-on-1 Sessions
- **Session Scheduling**: Students can discover alumni mentors and request mentorship sessions.
- **Administrative Approvals**: Institution admins oversee and approve scheduled sessions.

### 💬 Real-Time Messaging & Communities
- **Direct Messaging**: 1-on-1 private conversations between students and alumni.
- **Group Communities**: Create and join interest-based group channels and discussion forums.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, React Router v7, Axios, Google OAuth, EmailJS, Modern CSS |
| **Backend** | Node.js, Express.js, JWT Authentication, Multer (File Uploads), `pg` (PostgreSQL client) |
| **Database** | PostgreSQL 14+ / Supabase (with automated triggers & connection pooling) |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend), Supabase (Database) |

---

## 📁 Repository Structure

```text
AlmaMatters/
├── backend/
│   ├── controllers/         # Express route controllers (MVC architecture)
│   ├── routes/              # Modular API endpoints
│   ├── uploads/             # Media & document uploads storage
│   ├── database.js          # PostgreSQL connection adapter & pooler
│   ├── schema.sql           # Complete Supabase / PostgreSQL database schema
│   ├── server.js            # Express application entry point
│   ├── .env.example         # Backend environment template
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets and SPA routing rules (_redirects)
│   ├── src/
│   │   ├── components/      # React components and views
│   │   ├── assets/          # Logos, icons, and static images
│   │   ├── App.js           # Main application routing
│   │   └── index.js         # React DOM root
│   ├── vercel.json          # Vercel SPA rewrite configuration
│   ├── .env.example         # Frontend environment template
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md      # Detailed cloud deployment walkthrough
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: (or a local PostgreSQL 14+ instance)

---

### 1. Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Paste the contents of [`backend/schema.sql`](./backend/schema.sql) and click **Run**.
4. Copy your database connection string from **Connect** $\rightarrow$ **URI**.

---

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Fill in your environment variables in `backend/.env`:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   JWT_SECRET=your_super_secret_jwt_key
   ```
   > 💡 **Tip**: If your password contains special characters (like `@`), URL-encode it (e.g., `@` becomes `%40`).

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000` with live database connection.*

---

### 3. Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Configure `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```
5. Start the React development server:
   ```bash
   npm start
   ```
   *The application will open automatically at `http://localhost:3001`.*

---

## 🌐 Production Deployment

Refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for the full walkthrough.

### Quick Deployment Summary:

- **Database**: Hosted on **Supabase** (PostgreSQL).
- **Backend on Render**:
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `node server.js`
  - Environment Variables:
    - `DATABASE_URL` = Supabase Pooler URI (`aws-0-[REGION].pooler.supabase.com:6543/postgres` or `:5432`)
    - `JWT_SECRET` = Your secret key
    - `NODE_ENV` = `production`
- **Frontend on Vercel**:
  - Root Directory: `frontend`
  - Framework Preset: `Create React App`
  - Environment Variable: `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

---

## 📡 Key API Endpoints

| Resource | Endpoint | Description |
| :--- | :--- | :--- |
| **Health** | `GET /api/health` | Live API & database status check |
| **Auth** | `POST /api/auth/login` | User login & JWT issuance |
| **Students** | `POST /api/students/register-full` | Comprehensive student registration |
| **Students** | `GET /api/students/check-roll/:rollNumber` | Check roll number availability |
| **Alumni** | `POST /api/alumni/register-full` | Comprehensive alumni registration |
| **Posts** | `GET /api/posts/feed` | Paginated social feed |
| **Posts** | `POST /api/posts/create` | Create a new community post |
| **Jobs** | `GET /api/jobs` | Browse active job listings |
| **Sessions** | `GET /api/sessions` | Discover mentorship sessions |
| **Messages** | `GET /api/messages/conversations/:userId` | Fetch user conversations |
| **Communities**| `GET /api/communities` | List all discussion communities |

---

## 🔒 Security & Best Practices

- **Password Hashing**: Secure salted hashes using `bcryptjs`.
- **Protected Environment**: Sensitive credentials and `.env` files are excluded via `.gitignore`.
- **Media Upload Privacy**: Uploaded user files remain local/isolated and are not tracked in version control.
- **Cascading Relationships**: Referential integrity enforced at the database level with PostgreSQL foreign key constraints (`ON DELETE CASCADE`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
