// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <section className="space-y-6 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">GioFPV</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Elevate your story with captivating cinematic drone footage.
        </h1>
        <p className="text-lg text-neutral-300 sm:max-w-3xl">
          Gallery di lavori FPV: automotive, hospitality, turismo e sport. Ogni clip è girata
          con droni diversi per ottenere prospettive ravvicinate, fluide e sicure.
        </p>
      </section>

      <WorkGallery items={works} />
    </main>
  );
}
