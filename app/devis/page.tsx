import QuoteForm from "@/components/sections/QuoteForm";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function DevisPage() {
  return (
    <>
        <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 py-2 text-[#701C2C]"
        >
          <ArrowLeft size={30} />
            
        </Link>
        <main>
            <QuoteForm />
        </main>
        <Footer/>
    </>
    
  );
}