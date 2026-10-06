import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#2b0010] text-white">

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-6 md:grid-cols-4">

        {/* Logo et description */}

        <div>
          <Image
            src="/images/kakaClogo.svg"
            alt="KAKA CONSULTING"
            width={120}
            height={40}
            priority
          />

          <p className="mt-6 text-sm leading-7 text-gray-300">
            Solutions web, data et intelligence artificielle pour accélérer
            votre transformation digitale.
          </p>
        </div>

        {/* Navigation */}

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Navigation
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li className="transition hover:translate-x-1 hover:text-white">
              <Link href="/">
                Accueil
              </Link>
            </li>

            <li className="transition hover:translate-x-1 hover:text-white">
              <Link href="/services">
                Services
              </Link>
            </li>

            <li className="transition hover:translate-x-1 hover:text-white">
              <Link href="/#secteurs">
                Secteurs d&apos;activité
              </Link>
            </li>

            <li className="transition hover:translate-x-1 hover:text-white">
              <Link href="/#apropos">
                Nous connaître
              </Link>
            </li>

            <li className="transition hover:translate-x-1 hover:text-white">
              <Link href="/contact">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Services */}

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Nos expertises
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Développement web</li>
            <li>Logiciels métier</li>
            <li>Data &amp; BI</li>
            <li>Intelligence artificielle</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Contact
          </h3>

          <div className="space-y-4 text-gray-300">

            {/* Email */}

            <a
              href="mailto:contact@kakaconsulting.fr"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={18} />
              <span>contact@kakaconsulting.fr</span>
            </a>

            {/* Téléphone */}

            <a
              href="tel:+33641163021"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={18} />
              <span>+33 6 41 16 30 21</span>
            </a>

            {/* Adresse */}

            <div className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>
                9 Avenue de la Bolière
                <br />
                45100 Orléans, France
              </span>
            </div>

            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/company/kaka-consulting/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <FaLinkedin size={20} />
              <span>LinkedIn</span>
            </a>

            {/* Instagram */}

            <a
              href="https://www.instagram.com/kakaconsulting?igsh=NXA5M2oybXd5NW5j&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>

          </div>
        </div>

      </div>

      {/* Bas du footer */}

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">

        <p>
          © {new Date().getFullYear()} KAKA CONSULTING — Tous droits réservés.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">

          <Link
            href="/mentions-legales"
            className="transition hover:text-white"
          >
            Mentions légales
          </Link>

          <span className="text-white/20">|</span>

          <Link
            href="/politique-confidentialite"
            className="transition hover:text-white"
          >
            Politique de confidentialité
          </Link>

        </div>

      </div>

    </footer>
  );
}