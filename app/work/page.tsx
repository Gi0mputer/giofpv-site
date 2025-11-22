// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";

export default function WorkPage() {
  return (
    <WorkGallery items={works} initialVisible={4} />
      </div >
    </main >
  );
}
