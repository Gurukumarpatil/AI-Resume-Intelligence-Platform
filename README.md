# AI Resume Builder 🚀

A full-stack MERN application that allows users to create, preview, and download professional resumes.

---

## 🔥 Features

* 📝 Enter resume details (Name, Email, Skills, Education, Experience)
* 👀 Live resume preview
* 🎨 Multiple templates (Classic & Modern)
* 📄 Download resume as PDF
* 💾 Save resumes to MongoDB
* 📊 View stored resumes

---

## 🛠 Tech Stack

* Frontend: React (Vite)
* Backend: Node.js, Express
* Database: MongoDB (Local)
* PDF Generation: html2pdf.js

---

## 📁 Project Structure

```
AI Resume Intelligence Platform/
│
├── client/   # React frontend
├── server/   # Express backend
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/AI-Resume-Intelligence-Platform.git
cd AI-Resume-Intelligence-Platform
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/resumeDB
```

Run server:

```
node index.js
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 📸 Features Preview

* Live Resume Builder UI
* Template Switching
* PDF Download

---

## 💡 Future Improvements

* AI resume suggestions 🤖
* Edit & update resumes
* Multiple professional templates
* Authentication (login/signup)

---

## 👨‍💻 Author

Guru Kumar

---

## ⭐ Notes

* `.env` and `node_modules` are ignored
* Uses local MongoDB for development
