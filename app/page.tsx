import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-20 space-y-4">
      <h1 className="text-2xl font-bold">df-web-v2</h1>
      <div className="space-x-4">
        <Link href="/login" className="underline">Login</Link>
        <Link href="/pricing" className="underline">Pricing</Link>
        <Link href="/app/dashboard" className="underline">Dashboard</Link>
      </div>
    </main>
  );
}
