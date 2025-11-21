export type WorkItem = {
  title: string;
  duration: string;
  href: string;
  thumb: string;
  description: string;
  category: string;
  format?: "horizontal" | "vertical";
};

export const works: WorkItem[] = [
  {
    title: "Rafting line — fiume in piena",
    duration: "00:45",
    href: "https://youtube.com/shorts/lS8EY_OCPA0",
    thumb: "/portfolio/forest-river.png",
    description:
      "Il drone segue un gommone da rafting tra onde e rapide, alternando passaggi radenti sull’acqua e viste dall’alto per mostrare il contesto naturale.",
    category: "Sport & Outdoor",
    format: "vertical",
  },
  {
    title: "Winter SUP — nebbia sul lago",
    duration: "00:30",
    href: "https://youtube.com/shorts/666Jmlt0aLs",
    thumb: "/portfolio/mountain-sunset.png",
    description:
      "Progetto personale: un’unica linea FPV segue una tavola SUP tra foschia, riflessi sull’acqua e controluce morbidi, per raccontare la calma dell’inverno.",
    category: "Personal Projects",
    format: "vertical",
  },
  {
    title: "Dolomiti balcony — sunrise lines",
    duration: "00:50",
    href: "https://youtube.com/shorts/gsE6QtgsOQQ",
    thumb: "/portfolio/mountain-sunset.png",
    description:
      "Sorvoli dolci sulle creste all’alba, con passaggi vicino ai balconi e alle terrazze di un rifugio di montagna. Ideale per promozione turistica e storytelling emozionale.",
    category: "Tourism & Hospitality",
    format: "vertical",
  },
  {
    title: "Mountain Ridge — cinematic flow",
    duration: "00:40",
    href: "https://youtube.com/shorts/C83FnY5cRMU",
    thumb: "/portfolio/mountain-sunset.png",
    description:
      "Volo dinamico lungo le creste montuose, catturando la vastità del paesaggio e la luce drammatica dell'alta quota.",
    category: "Mountain & Outdoor",
    format: "vertical",
  },
  {
    title: "Verona rooftops — golden hour fly-through",
    duration: "01:35",
    href: "https://youtube.com/watch?v=VERONA_PLACEHOLDER",
    thumb: "/portfolio/city-night.png",
    description:
      "Sorvolo dei tetti di Verona al tramonto con passaggi ravvicinati tra campanili, cortili interni e scorci sul fiume. Ideale per raccontare la città in chiave cinematografica.",
    category: "City & Architecture",
    format: "horizontal",
  },
  {
    title: "Single track — trail running POV",
    duration: "02:10",
    href: "https://youtube.com/watch?v=TRAIL_PLACEHOLDER",
    thumb: "/portfolio/drift-car.png",
    description:
      "Sequenza FPV lungo un sentiero in cresta: il drone segue un runner a pochi metri di distanza, alternando dettagli sulle gambe e panorami aperti sulle montagne.",
    category: "Sport & Outdoor",
    format: "horizontal",
  },
  {
    title: "Lakeside retreat — hotel FPV tour",
    duration: "01:50",
    href: "https://youtube.com/watch?v=LAKESIDE_PLACEHOLDER",
    thumb: "/portfolio/forest-river.png",
    description:
      "Tour continuo che parte dal parcheggio, attraversa reception, lounge e spa, per uscire su giardino e pontile sul lago. Pensato per hotel e strutture ricettive.",
    category: "Tourism & Hospitality",
    format: "horizontal",
  },
  {
    title: "Loft industriale — fly-through a bassa quota",
    duration: "01:20",
    href: "https://youtube.com/watch?v=LOFT_PLACEHOLDER",
    thumb: "/portfolio/city-night.png",
    description:
      "Voli lenti e precisi all’interno di un loft ristrutturato: soggiorno, cucina, soppalco e dettagli materici. Perfetto per annunci premium e campagne di vendita.",
    category: "Real Estate",
    format: "horizontal",
  },
  {
    title: "City fly-through — coworking e rooftop",
    duration: "01:30",
    href: "https://youtube.com/watch?v=CITY_PLACEHOLDER",
    thumb: "/portfolio/city-night.png",
    description:
      "Ingresso dal portone, corridoi, open space e rooftop finale con vista sulla città. Perfetto per spazi di lavoro condivisi e brand urbani.",
    category: "City & Architecture",
    format: "horizontal",
  },
];
