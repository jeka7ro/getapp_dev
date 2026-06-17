import React, { useState } from "react";
import { CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { toast } from "react-hot-toast";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzJdV1SxI2FCpZhmw8IjSYVneHSb_LaPG8t6VZhEsskYl11mLRObE7UAT9OLc9agxBunA/exec";

export default function DigitalizarePreview() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "digitalizare_imm_home"
        })
      });
      const existingLeads = JSON.parse(localStorage.getItem("getapp_demo_leads") || "[]");
      existingLeads.unshift({
        name: formData.name,
        business: formData.business,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toLocaleString("ro-RO")
      });
      localStorage.setItem("getapp_demo_leads", JSON.stringify(existingLeads));

      toast.success("Cererea a fost trimisă cu succes! Te vom contacta în curând.", { duration: 5000 });
      setFormData({ name: "", business: "", email: "", phone: "" });
      
      // Redirect la pagina dupa trimitere?
      window.location.href = "/DigitalizareIMM";
    } catch (err) {
      toast.error("Eroare la trimiterea cererii.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-40 pb-20 lg:pt-48 bg-[#0a0e27] border-t border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Partea Stângă - Prezentare Scurtă */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Fonduri PNRR 2026
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Soluții Software pentru <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digitalizare IMM 2026</span>
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Până la <strong>100.000 de Euro fonduri nerambursabile</strong> pentru digitalizarea companiei tale. Alege pachetele noastre software pentru a bifa criteriile PNRR.
            </p>

            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Consultanță tehnică pentru caietul de sarcini</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Soluții Cloud și Mobile First</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Implementare rapidă și suport dedicat</li>
            </ul>

            <a 
              href="/DigitalizareIMM"
              className="inline-block px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all"
            >
              Vezi toate detaliile programului
            </a>
          </div>

          {/* Partea Dreaptă - Formular */}
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <h3 className="text-2xl font-bold text-white mb-2">Solicită o ofertă</h3>
            <p className="text-gray-400 text-sm mb-6">Completează datele pentru a începe digitalizarea.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Nume Firmă / CUI</label>
                <input 
                  type="text" required
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="ex: SC Digital SRL"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Numele Tău</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="ex: Ion Popescu"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Telefon</label>
                  <input 
                    type="tel" required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="07..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="contact@firma.ro"
                  />
                </div>
              </div>
              
              <button 
                type="submit" disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Se trimite..." : "Cere oferta"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
