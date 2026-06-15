/**
 * useCMS - Hook pentru texte editabile din Backoffice
 * Stochează textele în localStorage.
 * Folosire: const { cmsText } = useCMS(); cmsText('hero_title', 'Text default')
 */

const CMS_KEY = "getapp_cms_content";

export function getCMSContent() {
  try {
    const raw = localStorage.getItem(CMS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setCMSContent(data) {
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  // Dispatch event so live components re-render
  window.dispatchEvent(new CustomEvent("cms_update", { detail: data }));
}

export function useCMS() {
  const [content, setContent] = React.useState(getCMSContent);

  React.useEffect(() => {
    const handler = (e) => setContent(e.detail);
    window.addEventListener("cms_update", handler);
    return () => window.removeEventListener("cms_update", handler);
  }, []);

  function cmsText(key, fallback) {
    return content[key] ?? fallback;
  }

  return { cmsText, content };
}

import React from "react";

/**
 * CMS Fields definition — toate textele editabile din site
 * Grupate pe pagini/secțiuni
 */
export const CMS_FIELDS = [
  {
    section: "🏠 Hero / BentoGrid",
    fields: [
      { key: "hero_title_ro", label: "Titlu principal (RO)", type: "text", default: "Transformă-ți Afacerea cu Soluții Smart" },
      { key: "hero_title_en", label: "Titlu principal (EN)", type: "text", default: "Transform Your Business with Smart Solutions" },
      { key: "hero_subtitle_ro", label: "Subtitlu (RO)", type: "textarea", default: "Sisteme CRM și ERP care transformă modul în care lucrezi. Orice aplicație customizabilă pentru businessul tău, la câteva clickuri distanță." },
      { key: "hero_subtitle_en", label: "Subtitlu (EN)", type: "textarea", default: "CRM and ERP systems that transform how you work. Any customizable application for your business, just a few clicks away." },
      { key: "hero_cta_ro", label: "Buton CTA (RO)", type: "text", default: "Încearcă Gratuit" },
      { key: "hero_cta_en", label: "Buton CTA (EN)", type: "text", default: "Try for Free" },
    ]
  },
  {
    section: "📺 Smart Displays",
    fields: [
      { key: "displays_title_ro", label: "Titlu pagină Displays (RO)", type: "text", default: "Smart Displays — Afișaj Digital pentru Locații" },
      { key: "displays_title_en", label: "Titlu pagină Displays (EN)", type: "text", default: "Smart Displays — Digital Signage for Venues" },
      { key: "displays_desc_ro", label: "Descriere (RO)", type: "textarea", default: "Afișaje inteligente pentru restaurante, cafenele, hoteluri și orice locație. Controlezi conținutul de pe telefon." },
      { key: "displays_desc_en", label: "Descriere (EN)", type: "textarea", default: "Smart displays for restaurants, cafes, hotels and any venue. Control content from your phone." },
      { key: "displays_price", label: "Preț afișat", type: "text", default: "De la 29€/lună" },
      { key: "displays_badge", label: "Badge promoțional", type: "text", default: "30 zile GRATUIT" },
    ]
  },
  {
    section: "⏰ Smart Pontaj",
    fields: [
      { key: "pontaj_title_ro", label: "Titlu pagină Pontaj (RO)", type: "text", default: "Smart Pontaj — Pontaj Digital pentru Echipa Ta" },
      { key: "pontaj_title_en", label: "Titlu pagină Pontaj (EN)", type: "text", default: "Smart Timesheet — Digital Time Tracking for Your Team" },
      { key: "pontaj_desc_ro", label: "Descriere (RO)", type: "textarea", default: "Gestionează pontajul angajaților rapid și eficient. Rapoarte automate, fișe de pontaj digitale." },
    ]
  },
  {
    section: "📞 Contact / Footer",
    fields: [
      { key: "contact_phone", label: "Telefon contact", type: "text", default: "+40 700 000 000" },
      { key: "contact_email", label: "Email contact", type: "text", default: "contact@getapp.ro" },
      { key: "footer_cta_ro", label: "CTA Footer (RO)", type: "text", default: "Contactează-ne acum" },
      { key: "footer_cta_en", label: "CTA Footer (EN)", type: "text", default: "Contact us now" },
      { key: "footer_tagline_ro", label: "Tagline footer (RO)", type: "textarea", default: "Soluții digitale pentru afacerea ta modernă." },
    ]
  },
  {
    section: "🎯 Digitalizare IMM",
    fields: [
      { key: "imm_title_ro", label: "Titlu IMM (RO)", type: "text", default: "Digitalizare IMM 2026 — Finanțare până la 100.000€" },
      { key: "imm_cta_ro", label: "Buton IMM (RO)", type: "text", default: "Aplică acum" },
    ]
  },
];
