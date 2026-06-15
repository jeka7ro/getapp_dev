import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function DigitalizareSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#0d1230] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t("European Funds 2026", "Fonduri Europene 2026")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("SME Digitalization Program", "Programul de Digitalizare IMM")}
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              {t(
                "Access up to €100,000 in non-refundable funds to digitally transform your business. We are a specialized IT company building custom software, ERPs, CRMs, and web platforms eligible for the program.",
                "Accesează fonduri nerambursabile pentru transformarea digitală a afacerii tale. Suntem o companie IT specializată în dezvoltare software la comandă, implementare ERP, CRM și platforme web eligibile pentru programul de Digitalizare IMM."
              )}
            </p>
            <ul className="space-y-4 mb-8">
              {[
                t("Custom Software Development", "Dezvoltare Software Personalizat"),
                t("Eligible IT Solutions (ERP, CRM)", "Soluții IT Eligibile (ERP, CRM, Pontaj)"),
                t("Technical Consulting & Implementation", "Consultanță Tehnică și Implementare"),
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/DigitalizareIMM"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              {t("Find out more", "Află cum te putem ajuta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="text-sm text-gray-400 mb-1">{t("Funding up to", "Finanțare până la")}</div>
                  <div className="text-4xl font-bold text-white">€100.000</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">{t("Deadline", "Termen estimat")}</div>
                  <div className="text-xl font-bold text-blue-400">2026</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Website & E-commerce</span>
                  <span className="text-white font-medium">{t("Eligible", "Eligibil")}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-400">Software & ERP/CRM</span>
                  <span className="text-white font-medium">{t("Eligible", "Eligibil")}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-400">Cloud & Security</span>
                  <span className="text-white font-medium">{t("Eligible", "Eligibil")}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
