import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Building2, Code2, LineChart, Server } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";

function DigitalizareIMMContent() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("IT Company Software Development & SME Digitalization 2026 | GetApp", "Companie IT Dezvoltare Software & Digitalizare IMM 2026 | GetApp");
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = t("Software development agency and custom IT solutions. We help you access European funds through the SME Digitalization 2026 Program. ERP, CRM, custom mobile apps.", "Agenție dezvoltare software și soluții IT la comandă. Te ajutăm să accesezi fonduri europene prin Programul Digitalizare IMM 2026. ERP, CRM, aplicații mobile personalizate.");
  }, [t]);

  return (
    <main className="w-full pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("European Funds 2026", "Fonduri Europene 2026")}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            {t("SME Digitalization 2026:", "Digitalizare IMM 2026:")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{t("Custom Software Development", "Dezvoltare Software Personalizat")}</span> {t("with a Top IT Company", "cu o Companie IT de Top")}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("Through the", "Prin")} <strong>{t("National Program for SME Digitalization", "Programul Național pentru Digitalizare IMM")}</strong> {t("you can access up to 100,000 Euros in non-refundable funds. To maximize your chances of success and truly implement innovative systems, you need an", "poți accesa până la 100.000 de Euro fonduri nerambursabile. Pentru a maximiza șansele tale de succes și pentru a implementa cu adevărat sisteme inovatoare, ai nevoie de o")} <strong>{t("expert IT company in custom software development", "companie IT expertă în dezvoltare software la comandă")}</strong>.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t("What kind of IT Solutions do we develop?", "Ce tip de Soluții IT dezvoltăm?")}</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {t("We are a performance-driven software development agency. We build end-to-end products, going through complete phases of UI/UX design, frontend/backend programming, and cloud architecture. Here is what we can build for your business with PNRR funds:", "Suntem o agenție de dezvoltare software axată pe performanță. Construim produse cap-coadă, trecând prin faze complete de design UI/UX, programare frontend/backend și arhitectură cloud. Iată ce putem construi pentru afacerea ta prin fondurile PNRR:")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
              <Code2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{t("Custom ERP Systems", "Sisteme ERP Personalizate")}</h3>
              <p className="text-gray-400 text-sm">{t("Complex enterprise resource planning apps, adapted exactly to your employees' workflow, without the limitations of off-the-shelf solutions.", "Aplicații complexe de gestiune a resurselor companiei, adaptate exact pe fluxul de lucru al angajaților tăi, fără limitările soluțiilor de-a gata.")}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
              <LineChart className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{t("CRM & Sales Platforms", "Platforme CRM & Vânzări")}</h3>
              <p className="text-gray-400 text-sm">{t("Manage clients, leads, and order history through super-fast web platforms, easy to use from any device (mobile-first).", "Gestionează clienții, lead-urile și istoricul comenzilor prin platforme web super-rapide, ușor de utilizat de pe orice dispozitiv (mobile-first).")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
              <Server className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{t("B2B & B2C Web Apps", "Aplicații Web B2B & B2C")}</h3>
              <p className="text-gray-400 text-sm">{t("Advanced e-commerce platforms, marketplaces, or apps with a dedicated portal for your clients, directly integrated with invoicing and accounting.", "Platforme de e-commerce avansate, marketplace-uri sau aplicații cu portal dedicat clienților tăi, integrate direct cu facturarea și contabilitatea.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
              <CheckCircle2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{t("Timesheet & Team Management Systems", "Sisteme de Pontaj & Management Echipe")}</h3>
              <p className="text-gray-400 text-sm">{t("Solutions like Smart Timesheet that digitally track attendance, GPS routes, and workflows of field or production employees.", "Soluții precum Smart Pontaj care urmăresc digital prezența, traseele GPS și fluxurile de lucru ale angajaților de pe teren sau din producție.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-16 prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-white mb-6">{t("Why collaborate with GetApp for Digitalization?", "De ce să colaborezi cu GetApp pentru Digitalizare?")}</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {t("As an", "Ca")} <strong>{t("IT company", "companie IT")}</strong>, {t("we are not simple executors. We offer business consulting from day one, analyzing how data flows through your company and proposing modern software architectures based on React, Node.js, and Scalable Cloud architectures.", "nu suntem simpli executanți. Oferim consultanță de business din prima zi, analizând modul în care datele circulă prin compania ta și propunând arhitecturi software moderne, bazate pe React, Node.js și arhitecturi Cloud Scalabile.")}
          </p>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span><strong>{t("Extreme Performance:", "Performanță Extremă:")}</strong> {t("We do not use WordPress or heavy templates. We build custom, native, and performant apps designed to load instantly.", "Nu folosim WordPress sau template-uri greoaie. Construim aplicații personalizate, native și performante, gândite să ruleze instant.")}</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span><strong>{t("100% PNRR Compatibility:", "Compatibilitate PNRR 100%:")}</strong> {t("We help consulting firms with correct technical specifications (Terms of Reference) so the project passes evaluation and respects the DESI (Digital Economy and Society Index) technological indicators.", "Ajutăm firmele de consultanță cu specificații tehnice corecte (Caiete de Sarcini) pentru ca proiectul să treacă de evaluare și să respecte indicatorii tehnologici DESI (Digital Economy and Society Index).")}</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span><strong>{t("Exceptional UI/UX Design:", "Design UI/UX Excepțional:")}</strong> {t("Apps developed by us not only work flawlessly, but they are also easy to use by employees, reducing required training time.", "Aplicațiile dezvoltate de noi nu doar că funcționează ireproșabil, dar sunt și ușor de utilizat de către angajați, reducând timpul necesar pentru training.")}</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#0d1230] p-8 rounded-2xl border border-white/5 mt-16 text-sm text-gray-500">
          <h3 className="text-gray-400 font-semibold mb-2">{t("IT Services Covered:", "Servicii IT Acoperite:")}</h3>
          <p>
            {t("Whether you need", "Fie că ai nevoie de")} <em>{t("software development in Cluj, Bucharest, Timisoara", "dezvoltare software Cluj, București, Timișoara")}</em> {t("or any other location in Romania, our services have national coverage for implementing", "sau orice altă locație din România, serviciile noastre acoperă la nivel național implementarea de")} <em>{t("custom apps", "aplicații la comandă")}</em>, <em>{t("web platform creation", "creare platforme web")}</em>, <em>{t("iOS and Android mobile apps", "aplicații mobile iOS și Android")}</em>, {t("and full", "și servicii complete de")} <em>{t("company digitalization", "digitalizare companie")}</em> {t("through European funds. We are the software agency that brings you into the future.", "prin fonduri europene. Suntem agenția de software care te aduce în viitor.")}
          </p>
        </div>

      </div>
    </main>
  );
}

export default function DigitalizareIMM() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e27] text-white overflow-x-hidden">
        <Navbar />
        <DigitalizareIMMContent />
        <CTAFooter />
      </div>
    </LanguageProvider>
  );
}
