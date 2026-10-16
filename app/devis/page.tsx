import QuoteForm from "@/components/sections/QuoteForm";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function DevisPage() {
  return (
    <>
        <div className="relative z-10 flex h-14 items-center bg-white px-4">
                <Link
                    href="/"
                    aria-label="Retour à l'accueil"
                    className="inline-flex items-center text-[#701C2C] transition-colors hover:text-[#3B0910]"
                >
                    <ArrowLeft size={30} />
                        
                </Link>
        </div>
        <main>
            <QuoteForm />
        </main>
        <Footer/>
    </>
    
  );
}