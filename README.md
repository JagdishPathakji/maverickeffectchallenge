# SurakshaAI 🛡️

**SurakshaAI** is a comprehensive, AI-powered financial safety platform specially designed for first-time digital banking users in India (and beyond). It helps users detect scam calls, fake UPI requests, phishing attacks, fraudulent loan offers, and fake banking messages using state-of-the-art Large Language Models. 

The application is built with a highly responsive, modern, and accessible UI, and features a robust FastAPI Python backend connected to a PostgreSQL database.

## Key Features 🚀
- **Scam Message Detection**: Analyzes SMS, WhatsApp, and Telegram messages for phishing, OTP scams, and lotteries.
- **Screenshot Analysis (OCR)**: Upload screenshots of suspicious texts or apps. We extract the text locally using PyTesseract and analyze it with AI.
- **Fake UPI & Loan Fraud Checker**: Detect "Collect Request" traps, fake QR scams, and instant loan processing fee scams.
- **URL Analysis**: Verifies if a link is a phishing attempt.
- **Multilingual Support**: Supports English, Hindi, Marathi, Tamil, and more (Language selection available in the UI).
- **AI Chat Assistant**: Ask financial safety questions directly to our AI assistant.
- **Scam Learning Center**: An educational hub with real-world scam examples and prevention tips.
- **Dashboard & History**: Track all your past analyses with beautiful analytics and pie charts.

---

## System Architecture 🏗️

### Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Recharts, Framer Motion
- **Backend**: FastAPI (Python), SQLAlchemy ORM, Alembic, Passlib, JWT Auth
- **Database**: PostgreSQL
- **AI Provider**: Google Gemini API (`gemini-1.5-flash` for high quota & fast reasoning)
- **OCR Engine**: PyTesseract (Tesseract-OCR)

### See `docs/` for Mermaid diagrams:
- `docs/architecture.md`
- `docs/er_diagram.md`

---

## Installation & Setup 🛠️

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL server running locally or via Docker
- Tesseract OCR installed on your system (`apt-get install tesseract-ocr` or Windows installer)
- Gemini API Key from Google AI Studio

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Edit `.env` and set your POSTGRES credentials and GEMINI_API_KEY.

# Run Database Migrations
alembic upgrade head

# Start FastAPI Server
uvicorn app.main:app --reload
```
The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will be running at `http://localhost:5173`.

---

## Future Scope 🔮
- **Mobile App**: Wrapping the web UI in React Native for better accessibility in rural areas.
- **Voice Analysis**: Allow users to upload audio recordings of suspicious calls to detect voice cloning and urgency traps.
- **Bank Integration API**: Provide our scam scores directly to banking apps as an SDK.
