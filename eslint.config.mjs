import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "next-env.d.ts",
      "global.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "no-console": "error",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-role": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      // React 19 + React Compiler optimization hints; downgraded so they don't
      // fail CI on legitimate patterns. Address case-by-case during refactors.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/component-hook-factories": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
  {
    files: [
      "src/lib/logger/logger.ts",
      "src/lib/env/env.ts",
      "**/*.test.ts",
      "**/*.test.tsx",
      "vitest.setup.ts",
    ],
    rules: { "no-console": "off" },
  },
];
