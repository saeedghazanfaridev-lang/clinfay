# Clinfay

Clinfay is a Persian-language clinic discovery and appointment-booking **frontend prototype** for finding healthcare providers by specialty, district, and visit type.

> **Current status:** This repository contains the React frontend, sample data, an API client, and planning documentation. **No Python backend has been implemented.** The backend will be written by the project owner, one step at a time, using the roadmap and GitHub issues.

## Project background

I started Clinfay as a small HTML/CSS/JavaScript frontend. Later, I focused my career direction on Python backend development and used AI assistance to rebuild the frontend with React. My next goal is to learn by implementing the backend myself, understanding each technical decision, and connecting the frontend to real APIs as each feature is completed.

## Current frontend

- Persian, right-to-left, responsive React interface
- Homepage, clinic search/listing, clinic detail, blog, and login/register/appointments UI
- Mock clinic, review, blog, and slot data so the interface can be explored before a backend exists
- API client and API contract to guide later integration

The login, registration, and booking flows run in local mock mode while `VITE_API_URL` is empty. They are **not real authentication or production booking**.

## Tech stack

- **Implemented frontend:** React 18, React Router, Vite, Tailwind CSS
- **Planned backend:** Python with FastAPI
- **Planned data layer:** PostgreSQL, SQLAlchemy, and Alembic (choices to be confirmed as implementation begins)

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

The frontend uses built-in sample data while `VITE_API_URL` is empty. Example configuration is in `.env.example`. [API_CONTRACT.md](./API_CONTRACT.md) documents the expected frontend/backend interface; it is a **specification only**, not a working backend.

## Repository structure

```text
src/                     # React frontend
src/api/                 # API client and mock data
src/pages/               # Frontend routes
docs/backend-roadmap.md  # Planned backend implementation steps
API_CONTRACT.md          # Expected API behavior; not implemented yet
```

There is intentionally no `backend/` implementation directory in this branch. Future backend work should be done by the project owner in small, understandable steps and tested before moving to the next stage.

## Backend plan

1. [Phase 1 — FastAPI foundation](https://github.com/saeedghazanfaridev-lang/clinfay/issues/2)
2. [Phase 2 — PostgreSQL and migrations](https://github.com/saeedghazanfaridev-lang/clinfay/issues/3)
3. [Phase 3 — Clinic models and read-only API](https://github.com/saeedghazanfaridev-lang/clinfay/issues/4)
4. [Phase 4 — Authentication and authorization](https://github.com/saeedghazanfaridev-lang/clinfay/issues/5)
5. [Phase 5 — Availability and appointments](https://github.com/saeedghazanfaridev-lang/clinfay/issues/6)
6. [Phase 6 — Reviews/blog and frontend integration](https://github.com/saeedghazanfaridev-lang/clinfay/issues/7)
7. [Phase 7 — Security, automation, and deployment planning](https://github.com/saeedghazanfaridev-lang/clinfay/issues/8)

The [full roadmap](./docs/backend-roadmap.md) is the checklist. A feature must not be described as implemented until you have written and tested it yourself.

## Security note

The current frontend mock mode is for development only. Mock account information and tokens are stored in browser local storage; this is not suitable for real patient data. Do not enter real patient or medical information into this prototype. Security decisions for the real backend belong to the implementation phase.

---

This project is under active development. The backend is planned, not implemented.
