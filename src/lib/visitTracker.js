/**
 * visitTracker.js
 * Înregistrează vizitele reale în localStorage.
 * Apelat o dată la montarea aplicației.
 */

const VISITS_KEY = "getapp_visits";
const MAX_VISITS = 5000;

export function trackVisit() {
  try {
    // Nu înregistrăm vizitele administratorului (dacă e logat în backoffice)
    if (sessionStorage.getItem("ga_admin") === "yes") return;

    // Nu înregistrăm pagina de admin
    if (window.location.pathname.startsWith("/admin")) return;

    const visit = {
      ts: Date.now(),
      page: window.location.pathname,
      ref: document.referrer || "direct",
      ua: navigator.userAgent,
      device: getDevice(),
    };

    const existing = JSON.parse(localStorage.getItem(VISITS_KEY) || "[]");
    existing.unshift(visit);
    localStorage.setItem(VISITS_KEY, JSON.stringify(existing.slice(0, MAX_VISITS)));
  } catch (e) {
    // Silent fail
  }
}

function getDevice() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

export function getVisits() {
  try {
    return JSON.parse(localStorage.getItem(VISITS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getVisitStats(visits, periodDays) {
  const cutoff = periodDays === "all" ? 0 : Date.now() - periodDays * 86400000;
  const filtered = visits.filter(v => v.ts >= cutoff);

  // Sesiuni unice (gap > 30 min = sesiune nouă)
  let sessions = 0;
  let lastTs = 0;
  const sorted = [...filtered].sort((a, b) => a.ts - b.ts);
  for (const v of sorted) {
    if (v.ts - lastTs > 30 * 60 * 1000) sessions++;
    lastTs = v.ts;
  }

  // Top pagini
  const pages = {};
  filtered.forEach(v => { pages[v.page] = (pages[v.page] || 0) + 1; });
  const topPages = Object.entries(pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([page, views]) => ({ page, views, label: page === "/" ? "Acasă" : page }));

  // Dispozitive
  const devCount = { mobile: 0, desktop: 0, tablet: 0 };
  filtered.forEach(v => { devCount[v.device] = (devCount[v.device] || 0) + 1; });

  // Referrers
  const refs = {};
  filtered.forEach(v => {
    const ref = v.ref === "direct" ? "Direct" : (new URL(v.ref).hostname || v.ref);
    refs[ref] = (refs[ref] || 0) + 1;
  });
  const topRefs = Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Trend (ultimele `periodDays` zile sau 30)
  const days = periodDays === "all" ? 30 : periodDays;
  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    buckets[`${d.getDate()}/${d.getMonth() + 1}`] = 0;
  }
  filtered.filter(v => v.ts >= Date.now() - days * 86400000).forEach(v => {
    const d = new Date(v.ts);
    const key = `${d.getDate()}/${d.getMonth() + 1}`;
    if (key in buckets) buckets[key]++;
  });
  const trend = Object.entries(buckets);

  return { total: filtered.length, sessions, topPages, devCount, topRefs, trend };
}
