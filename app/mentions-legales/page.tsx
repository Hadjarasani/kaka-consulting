import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site KAKA CONSULTING, micro-entreprise spécialisée en services et conseil en informatique.",
};

export default function MentionsLegalesPage() {
  return (
    <>
    <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 py-2 text-[#701C2C]"
        >
            <ArrowLeft size={30} />
            
    </Link>

    <main className="bg-white text-gray-900">
      <section className="bg-[#4A0015] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
            Informations légales
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Mentions légales
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            Informations légales relatives au site internet de KAKA CONSULTING.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Éditeur du site */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              1. Éditeur du site
            </h2>

            <div className="mt-5 space-y-2 text-gray-700 leading-relaxed">
              <p>
                <strong>Nom commercial :</strong> KAKA CONSULTING
              </p>

              <p>
                <strong>Forme juridique :</strong> Micro-entreprise
              </p>

              <p>
                <strong>Nom et prénom de l&apos;entrepreneur :</strong>{" "}
                <span className="font-medium text-[#4A0015]">
                  SANI KAKA HADJARA
                </span>
              </p>

              <p>
                <strong>SIREN :</strong> 105352629
              </p>

              <p>
                <strong>SIRET :</strong> 10535262900015
              </p>

              <p>
                <strong>Code NAF :</strong> 6201Z
              </p>

              <p>
                <strong>Adresse :</strong> 9 Avenue de la Bolière, 45100
                Orléans, France
              </p>

              <p>
                <strong>Téléphone :</strong>{" "}
                <a
                  href="tel:+33641163021"
                  className="transition hover:text-[#4A0015]"
                >
                  +33 6 41 16 30 21
                </a>
              </p>

              <p>
                <strong>E-mail :</strong>{" "}
                <a
                  href="mailto:contact@kakaconsulting.fr"
                  className="transition hover:text-[#4A0015]"
                >
                  contact@kakaconsulting.fr
                </a>
              </p>
            </div>
          </div>

          {/* Directeur de la publication */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              2. Directeur de la publication
            </h2>

            <p className="mt-5 leading-relaxed text-gray-700">
              Le directeur de la publication est le représentant légal de
              KAKA CONSULTING.
            </p>
          </div>

          {/* Hébergement */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              3. Hébergement du site
            </h2>

            <div className="mt-5 space-y-2 text-gray-700 leading-relaxed">
              <p>
                Le site internet est hébergé par :
              </p>

              <p>
                <strong>Vercel Inc.</strong>
              </p>

              <p>
                Vercel fournit les services d&apos;hébergement et de
                déploiement de l&apos;application web.
              </p>

              <p>
                <strong>Site :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A0015] underline underline-offset-4"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </div>

          {/* Nom de domaine */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              4. Nom de domaine
            </h2>

            <div className="mt-5 space-y-2 text-gray-700 leading-relaxed">
              <p>
                Le nom de domaine{" "}
                <strong>kakaconsulting.fr</strong> est enregistré auprès de :
              </p>

              <p>
                <strong>OVHcloud</strong>
              </p>

              <p>
                <strong>Site :</strong>{" "}
                <a
                  href="https://www.ovhcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A0015] underline underline-offset-4"
                >
                  ovhcloud.com
                </a>
              </p>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              5. Propriété intellectuelle
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                L&apos;ensemble des éléments présents sur le site
                kakaconsulting.fr, notamment les textes, images, graphismes,
                logos, icônes, éléments visuels, interfaces, contenus et
                logiciels, est protégé par les dispositions applicables en
                matière de propriété intellectuelle.
              </p>

              <p>
                Sauf indication contraire, ces éléments sont la propriété de
                KAKA CONSULTING ou font l&apos;objet d&apos;une autorisation
                d&apos;utilisation.
              </p>

              <p>
                Toute reproduction, représentation, modification,
                distribution ou exploitation, totale ou partielle, des
                contenus du site sans autorisation préalable est susceptible
                de constituer une contrefaçon ou une atteinte aux droits
                applicables.
              </p>
            </div>
          </div>

          {/* Responsabilité */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              6. Responsabilité
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KAKA CONSULTING s&apos;efforce de fournir sur ce site des
                informations aussi précises et actualisées que possible.
              </p>

              <p>
                Toutefois, KAKA CONSULTING ne saurait garantir l&apos;exactitude,
                l&apos;exhaustivité ou l&apos;actualité de l&apos;ensemble des
                informations publiées sur le site.
              </p>

              <p>
                KAKA CONSULTING ne pourra être tenue responsable des dommages
                directs ou indirects résultant de l&apos;accès au site ou de
                son utilisation, dans les limites permises par la
                réglementation applicable.
              </p>
            </div>
          </div>

          {/* Liens externes */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              7. Liens externes
            </h2>

            <p className="mt-5 leading-relaxed text-gray-700">
              Le site peut contenir des liens vers des sites internet ou
              services externes. KAKA CONSULTING ne contrôle pas ces sites et
              ne peut être tenue responsable de leur contenu, de leur
              disponibilité ou de leurs pratiques.
            </p>
          </div>

          {/* Droit applicable */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              8. Droit applicable
            </h2>

            <p className="mt-5 leading-relaxed text-gray-700">
              Les présentes mentions légales sont soumises au droit français.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              9. Contact
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              Pour toute question concernant le site ou ses contenus, vous
              pouvez contacter KAKA CONSULTING :
            </p>

            <p className="mt-4">
              <a
                href="mailto:contact@kakaconsulting.fr"
                className="font-medium text-[#4A0015] underline underline-offset-4"
              >
                contact@kakaconsulting.fr
              </a>
            </p>
          </div>

          <p className="border-t border-gray-200 pt-8 text-sm text-gray-500">
            Dernière mise à jour : octobre 2026
          </p>
        </div>
      </section>
    </main>
    </>
  );
}