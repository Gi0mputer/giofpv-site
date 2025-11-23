export type GearItem = {
  title: string;
  description: string;
  image: string;
  links: {
    mobile: string;
    desktop: string;
  };
};

export const gear: GearItem[] = [
  {
    title: "DJI Mini 5 Pro",
    description:
      "Gimbal stabilizzato per riprese cinematografiche, sensore ad alta gamma dinamica per gestire luci complesse. Perfetto per video verticali social senza perdita di qualità.",
    image: "/gear/mini3pro.png",
    links: {
      mobile: "https://www.youtube.com/shorts/tuLYOFB4MfI",
      desktop: "https://www.youtube.com/watch?v=jRzpagPx6uY",
    },
  },
  {
    title: "DJI Avata 2 — FPV cinewhoop",
    description:
      "Voli immersivi ed emozionanti con la sicurezza del frame protetto. Sensore di qualità che permette crop verticali per social mantenendo un look dinamico e coinvolgente.",
    image: "/gear/avata2.png",
    links: {
      mobile: "https://www.youtube.com/shorts/DjmqnwXcRaM",
      desktop: "https://www.youtube.com/watch?v=RNhmV4yCP6M",
    },
  },
];
