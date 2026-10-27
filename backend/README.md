# Clinfay Backend

Python backend for the Clinfay clinic-discovery project. The backend is being built incrementally so each layer can be understood and tested before adding the next one.

## Step 1 — Health endpoint

This step intentionally implements only one endpoint:

- `GET /api/v1/health` — confirms that the API process is responding.

Clinic data, authentication, appointments, and database access are **not implemented yet**.

## Requirements

- Python 3.11 or newer
- pip
- A virtual environment

## Run on Linux / Fedora

From the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open the interactive API docs at `http://127.0.0.1:8000/docs` and call `GET /api/v1/health`.

Expected response:

```json
{
  "status": "ok",
  "service": "clinfay-api"
}
```

## Run tests

In a second terminal, with the same virtual environment activated:

```bash
cd backend
pytest -q
```

## Development rule

Do not add real clinic/user data or secrets to source control. Configuration, database access, authentication, and booking logic will be introduced in later steps with tests for each feature.
