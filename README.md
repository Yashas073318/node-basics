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

`npm test` runs Jest + Supertest directly against the TypeScript sources. The CI workflow now lints (`npm run lint`), enforces formatting (`npm run format:check`), and runs the test + build steps on every push targeting `master`, `develop`, or `release/*`.

## Docker & deployment

- `Dockerfile` builds the production image and accepts `RELEASE_VERSION` (set in CI).
- `Dockerfile-Local` + `docker-compose.yml` power local live reload development.
- `.github/workflows/ci.yaml` includes two jobs:
  - **Unit Tests**: installs deps, runs lint/format checks, executes Jest, and compiles TypeScript.
  - **Build and Publish Image**: depends on tests, builds the Docker image, pushes it to GHCR, and runs Trivy OS/library scans with fail-fast behavior (controlled by `TRIVY_EXIT_CODE`).
- Branch protection: require both jobs to pass on the `master` branch before merging or tagging releases. (Set up in GitHub → Settings → Branches → `master`.)

## Release flow

When you’re ready to ship a change from `master`, use this checklist:

1. **Tag the app repo**
   ```bash
   git checkout master
   git pull origin master
   npm test && npm run lint && npm run build   # optional local safety check
   git tag v0.1.0
   git push origin v0.1.0
   ```
   The CI workflow triggered by the `v0.1.0` tag publishes `ghcr.io/<org>/<repo>:v0.1.0` (plus the usual SHA/latest tags) and runs Trivy scans.
2. **Promote via the infra repo**
   - In the prod-cluster repo, update `helm-charts/app/values.yaml` so `image.tag` matches the new version (e.g., `"v0.1.0"`).
   - Commit, open a PR, and merge into that repo’s deployment branch.
   - Your Helm/GitOps pipeline will reconcile and pull the freshly tagged image automatically.
