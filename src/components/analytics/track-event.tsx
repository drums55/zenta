"use client";

import { useEffect } from "react";

import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

export function TrackEvent({
  name,
  params,
}: {
  name: string;
  params?: AnalyticsParams;
}) {
  const paramsKey = JSON.stringify(params ?? {});

  useEffect(() => {
    const parsedParams = JSON.parse(paramsKey) as AnalyticsParams;
    trackEvent(name, parsedParams);
  }, [name, paramsKey]);

  return null;
}
