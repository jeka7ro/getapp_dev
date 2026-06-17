import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { en: "Home", ro: "Acasă", href: "/" },
    { en: "Contact", ro: "Contact" },
    { 
      en: "Services", 
      ro: "Servicii", 
      sublinks: [
        { en: "Smart Displays", ro: "Smart Displays", href: "/displays/" },
        { en: "Smart Timesheet", ro: "Smart Pontaj", href: "/smartpontaj" }
      ]
    },
    { 
      en: "Solutions", 
      ro: "Soluții",
      sublinks: [
        { en: "SME Digitalization 2026", ro: "Digitalizare IMM 2026", href: "/digitalizare-imm-2026" }
      ]
    },
    { en: "Process", ro: "Proces" },
    { en: "Testimonials", ro: "Testimoniale" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2.5 text-center text-sm font-medium flex flex-wrap justify-center items-center gap-2 shadow-md">
        <span className="hidden sm:inline animate-pulse">🔥</span>
        <span>{t("New: Test Get App Smart Displays directly in your browser!", "Nou: Testează gratuit Get App Smart Displays direct din browser!")}</span>
        <a href="/demo_generator.html" className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full text-xs font-bold transition-colors sm:ml-2 whitespace-nowrap">
          {t("Try Live Demo", "Încearcă Demo")}
        </a>
      </div>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#0a0e27]/90 backdrop-blur-xl"
      >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center" style={{ textDecoration: 'none' }}>
          <img
            src="/logo_cropped.png"
            alt="GetApp Logo"
            style={{ height: '48px' }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            link.sublinks ? (
              <div key={i} className="relative group py-2">
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  {t(link.en, link.ro)}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#0a0e27]/95 backdrop-blur-xl border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    {link.sublinks.map((sub, j) => (
                      <a
                        key={j}
                        href={sub.href || `/#${sub.en.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 whitespace-nowrap"
                      >
                        {t(sub.en, sub.ro)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={i}
                href={link.href || `/#${link.en.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {t(link.en, link.ro)}
              </a>
            )
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇷🇴'}</span>
            {language.toUpperCase()}
          </button>
          <a
            href="/#login"
            className="px-4 py-2 hover:bg-white/10 text-white border border-transparent hover:border-white/20 text-sm font-medium rounded-lg transition-all duration-300"
          >
            {t("Login", "Autentificare")}
          </a>
          <a
            href="/#contact"
            className="px-5 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            {t("Get Started", "Începe acum")}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4"
        >
          {links.map((link, i) => (
            link.sublinks ? (
              <div key={i} className="space-y-3 pt-2">
                <div className="text-gray-300 font-medium">{t(link.en, link.ro)}</div>
                <div className="pl-4 space-y-3 border-l border-white/10">
                  {link.sublinks.map((sub, j) => (
                    <a
                      key={j}
                      href={sub.href || `/#${sub.en.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {t(sub.en, sub.ro)}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={i}
                href={link.href || `/#${link.en.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-400 hover:text-white transition-colors pt-2"
              >
                {t(link.en, link.ro)}
              </a>
            )
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-xl">{language === 'en' ? '🇬🇧' : '🇷🇴'}</span>
            {language === 'en' ? 'Română' : 'English'}
          </button>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="/#login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
            >
              {t("Login", "Autentificare")}
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-2.5 bg-white text-black font-medium rounded-lg transition-colors relative overflow-hidden group"
            >
              {t("Get Started", "Începe acum")}
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
    </div>
  );
}