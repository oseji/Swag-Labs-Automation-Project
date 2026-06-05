# SwagLabs Automation

End-to-end (E2E) UI automation for [Sauce Labs Demo](https://www.saucedemo.com) (Swag Labs), built with **TypeScript**, **Selenium WebDriver**, and a **Page Object Model** (POM) architecture. This project validates authentication, product listing, sorting, cart, checkout, and app menu behavior in a structured, maintainable way.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Allure Reports](#allure-reports)
- [Test Suites](#test-suites)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)

---

## Overview

This automation suite targets the public Swag Labs demo site (`saucedemo.com`), a standard e‑commerce-style UI used for testing. The tests cover:

- **Authentication** — login (valid/invalid/blank), logout, and protected-route access
- **Product listing** — opening product details and sorting (A–Z, Z–A, price low–high, high–low)
- **Cart & checkout** — adding/removing items, cart badge count, and full checkout with form and price validation
- **App menu** — menu visibility, reset app state, and navigation (e.g. About)

Tests are written in **TypeScript**, use **Chrome** via Selenium WebDriver, and follow a **Page Object Model** for clear separation between page structure and test logic.

---

## Tech Stack

| Technology             | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| **TypeScript**         | Type-safe test and page code                         |
| **Selenium WebDriver** | Browser automation (Chrome)                          |
| **Mocha**              | Test runner with `describe`/`it` structure           |
| **Chai**               | Assertion library                                    |
| **Allure**             | Test reporting with step-level detail                |
| **dotenv**             | Environment and config (URLs, credentials, timeouts) |
| **ts-node**            | Run TypeScript tests without a separate compile step |

- **Runtime:** Node.js
- **Browser:** Chrome (ChromeDriver is managed by Selenium)

---

## Project Structure

```
SwagLabs automation/
├── pages/                    # Page Object Model – one file per screen/component
│   ├── landingPage.ts        # Login page (credentials, errors, redirect)
│   ├── dashboardPage.ts      # Product grid, add to cart, filters
│   ├── navigationBarPage.ts  # Cart icon, menu, badge count
│   ├── cartPage.ts           # Cart items, checkout button
│   ├── checkoutPage.ts       # Checkout steps (info, review, finish)
│   └── itemDetailsPage.ts    # Product detail view
├── tests/
│   ├── authentication/       # Login, logout, protected routes
│   ├── dashboard/
│   │   ├── checking-out/     # Cart add/remove, checkout flow
│   │   ├── menu/             # Menu visibility, reset, About link
│   │   └── product-sorting/  # Sort order and product details
├── utils/                    # Shared helpers and setup
│   ├── createDriverAndLogin.ts   # Start Chrome, log in, return driver
│   ├── loadLandingPageAndLogin.ts # Login flows for auth tests (then quit)
│   ├── sortProducts.ts       # Reusable product-sorting test logic
│   ├── webElementHelpers.ts # waitAndClick, waitAndInput, waitForElement
│   └── clickOnAMenuButton.ts
├── .env                      # URLs, credentials, timeout (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **Chrome** browser installed (Selenium uses it for automation)
- **npm** (comes with Node.js)
- **Allure CLI** — required to generate and open HTML reports (see [Allure Reports](#allure-reports))

ChromeDriver is fetched automatically by Selenium; no separate install is required for typical use.

---

## Installation

1. **Clone the repository** (or download and extract the project).

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**  
   Copy the required variables into a `.env` file in the project root (see [Configuration](#configuration)). The `.env` file is gitignored.

---

## Configuration

Create a `.env` file in the project root with at least:

| Variable                | Description                          | Example                                             |
| ----------------------- | ------------------------------------ | --------------------------------------------------- |
| `LANDING_PAGE_URL`      | Login page URL                       | `https://www.saucedemo.com/`                        |
| `DASHBOARD_URL`         | URL after successful login           | `https://www.saucedemo.com/inventory.html`          |
| `CART_URL`              | Cart page URL                        | `https://www.saucedemo.com/cart.html`               |
| `CHECKOUT_STEP_ONE_URL` | Checkout step one URL                | `https://www.saucedemo.com/checkout-step-one.html`  |
| `CHECKOUT_STEP_TWO_URL` | Checkout step two URL                | `https://www.saucedemo.com/checkout-step-two.html`  |
| `CHECKOUT_COMPLETE_URL` | Checkout complete page URL           | `https://www.saucedemo.com/checkout-complete.html`  |
| `ABOUT_PAGE_URL`        | Sauce Labs about page URL            | `https://saucelabs.com/`                            |
| `TIMEOUT`               | Default wait timeout (ms)            | `20000`                                             |
| `USER_NAME`             | Valid Swag Labs username             | `standard_user`                                     |
| `PASSWORD`              | Valid Swag Labs password             | `secret_sauce`                                      |
| `CHECKOUT_FIRST_NAME`   | First name used in checkout form     | `ose`                                               |
| `CHECKOUT_LAST_NAME`    | Last name used in checkout form      | `oziegbe`                                           |
| `CHECKOUT_POSTAL_CODE`  | Postal code used in checkout form    | `0701995`                                           |

Example `.env`:

```env
LANDING_PAGE_URL=https://www.saucedemo.com/
DASHBOARD_URL=https://www.saucedemo.com/inventory.html
CART_URL=https://www.saucedemo.com/cart.html
CHECKOUT_STEP_ONE_URL=https://www.saucedemo.com/checkout-step-one.html
CHECKOUT_STEP_TWO_URL=https://www.saucedemo.com/checkout-step-two.html
CHECKOUT_COMPLETE_URL=https://www.saucedemo.com/checkout-complete.html
ABOUT_PAGE_URL=https://saucelabs.com/
TIMEOUT=20000

USER_NAME=standard_user
PASSWORD=secret_sauce

CHECKOUT_FIRST_NAME=ose
CHECKOUT_LAST_NAME=oziegbe
CHECKOUT_POSTAL_CODE=0701995
```

Use these credentials only on the public demo site; do not commit `.env` or real credentials.

---

## Running Tests

Tests are run via **npm scripts** using Mocha + ts-node, so no separate compile step is needed for development.

### Run all tests

```bash
npm run test:all
```

This runs, in order: auth → products (details + sort) → cart → menu.

### Run by category

| Command                             | What it runs                                                                |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `npm run test:auth`                 | All authentication tests (valid login, blank username, invalid credentials) |
| `npm run test:auth:login`           | Valid credentials login only                                                |
| `npm run test:auth:blank`           | Empty username validation                                                   |
| `npm run test:auth:wrong`           | Invalid credentials validation                                              |
| `npm run test:auth:logout`          | Logout and session persistence                                              |
| `npm run test:auth:protected-route` | Accessing dashboard without login                                           |
| `npm run test:products`             | Product details + all sort tests                                            |
| `npm run test:sort`                 | All sorting tests (A–Z, Z–A, price low–high, high–low)                      |
| `npm run test:sort:az`              | Sort A–Z only                                                               |
| `npm run test:sort:za`              | Sort Z–A only                                                               |
| `npm run test:sort:price-low`       | Sort price low–high only                                                    |
| `npm run test:sort:price-high`      | Sort price high–low only                                                    |
| `npm run test:cart`                 | Cart add, remove, and checkout flow                                         |
| `npm run test:cart:add`             | Add to cart and verify badge count                                          |
| `npm run test:cart:remove`          | Add and remove products, verify badge updates                               |
| `npm run test:cart:checkout`        | Full checkout flow with form and price validation                           |
| `npm run test:menu`                 | Menu visibility, reset app state, About navigation                          |
| `npm run test:menu:visibility`      | Menu visibility and content only                                            |
| `npm run test:menu:reset`           | Reset app state only                                                        |
| `npm run test:menu:about`           | About page navigation only                                                  |

### Run a single test file

Run a single test using the npm scripts defined in `package.json`. For example, to run the valid-login authentication test:

```bash
npm run test:auth:login
```

To run any other single test, use the corresponding script name from the `scripts` section.

---

## Allure Reports

Every test in this suite is instrumented with **Allure** step-level reporting. Each `it` block is broken into named steps (e.g. "launch browser and log in", "verify cart badge count") so you can see exactly where a test passed or failed in the Allure HTML report. When a test fails, a **screenshot is automatically captured and attached** to the Allure report so you can see the browser state at the point of failure.

### Install Allure CLI

Allure CLI is required to generate and open the HTML report. Install it once globally:

```bash
# macOS (Homebrew)
brew install allure

# npm (cross-platform)
npm install -g allure-commandline
```

### Generate and open a report

Use the `report:*` scripts to run a test suite, generate the report, and open it in one command:

| Command                  | Runs and reports on                     |
| ------------------------ | --------------------------------------- |
| `npm run report:auth`    | All authentication tests                |
| `npm run report:cart`    | All cart & checkout tests               |
| `npm run report:sort`    | All product sorting tests               |
| `npm run report:products`| Product details + all sorting tests     |
| `npm run report:menu`    | All menu tests                          |
| `npm run report:all`     | The full test suite                     |

Each script:
1. Clears any previous `allure-results` and `allure-report` directories
2. Runs the relevant tests (results are written to `allure-results/`)
3. Generates a static HTML report in `allure-report/`
4. Opens the report in your browser

> **Note:** `allure-report/` is gitignored. `allure-results/` is also gitignored so raw result files are not committed.

---

## Test Suites

### Authentication (`tests/authentication/`)

- **Valid login** — Log in with valid credentials and confirm redirect to dashboard.
- **Empty username** — Submit with blank username and assert “Username is required” message.
- **Invalid credentials** — Wrong username/password and assert “do not match” error.
- **Logout & session** — Log in, log out, and verify session/redirect behavior.
- **Protected route** — Open dashboard URL without logging in and assert login/error state.

### Product listing & sorting (`tests/dashboard/product-sorting/`)

- **Product details** — Open a product from the list and validate detail page.
- **Sort A–Z / Z–A** — Verify product list order by name.
- **Sort price low–high / high–low** — Verify product list order by price.

### Cart & checkout (`tests/dashboard/checking-out/`)

- **Add to cart & badge** — Add product(s) and verify cart icon badge count.
- **Add and remove** — Add and remove items and verify cart contents.
- **Checkout flow** — Add items, go through checkout (with intentional form error and price checks), and complete order.

### Menu (`tests/dashboard/menu/`)

- **Menu visibility & content** — Open menu and validate visible options.
- **Reset app state** — Use “Reset App State” and verify cart/state is cleared.
- **About** — Open “About” from menu and validate navigation.

---

## Architecture

### Page Object Model (POM)

Each major screen or component has a **page class** in `pages/`:

- **Locators** are defined in one place (e.g. `By.id`, `By.xpath`).
- **Actions** (click, type, wait for element) are exposed as methods.
- **Tests** call page methods and assertions instead of raw Selenium calls.

This keeps tests readable and reduces duplication when the UI changes.

### Utilities

- **`createDriverAndLogin`** — Builds a Chrome WebDriver, logs in with given credentials, waits for dashboard, and returns the driver for tests that need a logged-in session (e.g. cart, checkout, menu).
- **`loadLandingPageAndLogin`** — Handles different login scenarios (happy path, wrong credentials, blank username, protected route) and **quits the driver** when done; used by authentication tests.
- **`webElementHelpers`** — Shared `waitAndClick`, `waitAndInput`, and `waitForElement` using the configured timeout for stable waits.
- **`sortProducts`** — Centralized logic for “sort and assert order” used by the product-sorting tests.
- **`clickOnAMenuButton`** — Handles opening the side menu and clicking a named button (“about”, “logout”, “all items”, “reset app state”), including assertions specific to each action.

### Allure reporting

Every test uses the **`step()`** function from `allure-js-commons` to annotate meaningful phases of each test (e.g. “launch browser and log in”, “verify cart badge count”). Mocha is configured in `.mocharc.js` to use `allure-mocha` as its reporter, which writes raw result files to `allure-results/` after each run. The `report:*` npm scripts then call the Allure CLI to convert those results into a navigable HTML report.

When a test fails, the catch block calls `attachScreenshotOnFailure` (`utils/allure/attachScreenShotOnFailure.helper.ts`), which takes a screenshot via the WebDriver and attaches it as a PNG to the Allure report. This means every failure in the report includes a visual snapshot of the browser at the moment the error occurred. Labels (severity, tag, epic, feature, story) are applied per test via `setAllureLabels` (`utils/allure/setAllureLabels.helper.ts`) so reports can be filtered and grouped meaningfully.

### Driver and browser

- Tests use **Chrome** with options that disable password manager and (where used) run in incognito for a clean state.
- Timeouts come from `TIMEOUT` in `.env` (default 20000 ms).
- Each test (or helper) is responsible for calling `driver.quit()` when finished (e.g. in `finally` blocks).

---

## Environment Variables

Summary of variables used:

| Variable                | Required             | Purpose                                               |
| ----------------------- | -------------------- | ----------------------------------------------------- |
| `LANDING_PAGE_URL`      | Yes                  | Login page to open                                    |
| `DASHBOARD_URL`         | Yes                  | Expected URL after login and for protected-route test |
| `CART_URL`              | Yes                  | Cart page URL used for navigation assertions          |
| `CHECKOUT_STEP_ONE_URL` | Yes                  | Checkout info page URL used for navigation assertions |
| `CHECKOUT_STEP_TWO_URL` | Yes                  | Checkout overview page URL used for assertions        |
| `CHECKOUT_COMPLETE_URL` | Yes                  | Checkout complete page URL used for assertions        |
| `ABOUT_PAGE_URL`        | Yes                  | Sauce Labs site URL used for About menu assertion     |
| `TIMEOUT`               | No (default 20000)   | Global wait timeout in ms                             |
| `USER_NAME`             | Yes (for most tests) | Swag Labs username (e.g. `standard_user`)             |
| `PASSWORD`              | Yes (for most tests) | Swag Labs password (e.g. `secret_sauce`)              |
| `CHECKOUT_FIRST_NAME`   | Yes                  | First name entered in the checkout form               |
| `CHECKOUT_LAST_NAME`    | Yes                  | Last name entered in the checkout form                |
| `CHECKOUT_POSTAL_CODE`  | Yes                  | Postal code entered in the checkout form              |

Ensure `.env` is in `.gitignore` and never commit real credentials.

---

## License

ISC (see `package.json`).
