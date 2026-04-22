# 🚀 AI Resume Intelligence Platform

A full-stack **MERN + AI-powered resume system** that not only builds resumes but also evaluates them with **ATS-style intelligence** using real-time AI.

---

## 🔥 What makes this different?

Most resume tools just build resumes.
This platform **analyzes, scores, and improves** them.

👉 Combines:

* Resume Builder
* Resume Database
* AI Analyzer (Groq + LLaMA 3)

---

## ⚡ Core Features

### 📄 Resume Builder

* Create structured resumes (Education, Experience, Skills, Projects)
* Edit & manage resumes
* MongoDB-based storage

---

### 🤖 AI Resume Analyzer

* Upload PDF or paste resume text
* Get **ATS-style score (0–100)**
* AI-generated:

  * Strengths
  * Weaknesses
  * Actionable suggestions

---

### 📊 Smart Evaluation System

* Category-based scoring:

  * Keyword Match
  * Formatting
  * Content Quality
  * Impact Metrics
  * ATS Readability

---

### ⚡ Fast AI (Groq Integration)

* Uses **LLaMA 3 via Groq API**
* Ultra-fast inference
* No heavy infrastructure needed

---

## 🛠️ Tech Stack

| Layer    | Tech Used          |
| -------- | ------------------ |
| Frontend | React (Vite)       |
| Backend  | Node.js, Express   |
| Database | MongoDB            |
| AI       | Groq API (LLaMA 3) |

---

## 🧩 Architecture

```text
User → React UI → Express API → 
    → Resume Processing (PDF/Text)
    → AI Analysis (Groq)
    → Response → UI
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Gurukumarpatil/AI-Resume-Intelligence-Platform.git
cd AI-Resume-Intelligence-Platform
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` inside `server/`:

```env
GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection
```

Run backend:

```bash
node index.js
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/api/analyze`        | Analyze resume text  |
| POST   | `/api/analyze/upload` | Upload PDF & analyze |
| POST   | `/save`               | Save resume          |
| GET    | `/resumes`            | Fetch resumes        |
| PUT    | `/update/:id`         | Update resume        |
| DELETE | `/delete/:id`         | Delete resume        |

---

## 📸 Screenshots (Add Yours)

> Add screenshots here to increase impact:

* Resume Builder UI
* Analyzer Results Page
* Score Dashboard

---

## 📈 Why this project stands out

* Real-world problem (resume optimization)
* Full-stack implementation (MERN)
* AI integration (Groq API)
* Clean API design
* Scalable architecture

---

## 🚀 Future Enhancements

* Real ATS keyword matching engine
* Resume vs Job Description comparison
* Visual analytics (charts & insights)
* Downloadable AI reports
* Multi-template resume export

---

## 👨‍💻 Author

**Gurukumar Patil**
Full Stack MERN Developer | AI Application Builder

---

## ⭐ Show your support

If you found this project useful, give it a ⭐ on GitHub!
