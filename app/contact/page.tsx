import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  return (
    <>
    <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 py-2 text-[#701C2C]"
        >
          <ArrowLeft size={30} />
            
    </Link>
    <main className="min-h-screen bg-[#4A0015] pt-24">
      <Contact />
    </main>
    <Footer />
    </>
  );
}