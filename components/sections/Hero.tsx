import Link from "next/link";

export default function Hero() {
  return (
    <section className=" relative flex min-h-screen flex-col items-center justify-center border-t border-white/10 bg-[#2b0010] px-6 text-center text-white">

      {/* Motif de K en arrière-plan */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/KAKACONSULTINGLogo.svg')",
          backgroundSize: "135px 135px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.08em] text-white">
        KAKA CONSULTING
      </h1>

      <p className="mb-10 max-w-2xl px-6 text-base md:mb-10 max-w-2xl mt-4 text-xl">
        Accélérez votre transformation digitale grâce à des solutions
        web, data et intelligence artificielle.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link 
        href="/services"
        className="rounded-lg bg-white px-6 py-3 font-semibold text-[#701C2C] transition hover:scale-105">
          Nos services
        </Link>

        <Link
          href="/contact"
          className="rounded-lg border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-[#701C2C]">
          Nous contacter
        </Link>
      </div>
    </section>
  );
}