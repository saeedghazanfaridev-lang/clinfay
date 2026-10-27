# Backend implementation plan (not yet implemented)

This document is a learning and delivery plan for the project owner. It intentionally contains **no backend source code**. Each phase should be implemented by the owner, understood, tested, and committed by the owner before moving to the next phase.

## Rules for this project

- Do not add backend implementation on the owner's behalf.
- Work on one phase at a time. Read its GitHub issue, implement locally, run checks, and commit your own work.
- Keep this roadmap updated only as tasks are actually completed.
- An unchecked item is future work. Describing a feature does not mean it is implemented.
- Use sample data only during development. Never commit real patient data, credentials, or secrets.

## Phase 1 — FastAPI foundation

Tracking issue: [#2 — Build the FastAPI foundation yourself](https://github.com/saeedghazanfaridev-lang/clinfay/issues/2)

- [ ] Create a Python virtual environment for the backend.
- [ ] Learn how to create and run a minimal FastAPI application.
- [ ] Add a versioned health endpoint (for example, `GET /api/v1/health`).
- [ ] Open the generated OpenAPI docs and understand the request/response.
- [ ] Write a test for the health endpoint and run it locally.
- [ ] Document the run/test commands and explain each file in your own words.

## Phase 2 — Settings and PostgreSQL

Tracking issue: [#3 — Configure PostgreSQL and database migrations](https://github.com/saeedghazanfaridev-lang/clinfay/issues/3)

- [ ] Decide local PostgreSQL setup.
- [ ] Add environment-based settings without committing secrets.
- [ ] Configure database connection/session management.
- [ ] Choose/configure SQLAlchemy.
- [ ] Set up Alembic migrations.
- [ ] Verify connection/migration behavior and document setup/reset steps.

## Phase 3 — Clinic catalog and filters

Tracking issue: [#4 — Design clinic models and read-only catalog API](https://github.com/saeedghazanfaridev-lang/clinfay/issues/4)

- [ ] Inspect the frontend mock data and confirm clinic fields.
- [ ] Design clinic and specialty models.
- [ ] Add clearly marked development-only sample fixtures.
- [ ] Implement filter metadata, clinic list/search, and clinic detail endpoints.
- [ ] Add sorting/pagination and test invalid inputs, empty results, and missing IDs.
- [ ] Confirm response JSON against `API_CONTRACT.md`.

## Phase 4 — Authentication and authorization

Tracking issue: [#5 — Implement authentication and authorization](https://github.com/saeedghazanfaridev-lang/clinfay/issues/5)

- [ ] Define user model and request/response schemas.
- [ ] Validate phone numbers and handle duplicate registrations.
- [ ] Implement registration, login, and current-user retrieval.
- [ ] Hash passwords with a maintained password-hashing library.
- [ ] Decide token/session expiry and secret management.
- [ ] Add rate limiting and tests for invalid credentials and unauthorized requests.
- [ ] Review frontend token storage before connecting real accounts.

## Phase 5 — Slots and appointments

Tracking issue: [#6 — Model availability and appointment booking](https://github.com/saeedghazanfaridev-lang/clinfay/issues/6)

- [ ] Model availability slots and appointments.
- [ ] Implement available-slot lookup for a clinic/date.
- [ ] Implement authenticated booking and the user's own appointment list.
- [ ] Implement cancellation with ownership checks.
- [ ] Prevent simultaneous booking of the same active slot with database constraints/transactions.
- [ ] Test duplicate booking, invalid slots, cancellation, and cross-user access.

## Phase 6 — Reviews, blog, and frontend integration

Tracking issue: [#7 — Add reviews/blog endpoints and connect frontend features](https://github.com/saeedghazanfaridev-lang/clinfay/issues/7)

- [ ] Confirm review/blog schemas based on real frontend usage.
- [ ] Implement required read-only endpoints.
- [ ] Test limits, missing records, and response shapes.
- [ ] Configure the frontend API URL locally.
- [ ] Replace mock data one feature at a time.
- [ ] Verify loading, empty, validation-error, network-error, and unauthorized states.

## Phase 7 — Security review, automation, and deployment preparation

Tracking issue: [#8 — Security review, automation, and deployment preparation](https://github.com/saeedghazanfaridev-lang/clinfay/issues/8)

- [ ] Add/expand automated tests after there is implementation to test.
- [ ] Add CI checks for the actual code and tests.
- [ ] Review CORS, authentication, authorization, validation, rate limits, logs, and secrets.
- [ ] Verify migration and appointment-concurrency behavior.
- [ ] Consider Docker and document local start-up.
- [ ] Document deployment, migrations, backups, and known limitations.
- [ ] Do not use real patient data until a separate readiness/security review is complete.

## API contract

[`API_CONTRACT.md`](../API_CONTRACT.md) is a proposed interface for frontend integration, not an implemented backend. The owner may revise the contract while implementing; update the frontend only after the corresponding endpoint works and is tested.
