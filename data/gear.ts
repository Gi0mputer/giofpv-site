export type GearItem = {
  title: string;
  description: string;
  image: string;
};

export const gear: GearItem[] = [
  {
    title: "DJI Mini 5 Pro",
    description:
      "Drone compatto e leggero, perfetto per riprese pulite e stabili sopra città, lago e montagne. Registra fino a 4K 60fps, con sensore capace di gestire bene tramonti e scene ad alto contrasto. Ideale per establishing shot di città e paesaggi, riprese di strutture ricettive e immobili, contenuti verticali per social.",
    image: "/gear/mini5pro.svg",
  },
  {
    title: "DJI Avata 2 — FPV cinewhoop",
    description:
      "Il drone FPV principale per linee dinamiche e immersive. Grazie al frame protetto può volare vicino a persone, muri e oggetti mantenendo un buon margine di sicurezza. Registra in 4K 60fps con stabilizzazione digitale, ideale per inseguimenti di sport outdoor, fly-through all’interno di spazi architettonici, passaggi stretti tra corridoi e scale.",
    image: "/gear/avata2.svg",
  },
  {
    title: "Workflow e supporto in post",
    description:
      "Oltre ai droni, ogni progetto include ND filter per controllare lo shutter e ottenere motion blur naturale, profili colore log per un grading coerente con il resto del girato, consegna file ottimizzata per editing in DaVinci Resolve, Premiere o Final Cut. Riprese già pronte per essere integrate nel montaggio, senza sorprese in color grading.",
    image: "/gear/workflow.svg",
  },
];
