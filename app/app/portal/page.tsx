"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "../../../lib/supabase-browser";
import { Button } from "../../../components/ui/button";

export default function PortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
    });
  }, [router]);
  async function openPortal() {
    setLoading(true);
    const res = await fetch("/api/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
    setLoading(false);
  }
  return (
    <main className="p-8">
      <Button onClick={openPortal} disabled={loading}>
        {loading ? "Loading…" : "Open Customer Portal"}
      </Button>
    </main>
  );
}
