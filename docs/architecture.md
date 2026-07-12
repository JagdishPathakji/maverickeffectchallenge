# SurakshaAI Architecture

## High Level Architecture

```mermaid
graph TD
    subgraph Frontend [React Frontend (Vite)]
        UI[User Interface]
        AuthCtx[Auth Context]
        ThemeCtx[Theme Context]
        LangCtx[Language Context]
        Axios[Axios API Client]
        
        UI --> AuthCtx
        UI --> ThemeCtx
        UI --> LangCtx
        UI --> Axios
    end

    subgraph Backend [FastAPI Backend]
        API[API Routers]
        AuthServ[Auth Service]
        AIServ[AI Service]
        OCRServ[OCR Service]
        PromptServ[Prompt Service]
        DB[Database Session]
        
        API --> AuthServ
        API --> AIServ
        API --> OCRServ
        API --> DB
        
        AIServ --> PromptServ
    end

    subgraph ExternalServices [External Services]
        Gemini[Google Gemini API]
        Tesseract[Tesseract OCR Engine]
        Postgres[(PostgreSQL Database)]
    end

    Axios -- "REST (JSON)" --> API
    AIServ -- "HTTPS" --> Gemini
    OCRServ -- "Local Process" --> Tesseract
    DB -- "SQLAlchemy ORM" --> Postgres
```

## Data Flow Diagram (Analysis)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant FastAPI
    participant OCR Service
    participant Prompt Service
    participant Gemini AI
    participant PostgreSQL
    
    User->>Frontend: Upload Screenshot
    Frontend->>FastAPI: POST /api/v1/analysis/screenshot (Image File)
    FastAPI->>OCR Service: Pass Image Bytes
    OCR Service-->>FastAPI: Return Extracted Text
    FastAPI->>Prompt Service: Get Message Analysis Prompt (Text)
    Prompt Service-->>FastAPI: Formatted Prompt
    FastAPI->>Gemini AI: Request Content Generation
    Gemini AI-->>FastAPI: Return Structured JSON response
    FastAPI->>PostgreSQL: Save AnalysisHistory (Safe/Scam, Explanation)
    PostgreSQL-->>FastAPI: Return Saved Record
    FastAPI-->>Frontend: Return Analysis Result JSON
    Frontend->>User: Display Risk Badge, Explanation & Tips
```
