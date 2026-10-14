import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Swal from "sweetalert2";

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: "New Grant Estate, Lal Pokhra,Dumka,Jharkhand - 814101",
  },
  { icon: Phone, label: "Phone", value: "+91 70044 51454", href: "tel:+919876543210" },
  {
    icon: Mail,
    label: "Email",
    value: "info@securebillpro.com",
    href: "mailto:info@securebillpro.com",
  },
  { icon: Clock, label: "Support team", value: "24/7 technical and sales support" },
];

function Field({
  label,
  name,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <section className="surface-ink px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Contact</p>
          <h1 className="rule-gold mt-5 max-w-2xl font-display text-5xl leading-tight lg:text-6xl">
            Get in touch with us
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="space-y-9">
          {details.map((d) => (
            <div key={d.label} className="flex gap-4">
              <d.icon className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {d.label}
                </p>
                {d.href ? (
                  <a
                    href={d.href}
                    className="mt-1 block font-display text-2xl hover:text-primary"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-1 text-[0.95rem] leading-relaxed">{d.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-border bg-card p-8 shadow-luxe lg:p-10">
          <p className="eyebrow">Enquiry</p>
          <h2 className="mt-3 font-display text-3xl">Send us your details</h2>
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              Swal.fire({
                icon: "success",
                title: "Thank you",
                text: "Our team will call you shortly.",
              });
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" placeholder="+91" />
            </div>
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <div>
              <label
                htmlFor="purpose"
                className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Purpose
              </label>
              <select
                id="purpose"
                name="purpose"
                className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold"
              >
                <option>Sales Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your property and requirements."
                className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              {sent ? "Enquiry sent" : "Submit enquiry"}
            </button>
            <p className="text-xs text-muted-foreground">
              For urgent queries, please call our support line at +91 98765 43210.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
