FROM python:3.10-slim

RUN pip install poetry

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-root --only main

ENV VENV=/.venv \
    PATH="/.venv/bin:$PATH"

COPY src ./src

ENTRYPOINT ["uvicorn", "--host", "0.0.0.0", "--port", "8000", "src.main:app"]
