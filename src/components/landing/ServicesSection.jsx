import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Database,
  Shield,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "CRM Development",
    desc: "Custom customer relationship management platforms that streamline your sales pipeline and client interactions.",
  },
  {
    icon: Database,
    title: "ERP Systems",
    desc: "End-to-end enterprise resource planning solutions integrating finance, HR, inventory, and operations.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Enterprise-grade security audits, penetration testing, and compliance-ready architectures.",
  },
  {
    icon: Zap,
    title: "Process Automation",
    desc: "Intelligent workflow automation that eliminates repetitive tasks and boosts productivity by 10x.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    desc: "High-performance web platforms built with modern frameworks and scalable cloud infrastructure.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications with stunning UX and seamless backend integration.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6 bg-[#0d1230]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Our Services
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Full-spectrum software development tailored for growth-oriented businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors duration-500">
                <s.icon className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}