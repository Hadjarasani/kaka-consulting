import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-20 max-w-8xl items-center justify-between px-8">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#3B0910]">
          KAKA CONSULTING
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link href="/services" 
                className="text-[#3B0910] transition hover:text-[#701C2C]">
            Services
          </Link>

          <Link href="/secteurs"
                className="text-[#3B0910] transition hover:text-[#701C2C]">
            Secteurs d'activité
          </Link>

          <Link href="/nous-connaitre"
                className="text-[#3B0910] transition hover:text-[#701C2C]">
            Nous connaître
          </Link>

          <Link href="/contact"
                className="text-[#3B0910] transition hover:text-[#701C2C]">
            Contact
          </Link>

        </div>

        {/* Bouton */}
        <Link
          href="/devis"
          className="rounded-lg bg-[#701C2C] px-5 py-3 font-medium text-white transition hover:opacity-90"
        >
          Demander un devis
        </Link>

      </nav>
    </header>
  );
}