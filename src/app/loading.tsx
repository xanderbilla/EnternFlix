/**
 * Root-level streaming fallback shown while a route segment's RSC payload is
 * loading. Kept visually neutral (matches the dark app shell) so it does not
 * introduce layout shift before the real page paints.
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen w-full bg-zinc-900"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    />
  );
}
