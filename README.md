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

There is intentionally no `backend/` implementation directory in this branch. Future backend work should be done by the project owner in small, understandable steps and reviewed/tested before moving to the next stage.

## Planned backend roadmap

1. **FastAPI foundation:** learn the application entry point, define a health endpoint, and verify it locally.
2. **Configuration and database:** environment variables, PostgreSQL connection, SQLAlchemy models, and migrations.
3. **Clinic catalog API:** filters, clinic list/detail, search, and pagination.
4. **Authentication:** registration, login, password hashing, token/session handling, and authorization.
5. **Appointments:** availability slots, booking, cancellation, ownership checks, and prevention of double-booking.
6. **Reviews and blog APIs:** define and implement read endpoints.
7. **Integration and delivery:** connect one frontend feature at a time, add tests, then consider Docker and deployment.

The [full roadmap](./docs/backend-roadmap.md) and GitHub issues are the working checklist. A feature must not be described as implemented until you have written and tested it yourself.

## Security note

The current frontend mock mode is for development only. Mock account information and tokens are kept in browser local storage; this is not suitable for real patient data. Do not enter real patient or medical information into this prototype. Security decisions for the real backend will be part of the learning and implementation work.

---

This project is under active development. The backend is planned, not implemented.
