import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, Building2, Code2, LineChart, 
  Server, ShieldCheck, Target, Laptop 
} from "lucide-react";
import { useLanguage, LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";
import { toast, Toaster } from "react-hot-toast";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzJdV1SxI2FCpZhmw8IjSYVneHSb_LaPG8t6VZhEsskYl11mLRObE7UAT9OLc9agxBunA/exec";

export function DigitalizareIMMContent() {
  const { t } = useLanguage();
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = t("Soluții Software Digitalizare IMM 2026 | Fonduri PNRR | GetApp", "Soluții Software Digitalizare IMM 2026 | Fonduri PNRR | GetApp");
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = t("Alege GetApp ca furnizor IT pentru programul Digitalizare IMM 2026. Pachete software PNRR: sisteme de pontaj, ecrane inteligente, ERP, CRM, respectând criteriile DESI.", "Alege GetApp ca furnizor IT pentru programul Digitalizare IMM 2026. Pachete software PNRR: sisteme de pontaj, ecrane inteligente, ERP, CRM, respectând criteriile DESI.");
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "digitalizare_imm"
        })
      });
      // Save locally for admin dashboard
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
    } catch (err) {
      toast.error("Eroare la trimiterea cererii. Te rugăm să ne contactezi telefonic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full pt-24 pb-16">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Fonduri PNRR 2026
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Soluții Software pentru <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digitalizare IMM 2026</span>
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Până la <strong>100.000 de Euro fonduri nerambursabile</strong> pentru digitalizarea companiei tale. Îți punem la dispoziție pachete tehnologice (ERP, CRM, Pontaj Digital, Smart Displays) care garantează atingerea criteriilor DESI pentru punctaj maxim la evaluare.
            </p>

            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Consultanță tehnică pentru caietul de sarcini</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Soluții Cloud și Mobile First (iOS / Android)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400 w-5 h-5"/> Implementare rapidă și suport tehnic dedicat</li>
            </ul>

            <button 
              onClick={() => document.getElementById("lead-form").scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              Evaluează-ți gratuit proiectul
            </button>
          </div>

          {/* FORMULAR EVALUARE */}
          <div id="lead-form" className="bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <h3 className="text-2xl font-bold text-white mb-2">Solicită o ofertă conformă</h3>
            <p className="text-gray-400 text-sm mb-6">Completează datele de mai jos și află cum te putem ajuta să bifezi criteriile de intensitate digitală (DESI).</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Nume Firmă / CUI</label>
                <input 
                  type="text" required
                  name="organization"
                  autoComplete="organization"
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="ex: SC Digital SRL"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Numele Tău</label>
                <input 
                  type="text" required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="ex: Ion Popescu"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Telefon</label>
                  <input 
                    type="tel" required
                    name="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="07..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                  <input 
                    type="email" required
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="contact@firma.ro"
                  />
                </div>
              </div>
              <button 
                type="submit" disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Se trimite..." : "Cere Oferta și Evaluarea DESI"}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">Fără obligații contractuale. Analiza se face gratuit de către experții GetApp.</p>
          </div>
        </div>

        {/* DESI CRITERIA SECTION */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Cum bifăm indicatorii DESI (Intensitate Digitală)?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Pentru a obține punctajul pentru componenta digitală, afacerea ta trebuie să implementeze minim 6 din cei 12 indicatori DESI. Soluțiile GetApp acoperă din start cerințele majore.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
              <Server className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">1. Cloud Computing</h3>
              <p className="text-sm text-gray-400">Toate aplicațiile noastre (Pontaj, Smart Displays, ERP) sunt găzduite în cloud securizat pe arhitecturi moderne. Angajații pot accesa datele de oriunde, oricând.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
              <LineChart className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">2. Sistem ERP / CRM</h3>
              <p className="text-sm text-gray-400">Pachetele noastre includ module software care automatizează procesul de vânzări, managementul orelor lucrate și schimbul de informații între departamente.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
              <Laptop className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">3. Comerț Electronic</h3>
              <p className="text-sm text-gray-400">Implementăm portale B2B și B2C direct integrate cu softul de gestiune. Creștem rata veniturilor provenite din online conform indicatorilor PNRR.</p>
            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Pachete Tehnologice Eligibile PNRR</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Soluții scalabile create special pentru IMM-urile care doresc o transformare digitală reală, nu doar pe hârtie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700 p-8 rounded-3xl relative">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-xl mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pachetul "Digital HR & Afișaj"</h3>
              <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-slate-800">Ideal pentru HoReCa, Retail, Producție. Rezolvă problemele de personal și comunicarea internă/externă.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300"><strong>GetApp Smart Pontaj</strong> (Aplicație web & mobil, GPS tracking, export state de plată)</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300"><strong>GetApp Smart Displays</strong> (Sistem Cloud Digital Signage)</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Hosting Cloud 12 luni</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Mentenanță și instruire personal</span></li>
              </ul>
            </div>

            {/* Package 2 */}
            <div className="bg-gradient-to-b from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 p-8 rounded-3xl relative shadow-[0_0_30px_rgba(79,70,229,0.1)]">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                CEL MAI POPULAR
              </div>
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pachetul "ERP / Custom Software"</h3>
              <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-slate-800">Dezvoltare software la comandă pentru scalarea afacerii, perfect aliniat cu nevoile IMM-ului tău.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300"><strong>Dezvoltare Portal B2B / B2C</strong></span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300"><strong>Sistem intern ERP/CRM</strong> (Automatizări facturare, gestiune clienți)</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Integrare e-Factura / API furnizori</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-400 w-5 h-5 shrink-0" /><span className="text-sm text-gray-300">Infrastructură Cloud scalabilă (AWS / Google Cloud)</span></li>
              </ul>
            </div>

          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="bg-[#0d1230] p-8 md:p-12 rounded-3xl border border-white/5 mt-16 text-center">
          <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">De ce să ne alegi ca partener IT?</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            Nu suntem o simplă agenție web. Suntem constructori de produse tehnologice. Oferim consultanță din prima zi pentru a ne asigura că proiectul tău tehnic este fezabil și va obține punctaj maxim pe indicatorii tehnici din cadrul programelor europene de digitalizare.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm text-gray-300">Performanță Nativă (React, Node.js)</span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm text-gray-300">Aplicații iOS & Android</span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm text-gray-300">Suport Tehnic Specializat</span>
          </div>
        </section>

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
