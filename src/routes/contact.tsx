import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { CONTACT } from "@/components/SiteLayout";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracker";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — JK Service Kinshasa" },
      { name: "description", content: "Joindre JK Service à Kinshasa : téléphone 0810688062, WhatsApp, atelier à Kinsuka Pêcheur." },
      { property: "og:title", content: "Contact — JK Service" },
      { property: "og:description", content: "Téléphone, WhatsApp et adresse de l'atelier." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; label: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const PROMOS: Record<string, string> = {
    JK2026: "-10 % sur votre première commande",
    BIENVENUE: "-5 % sur votre première commande",
    KIN2026: "Pose offerte sur votre première commande",
  };

  const onApply = () => {
    const key = code.trim().toUpperCase();
    if (!key) return;
    const label = PROMOS[key];
    if (!label) {
      setApplied(null);
      setError("Ce code promo n'est pas valide.");
      return;
    }
    setApplied({ code: key, label });
    setError(null);
    trackEvent("promo_used", { code: key });
  };

  const promoMessage = useMemo(() => {
    const base = "Bonjour, je viens du site JK Service et j'aimerais échanger avec vous.";
    return applied
      ? `${base} J'utilise le code promo ${applied.code} (${applied.label}) pour ma première commande.`
      : base;
  }, [applied]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Contact</p>
      <h1 className="font-display text-5xl lg:text-7xl max-w-3xl text-balance">Parlons de votre projet.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Appelez, écrivez ou passez à l'atelier. Réponse rapide, devis sans engagement.</p>

      <div className="mt-16 grid lg:grid-cols-2 gap-px bg-border">
        <a href={`tel:${CONTACT.PHONE}`} onClick={() => trackEvent("phone_click", { from: "/contact" })} className="bg-background p-10 group hover:bg-card transition">
          <Phone className="w-7 h-7 text-ember mb-6" />
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Téléphone</div>
          <div className="font-display text-3xl group-hover:text-ember transition">{CONTACT.PHONE}</div>
          <div className="text-sm text-muted-foreground mt-3">Appel direct — mentionnez le site pour un suivi prioritaire</div>
        </a>
        <a href={buildWhatsAppLink()} onClick={() => trackEvent("whatsapp_click", { from: "/contact" })} target="_blank" rel="noreferrer" className="bg-background p-10 group hover:bg-card transition">
          <MessageCircle className="w-7 h-7 text-ember mb-6" />
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">WhatsApp</div>
          <div className="font-display text-3xl group-hover:text-ember transition">Envoyer un message</div>
          <div className="text-sm text-muted-foreground mt-3">Idéal pour partager photos & mesures</div>
        </a>
        <div className="bg-background p-10">
          <MapPin className="w-7 h-7 text-ember mb-6" />
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Atelier</div>
          <div className="font-display text-2xl leading-tight">Entrée Mimosa<br/>Kinsuka Pêcheur</div>
          <div className="text-sm text-muted-foreground mt-3">Kinshasa, RDC — intervention partout en ville</div>
        </div>
        <div className="bg-background p-10">
          <Clock className="w-7 h-7 text-ember mb-6" />
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Disponibilité</div>
          <div className="font-display text-2xl leading-tight">Lun — Sam<br/>7h30 — 18h</div>
          <div className="text-sm text-muted-foreground mt-3">Déplacement gratuit pour mesure</div>
        </div>
      </div>

      {/* PROMO CODE — première commande via le site */}
      <div className="mt-16 border border-border bg-card/30 p-8 lg:p-10 max-w-2xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember mb-4">
          <Tag className="w-4 h-4" /> Code promo — Première commande
        </div>
        <h2 className="font-display text-3xl mb-2">Vous avez un code ?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Réservé aux nouveaux clients passant commande via le site. Entrez votre code, il sera transmis automatiquement à Jean dans votre message WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex : JK2026"
            className="flex-1 h-12 px-4 bg-background border border-border focus:border-ember outline-none uppercase tracking-wider"
          />
          <button
            onClick={onApply}
            className="h-12 px-6 bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Appliquer
          </button>
        </div>
        {applied && (
          <div className="mt-5 p-4 border border-ember/40 bg-ember/5 text-sm">
            <div className="font-medium text-ember mb-1">Code {applied.code} appliqué</div>
            <div className="text-muted-foreground">{applied.label}</div>
            <a
              href={buildWhatsAppLink(promoMessage)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { from: "/contact", promo: applied.code })}
              className="mt-4 inline-flex items-center gap-2 px-5 h-11 bg-ember text-ember-foreground font-medium hover:opacity-90 transition"
            >
              <MessageCircle className="w-4 h-4" /> Profiter de l'offre sur WhatsApp
            </a>
          </div>
        )}
        {error && (
          <div className="mt-5 p-4 border border-destructive/40 bg-destructive/5 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      <form
        action={`mailto:?subject=Demande de devis — JK Service`}
        method="post"
        encType="text/plain"
        className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl"
      >
        <h2 className="md:col-span-2 font-display text-3xl mb-2">Ou décrivez votre projet</h2>
        <input name="Nom" required placeholder="Votre nom" className="h-12 px-4 bg-card border border-border focus:border-ember outline-none" />
        <input name="Téléphone" required placeholder="Téléphone / WhatsApp" className="h-12 px-4 bg-card border border-border focus:border-ember outline-none" />
        <textarea name="Projet" required placeholder="Décrivez votre projet (type, dimensions, quartier...)" rows={5} className="md:col-span-2 p-4 bg-card border border-border focus:border-ember outline-none resize-none" />
        <button type="submit" className="md:col-span-2 h-12 bg-ember text-ember-foreground font-medium hover:opacity-90 transition">
          Envoyer la demande
        </button>
        <p className="md:col-span-2 text-xs text-muted-foreground">Ce formulaire ouvre votre application mail. Pour une réponse plus rapide, appelez ou WhatsApp.</p>
      </form>
    </section>
  );
}
