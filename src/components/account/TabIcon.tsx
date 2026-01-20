import { TabId } from "@/hooks/account/useAccountNavigation";

interface TabIconProps {
  tabId: TabId;
  filled: boolean;
}

export default function TabIcon({ tabId, filled }: TabIconProps) {
  const iconClass = "w-5 h-5";

  switch (tabId) {
    case "overview":
      return filled ? (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.515 2.143a1 1 0 0 0-1.03 0l-10 6A1 1 0 0 0 1 9v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5h6v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-.485-.857z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.486 2.143a1 1 0 0 1 1.028 0l10 6A1 1 0 0 1 23 9v12a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 .486-.857zM3 9.566V20h5v-6h8v6h5V9.566l-9-5.4z"
            clipRule="evenodd"
          />
        </svg>
      );

    case "membership":
      return filled ? (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 3a3 3 0 0 0-3 3v2h24V6a3 3 0 0 0-3-3zM0 18v-8h24v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3m16-2h4v-2h-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );

    case "security":
      return filled ? (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.6 1.09a1 1 0 0 1 .8 0l10 4.44a1 1 0 0 1 .6.95c-.11 2.78-.36 6.3-1.8 9.41-1.47 3.18-4.15 5.9-8.96 7.08a1 1 0 0 1-.48 0c-4.8-1.19-7.5-3.9-8.96-7.08C1.36 12.78 1.11 9.26 1 6.5a1 1 0 0 1 .6-.96zm.1 14.62 6-6-1.4-1.42-5.3 5.3-2.3-2.3-1.4 1.42 3 3 .7.7z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.4 1.09a1 1 0 0 0-.8 0l-10 4.44a1 1 0 0 0-.6.95c.11 2.78.36 6.3 1.8 9.41 1.47 3.18 4.15 5.9 8.96 7.08a1 1 0 0 0 .48 0c4.8-1.19 7.5-3.9 8.96-7.08 1.44-3.11 1.69-6.63 1.8-9.4a1 1 0 0 0-.6-.96zM4.63 15.05c-1.16-2.5-1.46-5.37-1.6-7.97L12 3.1l8.97 4c-.13 2.6-.43 5.46-1.59 7.96-1.2 2.6-3.34 4.86-7.38 5.92-4.04-1.06-6.18-3.31-7.38-5.92m7.09.66 6-6-1.42-1.42L11 13.6l-2.3-2.3-1.4 1.42 3 3 .7.7z"
            clipRule="evenodd"
          />
        </svg>
      );

    case "devices":
      return filled ? (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M0 3.73C0 2.77.77 2 1.73 2h18.54c.96 0 1.73.77 1.73 1.73V7h-5a4 4 0 0 0-4 4v5H1.73C.77 16 0 15.23 0 14.27zM13 19.3v-2a73 73 0 0 0-8.07.12l.14 2A70 70 0 0 1 13 19.3m2-8.3c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2zm5.25 6.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M0 3.73C0 2.77.77 2 1.73 2h18.54c.96 0 1.73.77 1.73 1.73V7h-2V4H2v10h11v2H1.73C.77 16 0 15.23 0 14.27zM13 17.3a73 73 0 0 0-8.07.12l.14 2A70 70 0 0 1 13 19.3zm9-6.3h-5v9h5zm-5-2a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h5a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm2.5 9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
            clipRule="evenodd"
          />
        </svg>
      );

    case "profiles":
      return filled ? (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M15 3H5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2V9a4 4 0 0 1 4-4h8a2 2 0 0 0-2-2m4 2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4 4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4m-8 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-.84 5.25a1 1 0 1 0-1.32-1.5c-.48.42-1.32.75-2.34.75a3.6 3.6 0 0 1-2.34-.75 1 1 0 1 0-1.32 1.5A5.6 5.6 0 0 0 15.5 18a5.6 5.6 0 0 0 3.66-1.25"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5 3h10a2 2 0 0 1 2 2H9a4 4 0 0 0-4 4v8a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m18 6a4 4 0 0 0-4-4 4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4 4 4 0 0 0 4 4h10a4 4 0 0 0 4-4zm-4-2H9a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-9.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m.75 2.34a1 1 0 0 1-.1 1.41A5.6 5.6 0 0 1 15.5 18a5.6 5.6 0 0 1-3.66-1.25 1 1 0 1 1 1.32-1.5c.48.42 1.32.75 2.34.75s1.86-.33 2.34-.75a1 1 0 0 1 1.41.1"
            clipRule="evenodd"
          />
        </svg>
      );

    default:
      return null;
  }
}
