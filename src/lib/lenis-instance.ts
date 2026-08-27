import type Lenis from "lenis";

type LenisListener = (instance: Lenis | null) => void;

let instance: Lenis | null = null;
const listeners = new Set<LenisListener>();

export function setLenisInstance(next: Lenis | null): void {
  instance = next;
  listeners.forEach((listener) => {
    listener(instance);
  });
}

export function getLenisInstance(): Lenis | null {
  return instance;
}

export function subscribeLenisInstance(listener: LenisListener): () => void {
  listeners.add(listener);
  listener(instance);
  return () => {
    listeners.delete(listener);
  };
}
