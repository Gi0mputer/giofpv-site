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
      "Dotato di un sensore CMOS da 1″ con 50 MP, è il primo a portare questa qualità su un drone leggero. La camera può filmare in posizione verticale, mantenendo la piena risoluzione anche per reel e contenuti social. Il gimbal aggiornato introduce un nuovo asse di rotazione che permette riprese ruotate e d'effetto, non realizzabili con modelli precedenti.",
    image: "/gear/mini3pro.png",
    links: {
      mobile: "https://www.youtube.com/shorts/tuLYOFB4MfI",
      desktop: "https://www.youtube.com/watch?v=jRzpagPx6uY",
    },
  },
  {
    title: "DJI Avata 2",
    description:
      "Il più recente drone FPV prodotto da DJI. La manovrabilità FPV consente traiettorie di volo immersive e adrenaliniche, passaggi precisi, inseguimenti e prospettive impossibili da ottenere con un drone tradizionale. Grazie al frame protetto può volare vicino a oggetti e superfici in maggiore sicurezza. La camera stabilizzata digitalmente registra in 4K a 100 fps, permettendo riprese di alta qualità che mantengono definizione anche dopo un crop verticale per contenuti social.",
    image: "/gear/avata2.png",
    links: {
      mobile: "https://www.youtube.com/shorts/DjmqnwXcRaM",
      desktop: "https://www.youtube.com/watch?v=RNhmV4yCP6M",
    },
  },
];
