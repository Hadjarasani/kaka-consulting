export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#701C2C] px-6 text-center text-white">
      <h1 className="mb-6 text-5xl font-bold">
        KAKA CONSULTING
      </h1>

      <p className="mb-10 max-w-2xl text-xl">
        Accélérez votre transformation digitale grâce à des solutions
        web, data et intelligence artificielle.
      </p>

      <div className="flex gap-4">
        <button className="rounded-lg bg-white px-6 py-3 font-semibold text-[#701C2C] transition hover:scale-105">
          Nos services
        </button>

        <button className="rounded-lg border border-white px-6 py-3 transition hover:bg-white hover:text-[#701C2C]">
          Nous contacter
        </button>
      </div>
    </section>
  );
}