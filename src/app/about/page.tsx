import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Viky, photographer based in Vienna, Austria.",
};

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-6">About</h1>
      <p className="text-neutral-600 max-w-xl leading-relaxed">Coming soon.</p>
    </main>
  );
}
