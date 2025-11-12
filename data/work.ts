// data/work.ts
export type WorkItem = {
  title: string;
  duration: string;
  href: string;
  thumb: string;
};

export const works: WorkItem[] = [
  {
    title: "Showreel 2025",
    duration: "02:12",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumb: "https://images.unsplash.com/photo-1546706887-427333c8b0b4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Canyon Run – Long Range",
    duration: "01:47",
    href: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Motorsport FPV – Track Day",
    duration: "00:59",
    href: "https://vimeo.com/137857207",
    thumb: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Tourism Aerial – Lake Sunrise",
    duration: "01:23",
    href: "https://vimeo.com/90509568",
    thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
  },
];
