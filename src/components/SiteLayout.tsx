import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Menu, X, ArrowUpRight, Clock, Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracker";

const PHONE = "0810688062";
const WHATSAPP = "243810688062"; // RDC indicatif

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.05 4.91A10 10 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.37a9.9 9.9 0 0 0 4.73 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.9-7.02ZM12.04 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.7-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.18 3.7.58.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.31Z"/>
  </svg>
);

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
              className="group hidden sm:inline-flex items-center gap-2 pl-2.5 pr-4 h-10 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white text-sm font-medium shadow-[0_6px_20px_-8px_rgba(37,211,102,0.7)] hover:shadow-[0_10px_28px_-8px_rgba(37,211,102,0.8)] hover:-translate-y-px transition-all"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15">
                <WhatsAppIcon className="w-4 h-4" />
              </span>
              <span>WhatsApp</span>
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
                className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white text-sm font-medium shadow-[0_6px_20px_-8px_rgba(37,211,102,0.7)]"
              >
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
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

      <footer className="relative border-t border-border/60 bg-gradient-to-b from-card/30 via-card/50 to-background mt-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
        <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-ember/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
          {/* CTA band */}
          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-6 sm:p-8 mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight">Un projet en aluminium ?</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-md">Devis gratuit sous 24 h. Mesures, conseils et pose par l'artisan en personne.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={waHref}
                onClick={onWa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 pl-2.5 pr-5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white text-sm font-medium shadow-[0_8px_24px_-10px_rgba(37,211,102,0.8)] hover:-translate-y-px transition-transform"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15"><WhatsAppIcon className="w-4 h-4" /></span>
                Discuter sur WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full border border-steel/30 bg-background/40 text-sm hover:bg-accent transition"
              >
                Demander un devis <ArrowUpRight className="w-4 h-4 text-ember" />
              </Link>
            </div>
          </div>

          {/* Columns */}
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-ember to-ember/60 shadow-[0_0_20px_-4px_var(--ember)]">
                  <span className="font-display text-sm text-ember-foreground font-semibold">J</span>
                </span>
                <div className="leading-tight">
                  <div className="font-display text-lg">JK<span className="text-ember">.</span>Service</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Aluminium · Kinshasa</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Menuiserie aluminium sur mesure à Kinshasa. Fenêtres, portes, vérandas et portails — pensés, fabriqués et posés par un artisan passionné.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card/40 hover:border-ember/50 hover:text-ember transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card/40 hover:border-ember/50 hover:text-ember transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={waHref} onClick={onWa} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card/40 hover:border-[#25D366]/60 hover:text-[#25D366] transition">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href={`tel:${PHONE}`} onClick={onPhone} className="group flex items-start gap-3 hover:text-foreground">
                    <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-ember/10 text-ember group-hover:bg-ember/20 transition"><Phone className="w-3.5 h-3.5" /></span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Téléphone</span>
                      <span className="block">{PHONE}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={waHref} onClick={onWa} target="_blank" rel="noreferrer" className="group flex items-start gap-3 hover:text-foreground">
                    <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition"><WhatsAppIcon className="w-3.5 h-3.5" /></span>
                    <span>
                      <span className="block text-xs text-muted-foreground">WhatsApp</span>
                      <span className="block">Réponse en moins d'1 h</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-foreground"><MapPin className="w-3.5 h-3.5" /></span>
                  <span>
                    <span className="block text-xs">Atelier</span>
                    <span className="block text-foreground">Entrée Mimosa, Kinsuka Pêcheur — Kinshasa</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-foreground"><Clock className="w-3.5 h-3.5" /></span>
                  <span>
                    <span className="block text-xs">Ouvert</span>
                    <span className="block text-foreground">Lun – Sam · 08h – 18h</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition">
                      <span className="h-px w-3 bg-border group-hover:w-5 group-hover:bg-ember transition-all" />
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative border-t border-border/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} JK Service — Kinshasa, RDC. Tous droits réservés.</div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              Artisan disponible aujourd'hui
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const CONTACT = { PHONE, WHATSAPP };
