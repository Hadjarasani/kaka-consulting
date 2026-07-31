"use client";

import { useState } from "react";
import { Mail, Building2, User, FileText } from "lucide-react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      setLoading(true);
      setSuccess(false);
      setError(false);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur");
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
};
  return (
    <section id="contact" className="bg-[#4A0015] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest text-white">
            Contact
          </p>

          <h2 className="text-4xl font-bold text-white">
            Parlons de votre projet
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Vous avez un projet de site web, une application, un besoin en
            data ou en intelligence artificielle ? Contactez KAKA CONSULTING.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <User size={18} />
                  Nom complet
                </label>

                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <Mail size={18} />
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="contact@entreprise.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <Building2 size={18} />
                Entreprise
              </label>

              <input
                type="text"
                placeholder="Nom de votre entreprise"
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <FileText size={18} />
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Décrivez votre projet..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#701C2C] px-6 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02]"
            >
              {loading ? "Envoi en cours..." : "Demander un devis"}
            </button>

            {success && (
                <p className="mt-4 text-center text-green-600">
                 ✅ Votre demande a été envoyée avec succès !
                </p>
            )}

            {error && (
                <p className="mt-4 text-center text-red-600">
                ❌ Une erreur est survenue. Veuillez réessayer.
                </p>
            )}

          </form>

        </div>
      </div>
    </section>
  );
}