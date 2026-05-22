import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, BarChart3, MessageCircle, Phone, RefreshCw, Tag, Trash2 } from "lucide-react";
import { getEvents, resetEvents, summarize, type TrackEvent } from "@/lib/tracker";

export const Route = createFileRoute("/admin-jk")({
  component: Admin,
  head: () => ({
    meta: [
      { title: "Admin — JK Service" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const PASSWORD = "JKadmin2026";
const SESSION_KEY = "jk_admin_ok";

function Admin() {
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");
  const [events, setEvents] = useState<TrackEvent[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "1") {
      setOk(true);
    }
  }, []);

  useEffect(() => {
    if (ok) setEvents(getEvents());
  }, [ok, tick]);

  if (!ok) {
    return (
      <section className="max-w-md mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl mb-2">Accès admin</h1>
        <p className="text-sm text-muted-foreground mb-8">Entrez le mot de passe pour voir les statistiques.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pwd === PASSWORD) {
              window.sessionStorage.setItem(SESSION_KEY, "1");
              setOk(true);
            }
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Mot de passe"
            className="h-12 px-4 bg-card border border-border focus:border-ember outline-none"
          />
          <button className="h-12 bg-ember text-ember-foreground font-medium">Entrer</button>
        </form>
      </section>
    );
  }

  const stats = summarize(events);
  const recent = [...events].reverse().slice(0, 25);

  const tiles: { icon: typeof Activity; label: string; value: string | number; sub?: string }[] = [
    { icon: Activity, label: "Visites (total)", value: stats.totalViews, sub: `${stats.views7} sur 7 j · ${stats.views30} sur 30 j` },
    { icon: MessageCircle, label: "Clics WhatsApp", value: stats.whatsappClicks, sub: `${stats.whatsapp7} sur 7 j` },
    { icon: Phone, label: "Clics Appel", value: stats.phoneClicks, sub: `${stats.phone7} sur 7 j` },
    { icon: Tag, label: "Codes promo utilisés", value: stats.promoUsed },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember mb-3">Admin</p>
          <h1 className="font-display text-4xl lg:text-5xl">Statistiques du site</h1>
          <p className="text-xs text-muted-foreground mt-3 max-w-xl">
            Données stockées localement dans ce navigateur uniquement. Pour des stats globales, on installera Google Analytics plus tard.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://analytics.google.com/analytics/web/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 h-10 bg-ember text-ember-foreground text-sm font-medium hover:opacity-90"
          >
            <BarChart3 className="w-4 h-4" /> Ouvrir Google Analytics
          </a>
          <button onClick={() => setTick((t) => t + 1)} className="inline-flex items-center gap-2 px-4 h-10 border border-border text-sm hover:bg-accent">
            <RefreshCw className="w-4 h-4" /> Rafraîchir
          </button>
          <button
            onClick={() => {
              if (confirm("Effacer toutes les statistiques ?")) {
                resetEvents();
                setTick((t) => t + 1);
              }
            }}
            className="inline-flex items-center gap-2 px-4 h-10 border border-destructive/40 text-destructive text-sm hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" /> Réinitialiser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {tiles.map((t) => (
          <div key={t.label} className="bg-background p-6">
            <t.icon className="w-5 h-5 text-ember mb-4" />
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{t.label}</div>
            <div className="font-display text-4xl tabular-nums">{t.value}</div>
            {t.sub && <div className="text-xs text-muted-foreground mt-2">{t.sub}</div>}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 border border-border">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Conversion</div>
        <p className="text-sm">
          <span className="font-display text-2xl text-ember">{stats.conversionRate}%</span>{" "}
          <span className="text-muted-foreground">des visites se terminent par un clic WhatsApp ou Appel.</span>
        </p>
      </div>

      <h2 className="font-display text-2xl mt-14 mb-4">Dernières actions</h2>
      <div className="border border-border divide-y divide-border">
        {recent.length === 0 && (
          <div className="p-6 text-sm text-muted-foreground">Aucun événement enregistré pour l'instant.</div>
        )}
        {recent.map((e, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs uppercase tracking-wider text-ember w-32 shrink-0">{labelFor(e.type)}</span>
              <span className="text-muted-foreground truncate">{metaToString(e.meta)}</span>
            </div>
            <span className="text-xs text-muted-foreground shrink-0 tabular-nums">{formatDate(e.at)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function labelFor(t: TrackEvent["type"]) {
  switch (t) {
    case "pageview": return "Visite";
    case "whatsapp_click": return "WhatsApp";
    case "phone_click": return "Appel";
    case "promo_used": return "Code promo";
  }
}

function metaToString(meta?: Record<string, string>) {
  if (!meta) return "";
  return Object.entries(meta).map(([k, v]) => `${k}: ${v}`).join(" · ");
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}