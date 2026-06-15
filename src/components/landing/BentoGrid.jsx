import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

function GlassCard({ children, className = "", i = 0, image = null }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative rounded-2xl overflow-hidden group ${className}`}
    >
      {image && (
        <>
          <img 
            src={image} 
            alt="CRM Dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />
        </>
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const { t } = useLanguage();
  
  return (
    <section id="solutions" className="relative pt-32 pb-20 px-6 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
            {t("Solutions", "Soluții")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            {t("Real Business Solutions", "Soluții reale pentru afaceri")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            {t(
              "CRM and ERP systems that transform how you work. Any customizable application for your business, just a few clicks away.",
              "Sisteme CRM și ERP care transformă modul în care lucrezi. Orice aplicație customizabilă pentru businessul tău, la câteva clickuri distanță."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {t("Free visual presentation", "Prezentare vizuală gratuită")}
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {t("Delivery in 1 to 10 days", "Livrare în 1-10 zile")}
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {t("Smart and fast applications", "Aplicații smart și rapide")}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {/* ===== BANNER 30 ZILE GRATUIT - Smart Displays ===== */}
            <a
              href="/demo_generator.html"
              className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 group cursor-pointer backdrop-blur-sm shadow-[0_0_30px_rgba(0,206,209,0.1)] hover:shadow-[0_0_40px_rgba(0,206,209,0.25)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-cyan-400/20 rounded-xl p-2.5">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{t("Smart Displays", "Smart Displays")}</span>
                    <span className="bg-cyan-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">{t("30 days FREE", "30 zile GRATUIT")}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{t("Try your custom display on any Smart TV — no credit card needed", "Testează afișajul tău pe orice Smart TV — fără card, fără obligații")}</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1 text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                {t("Try now", "Încearcă acum")}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="/smartpontaj"
              className="group px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_28px_rgba(59,130,246,0.55)] flex items-center gap-2 text-sm"
            >
              {t("Smart Timesheet", "Smart Pontaj")}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a
              href="/displays"
              className="group px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 text-sm backdrop-blur-sm"
            >
              {t("Smart Displays", "Smart Displays")}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a
              href="/DigitalizareIMM"
              className="group px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 text-sm backdrop-blur-sm"
            >
              {t("SME Digitalization 2026", "Digitalizare IMM 2026")}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </motion.div>

        {/* Bento grid with real images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large CRM Dashboard */}
          <GlassCard 
            className="lg:col-span-2 lg:row-span-2 min-h-[400px]" 
            i={0}
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
          >
            <h3 className="text-2xl font-bold text-white mb-2">{t("CRM Dashboards", "Dashboard-uri CRM")}</h3>
            <p className="text-gray-300 text-sm">{t("Real-time analytics and customer insights", "Analize în timp real și insights clienți")}</p>
          </GlassCard>

          {/* Team Collaboration */}
          <GlassCard 
            className="min-h-[195px]" 
            i={1}
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
          >
            <h3 className="text-xl font-bold text-white mb-2">{t("Team Collaboration", "Colaborare în echipă")}</h3>
            <p className="text-gray-300 text-sm">{t("Built for modern teams", "Construite pentru echipe moderne")}</p>
          </GlassCard>

          {/* Data Analytics */}
          <GlassCard 
            className="min-h-[195px]" 
            i={2}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
          >
            <h3 className="text-xl font-bold text-white mb-2">{t("Data Analytics", "Analize de date")}</h3>
            <p className="text-gray-300 text-sm">{t("Make data-driven decisions", "Decizii bazate pe date")}</p>
          </GlassCard>

          {/* ERP Systems */}
          <GlassCard 
            className="min-h-[195px]" 
            i={3}
            image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
          >
            <h3 className="text-xl font-bold text-white mb-2">{t("ERP Integration", "Integrare ERP")}</h3>
            <p className="text-gray-300 text-sm">{t("Seamless business operations", "Operațiuni business fără întreruperi")}</p>
          </GlassCard>

          {/* Mobile First */}
          <GlassCard 
            className="lg:col-span-2 min-h-[195px]" 
            i={4}
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
          >
            <h3 className="text-xl font-bold text-white mb-2">{t("Mobile-First Design", "Design mobile-first")}</h3>
            <p className="text-gray-300 text-sm">{t("Work from anywhere, on any device", "Lucrează de oriunde, pe orice dispozitiv")}</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}