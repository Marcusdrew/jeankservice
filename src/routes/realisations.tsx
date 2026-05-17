import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import r1 from "@/assets/real-1-hd.jpg";
import r2 from "@/assets/real-2-hd.jpg";
import r3 from "@/assets/real-3-hd.jpg";
import r4 from "@/assets/real-4-hd.jpg";
import r5 from "@/assets/real-5-hd.jpg";
import r6 from "@/assets/real-6-hd.jpg";
import r7 from "@/assets/real-7-hd.jpg";
import r8 from "@/assets/real-8-hd.jpg";
import r9 from "@/assets/real-9.jpg";
import r10 from "@/assets/real-10.jpg";
import r11 from "@/assets/real-11.jpg";
import r12 from "@/assets/real-12.jpg";
import r13 from "@/assets/real-13.jpg";
import r14 from "@/assets/real-14.jpg";
import r15 from "@/assets/real-15.jpg";
import r16 from "@/assets/real-16.jpg";
import r17 from "@/assets/real-17.jpg";
import r18 from "@/assets/real-18.jpg";

export const Route = createFileRoute("/realisations")({
  component: Realisations,
  head: () => ({
    meta: [
      { title: "Réalisations — JK Service Kinshasa" },
      { name: "description", content: "Galerie de réalisations aluminium : fenêtres, baies, portes, vérandas et portails posés à Kinshasa." },
      { property: "og:title", content: "Réalisations — JK Service" },
      { property: "og:description", content: "Photos de nos derniers chantiers à Kinshasa." },
      { property: "og:url", content: "/realisations" },
    ],
    links: [{ rel: "canonical", href: "/realisations" }],
  }),
});

type Cat = "Tout" | "Fenêtres" | "Portes" | "Vérandas" | "Escaliers & inox" | "Portails";

const items: { img: string; cat: Exclude<Cat, "Tout">; title: string; place: string }[] = [
  { img: r2, cat: "Fenêtres", title: "Châssis noirs & garde-corps alu", place: "Villa R+2 — Kinshasa" },
  { img: r4, cat: "Fenêtres", title: "Baie coulissante 2 vantaux", place: "Appartement avec vue — Kinshasa" },
  { img: r8, cat: "Fenêtres", title: "Châssis blancs en série", place: "Immeuble R+3 — Kinshasa" },
  { img: r15, cat: "Fenêtres", title: "Châssis noirs en angle, vue panoramique", place: "Étage supérieur — Kinshasa" },
  { img: r16, cat: "Fenêtres", title: "Baie coulissante 3 vantaux", place: "Salon avec vue — Kinshasa" },
  { img: r18, cat: "Fenêtres", title: "Façade vitrée teintée bleue", place: "Immeuble R+4 — Kinshasa" },
  { img: r5, cat: "Portes", title: "Devanture vitrée & porte battante", place: "Local commercial — Kinshasa" },
  { img: r6, cat: "Portes", title: "Baie coulissante donnant sur balcon", place: "Résidence — Kinshasa" },
  { img: r17, cat: "Portes", title: "Devanture vitrée d'angle", place: "Local commercial — Kinshasa" },
  { img: r1, cat: "Vérandas", title: "Mur-rideau bleu réfléchissant", place: "Immeuble R+4 — Kinshasa" },
  { img: r3, cat: "Vérandas", title: "Façade vitrée teintée", place: "Bâtiment commercial — Kinshasa" },
  { img: r7, cat: "Portes", title: "Pose porte coulissante sur balcon", place: "Chantier en cours — Kinshasa" },
  { img: r9, cat: "Escaliers & inox", title: "Rampe d'escalier intérieur en inox", place: "Villa — Kinshasa" },
  { img: r10, cat: "Escaliers & inox", title: "Garde-corps inox sur escalier en béton", place: "Cage d'escalier — Kinshasa" },
  { img: r14, cat: "Escaliers & inox", title: "Escalier extérieur & garde-corps inox", place: "Accès extérieur — Kinshasa" },
  { img: r11, cat: "Escaliers & inox", title: "Garde-corps de balcon en inox", place: "Balcon R+2 — Kinshasa" },
  { img: r12, cat: "Escaliers & inox", title: "Garde-corps inox & verre", place: "Terrasse — Kinshasa" },
  { img: r13, cat: "Escaliers & inox", title: "Garde-corps inox & verre, vue plongeante", place: "Coursive — Kinshasa" },
];

const cats: Cat[] = ["Tout", "Fenêtres", "Portes", "Vérandas", "Escaliers & inox", "Portails"];

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
