import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const PHONE = "0810688062";
const WHATSAPP = "243810688062"; // RDC indicatif

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/savoir-faire", label: "Savoir-faire" },
  { to: "/temoignages", label: "Témoignages" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="inline-block w-2 h-6 bg-ember group-hover:h-7 transition-all" />
            <span className="font-display text-lg tracking-tight">JK<span className="text-ember">.</span>Service</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => {
              const active = path === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm tracking-wide transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {n.label}
                  {active && <span className="block h-px w-full bg-ember mt-1" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 h-10 bg-ember text-ember-foreground text-sm font-medium hover:opacity-90 transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-4 h-10 border border-steel/30 text-sm hover:bg-accent transition"
            >
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">{PHONE}</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-1 w-10 h-10 inline-flex items-center justify-center border border-border"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-border bg-background">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-sm border-b border-border hover:bg-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/40 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-6 bg-ember" />
              <span className="font-display text-lg">JK<span className="text-ember">.</span>Service</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Menuiserie aluminium sur mesure à Kinshasa. Fenêtres, portes, vérandas, portails — pensés et posés par un artisan.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-ember"><Phone className="w-4 h-4" /> {PHONE}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ember"><MessageCircle className="w-4 h-4" /> WhatsApp direct</a></li>
              <li className="flex items-start gap-2 text-muted-foreground"><MapPin className="w-4 h-4 mt-0.5" /> Entrée Mimosa, Kinsuka Pêcheur — Kinshasa</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} JK Service — Kinshasa, RDC
        </div>
      </footer>
    </div>
  );
}

export const CONTACT = { PHONE, WHATSAPP };
