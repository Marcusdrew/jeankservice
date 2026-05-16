import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import catF from "@/assets/cat-fenetres.jpg";
import catP from "@/assets/cat-portes.jpg";
import catV from "@/assets/cat-verandas.jpg";
import catG from "@/assets/cat-portails.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import hero from "@/assets/hero-aluminum.jpg";

export const Route = createFileRoute("/realisations")({
  component: Realisations,
  head: () => ({
    meta: [
      { title: "Réalisations — Jean Aluminium Kinshasa" },
      { name: "description", content: "Galerie de réalisations aluminium : fenêtres, baies, portes, vérandas et portails posés à Kinshasa." },
      { property: "og:title", content: "Réalisations — Jean Aluminium" },
      { property: "og:description", content: "Photos de nos derniers chantiers à Kinshasa." },
      { property: "og:url", content: "/realisations" },
    ],
    links: [{ rel: "canonical", href: "/realisations" }],
  }),
});

type Cat = "Tout" | "Fenêtres" | "Portes" | "Vérandas" | "Portails";

const items: { img: string; cat: Exclude<Cat, "Tout">; title: string; place: string }[] = [
  { img: hero, cat: "Fenêtres", title: "Baie vitrée 4 vantaux", place: "Résidence privée — Ma Campagne" },
  { img: catF, cat: "Fenêtres", title: "Châssis fixes anthracite", place: "Villa — Gombe" },
  { img: catP, cat: "Portes", title: "Porte d'entrée vitrée", place: "Maison — Limete" },
  { img: g2, cat: "Portes", title: "Devanture commerciale", place: "Boutique — Lingwala" },
  { img: catV, cat: "Vérandas", title: "Véranda toit vitré", place: "Résidence — Mont-Ngafula" },
  { img: g1, cat: "Vérandas", title: "Extension salon", place: "Villa — Binza" },
  { img: catG, cat: "Portails", title: "Portail coulissant lames", place: "Concession — Kinsuka" },
  { img: catG, cat: "Portails", title: "Clôture aluminium", place: "Particulier — Mbinza" },
];

const cats: Cat[] = ["Tout", "Fenêtres", "Portes", "Vérandas", "Portails"];

function Realisations() {
  const [active, setActive] = useState<Cat>("Tout");
  const filtered = active === "Tout" ? items : items.filter((i) => i.cat === active);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Portfolio</p>
      <h1 className="font-display text-5xl lg:text-7xl max-w-3xl">Nos derniers chantiers.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Quelques réalisations posées dans Kinshasa. Le travail parle mieux qu'un long discours.</p>

      <div className="mt-12 flex flex-wrap gap-2 border-b border-border pb-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 h-9 text-sm transition ${active === c ? "bg-foreground text-background" : "border border-border hover:bg-accent"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((it, idx) => (
          <figure key={idx} className="group">
            <div className="aspect-[4/5] overflow-hidden bg-card">
              <img src={it.img} alt={it.title} width={1280} height={1600} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg">{it.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{it.place}</p>
              </div>
              <span className="text-xs text-ember mt-1.5">{it.cat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
