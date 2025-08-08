# TodoMVC React – Cypress E2E Tests

This project contains Cypress end-to-end tests for a TodoMVC-style React app.  
The tests can be run locally against a Dockerized version of the app or automatically in GitHub Actions.

---

## Step 1 – Prerequisites & Repo Overview

### Prerequisites
Make sure you have the following installed before running anything:

- **Docker** – To run the prebuilt public image `dhruvd22/todomvc-react`
- **Node.js** & **npm** – To install Cypress and related dependencies
- **Cypress CLI** – Optional if installed globally; you can also run with `npx` without global install

> **Note on `baseUrl`:**  
> The Cypress configuration currently points to `http://localhost:3000` (`cypress.config.js`).  
> - Locally → Keep port `3000` open for the app container.  
> - If deploying elsewhere → Update `baseUrl` in `cypress.config.js` or override at runtime.

---

### Repository File Overview

- **`package.json`** – Project metadata, npm scripts (`cypress:run`, `cypress:open`), dev dependencies (Cypress, wait-on).
- **`package-lock.json`** – Locks dependencies to specific versions for reproducible installs.
- **`.github/workflows/cypress.yml`** – GitHub Actions workflow that:
  - Spins up the app from your public Docker Hub image.
  - Waits for the app to become healthy.
  - Runs Cypress tests in headless mode.
- **`cypress/support/e2e.js`** – Global Cypress support file; imports custom commands from `commands.js`.
- **`cypress/e2e/todos.cy.js`** – The Cypress test suite:
  - Adds a todo.
  - Marks a todo as completed.
  - Deletes a todo.
- **`cypress.config.js`** – Cypress configuration:
  - `baseUrl`, test file patterns, support file path.
- **`cypress/support/commands.js`** – Custom Cypress commands (e.g., `addTodo` helper).
- **`Dockerfile`** – Defines how the TodoMVC React app is built and served on port 3000.

---

## Step 2 – Run Locally (Docker)

You can run the tests against the prebuilt public Docker image without building the app yourself.

1. **Pull and run the app container:**
    ```bash
    docker pull dhruvd22/todomvc-react
    docker run -d -p 3000:3000 dhruvd22/todomvc-react
    ```
    > If port 3000 is already in use, map to a different host port (e.g., `-p 3005:3000`) and update Cypress `baseUrl` or override at runtime:
    > ```bash
    > CYPRESS_baseUrl=http://localhost:3005 npx cypress run
    > ```

2. **Verify the app is running:**
    - Open a browser and visit:  
      [http://localhost:3000](http://localhost:3000)

3. **Install dependencies & run Cypress:**
    ```bash
    npm ci
    npx cypress run     # Headless mode
    npx cypress open    # Interactive mode (GUI)
    ```

---

## Step 3 – Run in GitHub Actions (CI)

This project includes a GitHub Actions workflow that runs the tests automatically in CI.

1. **Push this repo to GitHub.**
2. Ensure `.github/workflows/cypress.yml` is present.
3. On every push or pull request to `main`, GitHub Actions will:
    1. Start the `dhruvd22/todomvc-react` container.
    2. Wait until the container passes its health check.
    3. Run Cypress tests in headless mode.
4. To test against a different environment or port, adjust `cypress.config.js` or override `baseUrl` in the workflow step.

---

## Example Commands

Run tests locally against a container on port 3000:
```bash
docker run -d -p 3000:3000 dhruvd22/todomvc-react
npm ci
npx cypress open
```

Run tests locally against a container on a different port:
```bash
docker run -d -p 3005:3000 dhruvd22/todomvc-react
npm ci
CYPRESS_baseUrl=http://localhost:3005 npx cypress open
```

---

## License
MIT
