"""FastAPI application entry point for Clinfay.

Only the health endpoint is implemented in Step 1. Database and business
features are intentionally deferred to later, separately tested steps.
"""

from fastapi import FastAPI

app = FastAPI(
    title="Clinfay API",
    description="Backend API for the Clinfay clinic-discovery project.",
    version="0.1.0",
)


@app.get("/api/v1/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Return a lightweight response to verify that the API is running."""
    return {"status": "ok", "service": "clinfay-api"}
