# Clinfay

Clinfay is a Persian-language clinic-discovery website. It aims to help people explore healthcare centers and find relevant providers by medical specialty, location, and visit type.

> **Project status:** The React frontend currently uses sample data. A first FastAPI backend foundation is being added in the `feat/backend-step-01-health-check` branch. Clinic search, database access, authentication, and appointment booking are not implemented yet.

## Project Background

I originally started Clinfay as a small frontend project built with **HTML, CSS, and some JavaScript**. Later, I changed my learning and career focus toward **backend development with Python**. After changing direction, I used AI assistance to rewrite the existing frontend with React. I am now building the Python backend step by step and connecting it to the frontend through APIs.

The aim is to understand the technical decisions, test each feature, and keep the documentation aligned with what is actually implemented.

## Current Frontend

The current repository frontend includes a Persian-language interface, clinic cards with sample data, reusable React components, and responsive page styling. It is still a frontend prototype: search, authentication, and appointment booking are not yet backed by a real API.

## Technology Stack

- **Frontend:** JavaScript, React 18, Vite, Tailwind CSS
- **Backend (in progress):** Python, FastAPI, Uvicorn, pytest
- **Planned database:** PostgreSQL (not configured yet)

## Run the Frontend

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Build the frontend:

```bash
npm run build
```

## Run the Backend (feature branch)

The first backend step adds `GET /api/v1/health`. It only proves the API process is responding; it is not a clinic API.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open `http://127.0.0.1:8000/docs` and call `GET /api/v1/health`.

Run the automated test from the `backend` directory:

```bash
pytest -q
```

## Repository Structure

```text
src/                    # React frontend
backend/
  app/main.py           # FastAPI application entry point
  tests/                # Backend tests
  requirements.txt      # Python development dependencies
docs/backend-roadmap.md # Incremental implementation plan
```

## Backend Roadmap

1. **API foundation:** health endpoint and test.
2. **Configuration and database:** environment-based settings, PostgreSQL, SQLAlchemy, and migrations.
3. **Read-only clinic API:** clinic data, detail endpoints, filters, and pagination.
4. **Authentication:** registration, login, password hashing, and access control.
5. **Appointments:** availability, booking, ownership checks, and protection against duplicate slot booking.
6. **Frontend integration:** replace sample data one endpoint at a time.
7. **Delivery:** automated tests, Docker, deployment documentation, and security review.

These are planned stages, not claims that those features are already implemented. Every stage should be small, documented, and tested before moving on.

---

This project is under active development. Features and documentation may change as development progresses.
