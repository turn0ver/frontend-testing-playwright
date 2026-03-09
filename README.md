# frontend-testing-playwright

Playwright E2E test suite that exercises the **Ramp** sign-in and sign-up flows (UI checks, functional E2E checks, and basic accessibility checks using `axe-core`).

> **Note**
> These tests run against `https://app.ramp.com` (configured in `playwright.config.ts`). You are testing a real, external environment.

## Tech stack

- [Playwright Test](https://playwright.dev/docs/test-intro) (test runner + browser automation)
- TypeScript
- [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) for automated accessibility scanning

## Project structure

```text
.
├─ playwright.config.ts         # Playwright configuration (baseURL, reporters, projects)
├─ package.json                 # NPM scripts and dev dependencies
├─ tests/
│  ├─ fixtures/
│  │  └─ test-data.ts           # Test data used by specs (valid/invalid users, etc.)
│  ├─ utils/
│  │  └─ accessibility-scan.ts  # Helper that runs axe-core scan and asserts no violations
│  ├─ login/
│  │  ├─ ui-elements.spec.ts    # Smoke/UI assertions for sign-in page
│  │  ├─ e2e.spec.ts            # Login happy-path + negative scenarios
│  │  └─ accessibility.spec.ts  # Keyboard/label checks + axe scan
│  └─ signup/
│     ├─ ui-elements.spec.ts    # Smoke/UI assertions for sign-up page
│     ├─ e2e.spec.ts            # Sign-up happy-path + validations/boundary tests
│     └─ accessibility.spec.ts  # Keyboard/label checks + axe scan
└─ playwright-report/           # HTML report output (generated)
```

## Design patterns used

This repo intentionally keeps things small, but it already applies a few common test-automation patterns:

### 1) AAA (Arrange / Act / Assert)

Most specs follow the structure:

- **Arrange**: navigate to the page in `beforeEach` (e.g. `page.goto('/sign-in')`)
- **Act**: interact with inputs/buttons (`fill`, `click`, keyboard actions)
- **Assert**: verify expected UI text, titles, or errors using `expect(...)`

### 2) Small helper utilities ("test utils")

`tests/utils/accessibility-scan.ts` is a focused helper that encapsulates the Axe scan + assertion. This keeps specs readable and avoids repeated setup.

### 3) Data fixtures

`tests/fixtures/test-data.ts` centralizes common test data (valid/invalid users). This reduces duplication and makes it easier to update scenarios in one place.

> If the suite grows, the next natural step is to introduce the **Page Object Model (POM)** for the sign-in/sign-up pages and reuse those page objects across specs.

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm (bundled with Node)

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers

Playwright requires browser binaries:

```bash
npx playwright install
```

## Running the tests

### Run all tests (headless)

```bash
npm test
```

### Run with Playwright UI mode

```bash
npm run test:ui
```

### Run in headed mode (see the browser)

```bash
npm run test:headed
```

## Reports

This project uses the HTML reporter. After a run, open the report:

```bash
npx playwright show-report
```

The report is generated into the `playwright-report/` directory.

## Configuration

The base URL is configured in `playwright.config.ts`:

- `use.baseURL`: `https://app.ramp.com`
- `reporter`: HTML output to `playwright-report`
- `projects`: currently runs on **Desktop Chrome**

If you want to point at a different environment, update `use.baseURL` (and consider adding an environment variable override).

## Troubleshooting

- **Tests fail due to UI changes**: selectors/text assertions may need updating.
- **Accessibility scan fails**: `axe-core` violations will be printed to the console in `runAccessibilityScan`.
- **Slow or flaky external site**: consider adding retries in `playwright.config.ts` or using tracing (`trace: 'on-first-retry'` is already enabled).