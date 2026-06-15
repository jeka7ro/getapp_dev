import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Tv, Zap, Crown, RefreshCw, ChevronDown, ArrowRight, HelpCircle, Building2 } from "lucide-react";
import { LanguageProvider, useLanguage } from "../components/LanguageContext";
import Navbar from "../components/landing/Navbar";

// ─── PAYMENT LINKS ────────────────────────────────────────────────────────────
// TODO: Înlocuiește cu link-urile reale generate din Viva Wallet dashboard
const VIVA_LINKS = {
  ro: {
    day:   "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1ZI_RO",
    week:  "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1SAP_RO",
    month: "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1LUNA_RO",
  },
  eu_company: {
    day:   "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1ZI_EU",
    week:  "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1SAP_EU",
    month: "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1LUNA_EU",
  },
  non_eu: {
    day:   "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1ZI_NEU",
    week:  "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1SAP_NEU",
    month: "https://www.vivapayments.com/web/checkout?ref=PLACEHOLDER_1LUNA_NEU",
  },
};

const BASE_PRICES = { day: 1.0, week: 5.0, month: 15.0 };
const VAT_RATE = 0.21;
const VAT_MULTIPLIER = 1 + VAT_RATE;

function calcPrice(base, clientType) {
  return clientType === "ro" || clientType === "eu_personal"
    ? base * VAT_MULTIPLIER
    : base;
}

function fmt(num) {
  return num.toFixed(2).replace(".", ",");
}

const CLIENT_TYPES = [
  { key: "ro",         label: "🇷🇴 România",       sub: "+21% TVA" },
  { key: "eu_company", label: "🇪🇺 Firmă UE",      sub: "Reverse Charge 0%" },
  { key: "non_eu",     label: "🌍 Internațional",   sub: "0% TVA" },
];

const FAQ_ITEMS = [
  {
    q: "Pot schimba planul după cumpărare?",
    a: "Da. Dacă dorești să treci la un plan mai lung, contactează-ne și îți facem diferența de preț.",
  },
  {
    q: "Câte display-uri include un abonament?",
    a: "Un abonament acoperă un singur display. Pentru mai multe ecrane, contactează-ne pentru o ofertă personalizată.",
  },
  {
    q: "Ce tipuri de conținut pot rula?",
    a: "Imagini (JPG/PNG), video-uri (MP4), playlisturi întregi configurabile, meniuri digitale și conținut web live.",
  },
  {
    q: "Cum funcționează activarea după plată?",
    a: "Imediat după plata confirmată te contactăm (max 30 minute) și ecranul tău este configurat și activ.",
  },
  {
    q: "Există contract pe termen lung?",
    a: "Nu. Plătești strict pentru perioada aleasă. Niciun angajament, niciun auto-reînnoire ascuns.",
  },
];

export default function Pricing() {
  return (
    <LanguageProvider>
      <PricingInner />
    </LanguageProvider>
  );
}

function PricingInner() {
  const { t } = useLanguage();
  const [clientType, setClientType] = useState("ro");
  const [bnrRate, setBnrRate] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Fetch curs BNR live
  useEffect(() => {
    fetch("https://www.bnr.ro/nbrfxrates.xml")
      .then((r) => r.text())
      .then((xml) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const rates = Array.from(doc.querySelectorAll("Rate"));
        for (const rate of rates) {
          if (rate.getAttribute("currency") === "EUR") {
            setBnrRate(parseFloat(rate.textContent));
            break;
          }
        }
      })
      .catch(() => setBnrRate(null));
  }, []);

  const plans = [
    {
      key: "day",
      icon: <Zap className="w-7 h-7" />,
      name: "1 Zi",
      name_en: "1 Day",
      tagline: "Testează fără risc",
      tagline_en: "Risk-free test",
      color: "from-slate-600 to-slate-700",
      border: "border-slate-600/40",
      glow: "shadow-slate-500/10",
      features: ["1 display activ", "Imagini & Video", "Efecte vizuale", "Suport email"],
      features_en: ["1 active display", "Images & Video", "Visual effects", "Email support"],
    },
    {
      key: "week",
      icon: <Tv className="w-7 h-7" />,
      name: "1 Săptămână",
      name_en: "1 Week",
      tagline: "Perfect pentru evenimente",
      tagline_en: "Perfect for events",
      color: "from-indigo-600 to-violet-700",
      border: "border-indigo-500/40",
      glow: "shadow-indigo-500/20",
      badge: "POPULAR",
      features: ["1 display activ", "Imagini, Video & Playlist", "Efecte vizuale premium", "Timer Happy Hour", "Suport prioritar"],
      features_en: ["1 active display", "Images, Video & Playlist", "Premium visual effects", "Happy Hour timer", "Priority support"],
    },
    {
      key: "month",
      icon: <Crown className="w-7 h-7" />,
      name: "1 Lună",
      name_en: "1 Month",
      tagline: "Abonament complet 24/7",
      tagline_en: "Full 24/7 subscription",
      color: "from-amber-500 to-orange-600",
      border: "border-amber-500/40",
      glow: "shadow-amber-500/20",
      badge: "BEST VALUE",
      features: ["1 display activ", "Imagini, Video & Playlist configurabil", "Toate efectele vizuale", "Meniu digital", "Timer Happy Hour", "Suport prioritar 24/7"],
      features_en: ["1 active display", "Images, Video & Configurable Playlist", "All visual effects", "Digital menu", "Happy Hour timer", "24/7 priority support"],
    },
  ];

  const isRo = t("en", "ro") === "ro";

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <Tv className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300 font-medium">
              {t("GetApp Smart Displays", "GetApp Smart Displays")}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
            {t("Choose your plan.", "Alege-ți planul.")}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              {t("Go live in 30 minutes.", "Ești live în 30 de minute.")}
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t(
              "Dynamic content, videos, playlists and visual effects on any Smart TV or Kiosk. No long-term contract.",
              "Conținut dinamic, video-uri, playlisturi și efecte vizuale pe orice Smart TV sau Kiosk. Fără contract pe termen lung."
            )}
          </p>
        </motion.div>
      </section>

      {/* ── BNR RATE ─────────────────────────────────────────────────────── */}
      {bnrRate && (
        <div className="flex justify-center mb-2 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            {t(`1 EUR = ${fmt(bnrRate)} RON (BNR, today)`, `1 EUR = ${fmt(bnrRate)} RON (BNR, astăzi)`)}
          </div>
        </div>
      )}

      {/* ── TVA SELECTOR ─────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 flex-wrap px-6 mb-12 mt-4">
        {CLIENT_TYPES.map((ct) => (
          <button
            key={ct.key}
            onClick={() => setClientType(ct.key)}
            className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col items-center leading-tight ${
              clientType === ct.key
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "border-white/10 bg-white/[0.04] text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <span>{ct.label}</span>
            <span className="text-[10px] opacity-70 mt-0.5">{ct.sub}</span>
          </button>
        ))}
      </div>

      {/* ── PLAN CARDS ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const price = calcPrice(BASE_PRICES[plan.key], clientType);
            const hasVat = clientType === "ro" || clientType === "eu_personal";
            const vivaLink = VIVA_LINKS[clientType === "eu_personal" ? "ro" : clientType]?.[plan.key] || VIVA_LINKS.ro[plan.key];

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-3xl border ${plan.border} bg-white/[0.04] backdrop-blur-sm p-8 flex flex-col shadow-xl ${plan.glow} hover:scale-[1.02] transition-transform duration-300`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-widest bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon & Title */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} mb-5 shadow-lg`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {isRo ? plan.name : plan.name_en}
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  {isRo ? plan.tagline : plan.tagline_en}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">{fmt(price)}</span>
                  <span className="text-gray-400 ml-1">EUR</span>
                </div>
                {hasVat && (
                  <p className="text-xs text-gray-600 mb-1">
                    {fmt(BASE_PRICES[plan.key])} EUR + 21% TVA
                  </p>
                )}
                {bnrRate && (
                  <p className="text-xs text-gray-600 mb-5">
                    ≈ {fmt(price * bnrRate)} RON
                  </p>
                )}
                {!bnrRate && <div className="mb-5" />}

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {(isRo ? plan.features : plan.features_en).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={vivaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r ${plan.color} text-white shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <img src="https://www.vivapayments.com/assets/images/viva-logo-white.svg" alt="Viva" className="h-4 w-auto" onError={(e) => { e.currentTarget.style.display='none'; }} />
                  {t("Pay with Viva Wallet", "Plătește cu Viva Wallet")}
                </a>

                <p className="text-center text-[10px] text-gray-600 mt-3">
                  {t("Secure payment. No hidden fees.", "Plată securizată. Fără taxe ascunse.")}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURES TABLE ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
        >
          <div className="p-6 border-b border-white/[0.06]">
            <h2 className="text-xl font-bold text-white">
              {t("Everything that's included", "Tot ce este inclus")}
            </h2>
          </div>
          {[
            { feature: t("Images (JPG/PNG)", "Imagini (JPG/PNG)"), day: true, week: true, month: true },
            { feature: t("Videos (MP4)", "Video-uri (MP4)"), day: true, week: true, month: true },
            { feature: t("Configurable Playlists", "Playlisturi configurabile"), day: false, week: true, month: true },
            { feature: t("Visual Effects (Snow, Hearts, Sakura)", "Efecte vizuale (Ninsoare, Inimi, Sakura)"), day: true, week: true, month: true },
            { feature: t("Parallax & Steam effects", "Efecte Parallax & Aburi"), day: false, week: true, month: true },
            { feature: t("Happy Hour Timer", "Timer Happy Hour"), day: false, week: true, month: true },
            { feature: t("Digital Menu", "Meniu Digital"), day: false, week: false, month: true },
            { feature: t("24/7 Priority Support", "Suport Prioritar 24/7"), day: false, week: false, month: true },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-4 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white/[0.01]" : ""} border-b border-white/[0.04]`}>
              <span className="text-gray-300 col-span-1">{row.feature}</span>
              {[row.day, row.week, row.month].map((has, j) => (
                <div key={j} className="flex justify-center">
                  {has
                    ? <Check className="w-4 h-4 text-green-400" />
                    : <span className="text-gray-700 text-lg leading-none">—</span>
                  }
                </div>
              ))}
            </div>
          ))}
          <div className="grid grid-cols-4 px-6 py-3 text-xs text-gray-600">
            <span />
            <span className="text-center">{t("1 Day", "1 Zi")}</span>
            <span className="text-center">{t("1 Week", "1 Săpt.")}</span>
            <span className="text-center">{t("1 Month", "1 Lună")}</span>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          {t("Frequently Asked Questions", "Întrebări frecvente")}
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium hover:bg-white/[0.03] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/[0.06] pt-3">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ENTERPRISE CTA ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-violet-950/60 backdrop-blur-sm p-10 sm:p-14 text-center"
        >
          <Building2 className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">
            {t("More than 5 displays?", "Ai mai mult de 5 display-uri?")}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {t(
              "We offer custom pricing for chains, malls, and networks. One dashboard to manage everything.",
              "Oferim prețuri personalizate pentru lanțuri, mall-uri și rețele de locații. Un singur panou de control pentru tot."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@getapp.ro?subject=Ofertă%20enterprise%20Smart%20Displays"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              {t("Request a Custom Quote", "Solicită ofertă personalizată")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+40757777712"
              className="px-8 py-4 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
            >
              +40 75 77777 12
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
