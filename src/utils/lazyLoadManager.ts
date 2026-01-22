"use client";

// Shared Intersection Observer instance for better performance
class LazyLoadManager {
  private static instance: LazyLoadManager;
  private observer: IntersectionObserver | null = null;
  private callbacks: Map<Element, () => void> = new Map();

  private constructor() {
    if (typeof window !== "undefined") {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.callbacks.get(entry.target);
              if (callback) {
                callback();
                this.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: "300px", // Load 300px before viewport
          threshold: 0,
        },
      );
    }
  }

  static getInstance(): LazyLoadManager {
    if (!LazyLoadManager.instance) {
      LazyLoadManager.instance = new LazyLoadManager();
    }
    return LazyLoadManager.instance;
  }

  observe(element: Element, callback: () => void): void {
    if (this.observer) {
      this.callbacks.set(element, callback);
      this.observer.observe(element);
    }
  }

  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
      this.callbacks.delete(element);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
    }
  }
}

export default LazyLoadManager;
