.PHONY: help up up-d down down-v restart build ps logs logs-backend logs-frontend \
        test test-backend test-frontend test-coverage \
        e2e e2e-up lint format shell-backend shell-mongo

# ── Default ──────────────────────────────────────────────────────────────────

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ── Docker Compose ────────────────────────────────────────────────────────────

up: ## Build and start all services (attached)
	docker compose up --build

up-d: ## Build and start all services (detached)
	docker compose up --build -d

down: ## Stop and remove containers
	docker compose down

down-v: ## Stop containers and wipe volumes (destroys MongoDB data)
	docker compose down -v

restart: down up-d ## Restart all services

build: ## Build images without starting
	docker compose build

ps: ## Show running containers
	docker compose ps

# ── Logs ─────────────────────────────────────────────────────────────────────

logs: ## Stream logs for all services
	docker compose logs -f

logs-backend: ## Stream backend logs
	docker compose logs -f backend

logs-frontend: ## Stream frontend logs
	docker compose logs -f frontend

# ── Tests (requires running stack: make up-d first) ───────────────────────────

test: test-backend test-frontend ## Run all unit/integration tests

test-backend: ## Run backend tests inside container
	docker compose exec -T backend npm test

test-frontend: ## Run frontend tests inside container
	docker compose exec -T frontend npm test

test-coverage: ## Run tests with coverage for both packages
	docker compose exec -T backend npm run test:coverage
	docker compose exec -T frontend npm run test:coverage

# ── E2E (Playwright) ─────────────────────────────────────────────────────────

e2e: ## Run Playwright E2E tests (stack must already be running)
	cd e2e && npx playwright test

e2e-headed: ## Run Playwright E2E tests in headed mode
	cd e2e && npx playwright test --headed

e2e-up: ## Start stack, run E2E tests, then tear down
	$(MAKE) up-d
	@echo "Waiting for frontend..."
	@timeout 90 bash -c 'until curl -sf http://localhost:5173; do sleep 3; done'
	cd e2e && npx playwright test; EXIT=$$?; $(MAKE) down-v; exit $$EXIT

e2e-report: ## Open the last Playwright HTML report
	cd e2e && npx playwright show-report

# ── Code Quality ──────────────────────────────────────────────────────────────

lint: ## Run ESLint on backend and frontend
	docker compose exec -T backend npm run lint
	docker compose exec -T frontend npm run lint

format: ## Run Prettier on backend and frontend
	docker compose exec -T backend npm run format
	docker compose exec -T frontend npm run format

# ── Shells ────────────────────────────────────────────────────────────────────

shell-backend: ## Open a shell in the backend container
	docker compose exec backend sh

shell-frontend: ## Open a shell in the frontend container
	docker compose exec frontend sh

shell-mongo: ## Open mongosh in the MongoDB container
	docker compose exec mongodb mongosh -u root -p example --authenticationDatabase admin
