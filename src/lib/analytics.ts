type Payload = Record<string, unknown> | undefined;

export function emitAnalytics(event: string, payload?: Payload) {
  try {
    const w = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
    };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...payload });
    }
  } catch {
    // no-op
  }
}
