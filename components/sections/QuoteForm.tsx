"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  User,
  Mail,
  Building2,
  Phone,
  Briefcase,
  Wallet,
  CalendarDays,
  FileText,
} from "lucide-react";

export default function QuoteForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !company.trim() ||
      !projectType ||
      !message.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    if (message.trim().length < 20) {
      setError(
        "La description du projet doit contenir au moins 20 caractères."
      );
      setLoading(false);
      return;
    }
    if (!executeRecaptcha) {
        setError(
            "La protection anti-spam n'est pas encore prête. Veuillez réessayer."
        );
        setLoading(false);
        return;
    }
    const recaptchaToken = await executeRecaptcha("quote");

    try {
      // Notre API sera créée à l'étape suivante.
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          projectType,
          budget,
          deadline,
          message,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi.");
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setProjectType("");
      setBudget("");
      setDeadline("");
      setMessage("");
    } catch {
      setError(
        "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#4A0015] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Introduction */}

        <div className="mb-14 text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest">
            Demander un devis
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Construisons votre projet ensemble
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-gray-300">
            Décrivez-nous votre besoin afin que nous puissions
            mieux comprendre votre projet et préparer notre
            premier échange.
          </p>
        </div>

        {/* Formulaire */}

        <div className="rounded-3xl bg-white p-8 text-gray-900 shadow-2xl md:p-12">

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            {/* Informations */}

            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#701C2C]">
                01 — Vos coordonnées
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                {/* Nom */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <User size={18} />
                    Nom complet *
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Mail size={18} />
                    E-mail professionnel *
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                  />
                </div>

                {/* Entreprise */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Building2 size={18} />
                    Entreprise *
                  </label>

                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nom de votre entreprise"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                  />
                </div>

                {/* Téléphone */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Phone size={18} />
                    Téléphone
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
                  />
                </div>

              </div>
            </div>

            {/* Projet */}

            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#701C2C]">
                02 — Votre projet
              </h2>

              <div className="space-y-6">

                {/* Type */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Briefcase size={18} />
                    Type de projet *
                  </label>

                  <select
                    value={projectType}
                    onChange={(e) =>
                      setProjectType(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-[#701C2C]"
                  >
                    <option value="">
                      Sélectionnez un type de projet
                    </option>

                    <option value="Site web">
                      Site web
                    </option>

                    <option value="Application / logiciel">
                      Application / logiciel
                    </option>

                    <option value="Data & Business Intelligence">
                      Data & Business Intelligence
                    </option>

                    <option value="Intelligence artificielle">
                      Intelligence artificielle
                    </option>

                    <option value="Automatisation">
                      Automatisation
                    </option>

                    <option value="Autre">
                      Autre
                    </option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  {/* Budget */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 font-medium">
                      <Wallet size={18} />
                      Budget estimatif
                    </label>

                    <select
                      value={budget}
                      onChange={(e) =>
                        setBudget(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-[#701C2C]"
                    >
                      <option value="">
                        Sélectionnez une estimation
                      </option>

                      <option value="Moins de 5 000 €">
                        Moins de 5 000 €
                      </option>

                      <option value="5 000 - 10 000 €">
                        5 000 – 10 000 €
                      </option>

                      <option value="10 000 - 25 000 €">
                        10 000 – 25 000 €
                      </option>

                      <option value="Plus de 25 000 €">
                        Plus de 25 000 €
                      </option>

                      <option value="Je ne sais pas encore">
                        Je ne sais pas encore
                      </option>
                    </select>
                  </div>

                  {/* Délai */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 font-medium">
                      <CalendarDays size={18} />
                      Délai souhaité
                    </label>

                    <select
                      value={deadline}
                      onChange={(e) =>
                        setDeadline(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-[#701C2C]"
                    >
                      <option value="">
                        Sélectionnez un délai
                      </option>

                      <option value="Urgent">
                        Urgent
                      </option>

                      <option value="1 à 3 mois">
                        1 à 3 mois
                      </option>

                      <option value="3 à 6 mois">
                        3 à 6 mois
                      </option>

                      <option value="Plus de 6 mois">
                        Plus de 6 mois
                      </option>

                      <option value="À définir">
                        À définir
                      </option>
                    </select>
                  </div>

                </div>

              </div>
            </div>

            {/* Description */}

            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#701C2C]">
                03 — Votre besoin
              </h2>

              <label className="mb-2 flex items-center gap-2 font-medium">
                <FileText size={18} />
                Décrivez votre projet *
              </label>

              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez votre projet, vos objectifs et vos besoins..."
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#701C2C]"
              />
            </div>

            {/* Messages */}

            {error && (
              <p className="rounded-xl bg-red-50 p-4 text-center text-red-600">
                ❌ {error}
              </p>
            )}

            {success && (
              <div className="rounded-xl bg-green-50 p-4 text-center text-green-700">
                ✅ Votre demande de devis a bien été envoyée.
              </div>
            )}

            {/* Bouton */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#701C2C] px-6 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Envoi en cours..."
                : "Envoyer ma demande de devis"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Les informations transmises sont utilisées uniquement
              pour répondre à votre demande.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}