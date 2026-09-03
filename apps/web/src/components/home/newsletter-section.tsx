"use client";

import { Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brown via-maroon to-brown" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(176,141,87,0.18),transparent)]"
        aria-hidden
      />

      <div className="container-main relative z-[1] mx-auto max-w-xl text-center">
        <FadeIn direction="up">
          <p className="mb-4 font-devanagari text-sm tracking-[0.3em] text-gold-light/80">
            शुभ आमंत्रण
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream">
            Festival Alerts & Puja Guides
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/70">
            Get puja checklists, festival offers, and helpful guides — no spam, ever.
          </p>
        </FadeIn>

        <FadeIn pace="medium" className="mt-10">
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            action="/api/newsletter"
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fd.get("email") }),
              });
              alert("Thank you for subscribing!");
              e.currentTarget.reset();
            }}
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-light/50" />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="w-full rounded-lg border border-gold/20 bg-cream py-3.5 pl-10 pr-4 text-sm text-brown outline-none transition-[box-shadow] duration-[var(--duration-fast)] focus:ring-2 focus:ring-brass/40"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-brass px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-gold motion-reduce:transform-none hover:-translate-y-px"
            >
              Subscribe
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
