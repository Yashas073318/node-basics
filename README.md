# Node Basics API

This repository demonstrates a minimal **TypeScript** Express API wired up with Docker, GitHub Actions, and a Helm values file so you can practice the release flow we discussed.

## Local development

```bash
cp .env.example .env
npm install
npm run dev          # uses tsx for live reload
# or with Docker
docker compose up --build
```

The API exposes:

- `GET /` – welcome payload
- `GET /health` – readiness probe
- `GET /api/tasks` – list in-memory tasks
- `GET /api/tasks/:id`
- `POST /api/tasks` – create a task

## Testing

`npm test` runs Jest + Supertest directly against the TypeScript sources. The `unit-test.yaml` workflow runs the same suite on every push/PR targeting `main`, `develop`, or `feature/*`.

## Docker & deployment

- `Dockerfile` builds the production image and accepts `RELEASE_VERSION` (set in CI).
- `Dockerfile-Local` + `docker-compose.yml` power local live reload development.
- `.github/workflows/ci.yaml` installs deps, runs tests, and pushes the container to GHCR (`ghcr.io/<org>/<repo>`). Tags include the commit SHA, the Git ref (e.g., `v1.2.3`), and `latest`.

## Helm promotion flow

The `helm-charts/app/values.yaml` file mirrors the prod-cluster values you described:

1. Create a release tag (e.g., `v1.2.3`). GitHub Actions builds/pushes `ghcr.io/<org>/<repo>:v1.2.3`.
2. In your infra repo, bump `image.tag` inside `helm-charts/app/values.yaml` (or copy this file there) to the new tag.
3. Apply the chart via your preferred GitOps/Helm tooling. The deployment template pulls the new image and keeps the health probes/resources consistent with the values file.

Feel free to extend the chart with ingress rules, cronjobs, or secrets lists to match your production setup—the scaffolding here mirrors the structure you shared.
