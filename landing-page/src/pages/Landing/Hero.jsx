import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    image: "/suite.jpg",
    eyebrow: "Operations",
    title: "Room & Inventory Management",
    copy: "Keep track of check-ins, check-outs, and housekeeping status in real-time. Manage your property's capacity effortlessly.",
  },
  {
    image: "/dining.jpg",
    eyebrow: "Billing",
    title: "Smart Restaurant POS",
    copy: "Lightning-fast billing for your in-house restaurant or cafe. Support for split bills, KOT printing, and inventory tracking.",
  },
  {
    image: "/banquet.jpg",
    eyebrow: "Insights",
    title: "Detailed Reports & Analytics",
    copy: "Make data-driven decisions with daily sales reports, tax summaries, and staff performance metrics right at your fingertips.",
  },
];

function Hero() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Luxury hotel background"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="fade-up relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow">The Ultimate Hotel POS</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink-foreground sm:text-6xl lg:text-7xl">
            Smarter Billing, Smoother Operations
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80">
            Secure Bill Pro is an intelligent operating system for hotels and restaurants. 
            Streamline your billing, manage inventory, and deliver exceptional guest experiences with ease.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gold px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
            >
              Start Free Trial
            </Link>
            <Link
              to="/features"
              className="border border-ink-foreground/40 px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">The Platform</p>
            <h2 className="rule-gold mt-5 font-display text-4xl leading-tight lg:text-5xl">
              Built for hospitality businesses of all sizes
            </h2>
          </div>
          <div className="space-y-6 text-[0.98rem] leading-relaxed text-muted-foreground">
            <p>
              Whether you run a 10-room boutique inn or a 200-room luxury resort with multiple dining outlets, Secure Bill Pro adapts to your workflow. 
              Say goodbye to paper trails and manual errors.
            </p>
            <p>
              Our cloud-based system ensures your data is secure and accessible from anywhere, while our robust offline mode keeps your billing running even when the internet goes down.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["10x", "Faster Billing"],
                ["0%", "Downtime"],
                ["24/7", "Premium Support"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl text-primary">{n}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            {highlights.map((h) => (
              <article
                key={h.title}
                className="group overflow-hidden bg-card shadow-luxe"
              >
                <div className="overflow-hidden">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <p className="eyebrow">{h.eyebrow}</p>
                  <h3 className="mt-3 font-display text-2xl">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {h.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-ink py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow">Get Started</p>
          <h2 className="mt-5 font-display text-4xl leading-tight lg:text-5xl">
            Ready to upgrade your operations?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
            Join hundreds of hotels and restaurants that have modernized their billing with Secure Bill Pro. 
            Schedule a free demo today.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="bg-gold px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink"
            >
              Call Sales
            </a>
            <Link
              to="/contact"
              className="border border-ink-foreground/40 px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink-foreground hover:border-gold hover:text-gold"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
