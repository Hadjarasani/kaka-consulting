import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  return (
    <>
         {/* zone blanche pour le lien de retour */}
            <div className="relative z-10 flex h-14 items-center bg-white px-4">
                <Link
                    href="/"
                    aria-label="Retour à l'accueil"
                    className="inline-flex items-center text-[#701C2C] transition-colors hover:text-[#3B0910]"
                >
                    <ArrowLeft size={30} />
                        
                </Link>
            </div>
          {/*section de prise de contact */}
    <main className="min-h-screen bg-[#4A0015] pt-24">
      <Contact />
    </main>
    <Footer />
    </>
  );
}