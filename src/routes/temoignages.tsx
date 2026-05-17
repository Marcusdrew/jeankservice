import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/temoignages")({
  component: Temoignages,
  head: () => ({
    meta: [
      { title: "Témoignages clients — JK Service" },
      { name: "description", content: "Ce que disent les clients de JK Service à Kinshasa." },
      { property: "og:title", content: "Témoignages — JK Service" },
      { property: "og:description", content: "Avis clients à Kinshasa." },
      { property: "og:url", content: "/temoignages" },
    ],
    links: [{ rel: "canonical", href: "/temoignages" }],
  }),
});

const reviews = [
  { name: "Mireille K.", place: "Gombe", text: "Travail propre et rapide. Mes baies vitrées coulissent comme du beurre, et les joints sont parfaits. Je recommande sans hésiter." },
  { name: "Patrick M.", place: "Limete", text: "Jean a refait toutes les fenêtres de la maison. Bon prix, bon conseil, et il est venu remesurer deux fois pour être sûr. Du sérieux." },
  { name: "Famille Tshibanda", place: "Mont-Ngafula", text: "Notre véranda est devenue la pièce préférée de la maison. La structure est solide, la lumière magnifique. Merci à toute l'équipe." },
  { name: "Bernard L.", place: "Kinsuka", text: "Portail coulissant posé en une semaine après le devis. Robuste et silencieux. Le service après-pose est aussi au rendez-vous." },
  { name: "Christelle B.", place: "Lingwala", text: "J'ai fait poser la devanture de ma boutique. Le résultat est très pro, mes clients le remarquent. Jean est à l'écoute." },
  { name: "Joseph K.", place: "Binza", text: "Porte d'entrée vitrée sur mesure, exactement comme je l'imaginais. Pose nickel, prix correct. Du beau travail d'artisan." },
];

function Temoignages() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-ember mb-4">Témoignages</p>
      <h1 className="font-display text-5xl lg:text-7xl max-w-3xl">Ce que disent ceux qui nous ont fait confiance.</h1>

      <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
        {reviews.map((r) => (
          <article key={r.name} className="bg-background p-10">
            <Quote className="w-8 h-8 text-ember mb-6" />
            <p className="text-lg leading-relaxed mb-8">"{r.text}"</p>
            <div className="flex items-center justify-between border-t border-border pt-5">
              <div>
                <div className="text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.place}</div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-ember text-ember" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
