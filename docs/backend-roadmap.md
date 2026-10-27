# Backend implementation plan (not yet implemented)

This document is a learning and delivery plan for the project owner. It intentionally contains **no backend source code**. Each phase should be implemented by the owner and committed only after understanding and testing it.

## Rules for this project

- Do not generate or add backend implementation on the owner's behalf.
- Work on one phase at a time. Read the relevant issue, implement it locally, run the checks, and commit the owner's own work.
- Keep this roadmap updated as tasks are actually completed.
- An unchecked item is planned work. Never mark a feature complete just because it has been described or discussed.
- Use sample data only while developing; do not add real patient data, credentials, or secrets to Git.

## Phase 1 — FastAPI foundation

- [ ] Create a Python virtual environment for the backend.
- [ ] Learn how to create and run a minimal FastAPI application.
- [ ] Add a versioned health endpoint (for example, `GET /api/v1/health`).
- [ ] Open the generated OpenAPI docs and understand the request/response.
- [ ] Write a test for the health endpoint and run it locally.
- [ ] Document the run/test commands.
- Tracking issue: create/link the Phase 1 GitHub issue.

## Phase 2 — Settings and PostgreSQL

- [ ] Decide and document environment-based settings.
- [ ] Set up a local PostgreSQL development database.
- [ ] Choose and configure SQLAlchemy.
- [ ] Learn and configure Alembic migrations.
- [ ] Add connection/session management and test the database connection.
- [ ] Ensure credentials remain outside source control (use a safe example file only).

## Phase 3 — Clinic catalog and filters

- [ ] Model clinics and specialties based on the frontend's actual fields.
- [ ] Decide how development sample rows will be loaded.
- [ ] Implement the filter metadata endpoint.
- [ ] Implement clinic listing with filters, search, sorting, and pagination.
- [ ] Implement clinic detail with clear 404 behavior.
- [ ] Test valid requests, invalid query parameters, and empty results.
- [ ] Keep response JSON aligned with `API_CONTRACT.md`.

## Phase 4 — Authentication and authorization

- [ ] Agree on request/response schemas and phone-number validation.
- [ ] Implement registration and unique phone-number handling.
- [ ] Hash passwords with a maintained password-hashing library; never store plaintext passwords.
- [ ] Implement login and the current-user endpoint.
- [ ] Choose token/session expiry and secret configuration deliberately.
- [ ] Add login rate limiting and tests for invalid credentials and unauthorized requests.
- [ ] Review the frontend's localStorage token approach before using real accounts.

## Phase 5 — Slots and appointments

- [ ] Model availability slots and appointments.
- [ ] Implement listing of available slots for a clinic and date.
- [ ] Implement authenticated booking and the user's own appointment list.
- [ ] Prevent two users from booking the same active slot using database constraints/transactions.
- [ ] Implement cancellation with an ownership check.
- [ ] Test duplicate booking, invalid slots, cancellation, and cross-user access.

## Phase 6 — Reviews and blog

- [ ] Define review and blog schemas based on current frontend expectations.
- [ ] Implement read-only list/detail endpoints where required.
- [ ] Test pagination/limits and 404 behavior.
- [ ] Only add write endpoints if the product requirements call for them.

## Phase 7 — Connect frontend and verify

- [ ] Configure `VITE_API_URL` locally.
- [ ] Connect one UI feature to one implemented endpoint at a time.
- [ ] Test loading, empty, validation-error, unauthorized, and server-error states.
- [ ] Verify CORS uses explicit development/production origins.
- [ ] Add CI checks after there is real backend code and tests to run.

## Phase 8 — Packaging and deployment

- [ ] Add Docker only after the app and database work locally.
- [ ] Document environment variables, database migration steps, and deployment.
- [ ] Verify logs do not leak secrets or sensitive patient data.
- [ ] Complete a security review before using real user or health information.

## API contract

[`API_CONTRACT.md`](../API_CONTRACT.md) is a proposed interface for connecting frontend and backend. It is not evidence that any endpoint exists. The implementation may refine the contract; update both the documentation and frontend only after the owner has made and tested that decision.
