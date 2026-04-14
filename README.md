# 🚀 AI Resume Intelligence Platform

A full-stack **MERN-based Resume Builder + AI Resume Analyzer** that helps users create, manage, and evaluate resumes using real-time AI feedback.

---

## 🧠 Features

### 📄 Resume Builder

* Create and edit resumes easily
* Store resumes in database (MongoDB)
* Multiple sections: Education, Experience, Skills, Projects

### 🤖 AI Resume Analyzer

* Upload PDF or paste resume text
* Get ATS-style score and grade
* AI-generated strengths & improvement suggestions
* Works using **Groq API (LLaMA 3 model)**

### 📊 Smart Analysis

* Resume scoring (0–100)
* Category-based evaluation:

  * Keyword Match
  * Formatting
  * Content Quality
  * Impact Metrics
  * ATS Readability

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **AI Integration:** Groq API (LLaMA 3)

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/AI-Resume-Intelligence-Platform.git
cd AI-Resume-Intelligence-Platform
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file inside `server/`:

```env
GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection
```

Run backend:

```bash
node index.js
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📂 Project Structure

```text
AI Resume Intelligence Platform/
│
├── client/        # React frontend
├── server/        # Express backend
│   ├── routes/    # API routes
│   ├── models/    # MongoDB schemas
│   └── index.js   # Server entry
```

---

## 🔑 API Endpoints

* `POST /api/analyze` → Analyze resume text
* `POST /api/analyze/upload` → Upload PDF and analyze
* `POST /save` → Save resume
* `GET /resumes` → Fetch resumes
* `PUT /update/:id` → Update resume
* `DELETE /delete/:id` → Delete resume

---

## ⚠️ Notes

* `.env` file is ignored for security
* AI scoring is heuristic + model-based (not exact ATS)
* Requires internet for AI analysis

---

## 🚀 Future Improvements

* Real ATS keyword matching engine
* Resume-job description comparison
* Better UI/UX with charts
* Download analyzed report

---

## 👨‍💻 Author

**Gurukumar Patil**
Full Stack MERN Developer

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
