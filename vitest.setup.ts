// Vitest global setup. Add Testing Library matchers and any global mocks here.
// Keep this file small — heavy mocks belong next to the tests that need them.
import "@testing-library/jest-dom/vitest";

const env = process.env as Record<string, string>;
env.NEXT_PUBLIC_TMDB_API_KEY ??= "test-tmdb-key";
env.NEXT_PUBLIC_CUSTOM_API_URL ??= "https://api.test.local";
env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL ??= "https://cdn.test.local";
env.NEXT_PUBLIC_ENABLE_LOGGING ??= "false";
