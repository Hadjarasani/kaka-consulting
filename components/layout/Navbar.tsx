"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const navLinks = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Secteurs d'activité",
    href: "/secteurs",
  },
  {
    label: "Nous connaître",
    href: "/nous-connaitre",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-24 max-w-8xl items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/kakaClogo.svg"
            alt="KAKA CONSULTING"
            width={120}
            height={120}
            priority
          />
        </Link>

        {/* Liens */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-[#3B0910] transition duration-300 hover:text-[#701C2C]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bouton */}
        <Link
          href="/devis"
          className="hidden lg:block rounded-xl bg-[#701C2C] px-6 py-3 font-medium text-white shadow-sm transition duration-300 hover:scale-105"
        >
          Demander un devis
        </Link>
        <button 
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        >
        {isOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </nav>
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col gap-6 p-6">
            <Link 
            href="/services"
            onClick={() => setIsOpen(false)}
            >
            Services 
            </Link>

            <Link 
            href="/secteurs"
            onClick={() => setIsOpen(false)}
            >
            Secteurs d'activité
            </Link>

            <Link 
            href="/nous-connaitre"
            onClick={() => setIsOpen(false)}
            >
            Nous connaître
            </Link>

            <Link 
            href="/contact"
            onClick={() => setIsOpen(false)}
            >
            Contact 
            </Link>


            <Link 
            href="/devis"
            className="rounded-xl bg-[#701C2C] px-4 py-3 text-center text-white"
            onClick={() => setIsOpen(false)}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}