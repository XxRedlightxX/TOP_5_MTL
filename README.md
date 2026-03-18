![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
# Playwright QA Automation Framework

End-to-end **QA automation framework** built with **Playwright** for a full-stack application using **Laravel (Backend)** and **Vue.js (Frontend)**.

This project demonstrates QA automation practices including:

- UI and API test automation using Playwright
- Parallel test execution
- Cross-browser testing (Chrome & Edge)
- CI/CD integration
- Automatic Jira ticket creation on test failures with screenshots
- HTML test reporting
- Authentication reuse with storageState 


## Prerequisite

- PHP 8.2+ & Composer
- Node.js (v18+)
- SQLite (for local testing environment)

# Features

## Parallel Test Execution
- To optimize performance and reduce feedback loops, the framework leverages Playwright Workers. Workers are independent OS processes that run tests simultaneously, significantly cutting down the total execution time compared to serial execution.

### Benefits
- **Isolation**: Each worker starts its own browser instance. They do not share state, ensuring that a failure in one test does not impact another.
- **Faster Results**: Drastically reduces total run time by splitting tests across multiple CPU cores.

- **Quick Feedback**: Accelerates CI/CD pipelines, allowing for faster code merges and deployments.

- **Exposes Flakiness**: Highlights hidden dependencies or data "collisions" that serial testing misses.

- **Process Isolation**: Crashes in one worker won't stop others, ensuring more reliable test reports.

- **Resource Efficiency**: Fully utilizes available hardware instead of leaving CPU cores idle.

- **Future Scalability**: Provides the necessary foundation for sharding tests across multiple machines.

- **Better Test Design**: Encourages creating independent, stateless tests that use unique data.

Example:

```
Running 10 tests using 4 workers
```

---
## Authentication Reuse

Authentication is handled once during the test setup phase, and the authenticated session is reused across all tests using Playwright's storageState.

Instead of logging in before every test, the framework:

1. Creates a user via the API.

2. Performs a single UI login.

3. Saves the browser authentication state.

4. Reuses that state across all test workers.

What is saved?
The authentication state includes:

- Cookies

 - localStorage

 - sessionStorage



### Benefits: 
- **Eliminates Redundant Logins**: Instead of performing a 5–10 second UI login for every single test, the login happens exactly once per suite.

- **Drastic Run-Time Reduction**: For a suite of 50 tests, saving 10 seconds per test removes over 8 minutes of unnecessary execution time.

- **Bypasses Slow UI Flows**: Reusing cookies and local storage allows tests to jump straight to the target page, skipping redirects, landing pages, and MFA prompts.

- **Reduces Server Load**: Fewer login requests mean less strain on your authentication server and database during heavy CI/CD runs.

- **Minimizes Flakiness**: UI logins are often the most fragile part of a test; doing it once in a dedicated setup reduces the chance of random "setup failures" across your suite.

- **Parallel-Ready**: All workers share the same JSON state file, allowing 4 or 8 tests to start simultaneously in an already-authenticated state.

File Storage
Playwright saves this data to a specific file:
```
playwright/.auth/$browser-user.json
```
---

## Cross-Browser Testing
Tests run across multiple browsers:

- Chromium
- Microsoft Edge

This ensures the application behaves correctly across modern browsers.

---

## Page Object Model (POM)

The framework uses the **Page Object Model pattern** to improve maintainability and readability.

Benefits:

- reusable page components
- cleaner test structure
- easier test maintenance

---

## CI/CD Integration

Tests automatically run in **GitHub Actions** when code is pushed or a pull request is created.

CI Pipeline includes:

1. Install backend dependencies
2. Setup Laravel testing environment
3. Run backend tests
4. Build Vue frontend
5. Run Playwright UI/API tests
6. Generate Playwright reports
7. Create Jira tickets on test failures

---

## Automatic Jira Ticket Creation

When a test fails in **CI**, a Jira ticket is automatically created using the Jira API.

The ticket includes:

- Test name
- Error message
- Test file location
- Image Screenshot Error

This helps teams quickly track issues.

---

## Playwright HTML Reporting

Playwright generates a detailed HTML report after each test run.

The report contains:

- Test results
- Error stack traces
- Screenshots
- Trace viewer

View the report using:

```
npx playwright show-report
```

---

# Tech Stack

### Testing
- Playwright
- TypeScript
- Node.js

### Application
- Laravel
- Vue.js

### DevOps
- GitHub Actions
- Jira API Integration

---

# Project Structure

```
FrontEnd/
│
├── Playwright/
│   ├── tests/          # UI/API test cases
│   ├── pages/          # Page Object Models
|   ├── mockData/       # Data
|   ├── helpers/       # Api & Ui helpers
|   ├── models/         # Models
│   ├── fixtures/       # Shared test fixtures
│   ├── api/            # API helpers
│   ├── reporters/      # Custom reporter (Jira integration)
│   └── playwright.config.ts
│
Backend/
│
├── Laravel Application
│
.github/workflows/
│
└── CI pipeline configuration
```

---

# Installation

Clone the repository:

```
# Clone the repository
git clone 
cd your-repository
```
 Install Backend (Laravel)
```
cd Backend
# Create .env.testing

    APP_NAME=Laravel
    APP_ENV=testing
    APP_KEY=base64:
    APP_DEBUG=true
    APP_URL=http://localhost

    APP_USER_DB=$YOUR_DB_USER
    APP_USER_PASSWORD=$YOUR_DB_PASSWORD

    APP_LOCALE=en
    APP_FALLBACK_LOCALE=en
    APP_FAKER_LOCALE=en_US

    LOG_CHANNEL=stack
    LOG_LEVEL=debug

    DB_CONNECTION=sqlite
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=database/database.sqlite
    DB_USERNAME="${APP_USER_DB}"
    DB_PASSWORD="${APP_USER_PASSWORD}"


    SANCTUM_STATEFUL_DOMAINS=127.0.0.1:3000
    SESSION_DOMAIN=localhost

    CORS_ALLOWED_ORIGINS=$ENDPOINTS_ALLOWED

    SESSION_DRIVER=array
    SESSION_LIFETIME=120

    QUEUE_CONNECTION=sync

    CACHE_DRIVER=array
    CACHE_PREFIX=laravel_cache_

    REDIS_CLIENT=phpredis
    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_MAILER=log
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"
    DB_CONNECTION=sqlite
    DB_DATABASE=database/database.sqlite


composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate:fresh --seed --env=testing --force


```

Install frontend dependencies:

```
cd FrontEnd
npm install / npm install -i
    .env 
    # -----------------------
    # Application URLs
    # -----------------------

    URL=http://127.0.0.1:8000
    APP_URL=http://localhost:3000

    # -----------------------
    # API
    # -----------------------

    VITE_API_BASE_URL=http://127.0.0.1:8000/api
    VITE_STORAGE_URL=http://127.0.0.1:8000/storage

    # -----------------------
    # Reverb (WebSocket)
    # -----------------------

    BROADCAST_CONNECTION=reverb
    REVERB_APP_ID=$your_reverb_app_id
    REVERB_APP_KEY=$your_reverb_app_key
    REVERB_APP_SECRET=$your_reverb_app_secret
    REVERB_HOST=localhost
    REVERB_PORT=8080
    REVERB_SCHEME=http

    VITE_REVERB_APP_KEY=${REVERB_APP_KEY}
    VITE_REVERB_HOST=${REVERB_HOST}
    VITE_REVERB_PORT=${REVERB_PORT}
    VITE_REVERB_SCHEME=${REVERB_SCHEME}

    # -----------------------
    # Jira Integration
    # -----------------------

    JIRA_HOST=$your-domain.atlassian.net
    JIRA_EMAIL=$your-email@example.com
    JIRA_API_TOKEN=$your-jira-api-token
    JIRA_PROJECT_KEY=$PROJECT_KEY
```

Install Playwright browsers:
 cd FrontEnd/Playwright
 
```
npx playwright install
```

---

# Running Tests

Run all tests:

```
npx playwright test
```

Run tests in parallel:

```
npx playwright test --workers=$numbers
```

Run tests in headed/ui mode:

```
npx playwright test --headed
```

---

# View Test Report

After running tests, open the Playwright report:

```
npx playwright show-report
```

---

# Continuous Integration

The CI pipeline runs automatically using **GitHub Actions**.

Pipeline stages:

1. Setup PHP environment
2. Install Laravel dependencies
3. Configure Laravel testing environment
4. Run backend tests
5. Build Vue frontend
6. Install Playwright
7. Run Playwright UI/API tests
8. Upload Playwright report artifact

---

# Screenshots

Add screenshots demonstrating:

- Playwright test execution
- GitHub Actions pipeline
- Playwright HTML report
- Jira ticket creation


# Sources 
- Playwright : https://playwright.dev/docs/intro
- Jira API : https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about
- GitHub Actions : https://docs.github.com/en/actions
- Typescript : https://www.typescriptlang.org/docs/



# Author

MIT License

Copyright (c) 2026 **Jean-Gabriel Lerouge**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
