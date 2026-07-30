"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const strengths = [
  "Développement web et logiciel",
  "Data & Business Intelligence",
  "Intelligence artificielle",
  "Conseil et transformation numérique",
];

export default function About() {
  return (
    <section id="apropos" className="bg-[#F8F4F5] py-24 px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-semibold uppercase tracking-widest text-[#701C2C]">
            Qui sommes-nous ?
          </p>

          <h2 className="mb-6 text-4xl font-bold text-[#3B0910]">
            Votre partenaire pour la transformation digitale
          </h2>

          <p className="mb-6 text-lg leading-8 text-gray-600">
            KAKA CONSULTING est une entreprise spécialisée dans les services
            et le conseil informatique. Nous accompagnons les organisations
            dans leur transformation digitale grâce au développement web,
            aux solutions logicielles, à la data et à l'intelligence
            artificielle.
          </p>

          <p className="mb-8 text-lg leading-8 text-gray-600">
            Notre mission est d'aider les entreprises à optimiser leurs
            processus, valoriser leurs données et accélérer leur croissance
            grâce aux technologies numériques.
          </p>

          <Link
            href="#services"
            className="inline-block rounded-xl bg-[#701C2C] px-6 py-3 font-medium text-white transition duration-300 hover:scale-105"
          >
            Découvrir nos services
          </Link>
        </motion.div>

        {/* Points forts */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white p-10 shadow-xl"
        >
          <h3 className="mb-8 text-2xl font-bold text-[#3B0910]">
            Nos expertises
          </h3>

          <div className="space-y-6">
            {strengths.map((strength) => (
              <div key={strength} className="flex items-center gap-4">
                <CheckCircle
                  size={28}
                  className="text-[#701C2C]"
                />

                <span className="text-lg text-gray-700">
                  {strength}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}