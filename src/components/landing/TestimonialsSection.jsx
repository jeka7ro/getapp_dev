import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Alexandra Popescu",
      role: "CTO, FinTech Solutions",
      text: t(
        "GetApp transformed our legacy system into a modern, scalable platform. The team's expertise in ERP development was outstanding. Delivery was ahead of schedule.",
        "GetApp ne-a transformat sistemul vechi într-o platformă modernă și scalabilă. Expertiza echipei în dezvoltarea ERP a fost excepțională. Livrarea a fost înainte de termen."
      ),
      rating: 5,
    },
    {
      name: "Mihai Ionescu",
      role: "CEO, LogiTrans SRL",
      text: t(
        "Their CRM solution increased our sales pipeline efficiency by 300%. The attention to UX detail and system performance is world-class. Highly recommended.",
        "Soluția lor CRM ne-a crescut eficiența pipeline-ului de vânzări cu 300%. Atenția la detaliile UX și performanța sistemului sunt de clasă mondială. Recomand cu încredere."
      ),
      rating: 5,
    },
    {
      name: "Elena Dumitrescu",
      role: t("Operations Director, MedGroup", "Director Operațiuni, MedGroup"),
      text: t(
        "Professional, reliable, and incredibly talented. They built our patient management system from scratch and it handles 50,000+ records seamlessly.",
        "Profesioniști, de încredere și incredibil de talentați. Ne-au construit sistemul de management al pacienților de la zero și gestionează fără probleme peste 50.000 de înregistrări."
      ),
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative py-32 px-6 bg-[#0d1230]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
            {t("Testimonials", "Testimoniale")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            {t("Trusted by Leaders", "Încrederea clienților noștri")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            {t("What our clients say about working with us", "Ce spun clienții despre colaborarea cu noi")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-white/20 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}