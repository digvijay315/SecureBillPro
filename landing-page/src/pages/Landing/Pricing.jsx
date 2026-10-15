import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Plus, Minus } from 'lucide-react';

const Pricing = ({ onOpenRegister }) => {
  const [openFaq, setOpenFaq] = useState(0);

  const plans = [
    {
      name: "Free Tier",
      desc: "Perfect for small boutique hotels & guesthouses.",
      price: "Free",
      period: "/month",
      features: [
        "Up to 20 Rooms",
        "Basic POS & Billing",
        "Standard Analytics",
        "Email Support",
        "2 Staff Accounts"
      ],
      popular: false
    },
    {
      name: "Professional",
      desc: "Ideal for mid-sized hotels with a restaurant.",
      price: "₹1,499",
      period: "/month",
      features: [
        "Up to 100 Rooms",
        "Advanced POS & KOT",
        "Advanced Analytics & Reports",
        "Priority 24/7 Support",
        "Unlimited Staff Accounts",
        "GST Invoicing"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      desc: "For large hotel chains and luxury resorts.",
      price: "Custom",
      period: "",
      features: [
        "Unlimited Rooms",
        "Multi-Property Management",
        "Custom API Integrations",
        "Dedicated Account Manager",
        "Custom Feature Requests",
        "On-premise Deployment Option"
      ],
      popular: false
    }
  ];

  const faqs = [
    { q: "Is there a free trial available?", a: "Yes, we offer a 14-day free trial on all plans. No credit card required." },
    { q: "Can I upgrade or downgrade my plan later?", a: "Absolutely. You can change your plan at any time from your admin dashboard. Pro-rated charges will apply." },
    { q: "What kind of support do you offer?", a: "Starter plans get email support (24h response). Professional and Enterprise plans get priority 24/7 phone and chat support." },
    { q: "Do you charge setup fees?", a: "No, there are no hidden setup fees. You only pay the monthly subscription price." }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Luxury hotel background"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <p className="eyebrow">Pricing</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-3xl font-display text-5xl leading-tight text-ink-foreground lg:text-6xl"
          >
            Transparent plans for every property
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-ink-foreground/80"
          >
            No hidden fees. No surprise charges. Just powerful software to grow your business.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-stretch max-w-6xl mx-auto mb-32 mt-12 md:mt-0">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 lg:p-10 flex flex-col ${
                plan.popular 
                  ? 'bg-gold shadow-luxe md:-translate-y-4' 
                  : 'bg-card border border-border/20 shadow-luxe'
              } transition-transform duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                  <span className="bg-black text-[0.65rem] uppercase tracking-[0.2em] text-gold px-5 py-2">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className={`font-display text-3xl mb-3 ${plan.popular ? 'text-ink' : 'text-ink'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-8 h-10 ${plan.popular ? 'text-ink/80' : 'text-ink/60'}`}>
                {plan.desc}
              </p>
              
              <div className="mb-8 flex items-baseline gap-1 border-b pb-8" style={{ borderColor: plan.popular ? 'rgba(0,0,0,0.1)' : 'var(--border)' }}>
                <span className={`font-display text-5xl ${plan.popular ? 'text-ink' : 'text-gold'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-ink/70' : 'text-ink/60'}`}>
                  {plan.period}
                </span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-ink' : 'text-gold'}`} />
                    <span className={`text-[0.95rem] ${plan.popular ? 'text-ink' : 'text-ink/80'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={onOpenRegister}
                className={`w-full py-4 text-[0.7rem] uppercase tracking-[0.22em] transition-opacity hover:opacity-90 ${
                  plan.popular 
                    ? 'bg-ink text-gold' 
                    : 'border border-gold/60 text-gold hover:bg-gold hover:text-ink'
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-12">
            <p className="eyebrow">Compare</p>
            <h2 className="mt-4 font-display text-4xl text-ink">Full Feature List</h2>
          </div>
          <div className="bg-card border border-border/20 shadow-luxe overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border/20 bg-card">
                  <th className="p-6 text-[0.75rem] uppercase tracking-[0.15em] text-ink/80 font-normal">Features</th>
                  <th className="p-6 text-[0.75rem] uppercase tracking-[0.15em] text-ink/80 font-normal text-center">Starter</th>
                  <th className="p-6 text-[0.75rem] uppercase tracking-[0.15em] text-gold font-normal text-center bg-gold/5">Professional</th>
                  <th className="p-6 text-[0.75rem] uppercase tracking-[0.15em] text-ink/80 font-normal text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-[0.95rem]">
                {[
                  { name: "Max Rooms", s: "20", p: "100", e: "Unlimited" },
                  { name: "Staff Accounts", s: "2", p: "Unlimited", e: "Unlimited" },
                  { name: "Front Desk POS", s: true, p: true, e: true },
                  { name: "Restaurant KOT", s: false, p: true, e: true },
                  { name: "GST Invoicing", s: false, p: true, e: true },
                  { name: "Custom API", s: false, p: false, e: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-gold/5 transition-colors">
                    <td className="p-6 text-ink/90">{row.name}</td>
                    <td className="p-6 text-center text-ink/60">
                      {typeof row.s === 'boolean' ? (row.s ? <Check className="w-5 h-5 text-gold mx-auto" /> : <X className="w-5 h-5 text-ink/20 mx-auto" />) : row.s}
                    </td>
                    <td className="p-6 text-center text-gold bg-gold/5">
                      {typeof row.p === 'boolean' ? (row.p ? <Check className="w-5 h-5 text-gold mx-auto" /> : <X className="w-5 h-5 text-ink/20 mx-auto" />) : row.p}
                    </td>
                    <td className="p-6 text-center text-ink/60">
                      {typeof row.e === 'boolean' ? (row.e ? <Check className="w-5 h-5 text-gold mx-auto" /> : <X className="w-5 h-5 text-ink/20 mx-auto" />) : row.e}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow">Support</p>
            <h2 className="mt-4 font-display text-4xl text-ink">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border/20 shadow-sm transition-all">
                <button 
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display text-2xl text-ink">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-gold shrink-0" /> : <Plus className="w-5 h-5 text-gold/60 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-sm leading-relaxed text-ink/70"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
