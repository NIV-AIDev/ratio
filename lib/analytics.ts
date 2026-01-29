type AnalyticsEvent = {
  event: string;
  [key: string]: unknown;
};

type DataLayerWindow = Window & {
  dataLayer?: AnalyticsEvent[];
};

export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const dataLayerWindow = window as DataLayerWindow;
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer ?? [];
  dataLayerWindow.dataLayer.push(event);
};
