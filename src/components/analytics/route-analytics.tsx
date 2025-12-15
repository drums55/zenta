"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const payload: Record<string, unknown> = {
      page_path: pathname,
      page_search: search ? `?${search}` : "",
    };

    if (typeof window !== "undefined") {
      payload.page_location = window.location.href;
    }

    if (typeof document !== "undefined") {
      payload.page_title = document.title;
    }

    trackEvent("page_view", {
      ...payload,
    });
  }, [pathname, search]);

  return null;
}
