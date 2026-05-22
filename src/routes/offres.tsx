import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, MessageCircle, Sparkles, Tag } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracker";

export const Route = createFileRoute("/offres")({
  component: Offres,
  head: () => ({
    meta: [
      { title: "Offres & Tarifs — Gestion de site web pour artisans" },
      { name: "description", content: "Création et gestion de site web pour artisans à Kinshasa. Formules Essentielle (20 $/mois) et Pro (45 $/mois)." },
      { property: "og:title", content: "Offres & Tarifs — Sites pour artisans" },
      { property: "og:description", content: "Création + gestion mensuelle de votre site vitrine." },
      { property: "og:url", content: "/offres" },
    ],
    links: [{ rel: "canonical", href: "/offres" }],
  }),
});

type Promo = { label: string; discount: string };
const PROMOS: Record<string, Promo> = {
  JK2026: { label: "-15 % sur votre premier mois d'abonnement", discount: "-15 %" },
  ARTISAN50: { label: "-50 $ sur les frais de création", discount: "-50 $" },
  KIN2026: { label: "1 mois gratuit sur la formule Essentielle", discount: "1 mois offert" },
};

const plans = [
  {
    id: "essentielle",
    name: "Essentielle",
    price: "20 $",
    tagline: "Pour démarrer et rester visible.",
    features: [
      "Hébergement & nom de domaine inclus",
      "Jusqu'à 5 nouvelles photos par mois",
      "Ajout de nouveaux témoignages",
      "Suivi des visites & contacts WhatsApp",
      "Petites modifications (texte, prix, horaires)",
      "Support WhatsApp sous 48h",
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "45 $",
    tagline: "Pour grandir et convertir plus.",
    features: [
      "Tout ce qui est dans Essentielle",
      "Photos illimitées + retouche",
      "Nouvelles sections / pages à la demande",
      "Rapport mensuel détaillé (visites, clics, contacts)",
      "Optimisation Google (SEO local Kinshasa)",
      "Support prioritaire sous 12h",
      "1 campagne promo / mois (bannière site)",
    ],
    highlight: true,
  },
] as const;

function Offres() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; promo: Promo } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onApply = () => {
    const key = code.trim().toUpperCase();
    if (!key) return;
    const promo = PROMOS[key];
    if (!promo) {
      setApplied(null);
      setError("Ce code promo n'est pas valide.");
      return;
    }
    setApplied({ code: key, promo });
    setError(null);
    trackEvent("promo_used", { code: key });
  };

  const message = useMemo(() => {
    const base = "Bonjour, je viens du site JK Service et je suis intéressé par vos offres de gestion de site.";
    return applied ? `${base} J'utilise le code promo ${applied.code} (${applied.promo.label}).` : base;
  }, [applied]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Offres & Tarifs</p>
      <h1 className="font-display text-5xl lg:text-7xl max-w-3xl text-balance">
        Un site qui travaille pour vous, <em className="not-italic text-ember">chaque mois</em>.
      </h1>
      <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
        Création de votre site vitrine à partir de <strong className="text-foreground">200 $</strong> (paiement unique),
        puis une formule mensuelle au choix pour qu'il reste vivant, à jour et visible sur Google.
      </p>

      {/* PLANS */}
      <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`relative bg-background p-10 ${p.highlight ? "ring-1 ring-ember/40" : ""}`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-10 inline-flex items-center gap-1 bg-ember text-ember-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                <Sparkles className="w-3 h-3" /> Recommandée
              </span>
            )}
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Formule {p.name}</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-5xl">{p.price}</span>
              <span className="text-muted-foreground text-sm">/ mois</span>
            </div>
            <p className="text-muted-foreground mb-8">{p.tagline}</p>
            <ul className="space-y-3 mb-10">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="w-4 h-4 text-ember shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppLink(
                `${message} Je choisis la formule ${p.name} (${p.price}/mois).`,
              )}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { from: "/offres", plan: p.id })}
              className={`inline-flex items-center gap-2 px-5 h-11 font-medium transition ${
                p.highlight
                  ? "bg-ember text-ember-foreground hover:opacity-90"
                  : "border border-steel/40 hover:bg-accent"
              }`}
            >
              <MessageCircle className="w-4 h-4" /> Choisir la formule {p.name}
            </a>
          </article>
        ))}
      </div>

      {/* PROMO CODE */}
      <div className="mt-16 border border-border bg-card/30 p-8 lg:p-10 max-w-2xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember mb-4">
          <Tag className="w-4 h-4" /> Code promo
        </div>
        <h2 className="font-display text-3xl mb-2">Vous avez un code ?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Entrez votre code pour débloquer une remise. Elle sera mentionnée automatiquement dans votre message WhatsApp.
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
            <div className="font-medium text-ember mb-1">Code {applied.code} appliqué — {applied.promo.discount}</div>
            <div className="text-muted-foreground">{applied.promo.label}</div>
          </div>
        )}
        {error && (
          <div className="mt-5 p-4 border border-destructive/40 bg-destructive/5 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      {/* CONTACT CTA */}
      <div className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-3xl lg:text-4xl max-w-2xl text-balance">
          Une question avant de choisir ?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Discutons de votre projet — sans engagement, en quelques minutes sur WhatsApp.
        </p>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_click", { from: "/offres", cta: "footer" })}
          className="mt-6 inline-flex items-center gap-2 px-6 h-12 bg-ember text-ember-foreground font-medium hover:opacity-90 transition"
        >
          <MessageCircle className="w-4 h-4" /> Parler à Jean
        </a>
      </div>
    </section>
  );
}