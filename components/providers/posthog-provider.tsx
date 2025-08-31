"use client";
import { PropsWithChildren, useEffect } from "react";
import posthog from "posthog-js";

export default function PostHogProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";
    if (key) posthog.init(key, { api_host: host });
  }, []);
  return <>{children}</>;
}
