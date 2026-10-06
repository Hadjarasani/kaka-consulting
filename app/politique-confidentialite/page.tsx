import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles de KAKA CONSULTING.",
};

export default function PolitiqueConfidentialitePage() {
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
            Protection des données
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Politique de confidentialité
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            KAKA CONSULTING accorde une importance particulière à la
            protection de vos données personnelles.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Responsable du traitement */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              1. Responsable du traitement
            </h2>

            <div className="mt-5 space-y-2 text-gray-700 leading-relaxed">
              <p>
                Le responsable du traitement des données personnelles
                collectées sur le site est :
              </p>

              <p>
                <strong>KAKA CONSULTING</strong>
              </p>

              <p>
                Micro-entreprise
              </p>

              <p>
                9 Avenue de la Bolière, 45100 Orléans, France
              </p>

              <p>
                SIREN : 105352629
              </p>

              <p>
                E-mail :{" "}
                <a
                  href="mailto:contact@kakaconsulting.fr"
                  className="text-[#4A0015] underline underline-offset-4"
                >
                  contact@kakaconsulting.fr
                </a>
              </p>

              <p>
                Téléphone :{" "}
                <a
                  href="tel:+33641163021"
                  className="text-[#4A0015] underline underline-offset-4"
                >
                  +33 6 41 16 30 21
                </a>
              </p>
            </div>
          </div>

          {/* Données collectées */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              2. Données personnelles collectées
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Dans le cadre des formulaires de contact et de demande de
                devis, KAKA CONSULTING peut collecter les données que vous
                choisissez de communiquer, notamment :
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>nom et prénom ;</li>
                <li>adresse e-mail ;</li>
                <li>nom de l&apos;entreprise ;</li>
                <li>numéro de téléphone ;</li>
                <li>type de projet ;</li>
                <li>budget indicatif ;</li>
                <li>délai ou échéance souhaitée ;</li>
                <li>contenu du message ou de la demande ;</li>
                <li>
                  données techniques nécessaires à la sécurité et au bon
                  fonctionnement du formulaire.
                </li>
              </ul>

              <p>
                Les informations demandées dans les formulaires sont utilisées
                uniquement lorsqu&apos;elles sont nécessaires au traitement de
                votre demande.
              </p>
            </div>
          </div>

          {/* Finalités */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              3. Finalités des traitements
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les données personnelles collectées sont susceptibles
                d&apos;être utilisées pour :
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>répondre aux demandes de contact ;</li>
                <li>
                  traiter et répondre aux demandes de devis ;
                </li>
                <li>
                  échanger avec les prospects et clients ;
                </li>
                <li>
                  assurer le suivi des demandes commerciales ;
                </li>
                <li>
                  protéger les formulaires contre les abus et les soumissions
                  automatisées.
                </li>
              </ul>
            </div>
          </div>

          {/* Base juridique */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              4. Base juridique
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les traitements réalisés dans le cadre des demandes de
                contact et de devis reposent principalement sur les mesures
                précontractuelles prises à la demande de la personne
                concernée, lorsque celles-ci sont nécessaires pour répondre à
                sa demande.
              </p>

              <p>
                Certains traitements peuvent également reposer sur
                l&apos;intérêt légitime de KAKA CONSULTING, notamment pour
                assurer la sécurité du site et prévenir les abus.
              </p>
            </div>
          </div>

          {/* Caractère obligatoire */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              5. Caractère obligatoire ou facultatif des données
            </h2>

            <p className="mt-5 leading-relaxed text-gray-700">
              Les informations indispensables au traitement d&apos;une demande
              sont signalées comme obligatoires dans les formulaires concernés.
              Si ces informations ne sont pas fournies, KAKA CONSULTING peut
              ne pas être en mesure de répondre à la demande ou de la traiter
              correctement.
            </p>
          </div>

          {/* Destinataires */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              6. Destinataires des données
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les données collectées sont destinées à KAKA CONSULTING et,
                lorsque cela est nécessaire au fonctionnement du site ou au
                traitement des demandes, aux prestataires techniques utilisés
                par KAKA CONSULTING.
              </p>

              <p>Les principaux services utilisés sont :</p>

              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Supabase</strong> : stockage des données et services
                  d&apos;authentification utilisés par l&apos;application ;
                </li>

                <li>
                  <strong>Resend</strong> : transmission et envoi des
                  e-mails liés aux demandes ;
                </li>

                <li>
                  <strong>Google reCAPTCHA v3</strong> : protection des
                  formulaires contre les abus et les soumissions automatisées ;
                </li>

                <li>
                  <strong>Vercel</strong> : hébergement et déploiement du
                  site internet.
                </li>
              </ul>
            </div>
          </div>

          {/* Transferts */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              7. Transferts de données
            </h2>

            <p className="mt-5 leading-relaxed text-gray-700">
              Certains prestataires techniques utilisés par KAKA CONSULTING
              peuvent traiter des données depuis des pays situés en dehors de
              l&apos;Espace économique européen. Lorsque cela est applicable,
              ces transferts sont encadrés conformément aux exigences du
              Règlement général sur la protection des données (RGPD), notamment
              au moyen des mécanismes juridiques appropriés.
            </p>
          </div>

          {/* Conservation */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              8. Durée de conservation
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les données transmises dans le cadre des demandes de contact et
                de devis sont conservées pendant une durée maximale de{" "}
                <strong>2 ans</strong> à compter du dernier contact, sauf
                obligation légale imposant une durée de conservation
                différente.
              </p>

              <p>
                Certaines données peuvent être conservées plus longtemps
                lorsqu&apos;une obligation légale ou réglementaire l&apos;exige,
                notamment dans le cadre de la gestion administrative et
                comptable de l&apos;entreprise.
              </p>
            </div>
          </div>

          {/* Sécurité */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              9. Sécurité des données
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KAKA CONSULTING met en œuvre des mesures techniques et
                organisationnelles appropriées afin de protéger les données
                personnelles contre les accès non autorisés, la perte,
                l&apos;altération ou la divulgation.
              </p>

              <p>
                Les accès aux données sont limités aux personnes et services
                qui en ont besoin dans le cadre de leurs fonctions ou de leurs
                prestations.
              </p>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              10. Protection des formulaires avec Google reCAPTCHA
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Le site utilise Google reCAPTCHA v3 afin de protéger les
                formulaires contre les abus, les soumissions automatisées et
                les comportements malveillants.
              </p>

              <p>
                Ce service peut collecter certaines informations techniques
                nécessaires à la détection des comportements automatisés et à
                l&apos;évaluation du risque.
              </p>

              <p>
                L&apos;utilisation de Google reCAPTCHA est soumise aux
                conditions et règles de confidentialité de Google.
              </p>
            </div>
          </div>

          {/* Tracking */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              11. Cookies et outils de suivi
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KAKA CONSULTING n&apos;utilise pas, à ce jour, de solution
                d&apos;analyse d&apos;audience ou de suivi publicitaire telle
                que Google Analytics, Meta Pixel ou un outil similaire.
              </p>

              <p>
                Le site utilise toutefois Google reCAPTCHA v3 pour assurer la
                sécurité des formulaires. Ce service peut nécessiter
                l&apos;utilisation de technologies de stockage ou de collecte
                d&apos;informations par Google dans le cadre de son
                fonctionnement.
              </p>
            </div>
          </div>

          {/* Droits */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              12. Vos droits
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Conformément à la réglementation applicable en matière de
                protection des données personnelles, vous disposez notamment,
                selon les conditions prévues par le RGPD, des droits suivants :
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>droit d&apos;accès à vos données ;</li>
                <li>droit de rectification de vos données ;</li>
                <li>
                  droit à l&apos;effacement de vos données dans les conditions
                  prévues par la réglementation ;
                </li>
                <li>
                  droit à la limitation du traitement ;
                </li>
                <li>
                  droit d&apos;opposition à certains traitements ;
                </li>
                <li>
                  droit à la portabilité de vos données lorsque ce droit est
                  applicable.
                </li>
              </ul>

              <p>
                Pour exercer vos droits ou pour toute question concernant le
                traitement de vos données personnelles, vous pouvez contacter
                KAKA CONSULTING à l&apos;adresse suivante :
              </p>

              <p>
                <a
                  href="mailto:contact@kakaconsulting.fr"
                  className="font-medium text-[#4A0015] underline underline-offset-4"
                >
                  contact@kakaconsulting.fr
                </a>
              </p>
            </div>
          </div>

          {/* Réclamation CNIL */}
          <div>
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              13. Réclamation auprès de la CNIL
            </h2>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Si vous estimez, après avoir contacté KAKA CONSULTING, que vos
                droits ne sont pas respectés, vous pouvez introduire une
                réclamation auprès de la Commission Nationale de
                l&apos;Informatique et des Libertés (CNIL).
              </p>

              <p>
                <strong>CNIL</strong>
              </p>

              <p>
                3 Place de Fontenoy – TSA 80715
                <br />
                75334 Paris Cedex 07
                <br />
                France
              </p>

              <p>
                Site internet :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A0015] underline underline-offset-4"
                >
                  cnil.fr
                </a>
              </p>
            </div>
          </div>

          {/* Mise à jour */}
          <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#4A0015]">
              14. Mise à jour de la politique
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              KAKA CONSULTING peut être amenée à modifier la présente
              politique de confidentialité afin de tenir compte de
              l&apos;évolution de ses services, de ses pratiques ou de la
              réglementation applicable.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Dernière mise à jour : octobre 2026
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}