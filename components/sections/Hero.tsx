import Link
 from "next/link";
export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center border-t border-white/10 bg-[#2b0010] px-6 text-center text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-white">
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
          className="rounded-lg border border-white px-6 py-3 transition hover:bg-white hover:text-[#701C2C]">
          Nous contacter
        </Link>
      </div>
    </section>
  );
}