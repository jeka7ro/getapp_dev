import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90" 
          alt="Office Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300 font-medium">
              {t("Custom Software Solutions for Global Businesses", "Soluții software personalizate pentru afaceri globale")}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-white">{t("We Build", "Construim")}</span>
            <br />
            <span className="text-gray-200">
              {t("Digital Products", "Produse digitale")}
            </span>
            <br />
            <span className="text-white">{t("That Scale", "Care cresc")}</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed">
            {t(
              "From CRM platforms to ERP systems, we design and develop enterprise-grade software tailored to your business needs. Trusted worldwide.",
              "De la platforme CRM la sisteme ERP, proiectăm și dezvoltăm software de nivel enterprise personalizat pentru afacerea ta. De încredere la nivel global."
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="/demo_generator.html"
              className="group px-7 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_28px_rgba(249,115,22,0.55)] flex items-center gap-2"
            >
              {t("Try a Live Demo", "Testează Demo Gratuit")}
            </a>
            <a
              href="#contact"
              className="group px-7 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2"
            >
              {t("Start Your Project", "Începe proiectul")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solutions"
              className="px-7 py-3 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm hidden sm:block"
            >
              {t("View Our Work", "Vezi proiectele noastre")}
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-12 pt-16"
          >
            {[
              { value: "120+", label: t("Projects Delivered", "Proiecte livrate") },
              { value: "98%", label: t("Client Satisfaction", "Satisfacție clienți") },
              { value: "8+", label: t("Years Experience", "Ani experiență") },
              { value: "40+", label: t("Team Members", "Membrii echipă") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent" />
    </section>
  );
}