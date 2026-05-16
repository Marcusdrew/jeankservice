import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MessageCircle, Hammer, Sparkles, ShieldCheck } from "lucide-react";
import hero from "@/assets/real-2-hd.jpg";
import catF from "@/assets/real-4-hd.jpg";
import catP from "@/assets/real-5-hd.jpg";
import catV from "@/assets/real-1-hd.jpg";
import catG from "@/assets/real-8-hd.jpg";
import { CONTACT } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Jean Aluminium — Artisan menuisier aluminium à Kinshasa" },
      { name: "description", content: "Fenêtres, baies vitrées, portes, vérandas et portails aluminium sur mesure à Kinshasa. Devis rapide au 0810688062." },
      { property: "og:title", content: "Jean Aluminium — Artisan menuisier aluminium à Kinshasa" },
      { property: "og:description", content: "Réalisations aluminium sur mesure à Kinshasa." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const categories = [
  { img: catF, title: "Fenêtres & baies vitrées", desc: "Châssis aluminium thermolaqué, double vitrage, ouvertures coulissantes ou battantes." },
  { img: catP, title: "Portes & devantures", desc: "Portes d'entrée résidentielles, vitrines commerciales et portes de sécurité." },
  { img: catV, title: "Vérandas & extensions", desc: "Structures vitrées sur mesure pour agrandir et illuminer votre espace de vie." },
  { img: catG, title: "Portails & clôtures", desc: "Portails battants, coulissants, garde-corps et clôtures aluminium." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={hero}
          alt="Baie vitrée aluminium contemporaine — réalisation Jean Aluminium"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 grain opacity-40 mix-blend-overlay" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-32 w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-ember mb-6">Kinshasa — Depuis des années sur le terrain</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] text-balance max-w-4xl">
            L'aluminium, <em className="not-italic text-ember">façonné</em> pour durer.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Fenêtres, portes, vérandas et portails sur mesure. Chaque ouverture pensée, mesurée et posée par l'atelier de Jean — à Kinsuka Pêcheur, partout dans Kinshasa.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`https://wa.me/${CONTACT.WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 h-12 bg-ember text-ember-foreground font-medium hover:opacity-90 transition">
              <MessageCircle className="w-4 h-4" /> Demander un devis
            </a>
            <Link to="/realisations" className="inline-flex items-center gap-2 px-6 h-12 border border-steel/40 hover:bg-accent transition">
              Voir les réalisations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO STRIP */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
          {[
            { icon: Hammer, title: "Sur mesure", text: "Chaque pièce dessinée pour votre ouverture, sans compromis." },
            { icon: ShieldCheck, title: "Posé pour durer", text: "Profilés solides, quincaillerie premium, finition propre." },
            { icon: Sparkles, title: "Fini soigné", text: "Joints nets, alignements parfaits — le détail qui change tout." },
          ].map((b) => (
            <div key={b.title} className="flex gap-4">
              <b.icon className="w-6 h-6 text-ember shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ember mb-3">Spécialités</p>
            <h2 className="font-display text-4xl lg:text-5xl max-w-2xl">Quatre métiers, une exigence.</h2>
          </div>
          <Link to="/realisations" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            Toutes les réalisations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-border">
          {categories.map((c, i) => (
            <article key={c.title} className="group relative bg-background overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} width={1280} height={960} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs text-ember tabular-nums">0{i + 1}</span>
                  <h3 className="text-2xl">{c.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="relative overflow-hidden border border-border p-10 lg:p-16">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-ember/10 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-5xl text-balance max-w-2xl">Une idée, un chantier, un devis ? Parlons-en aujourd'hui.</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">Réponse rapide. Déplacement pour mesure et conseil partout dans Kinshasa.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.PHONE}`} className="inline-flex items-center gap-2 px-6 h-12 bg-foreground text-background font-medium">
                <Phone className="w-4 h-4" /> {CONTACT.PHONE}
              </a>
              <a href={`https://wa.me/${CONTACT.WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 h-12 bg-ember text-ember-foreground font-medium">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
