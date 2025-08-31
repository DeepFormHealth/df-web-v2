"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  async function go(priceId: string) {
    setLoading(priceId);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    setLoading(null);
  }
  return (
    <main className="flex flex-col items-center py-20 space-y-8">
      <h1 className="text-2xl font-bold">Pricing</h1>
      <div className="flex space-x-6">
        <div className="border rounded p-6 text-center">
          <h2 className="font-semibold">Starter</h2>
          <p className="text-gray-600">$19 / mo</p>
          <Button onClick={() => go(process.env.NEXT_PUBLIC_STARTER_PRICE_ID ?? "")}
                  disabled={loading === (process.env.NEXT_PUBLIC_STARTER_PRICE_ID ?? "")}>
            {loading === (process.env.NEXT_PUBLIC_STARTER_PRICE_ID ?? "") ? "Loading…" : "Choose Starter"}
          </Button>
        </div>
        <div className="border rounded p-6 text-center">
          <h2 className="font-semibold">Pro</h2>
          <p className="text-gray-600">$50 / mo</p>
          <Button onClick={() => go(process.env.NEXT_PUBLIC_PRO_PRICE_ID ?? "")}
                  disabled={loading === (process.env.NEXT_PUBLIC_PRO_PRICE_ID ?? "")}>
            {loading === (process.env.NEXT_PUBLIC_PRO_PRICE_ID ?? "") ? "Loading…" : "Choose Pro"}
          </Button>
        </div>
      </div>
    </main>
  );
}
