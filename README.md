# MeetLy 🚀

AI-powered Meeting Intelligence & Task Management Platform

MeetLy is a full-stack SaaS application that transforms meeting transcripts into actionable insights using AI. Users can upload or paste meeting transcripts, generate AI-powered summaries, extract tasks automatically, track progress, and intelligently search across meetings.

---

# ✨ Features

## Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Persistent Sessions

## AI Meeting Intelligence
- Upload `.txt` transcripts
- Paste meeting conversations
- AI-generated summaries
- AI-generated key points
- AI-powered task extraction

## Task Management
- Dynamic task creation
- Task progress tracking
- Status updates
- Priority handling
- Timeline visualization

## Meeting Workspace
- Meeting history
- Meeting detail pages
- Transcript viewer
- AI insights dashboard

## Intelligent Search
- Global search system
- Search across:
  - meeting titles
  - transcripts
  - summaries
  - key points

## UI/UX
- Premium SaaS dashboard UI
- Responsive layouts
- Dark enterprise design
- Sidebar navigation

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication

## Database
- MySQL

## AI Integration
- Groq API

---

# 🏗 Architecture

```txt
Frontend (React + Vite)
          ↓
REST APIs (Express.js)
          ↓
MySQL Database (Sequelize)
          ↓
Groq AI Processing
```

---

# 🗄 Database Design

## Users Table
Stores:
- name
- email
- password

## Meetings Table
Stores:
- title
- transcript
- summary
- key points
- userId

## Tasks Table
Stores:
- task
- owner
- priority
- progress
- dueDate
- meetingId
- userId

## Relationships

```txt
User → Meetings
Meeting → Tasks
```

---

# 🔄 API Flow

## Meeting Processing Flow

```txt
User uploads transcript
        ↓
Backend receives transcript
        ↓
Groq AI generates:
    - summary
    - key points
    - tasks
        ↓
Backend stores data in MySQL
        ↓
Frontend displays AI insights
```

---

# 🤖 AI Usage

MeetLy uses Groq AI for:

- Meeting summarization
- Key point extraction
- Task generation
- Productivity insights
- Intelligent meeting analysis

---

# 📁 Folder Structure

```txt
frontend/
backend/
```

## Frontend
- pages
- components
- layouts
- services

## Backend
- controllers
- routes
- middleware
- models
- utils

---

# ⚙️ Environment Variables

## Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Backend `.env`

```env
PORT=5000

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

NODE_ENV=development
```

---

# 🚀 Local Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 4. Setup MySQL Database

Create a MySQL database:

```txt
ai_meeting_manager
```

Update backend `.env` with your DB credentials.

---

# 🔒 Security Features

- JWT Authentication
- Protected APIs
- Rate Limiting
- Helmet Security Middleware
- CORS Protection
- Input Validation using Joi

---

# 📦 Deployment

## Frontend
Deploy on:
- Vercel

## Backend
Deploy on:
- Render

## Database
Deploy on:
- Railway / PlanetScale

---

# 📸 Screenshots

Add screenshots here:
- Dashboard
- Meetings Workspace
- Meeting Details
- Tasks Page
- AI Search

---

# 🔮 Future Improvements

- AI Chat over meetings
- Multi-user workspaces
- Google Meet integration
- Voice uploads
- Email notifications
- Analytics dashboard
- Calendar integrations

---

# 👨‍💻 Author

Developed by Pawan Raulo

---