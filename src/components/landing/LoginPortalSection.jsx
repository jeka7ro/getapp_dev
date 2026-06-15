import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, ChevronRight, LayoutDashboard, BrainCircuit, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function LoginPortalSection() {
  const { t } = useLanguage();

  const services = [
    {
      id: "smart-displays",
      title: "Smart Displays",
      description: t(
        "Digital signage presentation software for TVs and tablets.",
        "Software de prezentare publicitară pentru televizoare și tablete."
      ),
      icon: MonitorPlay,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-red-500/10",
      iconColor: "text-red-500",
      link: "https://sd.getapp.ro/login"
    },
    {
      id: "jackpot",
      title: "Jackpot Intelligence",
      description: t(
        "Real-time casino jackpot tracking and business intelligence.",
        "Monitorizare jackpoturi casino în timp real și business intelligence."
      ),
      icon: BrainCircuit,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
      link: "https://jackpot.getapp.ro/login"
    },
    {
      id: "cruises",
      title: "Smart Cruises",
      description: t(
        "Dynamic booking and booking tracking dashboard.",
        "Management al rezervărilor și tracking pentru croaziere."
      ),
      icon: Globe,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
      link: "#" // "https://cruises.getapp.ro/login" (Comming soon placeholder)
    }
  ];

  return (
    <section id="login" className="py-20 relative bg-[#0a0e27] overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("Access your service", "Accesează serviciul tău")}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t(
              "Select the platform you want to log into. Each service has a dedicated management dashboard.",
              "Selectează platforma în care dorești să te autentifici. Fiecare serviciu are propriul panou de control."
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isComingSoon = service.link === "#";
            
            return (
              <motion.a
                key={service.id}
                href={isComingSoon ? undefined : service.link}
                className={`relative group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col h-full transition-all duration-300 ${isComingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                onClick={(e) => {
                  if (isComingSoon) {
                    e.preventDefault();
                  }
                }}
              >
                {isComingSoon && (
                  <div className="absolute top-4 right-4 bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white/50 uppercase tracking-wider backdrop-blur-md">
                    {t("Soon", "În curând")}
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg ${service.bgColor}`}>
                  <Icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-400 flex-1 mb-6">
                  {service.description}
                </p>
                
                {!isComingSoon && (
                  <div className="flex items-center text-sm font-semibold text-white/60 group-hover:text-white transition-colors mt-auto">
                    {t("Login now", "Intră în cont")} 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
