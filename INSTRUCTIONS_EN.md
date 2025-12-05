# Playwright Test Suite Guide

This folder contains the base files required to implement the Playwright ETE (End-to-End) test suite in any Magento project.

## 1. Prerequisites

Before starting, ensure that the environment where the tests will run (your local machine or CI/CD server) has the following installed:

*   **Node.js**: Version 16 or higher.
*   **NPM**: Usually included with Node.js.

## 2. Installation

### Option A: Composer Create Project (Recommended)

This option downloads the suite directly into the target folder, ready to be used and modified. It is not added as a dependency in `composer.json` to prevent your tests from being overwritten on update.

```bash
composer create-project orangecat/magento2-playwright-suite dev/tests/playwright --no-install
```



### Option B: Manual

Copy the entire contents of this folder to the path `dev/tests/playwright` in your new Magento project.

The final structure should look like this:

```text
<magento-project>/
└── dev/
    └── tests/
        └── playwright/
            ├── package.json
            ├── playwright.config.ts
            ├── INSTRUCTIONS_EN.md (this file)
            └── tests/
                └── _template.spec.ts
```

## 3. Installation

Once the files are copied, open a terminal, navigate to the directory, and run the installation commands:

```bash
cd dev/tests/playwright

# 1. Install project dependencies (defined in package.json)
npm install

# 2. Install Playwright browsers
npx playwright install
```

> **Note for Linux**: If you receive errors about missing dependencies on Linux when running tests, you may need to run `npx playwright install-deps` (may require sudo).

## 4. Configuration

The only file you strictly need to modify is `playwright.config.ts`.

1.  Open `playwright.config.ts`.
2.  Find the `baseURL` property inside `use`.
3.  Change the URL to your development or staging environment.

```typescript
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://your-magento-project.test/',
    // ...
},
```

## 5. Usage and Running Tests

### Create a new test
1.  Copy the `tests/_template.spec.ts` file and rename it (e.g., `tests/checkout.spec.ts`).
2.  Edit the new file and add your test logic.

### Run tests
From the `dev/tests/playwright` folder:

*   **Run all tests:**
    ```bash
    npx playwright test
    ```

*   **Run a specific test:**
    ```bash
    npx playwright test tests/checkout.spec.ts
    ```

*   **Interactive Mode (UI):**
    Ideal for development and debugging.
    ```bash
    npx playwright test --ui
    ```

*   **View HTML report:**
    If there were failures, you can view the details with:
    ```bash
    npx playwright show-report
    ```
