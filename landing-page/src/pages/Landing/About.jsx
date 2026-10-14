import React from 'react';
import { Link } from "react-router-dom";

const values = [
  {
    title: "Simplicity First",
    copy: "Software should get out of your way. We build intuitive tools that require zero training to operate.",
  },
  {
    title: "Reliability at Scale",
    copy: "From power outages to internet drops, our offline-first architecture ensures your business never stops.",
  },
  {
    title: "Customer Obsessed",
    copy: "We don't just sell software, we partner with you. Our 24/7 support team is always just a call away.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex min-h-[62vh] items-end overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Modern hotel interior"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <p className="eyebrow">About Secure Bill Pro</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-tight text-ink-foreground lg:text-6xl">
            Built for modern hospitality
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="rule-gold mt-5 font-display text-4xl leading-tight">
              Empowering hoteliers to focus on guests, not paperwork.
            </h2>
          </div>
          <div className="space-y-6 text-[0.98rem] leading-relaxed text-muted-foreground">
            <p>
              Secure Bill Pro was created with a simple vision: to give independent hotels and restaurant owners the same powerful technology that massive hospitality chains use, without the complexity or exorbitant costs.
            </p>
            <p>
              We noticed that most billing systems were either too basic to handle real-world scenarios or too complex for staff to learn quickly. We built Secure Bill Pro to bridge that gap—combining robust features with an incredibly simple interface.
            </p>
            <p>
              Today, hundreds of properties rely on our platform to process daily orders, manage inventory, and deliver seamless guest experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">What we stand for</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-gold/50 pt-6">
                <p className="font-display text-3xl text-gold">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl leading-snug">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-ink py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="eyebrow">Contact Sales</p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl">
              Ready to see Secure Bill Pro in action?
            </h2>
            <p className="mt-2 text-sm text-ink-foreground/60">
              Schedule a personalized demo for your property.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-gold px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
