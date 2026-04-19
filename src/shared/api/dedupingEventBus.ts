export function createDedupingEventBus<T>(opts: {
  getDedupeKey: (event: T) => string;
  maxKeys?: number;
}) {
  const subs = new Set<(event: T) => void>();
  const dedupe = new Set<string>();
  const maxKeys = opts.maxKeys ?? 200;

  return {
    subscribe(listener: (event: T) => void) {
      subs.add(listener);
      return () => subs.delete(listener);
    },
    publish(event: T) {
      const key = opts.getDedupeKey(event);
      if (dedupe.has(key)) return;
      dedupe.add(key);
      if (dedupe.size > maxKeys) {
        dedupe.clear();
      }
      subs.forEach((listener) => listener(event));
    },
  };
}

export type DedupingEventBus<T> = ReturnType<typeof createDedupingEventBus<T>>;
