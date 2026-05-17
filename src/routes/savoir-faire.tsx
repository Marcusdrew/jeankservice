import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Maximize2, Feather, ShieldCheck, Droplets, Palette } from "lucide-react";
import sf from "@/assets/real-7-hd.jpg";

export const Route = createFileRoute("/savoir-faire")({
  component: SavoirFaire,
  head: () => ({
    meta: [
      { title: "Savoir-faire — JK Service Kinshasa" },
      { name: "description", content: "L'atelier, la méthode et l'exigence d'un artisan aluminium à Kinshasa." },
      { property: "og:title", content: "Savoir-faire — JK Service" },
      { property: "og:description", content: "L'atelier et la méthode de Jean." },
      { property: "og:url", content: "/savoir-faire" },
    ],
    links: [{ rel: "canonical", href: "/savoir-faire" }],
  }),
});

const steps = [
  { n: "01", t: "Visite & mesure", d: "Déplacement gratuit dans Kinshasa pour comprendre votre besoin et prendre les cotes exactes." },
  { n: "02", t: "Devis détaillé", d: "Profilés, vitrage, quincaillerie, coloris : tout est posé noir sur blanc avant de commencer." },
  { n: "03", t: "Fabrication atelier", d: "Découpe et assemblage à Kinsuka. Chaque ouverture est préparée avant la pose." },
  { n: "04", t: "Pose & finitions", d: "Installation propre, ajustements, joints, nettoyage. On part quand c'est parfait." },
];

const advantages = [
  {
    icon: Maximize2,
    t: "Gagnez de l'espace",
    d: "À Kinshasa, les maisons sont souvent compactes. Les portes et fenêtres coulissantes en aluminium s'ouvrent sans empiéter sur la pièce — contrairement aux battants traditionnels qui mangent un mètre carré à chaque ouverture.",
  },
  {
    icon: Feather,
    t: "Léger, sans abîmer la maison",
    d: "L'aluminium pèse une fraction du fer forgé. Les murs et les linteaux ne travaillent pas sous le poids, la maçonnerie ne se fissure pas avec le temps — un vrai problème avec les anciennes menuiseries en fer.",
  },
  {
    icon: Droplets,
    t: "Ne rouille jamais",
    d: "Aluminium et inox résistent à l'humidité, aux pluies de Kinshasa et à l'air chargé du fleuve. Pas de rouille, pas de coulures sur les murs, pas de repeinture tous les deux ans.",
  },
  {
    icon: ShieldCheck,
    t: "Solide et sécurisant",
    d: "Profilés renforcés, quincaillerie verrouillable, vitrage adapté : une porte ou un portail aluminium bien posé tient tête au temps comme aux mauvaises intentions.",
  },
  {
    icon: Palette,
    t: "Finitions sur mesure",
    d: "Thermolaquage en plusieurs coloris, vitrage clair, fumé ou décoratif, poignées au choix. Chaque ouverture s'accorde à votre maison plutôt que l'inverse.",
  },
];

function SavoirFaire() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 grid lg:grid-cols-2 gap-16 items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Savoir-faire</p>
          <h1 className="font-display text-5xl lg:text-7xl text-balance leading-[0.95]">Un métier de patience et de précision.</h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Jean Kakudji travaille l'aluminium et l'inox depuis des années. Du premier coup de mètre à la dernière vis, il pose lui-même — parce que la qualité d'une ouverture ou d'un garde-corps se joue au millimètre, pas au catalogue.
          </p>
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={sf} alt="Jean au travail dans son atelier" width={1600} height={1067} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <h2 className="font-display text-3xl lg:text-4xl mb-12">La méthode, en quatre temps.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s) => (
              <div key={s.n} className="bg-background p-8">
                <div className="text-ember text-sm tabular-nums mb-6">{s.n}</div>
                <h3 className="text-xl mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Pourquoi l'aluminium &amp; l'inox</p>
          <h2 className="font-display text-4xl lg:text-5xl text-balance leading-[1.05]">Les bons matériaux changent tout — surtout à Kinshasa.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Pourquoi remplacer le fer ou le bois par de l'aluminium et de l'inox ? Voici ce que ça change concrètement chez vous.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {advantages.map((a) => (
            <div key={a.t} className="bg-background p-8">
              <a.icon className="w-6 h-6 text-ember mb-6" />
              <h3 className="text-xl mb-3">{a.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-10">
        {[
          { k: "Atelier", v: "Kinsuka Pêcheur, entrée Mimosa" },
          { k: "Zone d'intervention", v: "Toute la ville de Kinshasa" },
          { k: "Délais courants", v: "10 à 21 jours selon le projet" },
        ].map((b) => (
          <div key={b.k} className="border-l-2 border-ember pl-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{b.k}</div>
            <div className="text-lg">{b.v}</div>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 h-12 bg-ember text-ember-foreground font-medium">
          Démarrer un projet <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
