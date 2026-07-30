"use client";

import {
  Briefcase,
  Landmark,
  Factory,
  Truck,
  ShoppingCart,
  Building2,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Sectors() {
  const sectors = [
   {
     icon: Briefcase,
     title: "Entreprises et PME",
     description:
      "Sites web, logiciels métier et automatisation des processus.",
   },
   {
     icon: Landmark,
     title: "Finance",
     description:
      "Analyse de données, tableaux de bord et aide à la décision.",
   },
   {
     icon: Factory,
     title: "Industrie",
     description:
      "Digitalisation, optimisation des flux et logiciels métier.",
   },
   {
     icon: Truck,
     title: "Logistique",
     description:
      "Gestion des transports, traçabilité et automatisation.",
   },
   {
     icon: ShoppingCart,
     title: "Commerce",
     description:
      "Solutions e-commerce et outils de gestion commerciale.",
   },
   {
     icon: Building2,
     title: "Services publics",
     description:
      "Portails web, gestion documentaire et services numériques.",
   },
];

  return (
    <section id="secteurs" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#3B0910]">
            Secteurs d'activité
          </h2>

          <p className="mt-4 text-gray-600">
            Nous accompagnons les entreprises de nombreux secteurs dans leur
            transformation digitale.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;

            return (
              <motion.div
                key={sector.title}
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
                  bg-white
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
                  {sector.title}
                </h3>

                <p className="text-gray-600">
                  {sector.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}