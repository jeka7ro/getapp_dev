import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function CTAFooter() {
  const { t } = useLanguage();
  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="relative py-32 px-6 bg-[#0a0e27]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="p-12 sm:p-16 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("Ready to Build Something Amazing?", "Gata să construim ceva extraordinar?")}
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              {t(
                "Let's discuss your project. We typically respond within 2 hours during business days.",
                "Hai să discutăm despre proiectul tău. De obicei răspundem în 2 ore în zilele lucrătoare."
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contact@getapp.ro"
                className="group px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/10 flex items-center gap-2"
              >
                {t("Get in Touch", "Contactează-ne")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+40757777712"
                className="px-8 py-4 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-full transition-all duration-300"
              >
                +40 75 77777 12
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-16 px-6 bg-[#0d1230]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <img
                  src="/logo_transparent.png"
                  alt="GetApp Logo"
                  style={{ height: '80px' }}
                />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                {t(
                  "Premium custom software development agency. We build CRM, ERP, and enterprise solutions that drive growth worldwide.",
                  "Agenție premium de dezvoltare software personalizat. Construim soluții CRM, ERP și enterprise care conduc la creștere la nivel global."
                )}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t("Contact", "Contact")}</h4>
              <div className="space-y-3">
                <a href="mailto:contact@getapp.ro" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4" /> contact@getapp.ro
                </a>
                <a href="tel:+40757777712" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4" /> +40 75 77777 12
                </a>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" /> {t("Worldwide", "Global")}
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t("Company", "Companie")}</h4>
              <div className="space-y-3">
                {[
                  { en: "Services", ro: "Servicii" },
                  { en: "Smart Displays", ro: "Smart Displays", href: "/displays/" },
                  { en: "Smart Timesheet", ro: "Smart Pontaj", href: "/smartpontaj" },
                  { en: "SME Digitalization", ro: "Digitalizare IMM 2026", href: "/DigitalizareIMM" },
                  { en: "Solutions", ro: "Soluții" },
                  { en: "Process", ro: "Proces" },
                  { en: "Careers", ro: "Cariere" },
                  { en: "Privacy Policy", ro: "Politica de confidențialitate" }
                ].map((l, i) => (
                  <a key={i} href={l.href || "#"} className="block text-gray-400 hover:text-white text-sm transition-colors">
                    {t(l.en, l.ro)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              © 2026 GetApp. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs">
              {t("Crafted with precision", "Creat cu precizie")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}