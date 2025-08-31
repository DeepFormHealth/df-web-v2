"use client";
import { useState } from "react";
import supabase from "../../lib/supabase-browser";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMsg(error ? error.message : "Check your email for a magic link.");
  }

  return (
    <main className="flex flex-col items-center py-20 space-y-4">
      <h1 className="text-xl font-bold">Login</h1>
      <form onSubmit={submit} className="space-x-2">
        <input
          className="border px-3 py-2 rounded"
          type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Button type="submit">Send magic link</Button>
      </form>
      {msg && <p className="text-sm">{msg}</p>}
    </main>
  );
}
