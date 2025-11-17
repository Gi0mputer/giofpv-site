// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <section className="space-y-6 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Riprese FPV &amp; aeree per brand, turismo e sport.
        </h1>
        <p className="text-lg text-neutral-300 sm:max-w-3xl">
          Gallery di lavori e progetti personali girati tra città, natura e location outdoor. Ogni
          clip è pensata per raccontare uno spazio o un’azione da un punto di vista immersivo, con
          voli stabili e dinamici.
        </p>
      </section>

      <WorkGallery items={works} />
    </main>
  );
}
