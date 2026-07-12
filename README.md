# SurakshaAI 🛡️

**SurakshaAI** is an advanced, AI-powered digital safety platform designed to protect users from modern digital scams, fraudulent URLs, malicious UPI requests, predatory loan apps, and suspicious audio/phone calls.

Built for the **Maverick Effect Challenge**, SurakshaAI focuses heavily on accessibility for rural India, offering **instant, full-application translation into 7+ regional languages** so every user can navigate the app and understand complex AI security advice natively.

---

## 🚀 Key Features

* **📱 Multi-Modal Scam Detection**: Upload screenshots, forward suspicious SMS messages, or paste URLs. SurakshaAI uses Gemini Vision to extract and analyze text instantly without relying on fragile local OCR binaries.
* **🎙️ Audio Call Analysis**: Record a suspicious phone call and upload the `.mp3`/`.wav`. The AI will transcribe the spoken language and highlight predatory tactics or scam attempts.
* **🌐 Universal Native Translation**: A custom integration of Google Website Translator instantly translates the *entire UI* and the *AI outputs* into Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Odia, and Malayalam.
* **💬 AI Chatbot (Learning Center)**: Interactive AI assistant that teaches users digital literacy and helps them recognize the red flags of social engineering.
* **📊 Analytics Dashboard**: Track your scan history and view your digital safety score over time.

---

## 🛠️ Technology Stack

* **Frontend**: React, Vite, Tailwind CSS, Context API
* **Backend**: FastAPI (Python), Motor (MongoDB async driver), Uvicorn
* **Database**: MongoDB Atlas
* **Artificial Intelligence**: Google Gemini (1.5 / 2.5 Flash) via `google-generativeai` SDK
* **Translation**: Google Translate API Integration

---

## ⚙️ How to Run Locally

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* MongoDB Atlas connection string
* Google Gemini API Key

### 1. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:
```env
MONGODB_URL="your-mongodb-atlas-string"
GEMINI_API_KEY="your-gemini-api-key"
SECRET_KEY="your-secret-key"
```

Start the backend server:
```bash
uvicorn app.main:app --reload
```

### 2. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## 💡 The Problem We Solve
As digital penetration increases in rural India, millions of first-time internet users are becoming targets for sophisticated scams. SurakshaAI acts as a personalized cybersecurity expert in their pocket, analyzing threats natively in their regional language to prevent financial loss before it happens.
