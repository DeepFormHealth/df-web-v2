// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import PostHogProvider from "../components/providers/posthog-provider";

export const metadata: Metadata = {
  title: "df-web-v2",
  description: "Minimal SaaS scaffold",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
