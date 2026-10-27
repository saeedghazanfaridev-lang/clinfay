# Frontend / backend API contract (proposal only)

This document describes the API shape the current React frontend is prepared to consume. **It is not a backend implementation.** No routes, database, authentication service, or appointment service have been created by this document. The project owner will implement and verify each required endpoint as a learning step.

The frontend uses local mock data while `VITE_API_URL` is empty. When the owner is ready to integrate a working endpoint, set `VITE_API_URL` (for local development, a value such as `http://localhost:8000/api/v1`) and switch over one feature at a time.

> Treat these fields and paths as a draft contract. Confirm them while implementing; do not assume an endpoint is available merely because it is listed here.

## General expectations

- JSON request and response bodies.
- Proposed authenticated requests use `Authorization: Bearer <access_token>`. Token strategy is a future security decision; the frontend currently uses localStorage, which must be reviewed before real user accounts are introduced.
- Expected validation/error conventions should be confirmed during implementation. The frontend API client can display FastAPI's `detail` field.
- CORS should allow only explicit local and deployed frontend origins.
- Do not use real patient data or commit credentials/secrets while developing.

## Proposed endpoint list

### Filter metadata
- `GET /meta/filters`
- Proposed response: `{ "specialties": [], "districts": [], "visit_types": [] }`

### Clinic catalog
- `GET /clinics` with optional `specialty`, `district`, `visit_type`, `q`, `sort`, `featured`, `suggested`, `page`, and `limit`.
- Proposed response: `{ "items": [Clinic], "total": 0 }`, where total means total results before pagination.
- `GET /clinics/{id}` → one Clinic object.
- `GET /clinics/{id}/slots?date=YYYY-MM-DD` → proposed `{ "slots": ["09:00"] }`.

### Reviews and blog
- `GET /reviews?limit=3` → proposed `{ "items": [Review], "total": 0 }`.
- `GET /blog` → proposed `{ "items": [BlogPost], "total": 0 }`.
- `GET /blog/{id}` → one BlogPost, including content.

### Authentication (future)
- `POST /auth/register` with `{ "name", "phone", "password" }`.
- `POST /auth/login` with `{ "phone", "password" }`.
- `GET /auth/me` to read the current authenticated user.

### Appointments (future)
- `POST /appointments` with `{ "clinic_id", "date", "time", "visit_type", "note" }`.
- `GET /appointments/me` for the current user's appointments.
- `POST /appointments/{id}/cancel` to cancel an owned appointment.

## Suggested Clinic fields

`id`, `name`, `doctor_name`, `specialty`, `tags`, `district`, `address`, `phone`, `image_url`, `note`, `description`, `rating`, `reviews_count`, `visit_types`, `working_hours`.

## Suggested Appointment fields

`id`, `clinic_id`, `clinic_name`, `date`, `time`, `visit_type`, `note`, `status`.

## Security work to do during implementation

- Hash passwords using a maintained password-hashing library and never return/store plaintext passwords.
- Validate every input on the server.
- Check ownership for appointment history and cancellation.
- Prevent simultaneous bookings of the same active slot with appropriate database constraints and transaction handling.
- Rate-limit login attempts, configure secrets outside Git, and review token storage before real users are supported.

This contract can change as the owner implements and learns the real system.
