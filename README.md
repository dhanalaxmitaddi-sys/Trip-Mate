# TripMind AI — Intelligent Travel Itinerary & Expense Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Free Tier](https://img.shields.io/badge/Architecture-100%25%20Free%20Tier-emerald.svg)](#free-tier-compliance)

> **Document Type:** Software Requirements Specification (SRS) & Software Design Document (SDD) Realization  
> **Application:** TripMind AI Version 1.0  
> **Platform:** Full-Stack MERN (MongoDB / In-Memory Fallback, Express.js, React + Vite, Node.js)

---

## 📖 Project Overview

**TripMind AI** is an autonomous AI-powered web platform engineered to eliminate manual travel planning friction. The platform accepts a traveler’s destination, dates, budget limit, traveler count, and interests to synthesize structured, day-by-day itineraries with time allocations, category cost calculations, real-time climate forecasts, and weather-driven packing checklists.

Engineered strictly in compliance with **IEEE Std 1016-2009 Software Requirements Specification (SRS)** and **Software Design Document (SDD)**.

---

## 🎯 SRS Traceability Matrix (Section 12)

Every functional requirement defined in SRS Section 3 is realized end-to-end:

| SRS Requirement ID | Requirement Name | Implemented As | API Endpoint | Frontend Page |
| :--- | :--- | :--- | :--- | :--- |
| **FR1** | **Trip Creation and Validation** | Controlled trip form with field-level constraints, past-date prevention, and integer validation | `POST /api/trips` | `/plan` |
| **FR2** | **AI Itinerary Generator** | 2–4 activities/day generation with time, duration, cost, category, and AI explanations | `POST /api/trips` | `/plan` |
| **FR3** | **Budget Calculator** | Real-time pure recalculator across 6 categories with Recharts Donut/Bar charts & overspend alerts | `GET /api/trips/:id` | `/budget` |
| **FR4** | **Place Recommendations** | Filterable catalog with search, tags, category pills, ratings, and "Add to Plan" modal | `GET /api/destinations/:id/places` | `/explore` |
| **FR5** | **Map and Directions** | Safe encoded Google Maps directions URL generator without paid maps API key | Client-side Maps Service | `/plan`, `/explore` |
| **FR6** | **Editable Trip Plan** | Day-by-day collapsibles, activity add/edit modals, move up/down reorder, and day regeneration | `PUT /api/trips/:id`, `POST /api/trips/:id/regenerate-day` | `/plan` |
| **FR7** | **Weather Forecast** | Day-by-day climate panel with temperatures, condition icons, humidity, and travel advisories | `GET /api/weather` | `/plan` |
| **FR8** | **Packing Checklist** | 6-group smart checklist scaled by days, climate conditions, and interests with check state sync | `GET/POST/PATCH/DELETE /api/packing/:id` | `/packing` |
| **FR9** | **Saved Trips** | Trip card library with View, Edit, Duplicate (cloning with new IDs), and Delete with ConfirmDialog | `GET/DELETE /api/trips/:id`, `POST /api/trips/:id/duplicate` | `/trips` |
| **FR10** | **Travel Assistant Chatbot** | Intent keyword detection (destination, budget, packing, food, hotels) with quick chips | `POST /api/assistant/chat` | `/assistant` |
| **FR11** | **PDF Export** | Client-side jsPDF document compilation with daily schedule, budget breakdown, and packing list | Client-side PDF Service | `/plan`, `/dashboard` |
| **FR12** | **Dashboard & Navigation** | Metric summary tiles (saved trips, upcoming, budget), quick actions, and 7-item navigation bar | `GET /api/trips` | `/dashboard`, `/` |

---

## ⚙️ Free Tier Compliance & Zero Cost Architecture

- **No Paid APIs:** Zero billing, no credit card, no OpenAI API key required.
- **Rule-Based Mock AI Engine:** Features an intelligent scoring engine (`Score(p) = 0.45*I(p) + 0.25*R(p) + 0.20*B(p) + 0.10*D(p)`) with simulated model latency (800ms).
- **Google Maps Integration:** Uses standard HTTPS URL encoding (`https://www.google.com/maps/dir/?api=1&destination=...`) requiring no Google Maps API keys or billing accounts.
- **Dual Persistence:** Connects to MongoDB Atlas Free Tier when configured, and automatically switches to an in-memory datastore with localStorage synchronization if MongoDB is not present. The system never crashes.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js 18 + Vite
- **Styling:** Vanilla Tailwind CSS with custom glassmorphism, gradient accents, and micro-animations
- **Routing:** React Router v6
- **Data Visualizations:** Recharts (Donut Pie Charts & Category Bar Charts)
- **Icons:** Lucide React
- **Document Export:** jsPDF (Client-side single-pass PDF generator)
- **HTTP Client:** Axios with JWT request interceptors

### Backend
- **Runtime:** Node.js (v18+)
- **Server Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ORM) with automatic In-Memory Store Fallback
- **Authentication:** JSON Web Tokens (JWT) + Bcrypt password hashing
- **Security:** Input sanitization, CORS, and centralized error handling middleware

---

## 📂 Project Structure

```
TRIP MATE/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityCard.jsx        # Activity item with map directions & CRUD actions
│   │   │   ├── ActivityEditorModal.jsx # Validated modal to add or edit itinerary item
│   │   │   ├── BudgetChart.jsx         # Recharts Donut & Bar charts with warning banner
│   │   │   ├── ConfirmDialog.jsx       # Modal for trip deletion & day regeneration
│   │   │   ├── EmptyState.jsx          # Reusable fallback state when list is empty
│   │   │   ├── Footer.jsx              # Platform footer with IEEE SRS disclaimer
│   │   │   ├── GenerationLoader.jsx    # Step-by-step simulated AI inference overlay
│   │   │   ├── Navbar.jsx              # Header with 7 routes & active trip switcher
│   │   │   ├── PackingGroup.jsx        # Grouped packing checklist with add/delete
│   │   │   ├── PlaceCard.jsx           # Place card with rating, price, and actions
│   │   │   ├── PlaceDetailModal.jsx    # Full modal with opening hours & directions
│   │   │   ├── ProtectedRoute.jsx      # Route guard with loading spinner
│   │   │   ├── Toast.jsx               # Dynamic toast alert notifications
│   │   │   └── WeatherPanel.jsx        # Day-by-day temperature & humidity forecast
│   │   ├── context/
│   │   │   ├── AuthContext.jsx         # JWT session & 1-Click Demo Login
│   │   │   ├── TripContext.jsx         # Active trip, saved trips, and budget calculations
│   │   │   └── UIContext.jsx           # Toasts and modal state
│   │   ├── data/
│   │   │   └── destinations.js         # Supported destination dataset (Goa, Delhi, Jaipur...)
│   │   ├── pages/
│   │   │   ├── About.jsx               # Traceability Matrix, Architecture & Tech Stack
│   │   │   ├── BudgetTracker.jsx       # Category calculations & Recharts analytics
│   │   │   ├── Dashboard.jsx           # FR12: Metrics tiles, recent trip hero, quick actions
│   │   │   ├── ExplorePlaces.jsx       # FR4: Spot explorer with category & search filters
│   │   │   ├── Landing.jsx             # High-impact animated hero & destination cards
│   │   │   ├── Login.jsx               # Auth page with 1-click evaluator login
│   │   │   ├── MyTrips.jsx             # FR9: Saved trips library with duplicate & delete
│   │   │   ├── PackingList.jsx         # FR8: Smart climate-adapted checklist
│   │   │   ├── PlanTrip.jsx            # FR1 & FR2: Trip creation form & day-by-day editor
│   │   │   ├── Register.jsx            # Account registration
│   │   │   └── TravelAssistant.jsx     # FR10: AI chatbot with intent detection
│   │   ├── services/
│   │   │   ├── aiService.js            # Mock AI service with 800ms delay & structured JSON
│   │   │   ├── api.js                  # Axios instance with auth interceptor
│   │   │   ├── mapsService.js          # Google Maps safe query builder
│   │   │   ├── pdfService.js           # jsPDF travel document builder
│   │   │   └── storage.js              # Safe LocalStorage parsing utility
│   │   ├── App.jsx                     # Route definitions & layout wrappers
│   │   ├── index.css                   # Tailwind styles, glassmorphism & gradients
│   │   └── main.jsx                    # React root mount
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   ├── db.js                       # Mongoose connection with In-Memory fallback
│   │   └── memoryStore.js              # Seeded demo datastore for zero-dependency runs
│   ├── controllers/
│   │   ├── assistantController.js      # FR10 chat endpoint
│   │   ├── authController.js           # Register, login, demo login, getMe
│   │   ├── destinationController.js    # FR4 destinations & places
│   │   ├── packingController.js        # FR8 packing items CRUD
│   │   ├── tripController.js           # FR1, FR2, FR6, FR9 trip lifecycle & duplicate
│   │   └── weatherController.js        # FR7 climate forecast
│   ├── data/
│   │   └── destinations.js             # Detailed records for Goa, Delhi, Jaipur, Manali, Mumbai, Kerala
│   ├── middleware/
│   │   ├── authMiddleware.js           # JWT verification with guest fallback
│   │   └── errorHandler.js             # Standardized API response formatter
│   ├── models/
│   │   ├── Destination.js              # Destination & Places schema
│   │   ├── Packing.js                  # Packing checklist schema
│   │   ├── Trip.js                     # Trip, DayPlan & Activity schema
│   │   └── User.js                     # User account schema
│   ├── routes/
│   │   ├── assistant.js
│   │   ├── auth.js
│   │   ├── destination.js
│   │   ├── packing.js
│   │   ├── trip.js
│   │   └── weather.js
│   ├── services/
│   │   ├── chatbotService.js           # Keyword scoring & intent detection
│   │   └── plannerService.js           # Scoring formula, day builder & budget recalculator
│   ├── package.json
│   └── server.js                       # Express main entry
├── .env.example
├── package.json
└── README.md
```

---

## 🗄️ Data Models (Mongoose & In-Memory)

### 1. User (`models/User.js`)
- `name`: String (Required)
- `email`: String (Unique, Required)
- `password`: String (Hashed via Bcrypt)
- `createdAt`: Date

### 2. Trip (`models/Trip.js`)
- `destinationId`: String (e.g., `'goa'`, `'manali'`)
- `destinationName`: String
- `destinationType`: String (`'beach'`, `'hill'`, `'heritage'`, `'metro'`, `'nature'`)
- `startDate`: String (ISO YYYY-MM-DD)
- `endDate`: String (ISO YYYY-MM-DD)
- `budget`: Number (Positive integer)
- `travelers`: Number (>= 1)
- `interests`: Array of Strings (`'Food'`, `'Nature'`, `'History'`, `'Beach'`, `'Adventure'`, `'Shopping'`, `'Culture'`)
- `status`: String (`'Draft'`, `'Upcoming'`, `'Ongoing'`, `'Completed'`)
- `source`: String (`'ai'`, `'rule-based'`)
- `days`: Array of DayPlans:
  - `id`: String
  - `dayNumber`: Number
  - `date`: String
  - `notes`: String
  - `activities`: Array of Activities:
    - `id`: String
    - `placeId`: String (Optional reference to destination place)
    - `name`: String
    - `category`: String
    - `time`: String (e.g. `'09:00'`)
    - `durationMinutes`: Number
    - `location`: String
    - `cost`: Number
    - `costCategory`: String (`'Transport'`, `'Hotel'`, `'Food'`, `'Activities'`, `'Shopping'`, `'Other'`)
    - `reason`: String (Explaining why it was recommended)

### 3. Packing (`models/Packing.js`)
- `tripId`: String
- `items`: Array of:
  - `id`: String
  - `group`: String (`'Clothing'`, `'Toiletries'`, `'Documents'`, `'Electronics'`, `'Health and safety'`, `'Activity essentials'`)
  - `label`: String
  - `checked`: Boolean

---

## 🌐 API Endpoints Reference

All API responses follow the standardized envelope:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Login with email and password | Public |
| `POST` | `/api/auth/demo-login` | 1-Click Instant Demo Authentication | Public |
| `GET` | `/api/auth/me` | Fetch active user credentials | Protected |
| `GET` | `/api/trips` | Retrieve all saved trips with computed budget stats | Protected / Demo |
| `POST` | `/api/trips` | Generate new trip with AI itinerary & packing list | Protected / Demo |
| `GET` | `/api/trips/:id` | Fetch single trip with complete breakdown | Protected / Demo |
| `PUT` | `/api/trips/:id` | Update activities, day schedules, or budget limit | Protected / Demo |
| `DELETE` | `/api/trips/:id` | Delete saved trip and associated checklists | Protected / Demo |
| `POST` | `/api/trips/:id/duplicate` | Duplicate trip with new IDs and "Copy of" label | Protected / Demo |
| `POST` | `/api/trips/:id/regenerate-day` | Regenerate activities for a single day | Protected / Demo |
| `GET` | `/api/destinations` | List supported destinations (Goa, Delhi, Jaipur...) | Public |
| `GET` | `/api/destinations/:id` | Get destination details, rates, and weather | Public |
| `GET` | `/api/destinations/:id/places` | Filter and search places in destination | Public |
| `GET` | `/api/packing/:tripId` | Fetch packing items for active trip | Protected / Demo |
| `POST` | `/api/packing/:tripId` | Add custom packing checklist item | Protected / Demo |
| `PATCH` | `/api/packing/:tripId/toggle/:itemId` | Toggle checked state of packing item | Protected / Demo |
| `DELETE` | `/api/packing/:tripId/:itemId` | Remove packing item from checklist | Protected / Demo |
| `POST` | `/api/assistant/chat` | Query Travel Assistant with intent detection | Public |
| `GET` | `/api/weather` | Query day-by-day temperature & travel advice | Public |

---

## 🤖 How the Mock AI Service Operates

The AI engine in `client/src/services/aiService.js` and `server/services/plannerService.js` executes an autonomous heuristic ranking algorithm:

1. **Place Scoring Formula (SDD §6.1):**
   $$\text{Score}(p) = 0.45 \cdot I(p) + 0.25 \cdot \frac{R(p)}{5} + 0.20 \cdot B(p) + 0.10 \cdot D(p)$$
   - $I(p)$: Fraction of selected traveler interests matched by the attraction's tags.
   - $R(p)$: Verified traveler rating (out of 5 stars).
   - $B(p)$: Budget fit factor (1.0 if within target allowance, scaled down if price exceeds threshold).
   - $D(p)$: Diversity bonus (favors categories not yet scheduled that day).
2. **Time-Slot Allocation:** Slots activities into morning (`09:00`), lunch/midday (`12:30`), afternoon (`15:30`), and dinner/evening (`19:00`).
3. **Simulated Model Inference:** Implements an asynchronous 800ms delay to simulate large language model token generation before returning structured JSON.
4. **Chatbot Intent Detection (SDD §6.3):** Tokenizes incoming messages and scores keyword frequencies across 8 distinct categories (`destination`, `budget`, `interests`, `packing`, `hotels`, `food`, `attractions`, `itinerary`).

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18 or higher
- Git

### 1. Clone & Install
```bash
git clone <repository-url>
cd "TRIP MATE"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment (Optional)
The application works immediately out-of-the-box with built-in zero-dependency fallbacks. To connect your own MongoDB Atlas cluster:
1. In `server/`, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your `MONGO_URI` connection string (leave blank to run in In-Memory mode).

### 3. Start Development Servers
From the root directory:
```bash
# Terminal 1: Start Backend Server (port 5000)
node server/server.js

# Terminal 2: Start Vite Frontend (port 5173)
cd client
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

## 🚢 Deployment Guide

### Deploying Frontend to Vercel
1. Set **Root Directory** to `client`.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variable: `VITE_API_URL=https://your-backend-service.onrender.com/api`.

### Deploying Backend to Render
1. Create a new **Web Service** pointing to the repository.
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`.
4. Start Command: `node server.js`.
5. Add Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `JWT_SECRET=your_jwt_secret`
   - `MONGO_URI=your_mongodb_atlas_uri`

---

## 📄 Final Year Project Defense Notes

- **Traceability Guarantee:** All 12 Functional Requirements from the SRS are realized in active code.
- **No Non-Working Buttons:** Every button, filter, link, modal, and export action performs its documented function.
- **Examiner Demo Mode:** The application features a 1-click **"Demo Mode"** on both the Navbar and Login pages, allowing reviewers to evaluate the platform without filling out forms or setting up databases.
