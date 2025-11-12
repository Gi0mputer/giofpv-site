// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/work";

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            GIO<span className="text-sky-400">FPV</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#work" className="hover:text-sky-300">Work</a>
            <a href="#services" className="hover:text-sky-300">Servizi</a>
            <a href="#about" className="hover:text-sky-300">About</a>
            <a href="#contact" className="hover:text-sky-300">Contatti</a>
          </nav>
          <a href="#contact" className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium hover:bg-sky-400 transition">
            Prenota una ripresa
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Cinematic <span className="text-sky-400">FPV</span> & Aerial
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-300">
            Riprese dinamiche e precise per brand, sport, turismo e film. Operazioni EASA/assicurate, in tutta Italia ed EU.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#work" className="rounded-2xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition">
              Guarda i lavori
            </a>
            <a href="#contact" className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium hover:bg-sky-400 transition">
              Richiedi un preventivo
            </a>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Selected work</h2>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white">
            Cerchi uno stile specifico? Parliamone →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <a
              key={i}
              href={w.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-lg ring-1 ring-white/10"
            >
              {/* usare next/image per performance */}
              <div className="relative h-56 w-full">
                <Image
                  fill
                  alt={w.title}
                  src={w.thumb}
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <div className="inline-flex items-center gap-2 text-sm text-neutral-300">
                  <span>▶</span> {w.duration}
                </div>
                <h3 className="mt-1 text-lg font-medium">{w.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-neutral-900/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Servizi</h2>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Dall’idea alla consegna: sopralluogo, permessi, valutazione rischi, operazioni assicurate, consegna log/RAW su richiesta.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-medium">Cinematic FPV</h3>
              <p className="mt-2 text-sm text-neutral-300">Indoor chase, automotive, sport, reveal con footage stabilizzato.</p>
              <ul className="mt-4 list-disc pl-5 text-sm text-neutral-300 space-y-1">
                <li>3–7 inch FPV fleet</li>
                <li>GoPro + ND + Reelsteady</li>
                <li>Dual-op su richiesta</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-medium">Long-range</h3>
              <p className="mt-2 text-sm text-neutral-300">Linee in montagna, canyon e coste con ridondanza e GNSS.</p>
              <ul className="mt-4 list-disc pl-5 text-sm text-neutral-300 space-y-1">
                <li>Sub-250 a 8” platforms</li>
                <li>ELRS / Crossfire / DJI RC</li>
                <li>Insurance + spotter</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-medium">Aerial per brand</h3>
              <p className="mt-2 text-sm text-neutral-300">Turismo, real estate, hospitality, eventi. ProRes / DNx / H.265.</p>
              <ul className="mt-4 list-disc pl-5 text-sm text-neutral-300 space-y-1">
                <li>Supporto storyboard</li>
                <li>Musiche licenziate</li>
                <li>Pipeline color grading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Chi sono</h2>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Sono Giovanni Fantoni, pilota FPV a Verona. Lavoro con brand, agenzie e registi per scene dinamiche e precise,
            con attenzione alla sicurezza e alla post-produzione. Amo long-range in montagna e linee creative indoor.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Contatti</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-neutral-300">Phone / WhatsApp</div>
              <a className="mt-2 block hover:text-white text-sm" href="tel:+393000000000">+39 300 000 0000</a>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-neutral-300">Email</div>
              <a className="mt-2 block hover:text-white text-sm" href="mailto:hello@giofpv.com">hello@giofpv.com</a>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-neutral-300">Base</div>
              <p className="mt-2 text-sm text-neutral-300">Verona, Italy — disponibile in tutta Italia / EU</p>
            </div>
          </div>
          {/* mailto fallback: sostituire con serverless form più avanti */}
          <form action="mailto:hello@giofpv.com" method="post" encType="text/plain" className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input required placeholder="Nome" className="rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-sky-500" />
            <input required type="email" placeholder="Email" className="rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-sky-500" />
            <input placeholder="Telefono" className="rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-sky-500 md:col-span-2" />
            <textarea required placeholder="Scrivi il tuo progetto..." rows={5} className="rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-sky-500 md:col-span-2" />
            <button type="submit" className="rounded-2xl bg-sky-500 px-5 py-3 font-medium hover:bg-sky-400 md:col-span-2">
              Invia richiesta
            </button>
          </form>
          <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-neutral-400">
            © {new Date().getFullYear()} GIOFPV — P.IVA 00000000000
          </footer>
        </div>
      </section>
    </main>
  );
}

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
