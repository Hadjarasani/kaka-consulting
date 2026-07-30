"use client";
import {
  Globe,
  MonitorSmartphone,
  Database,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: Globe,
      title: "Développement web",
      description:
        "Création de sites vitrines, e-commerce et applications web modernes.",
    },
    {
      icon: MonitorSmartphone,
      title: "Développement logiciel",
      description:
        "Conception de logiciels sur mesure pour automatiser vos processus.",
    },
    {
      icon: Database,
      title: "Data & Business Intelligence",
      description:
        "Analyse de données, tableaux de bord et aide à la décision.",
    },
    {
      icon: Brain,
      title: "Intelligence artificielle",
      description:
        "Chatbots, automatisation et solutions basées sur l'IA.",
    },
  ];

  return (
    <section id="services" className="bg-[#F8F4F5] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#3B0910]">
            Nos services
          </h2>

          <p className="mt-4 text-gray-600">
            KAKA CONSULTING accompagne les entreprises dans leur
            transformation digitale grâce à des solutions innovantes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once:true}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="
                group
                rounded-3xl
                bg-white
                p-8
                shadow-md
                border
                border-gray-200
                transition-all
                duration-300 
                hover:-translate-y-3 
                hover:shadow-2xl 
                hover:border-[#701C2C]
              "
              >
                <div
                  className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#701C2C]/10
                    transition-all
                    duration-300
                    group-hover:bg-[#701C2C]
                  "
                >
                  <Icon
                    size={32}
                    className="
                      text-[#701C2C]
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                  />
                </div>

                <h3 className="mb-4 text-xl font-bold text-[#3B0910]">
                  {service.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}