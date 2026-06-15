import React, { useState, useEffect, useMemo } from "react";
import { getCMSContent, setCMSContent, CMS_FIELDS } from "@/lib/useCMS";
import { getVisits } from "@/lib/visitTracker";

const ADMIN_PASSWORD = "getapp2026";
const GA_PROPERTY_ID = "a367851843p530512181";
const LS_LEADS_KEY = "getapp_demo_leads";

// ─── helpers ────────────────────────────────────────────────────────────────
function getLeads() {
  try { return JSON.parse(localStorage.getItem(LS_LEADS_KEY) || "[]"); } catch { return []; }
}
function daysAgo(n) {
  const d = new Date(); d.setDate(d.getDate() - n); d.setHours(0,0,0,0); return d.getTime();
}
function filterLeads(leads, period) {
  if (period === "all") return leads;
  return leads.filter(l => l.ts >= daysAgo(period));
}
function buildTrend(leads, period) {
  const days = period === "all" ? 30 : period;
  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = `${d.getDate()}/${d.getMonth()+1}`;
    buckets[key] = 0;
  }
  const cutoff = period === "all" ? 0 : daysAgo(days);
  leads.filter(l => l.ts >= cutoff).forEach(l => {
    const d = new Date(l.ts);
    const key = `${d.getDate()}/${d.getMonth()+1}`;
    if (key in buckets) buckets[key]++;
  });
  return Object.entries(buckets);
}

// ─── SVG Trend Chart ─────────────────────────────────────────────────────────
function TrendChart({ data, dark }) {
  const W = 600, H = 160, pad = { t: 10, b: 30, l: 30, r: 10 };
  const vals = data.map(d => d[1]);
  const maxV = Math.max(...vals, 1);
  const pts = data.map((d, i) => {
    const x = pad.l + (i / (data.length - 1 || 1)) * (W - pad.l - pad.r);
    const y = pad.t + (1 - d[1] / maxV) * (H - pad.t - pad.b);
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const fill = pts.length > 1
    ? `${path} L${pts[pts.length-1][0].toFixed(1)},${(H - pad.b).toFixed(1)} L${pts[0][0].toFixed(1)},${(H - pad.b).toFixed(1)} Z`
    : "";
  const textColor = dark ? "#94a3b8" : "#64748b";
  const gridColor = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
      {/* grid lines */}
      {[0,1,2,3].map(i => {
        const y = pad.t + (i/3) * (H - pad.t - pad.b);
        return <line key={i} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke={gridColor} strokeWidth="1"/>;
      })}
      {/* fill */}
      {fill && <path d={fill} fill="rgba(6,182,212,0.1)"/>}
      {/* line */}
      {pts.length > 1 && <path d={path} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
      {/* dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#06b6d4" stroke={dark ? "#0f172a" : "#fff"} strokeWidth="2">
          <title>{data[i][0]}: {data[i][1]} lead{data[i][1] !== 1 ? "uri" : ""}</title>
        </circle>
      ))}
      {/* x labels — show every Nth */}
      {data.map((d, i) => {
        const step = Math.max(1, Math.floor(data.length / 7));
        if (i % step !== 0 && i !== data.length - 1) return null;
        const x = pad.l + (i / (data.length - 1 || 1)) * (W - pad.l - pad.r);
        return <text key={i} x={x} y={H - 6} textAnchor="middle" fontSize="10" fill={textColor}>{d[0]}</text>;
      })}
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("ga_admin") === "yes");
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dark, setDark] = useState(() => localStorage.getItem("admin_theme") !== "light");

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("admin_theme", next ? "dark" : "light");
  }

  function handleLogin(e) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) { sessionStorage.setItem("ga_admin", "yes"); setAuthed(true); }
    else { setPassErr(true); setTimeout(() => setPassErr(false), 2000); }
  }

  const bg = dark ? "bg-[#0a0e27]" : "bg-gray-50";
  const card = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200";
  const text = dark ? "text-white" : "text-gray-900";
  const sub = dark ? "text-gray-400" : "text-gray-500";
  const head = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200";

  if (!authed) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className={`${card} border rounded-3xl p-10 w-full max-w-sm shadow-2xl backdrop-blur-xl`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h1 className={`text-2xl font-black ${text}`}>GetApp Backoffice</h1>
            <p className={`${sub} text-sm mt-1`}>Acces restricționat</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={pass} onChange={e => setPass(e.target.value)}
              placeholder="Parolă administrator"
              className={`w-full ${dark ? "bg-white/5 border-white/10 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"} border ${passErr ? "border-red-500" : ""} rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors`}
              autoFocus/>
            {passErr && <p className="text-red-400 text-xs text-center">Parolă incorectă</p>}
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-3 rounded-xl transition-all">
              Intră în Backoffice
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "overview", label: "Overview",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    },
    {
      id: "demos", label: "Leads Demo",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    },
    {
      id: "cms", label: "CMS",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
    },
    {
      id: "analytics", label: "Analytics",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    },
  ];

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      {/* Header */}
      <div className={`border-b ${head} backdrop-blur-xl sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className={`font-black ${text} text-sm`}>GetApp Backoffice</h1>
              <p className={`${sub} text-xs`}>Panou de control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme toggle — icon only */}
            <button onClick={toggleTheme}
              title={dark ? "Temă luminoasă" : "Temă întunecată"}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                dark ? "border-white/10 text-gray-400 hover:text-white hover:border-white/30" : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}>
              {dark
                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              }
            </button>
            <a href={`https://lookerstudio.google.com/reporting/${LOOKER_REPORT_ID}`} target="_blank" rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-400/30 px-3 py-1.5 rounded-full transition-colors">
              GA4
            </a>
            <button onClick={() => { sessionStorage.removeItem("ga_admin"); setAuthed(false); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                dark ? "border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30" : "border-gray-200 text-gray-500 hover:text-red-500"
              }`}>
              Ieși
            </button>
          </div>
        </div>
        {/* Tabs — pill style, no emoji */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 pb-3">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? dark ? "bg-white/10 text-white" : "bg-slate-900 text-white"
                  : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && <OverviewTab dark={dark} card={card} text={text} sub={sub} />}
        {activeTab === "demos" && <LeadsTab dark={dark} card={card} text={text} sub={sub} />}
        {activeTab === "cms" && <CMSTab dark={dark} card={card} text={text} sub={sub} />}
        {activeTab === "analytics" && <AnalyticsTab dark={dark} card={card} text={text} sub={sub} />}
      </div>
    </div>
  );
}

// ─── Overview Tab ────────────────────────────────────────────────────────────
function OverviewTab({ dark, card, text, sub }) {
  const [period, setPeriod] = useState(7);
  const [visits, setVisits] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setVisits(getVisits());
    setLeads(getLeads());
  }, []);

  const periods = [
    { label: "Azi", val: 1 },
    { label: "7 zile", val: 7 },
    { label: "30 zile", val: 30 },
    { label: "Tot", val: "all" },
  ];

  const stats = useMemo(() => {
    const cutoff = period === "all" ? 0 : Date.now() - period * 86400000;
    const filtered = visits.filter(v => v.ts >= cutoff);

    // Sesiuni unice (gap > 30 min)
    let sessions = 0, lastTs = 0;
    [...filtered].sort((a,b) => a.ts - b.ts).forEach(v => {
      if (v.ts - lastTs > 30 * 60 * 1000) sessions++;
      lastTs = v.ts;
    });

    // Top pagini
    const pages = {};
    filtered.forEach(v => { pages[v.page] = (pages[v.page] || 0) + 1; });
    const topPages = Object.entries(pages).sort((a,b) => b[1]-a[1]).slice(0,5)
      .map(([page, views]) => ({
        page,
        views,
        label: page === "/" ? "Acasă" : page.replace(/\//g,"").replace("DigitalizareIMM","Digitalizare IMM").replace("smartpontaj","Smart Pontaj").replace("displays","Smart Displays").replace("demo_generator.html","Demo Generator") || page
      }));

    // Dispozitive
    const devs = { mobile: 0, desktop: 0, tablet: 0 };
    filtered.forEach(v => { devs[v.device] = (devs[v.device] || 0) + 1; });

    // Trend vizite
    const days = period === "all" ? 30 : period;
    const buckets = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      buckets[`${d.getDate()}/${d.getMonth()+1}`] = 0;
    }
    filtered.filter(v => v.ts >= Date.now() - days * 86400000).forEach(v => {
      const d = new Date(v.ts);
      const key = `${d.getDate()}/${d.getMonth()+1}`;
      if (key in buckets) buckets[key]++;
    });
    const trend = Object.entries(buckets);

    // Today only
    const todayCutoff = new Date(); todayCutoff.setHours(0,0,0,0);
    const todayVisits = visits.filter(v => v.ts >= todayCutoff.getTime()).length;

    return { total: filtered.length, sessions, topPages, devs, trend, todayVisits };
  }, [visits, period]);

  const leadsFiltered = useMemo(() => filterLeads(leads, period), [leads, period]);

  return (
    <div className="space-y-6">
      {/* Header + period selector */}
      <div className="flex items-center justify-between">
        <h2 className={`font-black text-lg ${text}`}>Overview</h2>
        <div className={`flex gap-1 p-1 rounded-xl ${dark ? "bg-white/5" : "bg-gray-100"}`}>
          {periods.map(p => (
            <button key={p.val} onClick={() => setPeriod(p.val)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                period === p.val ? "bg-cyan-500 text-slate-900" : `${sub} hover:${text}`
              }`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {visits.length === 0 && (
        <div className={`border rounded-xl px-4 py-3 flex items-center gap-3 ${dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"}`}>
          <span className="text-amber-400 text-lg">⚠️</span>
          <p className={`text-sm ${dark ? "text-amber-300" : "text-amber-700"}`}>
            Nu există date de vizitatori încă. Navigează pe câteva pagini ale site-ului ca trackerul să înregistreze vizite. Datele apar în timp real.
          </p>
        </div>
      )}

      {/* KPI Cards — REALE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Vizitatori unici", value: stats.sessions, icon: "👤", note: `${periods.find(p=>p.val===period)?.label}` },
          { label: "Page views", value: stats.total, icon: "👁️", note: "pagini vizitate" },
          { label: "Vizite azi", value: stats.todayVisits, icon: "📅", note: new Date().toLocaleDateString("ro-RO") },
          { label: "Leads demo", value: leadsFiltered.length, icon: "🎯", note: "formulare completate" },
        ].map((kpi, i) => (
          <div key={i} className={`${card} border rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{kpi.icon}</div>
            <div className={`text-2xl font-black ${text}`}>{kpi.value}</div>
            <div className={`${sub} text-xs mt-1`}>{kpi.label}</div>
            <div className="text-gray-500 text-xs mt-0.5">{kpi.note}</div>
          </div>
        ))}
      </div>

      {/* Trend grafic vizite REALE */}
      <div className={`${card} border rounded-2xl p-6`}>
        <h3 className={`font-bold ${text} mb-4`}>
          📈 Vizite pe zi — {periods.find(p=>p.val===period)?.label}
        </h3>
        {visits.length === 0 ? (
          <div className="text-center py-8">
            <p className={`${sub} text-sm`}>Nicio vizită înregistrată. Navigează pe site ca să apară datele.</p>
          </div>
        ) : (
          <TrendChart data={stats.trend} dark={dark} />
        )}
      </div>

      {/* 2 coloane: Top Pagini + Dispozitive */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pagini */}
        <div className={`${card} border rounded-2xl p-6`}>
          <h3 className={`font-bold ${text} mb-4`}>📄 Top Pagini Vizitate</h3>
          {stats.topPages.length === 0 ? (
            <p className={`${sub} text-sm`}>Nicio pagină vizitată încă.</p>
          ) : (
            <div className="space-y-3">
              {stats.topPages.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-xs w-4 ${sub}`}>{i+1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${text}`}>{p.label}</span>
                      <span className="text-cyan-400 font-bold text-sm">{p.views}</span>
                    </div>
                    <div className={`${dark ? "bg-white/5" : "bg-gray-100"} rounded-full h-1.5`}>
                      <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(p.views/stats.topPages[0].views)*100}%` }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dispozitive */}
        <div className={`${card} border rounded-2xl p-6`}>
          <h3 className={`font-bold ${text} mb-4`}>📱 Dispozitive</h3>
          {stats.total === 0 ? (
            <p className={`${sub} text-sm`}>Nicio vizită înregistrată.</p>
          ) : (
            <div className="space-y-4">
              {[
                { label: "Mobile", val: stats.devs.mobile, color: "#3b82f6" },
                { label: "Desktop", val: stats.devs.desktop, color: "#8b5cf6" },
                { label: "Tablet", val: stats.devs.tablet, color: "#06b6d4" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-sm w-16 ${text}`}>{d.label}</span>
                  <div className={`flex-1 ${dark ? "bg-white/5" : "bg-gray-100"} rounded-full h-3`}>
                    <div className="h-3 rounded-full transition-all" style={{ width: `${stats.total ? (d.val/stats.total)*100 : 0}%`, backgroundColor: d.color }}/>
                  </div>
                  <span className={`text-sm font-bold w-8 text-right ${text}`}>
                    {stats.total ? Math.round((d.val/stats.total)*100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ultimele leads */}
      {leads.length > 0 && (
        <div className={`${card} border rounded-2xl p-6`}>
          <h3 className={`font-bold ${text} mb-4`}>🎯 Ultimele Leads Demo</h3>
          <div className="space-y-3">
            {leads.slice(0, 5).map((l, i) => (
              <div key={i} className={`flex items-center justify-between py-3 border-b ${dark ? "border-white/5" : "border-gray-100"} last:border-0`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-sm">
                    {l.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${text}`}>{l.name}</p>
                    <p className={`text-xs ${sub}`}>{l.business || "—"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <a href={`tel:${l.phone}`} className="text-cyan-400 text-xs font-bold hover:underline">{l.phone}</a>
                  <p className="text-xs text-gray-500">{l.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Leads Demo Tab ──────────────────────────────────────────────────────────
function LeadsTab({ dark, card, text, sub }) {
  const [leads, setLeads] = useState([]);
  const [period, setPeriod] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => { setLeads(getLeads()); }, []);

  const periods = [
    { label: "Azi", val: 1 },
    { label: "7 zile", val: 7 },
    { label: "30 zile", val: 30 },
    { label: "Tot", val: "all" },
  ];

  const filtered = useMemo(() => {
    let result = filterLeads(leads, period);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.business?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [leads, period, search]);

  function exportCSV() {
    const rows = [["Nume","Telefon","Email","Business","Data"]];
    filtered.forEach(l => rows.push([l.name, l.phone, l.email || "", l.business || "", l.date]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    a.download = `leads_getapp_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  function deleteLead(i) {
    const all = getLeads();
    const idx = all.findIndex(l => l.ts === filtered[i].ts);
    all.splice(idx, 1);
    localStorage.setItem(LS_LEADS_KEY, JSON.stringify(all));
    setLeads([...all]);
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex gap-1 p-1 rounded-xl ${dark ? "bg-white/5" : "bg-gray-100"}`}>
            {periods.map(p => (
              <button key={p.val} onClick={() => setPeriod(p.val)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${period === p.val ? "bg-cyan-500 text-slate-900" : `${sub} hover:${text}`}`}>
                {p.label}
              </button>
            ))}
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Caută după nume, telefon, business..."
            className={`px-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-cyan-400 transition-colors ${dark ? "bg-white/5 border-white/10 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
            style={{ minWidth: 260 }} />
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl text-sm transition-all">
          ⬇️ Export CSV
        </button>
      </div>

      <div className={`${card} border rounded-2xl overflow-hidden`}>
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📭</div>
            <p className={sub}>{leads.length === 0 ? "Niciun lead încă. Când cineva generează un demo și completează formularul, apare aici." : "Niciun rezultat pentru filtrele selectate."}</p>
            {leads.length === 0 && (
              <a href="/demo_generator.html" className="text-cyan-400 text-sm underline mt-2 inline-block">
                Deschide Demo Generator →
              </a>
            )}
          </div>
        ) : (
          <>
            <div className={`px-6 py-3 border-b ${dark ? "border-white/5 bg-white/3" : "border-gray-100 bg-gray-50"} flex items-center justify-between`}>
              <span className={`text-sm font-bold ${text}`}>{filtered.length} lead{filtered.length !== 1 ? "uri" : ""}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${dark ? "border-white/5" : "border-gray-100"}`}>
                    {["Nume", "Telefon", "Email", "Business", "Data", ""].map(h => (
                      <th key={h} className={`px-6 py-3 text-left text-xs font-bold ${sub} uppercase tracking-wider`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l, i) => (
                    <tr key={i} className={`border-b transition-colors ${dark ? "border-white/5 hover:bg-white/3" : "border-gray-100 hover:bg-gray-50"}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xs">
                            {l.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className={`font-semibold ${text}`}>{l.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${l.phone}`} className="text-cyan-400 hover:underline">{l.phone}</a>
                      </td>
                      <td className="px-6 py-4">
                        {l.email ? <a href={`mailto:${l.email}`} className="text-cyan-400 hover:underline">{l.email}</a> : <span className="text-gray-500">—</span>}
                      </td>
                      <td className={`px-6 py-4 ${sub}`}>{l.business || "—"}</td>
                      <td className={`px-6 py-4 text-xs ${sub} whitespace-nowrap`}>{l.date}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => { if(window.confirm("Ștergi acest lead?")) deleteLead(i); }}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {leads.length === 0 && (
        <div className={`${card} border rounded-2xl p-5 border-amber-500/30 bg-amber-500/5`}>
          <p className="text-amber-300 text-sm font-bold mb-1">⚠️ Leads stocate local</p>
          <p className="text-amber-200/70 text-xs">
            Leadurile sunt stocate în browserul TĂU. Dacă intri de pe alt browser/dispozitiv, nu le vei vedea.
            Spune-mi să conectăm un backend (Supabase gratuit) ca să fie accesibile de oriunde în ~30 min.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Analytics Tab ───────────────────────────────────────────────────────────
const LOOKER_REPORT_ID = "d9a5f7ad-4ca4-463c-9f6b-2ee08f78a228";
const LOOKER_PAGE_ID = "ZMqzF";
const LOOKER_EMBED_URL = `https://lookerstudio.google.com/embed/reporting/${LOOKER_REPORT_ID}/page/${LOOKER_PAGE_ID}`;

function toEmbedUrl(url) {
  if (!url) return "";
  return url
    .replace("datastudio.google.com/reporting/", "lookerstudio.google.com/embed/reporting/")
    .replace("lookerstudio.google.com/reporting/", "lookerstudio.google.com/embed/reporting/");
}

function AnalyticsTab({ dark, card, text, sub }) {
  const [customUrl, setCustomUrl] = useState(() => toEmbedUrl(localStorage.getItem("ga_looker_url") || ""));
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  // Auto-curăță URL-ul vechi dacă nu e în format embed
  useEffect(() => {
    const stored = localStorage.getItem("ga_looker_url") || "";
    if (stored && !stored.includes("/embed/")) {
      localStorage.removeItem("ga_looker_url");
      setCustomUrl("");
    }
  }, []);

  const embedUrl = customUrl || LOOKER_EMBED_URL;


  function saveCustomUrl() {
    const url = toEmbedUrl(inputVal.trim());
    localStorage.setItem("ga_looker_url", url);
    setCustomUrl(url);
    setEditing(false);
  }


  function resetUrl() {
    localStorage.removeItem("ga_looker_url");
    setCustomUrl("");
    setEditing(false);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-black text-lg ${text}`}>📊 Google Analytics — Looker Studio</h2>
          <p className={`${sub} text-xs mt-0.5`}>
            Raport live: <span className="text-cyan-400 font-mono text-[11px]">{embedUrl}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={`https://lookerstudio.google.com/reporting/${LOOKER_REPORT_ID}`}
            target="_blank" rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-400/30 px-3 py-1.5 rounded-lg transition-colors">
            Deschide complet ↗
          </a>
          {!editing ? (
            <button onClick={() => { setEditing(true); setInputVal(customUrl); }}
              className={`text-xs ${sub} hover:${text} border ${dark ? "border-white/10" : "border-gray-200"} px-3 py-1.5 rounded-lg transition-colors`}>
              Schimbă URL
            </button>
          ) : (
            <button onClick={() => setEditing(false)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors">
              Anulează
            </button>
          )}
        </div>
      </div>

      {/* URL editor */}
      {editing && (
        <div className={`${card} border rounded-2xl p-4 flex gap-3`}>
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="https://lookerstudio.google.com/reporting/... sau datastudio.google.com/..."
            className={`flex-1 px-4 h-10 text-sm rounded-full border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${dark ? "bg-white/5 border-white/10 text-white placeholder-gray-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
          />
          <button onClick={saveCustomUrl}
            className="px-5 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shrink-0">
            Salvează
          </button>
          {customUrl && (
            <button onClick={resetUrl}
              className="px-4 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors shrink-0">
              Reset default
            </button>
          )}
        </div>
      )}

      {/* iframe Looker Studio */}
      <div className={`rounded-2xl overflow-hidden border ${dark ? "border-white/10" : "border-slate-200"} shadow-sm`} style={{ height: "80vh" }}>
        <iframe
          key={embedUrl}
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          title="Looker Studio — GetApp Analytics"
        />
      </div>
    </div>
  );
}

// ─── CMS Tab ─────────────────────────────────────────────────────────────────
function CMSTab({ dark }) {
  const [content, setContent] = useState(getCMSContent);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  function handleChange(key, value) { setContent(prev => ({ ...prev, [key]: value })); setSaved(false); }

  function handleSave() {
    setCMSContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset(key) {
    const field = CMS_FIELDS.flatMap(s => s.fields).find(f => f.key === key);
    if (field) handleChange(key, field.default);
  }

  function handleResetAll() {
    if (!window.confirm("Resetezi TOATE textele la valorile implicite?")) return;
    const defaults = {};
    CMS_FIELDS.forEach(sec => sec.fields.forEach(f => { defaults[f.key] = f.default; }));
    setContent(defaults); setCMSContent(defaults); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }

  const section = CMS_FIELDS[activeSection];

  return (
    <div className="space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Editor Conținut</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Modifică textele afișate pe site</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetAll}
            className="px-5 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 text-sm font-bold transition-colors">
            Reset tot
          </button>
          <button
            onClick={handleSave}
            className={`px-5 h-10 rounded-full text-sm font-bold shadow-sm transition-all ${
              saved
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}>
            {saved ? "✓ Salvat!" : "Salvează modificările"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar secțiuni */}
        <div className="space-y-1">
          {CMS_FIELDS.map((sec, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                activeSection === i
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}>
              {sec.section}
            </button>
          ))}
        </div>

        {/* Editor câmpuri */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{section.section}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                {section.fields.length} câmpuri
              </span>
            </div>

            {/* Fields */}
            <div className="p-6 space-y-6">
              {section.fields.map((field) => {
                const val = content[field.key] ?? field.default;
                const isDirty = val !== field.default;
                return (
                  <div key={field.key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {field.label}
                        </span>
                        {isDirty && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                            MODIFICAT
                          </span>
                        )}
                      </label>
                      {isDirty && (
                        <button
                          onClick={() => handleReset(field.key)}
                          className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                          ↩ Resetează
                        </button>
                      )}
                    </div>

                    {field.type === "textarea" ? (
                      <textarea
                        value={val}
                        onChange={e => handleChange(field.key, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all shadow-sm resize-none placeholder-slate-400"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={e => handleChange(field.key, e.target.value)}
                        className="w-full px-4 h-10 text-sm rounded-full border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all shadow-sm"
                      />
                    )}

                    <p className="text-[10px] font-mono text-slate-400 mt-1.5">
                      key: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{field.key}</code>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Textele se salvează local — conectează backend pentru sync live
              </p>
              <button
                onClick={handleSave}
                className={`px-5 h-10 rounded-full text-sm font-bold shadow-sm transition-all ${
                  saved
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}>
                {saved ? "✓ Salvat!" : "Salvează"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

