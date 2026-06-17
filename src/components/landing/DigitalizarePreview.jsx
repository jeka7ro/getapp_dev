import React from "react";
import { CheckCircle2, Building2, Code2, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function DigitalizarePreview() {
  return (
    <section className="py-20 bg-[#0a0e27] border-t border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Fonduri PNRR 2026
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Digitalizare IMM 2026
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Până la 100.000 de Euro fonduri nerambursabile pentru digitalizarea companiei tale. Alege pachetele noastre software (ERP, Pontaj Digital, Smart Displays) pentru a bifa criteriile de intensitate digitală.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Package 1 */}
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700 p-8 rounded-3xl relative">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-xl mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pachetul "Digital HR & Afișaj"</h3>
            <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-slate-800">Ideal pentru HoReCa, Retail, Producție. Rezolvă problemele de personal și comunicare.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">GetApp Smart Pontaj</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">GetApp Smart Displays</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Hosting & Mentenanță 12 luni</span></li>
            </ul>
          </div>

          {/* Package 2 */}
          <div className="bg-gradient-to-b from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 p-8 rounded-3xl relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              CEL MAI POPULAR
            </div>
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pachetul "ERP / Custom Software"</h3>
            <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-slate-800">Dezvoltare la comandă pentru scalarea afacerii, integrat cu e-Factura și gestiune.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Dezvoltare Portal B2B / B2C</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Sistem intern ERP/CRM</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Integrare e-Factura / API furnizori</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/DigitalizareIMM"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            Cere oferta
          </a>
        </div>

      </div>
    </section>
  );
}
