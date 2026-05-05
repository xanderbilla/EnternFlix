# Testing

## Stack

- Test runner: Vitest
- DOM environment: jsdom
- Component utilities: Testing Library
- Property-based tests: fast-check

## Current Focus

Current tests cover:

- API interceptors and request builders
- Query retry policy
- Environment config behavior
- Utility functions (error, validation, determinism, movie helpers)

## Run Commands

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Coverage Expectations

Minimum expectations for production confidence:

- Utility and shared logic: high coverage
- API integration layer: high coverage
- Hooks with business logic: medium-high coverage
- Critical UI flows: at least smoke-level component tests

## Gaps to Close

- Broader component tests for key screens
- Hook tests for complex playback/search behavior
- E2E tests (Playwright/Cypress) for major user journeys

## Suggested CI Gate

```bash
npm run typecheck && npm run lint && npm run test
```
