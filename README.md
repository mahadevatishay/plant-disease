# LeafScan AI — Plant Disease Classification Web App

A production-ready React + FastAPI showcase for the EfficientNet plant disease classifier.

---

## Quick Start

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The app works **fully without a backend** — it falls back to rich demo predictions when the FastAPI server is offline.

---

## Project Structure

```
plantdisease-web/
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.tsx        # Router + AnimatePresence
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Sticky nav with active-pill animation
│   │   │   ├── Footer.tsx             # Contact + links
│   │   │   ├── ThemeToggle.tsx        # Dark/light toggle with spring animation
│   │   │   ├── Predictor.tsx          # Core upload + diagnosis UI
│   │   │   ├── StatsBar.tsx           # 6-column animated metrics
│   │   │   ├── ModelComparisonTable.tsx # Animated benchmark table
│   │   │   ├── PipelineDiagram.tsx    # Training pipeline visual
│   │   │   ├── CropGrid.tsx           # 22 crops grid
│   │   │   ├── SectionHeading.tsx     # Reusable section header
│   │   │   └── PageWrapper.tsx        # Page transition wrapper
│   │   ├── pages/
│   │   │   ├── Home.tsx   # Hero + all sections
│   │   │   ├── Demo.tsx   # Isolated predictor page
│   │   │   ├── About.tsx  # README + setup guide
│   │   │   └── Blog.tsx   # Research paper
│   │   └── utils/
│   │       ├── api.ts     # Axios + mock fallback
│   │       └── theme.ts   # Dark mode logic
│   └── public/
│       ├── manifest.json  # PWA manifest
│       └── favicon.svg
└── backend/               # Use existing FastAPI server (see below)
```

---

## Backend

Use the **existing FastAPI server** from the PlantDisease repo at `./server/`.

### Enhancements recommended for this frontend:

The frontend expects this response shape from `POST /predict`:

```json
{
  "disease": "Tomato Late Blight",
  "confidence": 0.956,
  "cause": "Phytophthora infestans (water mold)",
  "symptoms": ["Dark water-soaked lesions on leaves", "..."],
  "treatment": ["Apply copper-based fungicides", "..."],
  "alternatives": [
    { "disease": "Tomato Early Blight", "confidence": 0.031 }
  ],
  "plant_type": "Tomato",
  "is_healthy": false
}
```

If your existing `/predict` returns a different shape, either:
1. Add a transformer in `frontend/src/utils/api.ts`, or
2. Update the FastAPI response model to match

### CORS: add to your FastAPI main.py

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-vercel-app.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Environment Variables

Create `frontend/.env.local`:
```
VITE_API_URL=http://127.0.0.1:5000
```

For production (Vercel):
```
VITE_API_URL=https://your-backend.railway.app
```

---

## Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import on vercel.com → Framework: Vite → auto-detected
3. Add env var: `VITE_API_URL=<your backend URL>`
4. Deploy

### Backend → Railway
1. Push `server/` directory to GitHub
2. New project on railway.app → Deploy from GitHub
3. Railway detects `docker-compose.yml` automatically
4. Set `PORT=5000` environment variable
5. Copy the Railway URL → paste into Vercel env var

### Backend → Render
1. New Web Service on render.com
2. Connect GitHub repo → Root directory: `server`
3. Runtime: Docker
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

## Screenshots (Described)

### Screen 1 — Hero Section
Large headline "Detect plant disease in 22 milliseconds" with an underline SVG accent. Green gradient blobs in the background. Six-column stats bar (95.9%, 87K, 22ms, 22, 19M, 22MB). Below: the inline Predictor with drag-drop zone.

### Screen 2 — Live Demo Page
Full-screen predictor with a scanned leaf preview. On the right: disease result card showing "Tomato Late Blight" at 95.6% confidence with an animated green bar, cause/symptoms/treatment panels, and alternative predictions dropdown.

### Screen 3 — Research Paper Page
Clean editorial layout with paper title, three author cards, formatted abstract with forest-green left border, and paper sections in collapsible cards. Reference list with numbered citations.

---

## Design System

- **Font**: Bricolage Grotesque (display) + DM Sans (body) + JetBrains Mono (code)
- **Colors**: Forest greens (#166534, #4ade80) + Soil oranges (#d97706) + Warm bark grays
- **Motion**: Framer Motion for page transitions, scroll-triggered reveals, loading scan line
- **Theme**: CSS variables + Tailwind dark: class — auto-detects prefers-color-scheme, saves to localStorage

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Animation | Framer Motion 11 |
| Routing | React Router 6 |
| HTTP | Axios |
| Icons | Lucide React |
| Backend | FastAPI + Uvicorn + Docker |
| Model | EfficientNet-B4 → TFLite INT8 |
| Deploy | Vercel (FE) + Railway/Render (BE) |
