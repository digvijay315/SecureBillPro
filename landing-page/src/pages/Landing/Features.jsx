import React from 'react';
import { Link } from "react-router-dom";
import {
  BedDouble,
  UtensilsCrossed,
  PartyPopper,
  Wifi,
  ShieldCheck,
  Smartphone,
  Printer,
  PieChart
} from "lucide-react";

const rooms = [
  {
    name: "Standard POS",
    size: "For Cafes",
    copy: "Quick billing, inventory tracking, and KOT generation. Perfect for small to medium food outlets.",
  },
  {
    name: "Advanced Hotel OS",
    size: "For Hotels",
    copy: "Includes room management, multi-outlet billing, staff tracking, and comprehensive reporting.",
  },
  {
    name: "Enterprise Suite",
    size: "For Chains",
    copy: "Centralized dashboard for multiple locations, advanced analytics, and custom integrations.",
  },
];

const amenities = [
  { icon: Smartphone, label: "Captain Ordering", copy: "Staff can take orders via any mobile device." },
  { icon: Printer, label: "Multi-Printer Routing", copy: "Send orders automatically to different kitchen sections." },
  { icon: PieChart, label: "Real-time Analytics", copy: "Monitor sales and inventory from anywhere." },
  { icon: Wifi, label: "Offline Mode", copy: "Continue billing seamlessly without internet." },
  { icon: ShieldCheck, label: "Role-based Security", copy: "Control staff access and prevent unauthorized actions." },
  { icon: PartyPopper, label: "CRM & Loyalty", copy: "Manage customer data and run loyalty programs." },
];

const pillars = [
  {
    icon: BedDouble,
    image: "/suite.jpg",
    eyebrow: "Property Management",
    title: "Streamline Room Operations",
    copy: "Manage bookings, check-ins, check-outs, and housekeeping. Provide your guests with a seamless experience from arrival to departure with our integrated dashboard.",
  },
  {
    icon: UtensilsCrossed,
    image: "/dining.jpg",
    eyebrow: "F&B Billing",
    title: "Lightning Fast POS",
    copy: "Process orders quickly during peak hours. Apply discounts, split bills, and manage complex taxes with a few clicks. Supports dine-in, takeaway, and room service.",
  },
  {
    icon: PartyPopper,
    image: "/banquet.jpg",
    eyebrow: "Inventory",
    title: "Smart Stock Management",
    copy: "Keep track of every ingredient. Get low-stock alerts, manage vendor payments, and calculate recipe costs to ensure you maintain healthy profit margins.",
  },
];

function Features() {
  return (
    <div className="min-h-screen bg-background">
      <section className="surface-ink px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Features</p>
          <h1 className="rule-gold mt-5 max-w-2xl font-display text-5xl leading-tight lg:text-6xl">
            Everything you need, in one place
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
            From taking the first order to generating end-of-day reports, Secure Bill Pro handles all your operational heavy lifting.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-6 py-24 lg:px-10">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`grid items-center gap-12 lg:grid-cols-2 ${
              i % 2 ? "lg:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="overflow-hidden shadow-luxe">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={960}
                className="h-[26rem] w-full object-cover"
              />
            </figure>
            <div>
              <p.icon className="text-gold" size={26} />
              <p className="eyebrow mt-5">{p.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">
                {p.title}
              </h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
                {p.copy}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Plans</p>
          <h2 className="mt-4 font-display text-4xl">Software Packages</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {rooms.map((r) => (
              <div key={r.name} className="border border-border bg-card p-8">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {r.size}
                </p>
                <h3 className="mt-3 font-display text-2xl">{r.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {r.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">Capabilities</p>
        <h2 className="mt-4 font-display text-4xl">Included with Secure Bill Pro</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div key={a.label} className="flex gap-4">
              <a.icon className="mt-1 shrink-0 text-gold" size={22} />
              <div>
                <h3 className="font-display text-xl">{a.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-10">
          <Link
            to="/contact"
            className="inline-block bg-primary px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground"
          >
            Start Your Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Features;
