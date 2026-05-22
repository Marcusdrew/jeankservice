export type TrackEventType = "pageview" | "whatsapp_click" | "phone_click" | "promo_used";

export interface TrackEvent {
  type: TrackEventType;
  meta?: Record<string, string>;
  at: number;
}

const KEY = "jk_tracker_events_v1";
const MAX = 500;

function read(): TrackEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TrackEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(events: TrackEvent[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(events.slice(-MAX)));
  } catch {
    /* ignore */
  }
}

export function trackEvent(type: TrackEventType, meta?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const events = read();
  events.push({ type, meta, at: Date.now() });
  write(events);
}

export function getEvents(): TrackEvent[] {
  return read();
}

export function resetEvents() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function summarize(events: TrackEvent[]) {
  const now = Date.now();
  const D7 = 7 * 24 * 60 * 60 * 1000;
  const D30 = 30 * 24 * 60 * 60 * 1000;

  const count = (type: TrackEventType, since?: number) =>
    events.filter((e) => e.type === type && (since === undefined || e.at >= since)).length;

  const totalViews = count("pageview");
  const wa = count("whatsapp_click");
  const phone = count("phone_click");

  return {
    totalViews,
    views7: count("pageview", now - D7),
    views30: count("pageview", now - D30),
    whatsappClicks: wa,
    whatsapp7: count("whatsapp_click", now - D7),
    phoneClicks: phone,
    phone7: count("phone_click", now - D7),
    promoUsed: count("promo_used"),
    conversionRate: totalViews > 0 ? Math.round(((wa + phone) / totalViews) * 1000) / 10 : 0,
  };
}