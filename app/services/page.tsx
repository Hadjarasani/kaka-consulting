import Services from "@/components/sections/Services";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
    return (
        <>
            {/* zone blanche pour le lien de retour */}
            <div className="bg-white px-4 py-2">
                <Link
                    href="/"
                    aria-label="Retour à l'accueil"
                    className="inline-flex items-center text-[#701C2C] transition-colors hover:text-[#3B0910]"
                >
                    <ArrowLeft size={30} />
                        
                </Link>
            </div>
            <main className="min-h-screen bg-[#4A0015] pt-24">
                <Services />
            </main>
            <Footer />
        </>
    )
}