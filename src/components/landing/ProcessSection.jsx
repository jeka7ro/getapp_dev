import React from "react";
import { motion } from "framer-motion";
import { Search, Pencil, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your business goals, user needs, and technical requirements to map the perfect solution.",
  },
  {
    icon: Pencil,
    num: "02",
    title: "Design",
    desc: "Our designers craft pixel-perfect interfaces and user experiences that delight your customers.",
  },
  {
    icon: Code2,
    num: "03",
    title: "Development",
    desc: "Agile development with weekly sprints, continuous integration, and transparent communication.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Launch & Scale",
    desc: "We deploy, monitor, and iterate — ensuring your product grows seamlessly with your business.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-6 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
            How We Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Our Process
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            A proven methodology that delivers results on time, every time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative"
            >
              <div className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] h-full">
                <span className="text-5xl font-black text-white/[0.04] absolute top-4 right-6 select-none">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}