import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import RegisterModal from './RegisterModal';
import './landing.css';

const navItems = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function SiteHeader({ onOpenRegister }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "surface-ink border-b border-border/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <img src="/secure_bill_pro_logo.jpg" alt="Secure Bill Pro Logo" className="h-10 w-10 object-cover rounded-md border border-gold/30 shadow-sm" />
          <div className="flex flex-col leading-none items-start hidden sm:flex">
            <span className="font-display text-2xl tracking-wide text-gold">Secure Bill Pro</span>
            <span className="mt-1 text-[0.55rem] uppercase tracking-luxe text-gold-soft/80">
              Intelligent Hotel OS
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => 
                `text-[0.7rem] uppercase tracking-[0.22em] transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-ink-foreground/75"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-4">
            <a
              href="https://admin.securebillpro.com"
              className="border border-gold/60 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Log in
            </a>
            <button
              onClick={onOpenRegister}
              className="bg-gold px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink font-semibold transition-opacity hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-ink-foreground md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="surface-ink mt-3 border-t border-border/20 md:hidden">
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => 
                  `border-b border-border/10 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] ${
                    isActive ? "text-gold" : "text-ink-foreground/80"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://admin.securebillpro.com"
                onClick={() => setOpen(false)}
                className="text-center border border-gold/60 px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors"
              >
                Log in
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenRegister();
                }}
                className="w-full bg-gold px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-opacity"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="surface-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src="/secure_bill_pro_logo.jpg" alt="Secure Bill Pro Logo" className="h-20 w-20 object-cover rounded-full border border-gold/30 shadow-sm" />
            <div className="flex flex-col leading-none items-start">
              <span className="font-display text-2xl tracking-wide text-gold">Secure Bill Pro</span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-luxe text-gold-soft/80">
                Next Generation Hotel OS
              </span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            A comprehensive billing and management solution for modern hotels, 
            restaurants, and cafes. Designed to streamline operations, reduce wait 
            times, and maximize your profits.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-ink-foreground/70">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/features" className="hover:text-gold">Features</Link>
            <Link to="/about" className="hover:text-gold">About</Link>
            <Link to="/contact" className="hover:text-gold">Contact</Link>
            <a href="https://admin.securebillpro.com" className="hover:text-gold">Log in</a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Reach us</p>
          <div className="mt-5 flex flex-col gap-4 text-sm text-ink-foreground/70">
            <p className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>New Grant Estate, Lal Pokhra, Dumka, Jharkhand - 814101</span>
            </p>
            <a href="tel:+917004451454" className="flex gap-3 hover:text-gold">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              +91 70044 51454
            </a>
            <a href="mailto:info@securebillpro.com" className="flex gap-3 hover:text-gold">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              info@securebillpro.com
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/15">
        <div className="mx-auto max-w-7xl px-6 py-6 text-[0.65rem] uppercase tracking-[0.2em] text-ink-foreground/50 lg:px-10">
          © {new Date().getFullYear()} Secure Bill Pro
        </div>
      </div>
    </footer>
  );
}

const LandingLayout = ({ children }) => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <div className="landing-scope min-h-screen flex flex-col relative">
      <SiteHeader onOpenRegister={() => setRegisterOpen(true)} />
      <main className="flex-grow">
        {React.cloneElement(children, { onOpenRegister: () => setRegisterOpen(true) })}
      </main>
      <SiteFooter />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  );
};

export default LandingLayout;
