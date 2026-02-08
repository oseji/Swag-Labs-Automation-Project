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

| Variable           | Description                | Example                                    |
| ------------------ | -------------------------- | ------------------------------------------ |
| `LANDING_PAGE_URL` | Login page URL             | `https://www.saucedemo.com`                |
| `DASHBOARD_URL`    | URL after successful login | `https://www.saucedemo.com/inventory.html` |
| `TIMEOUT`          | Default wait timeout (ms)  | `20000`                                    |
| `USER_NAME`        | Valid Swag Labs username   | `standard_user`                            |
| `PASSWORD`         | Valid Swag Labs password   | `secret_sauce`                             |

Example `.env`:

```env
LANDING_PAGE_URL=https://www.saucedemo.com
DASHBOARD_URL=https://www.saucedemo.com/inventory.html
TIMEOUT=20000

USER_NAME=standard_user
PASSWORD=secret_sauce
```

Use these credentials only on the public demo site; do not commit `.env` or real credentials.

---

## Running Tests

Tests are run via **npm scripts** using `ts-node`, so no separate compile step is needed for development.

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
| `npm run test:cart`                 | Cart add, remove, and checkout flow                                         |
| `npm run test:menu`                 | Menu visibility, reset app state, About navigation                          |

### Run a single test file

Run a single test using the npm scripts defined in `package.json`. For example, to run the valid-login authentication test:

```bash
npm run test:auth:login
```

To run any other single test, use the corresponding script name from the `scripts` section.

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

### Driver and browser

- Tests use **Chrome** with options that disable password manager and (where used) run in incognito for a clean state.
- Timeouts come from `TIMEOUT` in `.env` (default 20000 ms).
- Each test (or helper) is responsible for calling `driver.quit()` when finished (e.g. in `finally` blocks).

---

## Environment Variables

Summary of variables used:

| Variable           | Required             | Purpose                                               |
| ------------------ | -------------------- | ----------------------------------------------------- |
| `LANDING_PAGE_URL` | Yes                  | Login page to open                                    |
| `DASHBOARD_URL`    | Yes                  | Expected URL after login and for protected-route test |
| `TIMEOUT`          | No (default 20000)   | Global wait timeout in ms                             |
| `USER_NAME`        | Yes (for most tests) | Swag Labs username (e.g. `standard_user`)             |
| `PASSWORD`         | Yes (for most tests) | Swag Labs password (e.g. `secret_sauce`)              |

Ensure `.env` is in `.gitignore` and never commit real credentials.

---

## License

ISC (see `package.json`).
