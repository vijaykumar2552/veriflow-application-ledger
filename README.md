# VeriFlow AI

**Intelligent Document Validation and Regulatory Compliance**

VeriFlow AI is an SIH 2026 prototype (SIH26261) demonstrating an application review workflow: organize applications and documents, run deterministic simulated checks, inspect findings, and record manual review outcomes.

## Implemented features

- Dashboard with application, document, review, and validation summaries.
- Application and document management with a local demo workflow.
- Cross-record search for applications, attached documents, and simulated findings (Ctrl/Cmd+K).
- Readable, dismissible demo notifications derived from open review and document items.
- Searchable illustrative compliance rules, application filtering, document-name search, and sorting.
- A keyboard-navigable command palette for workspace routes and theme switching.
- A live local clock/date with persistent light, dark, and system appearance preferences.
- An eight-step guided SIH walkthrough over the existing sample data.
- Deterministic simulated verification scenarios with structured findings and next steps.
- Manual review, regulatory rule reference, audit log, and printable or CSV validation reports.
- Responsive navigation and persistent browser-local demo state.

All verification is simulated for demonstration. The application does not authenticate real documents, perform live AI analysis, connect to government registries, or provide official regulatory approval.

## Technology

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite 8, Tailwind CSS 4, and Nitro
- Radix UI, Lucide icons, and Recharts
- Vitest and jsdom

## Project structure

```text
public/                  Static assets
src/
  components/             Shared application and UI components
  hooks/                  Shared React hooks
  lib/                    Demo state and application utilities
  routes/                 File-based application routes
  test/                   Route and verification tests
  router.tsx              Router setup
  server.ts               Server entry and SSR error handling
  start.ts                TanStack Start middleware
  styles.css              Global styles and design tokens
vite.config.ts            Vite, TanStack Start, Tailwind, and Nitro configuration
vitest.config.ts          Test configuration
```

## Prerequisites

- Node.js 22.12 or newer (Node.js 24 is also supported)
- npm

No environment variables or external services are required for the demo.

## Run locally

From the project directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (the development server uses port `8080` by default).

## Available commands

| Command              | Purpose                                                                         |
| -------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`        | Start the development server                                                    |
| `npm run build`      | Create the production build                                                     |
| `npm run build:dev`  | Create a development-mode build                                                 |
| `npm run preview`    | Preview the production Worker locally with Wrangler (run `npm run build` first) |
| `npm run lint`       | Run ESLint                                                                      |
| `npm run format`     | Format project files with Prettier                                              |
| `npm test`           | Run the test suite                                                              |
| `npm run test:watch` | Run tests in watch mode                                                         |

## Demo data and limitations

Application data is stored in the browser's local storage and is not synchronized to a server. Verification scenarios and outcomes are deterministic simulated examples; selected documents are not sent to an authentication service. The included rules and reports are demonstration content, not authoritative legal guidance. No backend, government registry integration, or official certification is implemented.
