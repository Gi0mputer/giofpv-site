export type GearItem = {
  title: string;
  description: string;
  image: string;
};

export const gear: GearItem[] = [
  {
    title: "Sub-250g 2.5\"",
    description:
      "Perfetto per indoor, boutique e riprese vicino alle persone. GoPro 'naked' stabilizzata, rumore minimo e sicurezza massima.",
    image: "/gear/nano.svg",
  },
  {
    title: "5-7\" FPV con GoPro 12/13",
    description:
      "Drone agilissimo per inseguire atleti, auto o biker a oltre 150 km/h. Ideale per spot sportivi e landscape dinamici.",
    image: "/gear/freestyle.svg",
  },
  {
    title: "DJI Mavic 3 / 4 Pro",
    description:
      "Setup leggero e rapidissimo da avviare con camera 5-6K 10-bit, sensore 4/3 e profili log per matching colore sul set.",
    image: "/gear/mavic.svg",
  },
  {
    title: "Cine-lifter fino a 2 kg",
    description:
      "Piattaforma per RED Komodo e Sony FX6, propulsione ad alto carico e vibrazioni controllate. 4K120 e look cinema.",
    image: "/gear/cinelift.svg",
  },
  {
    title: "Inspire 3 kit completo",
    description:
      "Stabilizzazione 3 assi con ottiche dedicate, 8K CinemaDNG/ProRes, RTK e team di due operatori per movimenti complessi.",
    image: "/gear/inspire.svg",
  },
];
