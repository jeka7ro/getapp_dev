import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MonitorPlay, Cloud, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";

// ----------------------------------------------------------------------
// PAGE WRAPPER 
// ----------------------------------------------------------------------
export default function Displays() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e27] text-white overflow-x-hidden pt-20">
        <Navbar />
        <DisplaysContent />
        <CTAFooter />
      </div>
    </LanguageProvider>
  );
}

// ----------------------------------------------------------------------
// MAIN CONTENT COMPONENTS
// ----------------------------------------------------------------------
function DisplaysContent() {
  const { t } = useLanguage();

  return (
    <main className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8 overflow-hidden">
        {/* Subtle grid background taken from native */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} 
        />
        
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <MonitorPlay className="w-4 h-4 text-[#f97316]" />
              <span className="text-sm font-medium text-gray-300">
                {t("Get App Internal Products", "Produse Interne Get App")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              {t("Turn Any Screen into a", "Transformă orice ecran într-un ")}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                {t("Customer Magnet", "magnet pentru clienți")}
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-400 max-w-3xl mx-auto">
              {t(
                "The ultimate digital signage solution. Manage dynamic content, menus, and ads in real-time on any Smart TV. Prices starting from 10€ per month per display.",
                "Soluția supremă de digital signage. Gestionează conținut dinamic, meniuri și reclame în timp real, pe orice Smart TV sau chioșc. Totul controlat inteligent din Cloud."
              )}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <a
                href="https://sd.getapp.ro/login"
                className="group flex items-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-300"
              >
                <Lock className="w-4 h-4" />
                {t("Access Platform", "Acces Platformă / Creare Cont")}
              </a>
              <a
                href="#learn-more"
                className="group flex items-center gap-2 rounded-full bg-white/5 px-8 py-4 text-sm font-semibold text-white border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                {t("Learn more", "Află mai multe")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SHOWCASE (IMAGE) SECTION */}
      <section id="learn-more" className="relative pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 p-2 sm:p-4 backdrop-blur-sm"
        >
          <img 
            src="/displays/images/restaurant_kiosk.png" 
            alt="Digital Signage Hero" 
            className="w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Cloud className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{t("Cloud Sync", "Sincronizare Cloud")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("Centralized Cloud Control", "Control Centralizat din Cloud")}
              </h2>
              <p className="text-gray-400 text-lg">
                {t("Update prices, images, and designs across dozens of screens simultaneously from a single cutting-edge web dashboard.", "Schimbă prețurile, imaginile și designul pe zeci de ecrane simultan dintr-un singur panou de control conectat la cloud.")}
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  t("No more physical USB drives", "Fără memorii USB fizice / stick-uri"),
                  t("Offline resilience and robust caching", "Redare continuă din cache chiar și fără internet"),
                  t("Easy drag & drop playlist management", "Management vizual tip drag & drop al listelor")
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <img src="/displays/images/cms_dashboard.png" alt="CMS Dashboard" className="w-full h-auto" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl lg:order-1"
            >
              <img src="/displays/images/mall_displays.png" alt="Mall Displays" className="w-full h-auto" />
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="space-y-6 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{t("Reliability", "Stabilitate")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("Premium & Stable Display", "Afișare Premium & Stabilă")}
              </h2>
              <p className="text-gray-400 text-lg">
                {t("We utilize a specialized commercial architecture that reliably prevents Smart TVs from entering sleep or standby mode.", "Folosim o arhitectură special concepută pentru mediul comercial ce previne intrarea în repaus (standby) a televizoarelor.")}
              </p>
              <p className="text-gray-400 text-lg">
                {t("We offer animated transitions, high-quality video support, and flawless 24/7 design that captures your clients attention.", "Oferim tranziții animate, suport pentru video și design impecabil 24/7 care captează atenția clienților garantat.")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-24 px-6 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-3xl mx-auto p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
         >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("Ready to modernize your displays?", "Pregătit să îți modernizezi afacerile?")}
            </h2>
            <p className="text-gray-400 mb-8">
              {t("Join our platform today and configure your first screen in minutes.", "Alătură-te partenerilor Get App Smart Displays chiar astăzi. Configurezi primul ecran în 5 minute.")}
            </p>
            <a
              href="https://sd.getapp.ro/login"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-sm font-bold shadow-sm hover:bg-gray-200 transition-all duration-300"
            >
              <Lock className="w-4 h-4" />
              {t("Get Started / Login", "Intră în Cont / Creare")}
            </a>
         </motion.div>
      </section>
    </main>
  );
}
