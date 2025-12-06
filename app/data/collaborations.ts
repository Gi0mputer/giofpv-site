import { Building2, Mountain, Users, Calendar, Camera, LucideIcon } from "lucide-react";

export type Collaboration = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const collaborations: Collaboration[] = [
  {
    icon: Building2,
    title: "Hospitality & Real Estate",
    description: "Hotel, B&B e valorizzazione immobiliare con prospettive uniche."
  },
  {
    icon: Mountain,
    title: "Mountain & Outdoor",
    description: "Rifugi, impianti sciistici ed esperienze in alta quota."
  },
  {
    icon: Users,
    title: "Coworking & Corporate",
    description: "Spazi di lavoro, uffici creativi e storytelling aziendale."
  },
  {
    icon: Calendar,
    title: "Events & Sport",
    description: "Eventi sportivi, gare e manifestazioni all'aperto."
  },
  {
    icon: Camera,
    title: "Personal Projects",
    description: "Esplorazione creativa di paesaggi urbani e naturali."
  },
];
