export type WorkItem = {
  title: string;
  duration: string;
  href: string;
  description: string;
  category: string;
  format?: "horizontal" | "vertical";
};

export const works: WorkItem[] = [
  // CITTÀ
  {
    title: "Verona rooftops — golden hour",
    duration: "01:35",
    href: "https://www.youtube.com/watch?v=GHFcHXJUGuY",
    description:
      "Sorvolo dei tetti di Verona al tramonto con passaggi ravvicinati tra campanili, cortili interni e scorci sul fiume.",
    category: "Città",
    format: "horizontal",
  },
  {
    title: "City fly-through — coworking e rooftop",
    duration: "01:30",
    href: "https://www.youtube.com/watch?v=NcBjx_eyvxc",
    description:
      "Ingresso dal portone, corridoi, open space e rooftop finale con vista sulla città.",
    category: "Città",
    format: "horizontal",
  },

  // EVENTI
  {
    title: "Rafting line — fiume in piena",
    duration: "00:45",
    href: "https://www.youtube.com/shorts/Ks3F5A2O9tM",
    description:
      "Il drone segue un gommone da rafting tra onde e rapide, alternando passaggi radenti sull'acqua e viste dall'alto.",
    category: "Eventi",
    format: "vertical",
  },

  // SPORT
  {
    title: "Single track — trail running POV",
    duration: "02:10",
    href: "https://www.youtube.com/watch?v=fZuiuAQt2DE",
    description:
      "Sequenza FPV lungo un sentiero in cresta: il drone segue un runner a pochi metri di distanza.",
    category: "Sport",
    format: "horizontal",
  },
  {
    title: "Winter SUP — nebbia sul lago",
    duration: "00:30",
    href: "https://www.youtube.com/shorts/wFfYwtqJEaY",
    description:
      "Un'unica linea FPV segue una tavola SUP tra foschia, riflessi sull'acqua e controluce morbidi.",
    category: "Sport",
    format: "vertical",
  },

  // ADRENALINA & NATURA
  {
    title: "Dolomiti balcony — sunrise lines",
    duration: "00:50",
    href: "https://www.youtube.com/shorts/b70-_6EgXZw",
    description:
      "Sorvoli dolci sulle creste all'alba, con passaggi vicino ai balconi e alle terrazze di un rifugio di montagna.",
    category: "Adrenalina & Natura",
    format: "vertical",
  },
  {
    title: "Mountain Ridge — cinematic flow",
    duration: "00:40",
    href: "https://www.youtube.com/shorts/C83FnY5cRMU",
    description:
      "Volo dinamico lungo le creste montuose, catturando la vastità del paesaggio e la luce drammatica dell'alta quota.",
    category: "Adrenalina & Natura",
    format: "vertical",
  },
];
