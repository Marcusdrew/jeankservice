import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracker";

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

  useEffect(() => {
    trackEvent("pageview", { path });
  }, [path]);

  const waHref = buildWhatsAppLink();
  const onWa = () => trackEvent("whatsapp_click", { from: path });
  const onPhone = () => trackEvent("phone_click", { from: path });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-ember to-ember/60 shadow-[0_0_20px_-4px_var(--ember)] group-hover:scale-105 transition-transform">
              <span className="font-display text-sm text-ember-foreground font-semibold">J</span>
            </span>
            <span className="font-display text-base sm:text-lg tracking-tight leading-none">
              JK<span className="text-ember">.</span>Service
              <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5 font-sans font-normal">Aluminium · Kinshasa</span>
            </span>
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
              href={waHref}
              onClick={onWa}
              target="_blank"
              rel="noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 pl-3 pr-4 h-10 rounded-full bg-gradient-to-r from-ember to-ember/85 text-ember-foreground text-sm font-medium shadow-[0_6px_20px_-8px_var(--ember)] hover:shadow-[0_10px_28px_-8px_var(--ember)] hover:-translate-y-px transition-all"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-ember-foreground/15">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <span>Écrire</span>
            </a>
            <a
              href={`tel:${PHONE}`}
              onClick={onPhone}
              className="inline-flex items-center gap-2 pl-3 pr-4 h-10 rounded-full border border-steel/25 bg-card/40 backdrop-blur text-sm hover:bg-accent hover:border-steel/40 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-ember" />
              <span className="hidden sm:inline tracking-wide">{PHONE}</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-0.5 w-10 h-10 inline-flex items-center justify-center rounded-full border border-border/70 bg-card/40 hover:bg-accent transition"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-5 py-3 space-y-1">
              {nav.map((n) => {
                const active = path === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"}`}
                  >
                    <span className="tracking-wide">{n.label}</span>
                    <span className={`h-1.5 w-1.5 rounded-full transition-all ${active ? "bg-ember scale-100" : "bg-transparent scale-0"}`} />
                  </Link>
                );
              })}
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-border/60 mt-1 grid grid-cols-2 gap-2">
              <a
                href={waHref}
                onClick={() => { onWa(); setOpen(false); }}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-gradient-to-r from-ember to-ember/85 text-ember-foreground text-sm font-medium shadow-[0_6px_20px_-8px_var(--ember)]"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                onClick={() => { onPhone(); setOpen(false); }}
                className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-steel/25 bg-card/50 text-sm"
              >
                <Phone className="w-4 h-4 text-ember" /> Appeler
              </a>
            </div>
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
              <li><a href={`tel:${PHONE}`} onClick={onPhone} className="flex items-center gap-2 hover:text-ember"><Phone className="w-4 h-4" /> {PHONE}</a></li>
              <li><a href={waHref} onClick={onWa} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ember"><MessageCircle className="w-4 h-4" /> WhatsApp direct</a></li>
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
