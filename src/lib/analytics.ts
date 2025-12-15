export type AnalyticsParams = Record<string, unknown>;

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = params ?? {};
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

  if (typeof gtag === "function") {
    gtag("event", name, payload);
    return;
  }

  const dataLayer = (window as unknown as { dataLayer?: unknown }).dataLayer;

  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: name, ...payload });
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[zenta] event", name, payload);
  }
}
