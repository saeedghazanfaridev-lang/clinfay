# Clinfay Backend Roadmap

This roadmap tracks planned work, not features that already exist.

## Step 1 — API foundation

- [x] Add a minimal FastAPI application.
- [x] Add `GET /api/v1/health`.
- [x] Add a test for the health endpoint.
- [ ] Run the tests locally and verify the endpoint in the interactive docs.

## Step 2 — Configuration and database

- Add settings loaded from environment variables.
- Add PostgreSQL connection settings and SQLAlchemy.
- Add Alembic migrations.
- Keep credentials out of Git; provide only a safe `.env.example`.

## Step 3 — Read-only clinic API

- Design the clinic and specialty data models.
- Add seeded development fixtures, clearly marked as sample data.
- Implement clinic listing, detail, and filter metadata endpoints.
- Test filtering, pagination, invalid inputs, and missing clinic IDs.

## Step 4 — Authentication

- Define request/response schemas.
- Hash passwords with a maintained password-hashing library.
- Add register, login, and current-user endpoints.
- Use short-lived tokens and keep secrets in environment configuration.
- Add validation, rate limits for login, and tests for unauthorized access.

## Step 5 — Appointments

- Model availability slots and appointments.
- Require authentication for booking and appointment history.
- Check appointment ownership before cancellation.
- Enforce slot uniqueness and booking concurrency at the database level.
- Test duplicate booking and cross-user access.

## Step 6 — Reviews, blog, and frontend integration

- Add endpoints only after their schemas and data requirements are agreed.
- Replace frontend mock data one endpoint at a time.
- Handle loading, empty, validation-error, and server-error states in the UI.

## Step 7 — Delivery

- Add Docker and a local PostgreSQL development service.
- Run automated checks in GitHub Actions.
- Document environment variables, migrations, deployment steps, and known limitations.

## Working agreement

Every step should have a small diff, a meaningful commit, passing tests, and a short explanation of the concepts used. Never document a planned feature as implemented.
