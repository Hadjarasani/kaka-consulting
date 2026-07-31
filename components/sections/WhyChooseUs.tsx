"use client";

import {
  Rocket,
  Zap,
  Handshake,
  ChartColumn,
  ShieldCheck,
  Target,
} from "lucide-react";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: Rocket,
      title: "Innovation",
      description:
        "Des solutions numériques modernes, performantes et évolutives.",
    },
    {
      icon: Zap,
      title: "Réactivité",
      description:
        "Un accompagnement rapide et une grande capacité d'adaptation.",
    },
    {
      icon: Handshake,
      title: "Conseil stratégique",
      description:
        "Une expertise technique au service de vos objectifs métiers.",
    },
    {
      icon: ChartColumn,
      title: "Data & Intelligence artificielle",
      description:
        "Valorisez vos données grâce à l'analyse et à l'IA.",
    },
    {
      icon: ShieldCheck,
      title: "Fiabilité",
      description:
        "Des solutions robustes, sécurisées et conçues pour durer.",
    },
    {
      icon: Target,
      title: "Sur mesure",
      description:
        "Chaque projet est conçu selon les besoins spécifiques de votre entreprise.",
    },
  ];

  return (
    <section id="why-us" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest text-[#701C2C]">
            Pourquoi nous choisir ?
          </p>

          <h2 className="text-4xl font-bold text-[#3B0910]">
            Pourquoi choisir KAKA CONSULTING ?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            Nous mettons la technologie, la data et l'intelligence artificielle
            au service de votre croissance et de votre transformation digitale.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;

            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-[#F8F4F5]
                  p-8
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[#701C2C]
                  hover:shadow-xl
                "
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#701C2C]/10 transition-all duration-300 group-hover:bg-[#701C2C]">
                  <Icon
                    size={30}
                    className="text-[#701C2C] transition-all duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#3B0910]">
                  {advantage.title}
                </h3>

                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}