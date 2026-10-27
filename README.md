# Clinfay

Clinfay is a Persian-language clinic discovery and appointment-booking frontend for finding healthcare providers by specialty, district, and visit type.

> **Current status:** The updated React frontend is present on this feature branch. It uses sample data by default. The Python backend currently implements only a health-check endpoint; clinic APIs, real authentication, PostgreSQL, and appointment booking are future steps.

## Project background

I started Clinfay as a small HTML/CSS/JavaScript frontend. Later, I focused my career direction on Python backend development and used AI assistance to rebuild the frontend with React. My goal now is to build the backend myself, step by step, understand the design decisions, and connect the frontend to a real API.

## Current frontend

- Persian, right-to-left, responsive React interface
- Homepage, clinic search/listing, clinic details, blog, login/register UI, and appointments UI
- Mock clinic, review, blog, and slot data so the interface can be explored before the real backend is ready
- API client and contract prepared for later integration with FastAPI

The login, registration, and booking flows run in local mock mode while `VITE_API_URL` is empty. They are **not real, production authentication or booking**.

## Tech stack

- **Frontend:** React 18, React Router, Vite, Tailwind CSS
- **Backend in progress:** Python, FastAPI, Uvicorn, pytest
- **Database planned:** PostgreSQL (not yet configured)

## Run the frontend

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

The frontend uses its built-in sample data if `VITE_API_URL` is empty. Example configuration is in `.env.example`. The expected API contract is documented in [API_CONTRACT.md](./API_CONTRACT.md).

## Run the backend

From the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs), then call `GET /api/v1/health`.

Run the backend test:

```bash
cd backend
pytest -q
```

Expected health response:

```json
{ "status": "ok", "service": "clinfay-api" }
```

## Project structure

```text
src/                     # React frontend
src/api/                 # API client and mock data
src/pages/               # Frontend routes
backend/app/main.py      # FastAPI application
backend/tests/           # Backend tests
docs/backend-roadmap.md  # Incremental backend roadmap
API_CONTRACT.md          # Frontend/backend contract
```

## Backend roadmap

1. **API foundation:** health endpoint and test.
2. **Configuration and database:** environment settings, PostgreSQL, SQLAlchemy, and migrations.
3. **Read-only clinic API:** clinic data, details, filters, and pagination.
4. **Authentication:** registration, login, password hashing, and access control.
5. **Appointments:** availability, booking, ownership checks, and protection against double booking.
6. **Frontend integration:** switch from mock data to the real API one endpoint at a time.
7. **Delivery:** automated checks, Docker, deployment, and security review.

The full checklist is in [docs/backend-roadmap.md](./docs/backend-roadmap.md). Features are not considered implemented until their code and tests exist.

## Security note

The current mock frontend is for development only. It stores mock account information in browser local storage, and the API client currently stores a bearer token in local storage. Before a production release, the real backend must use secure password hashing, server-side validation, authorization/ownership checks, rate limiting, and transaction-safe appointment booking. Do not enter real patient or medical information into this prototype.

---

This project is under active development. Each backend step should remain small, documented, and tested.
