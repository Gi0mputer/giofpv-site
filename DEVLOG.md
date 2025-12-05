# Dev Log

## Stato attuale
- Icone rigenerate via `scripts/generate-icons.mjs` usando `assets/G-mask.png` (G) e `assets/drone-mask.png` (drone ciano) con palette unica in `theme/colors.json`. Gradiente G: ambra → ciano → viola (bottom-right → top-left).
- Favicon generate in `public/`: `icon-512x512.png`, `favicon-192x192.png`, `apple-touch-icon.png`, `favicon-48x48.png`, `favicon-32x32.png`. Rimossa `public/icon.png` legacy; header/about ora usano `/favicon-48x48.png`.
- `app/layout.tsx` descrizione accorciata; metadata `icons` puntano ai PNG generati. `globals.css` aggiorna `--gradient-logo` coerente con la palette.
- About page: logo cerchio ora usa la nuova icona; scroll behavior regolato con offset dinamici.

## Note e accortezze
- Evitare di reintrodurre `/icon.png`: generare/servire solo le favicon create dallo script. Se servono altre dimensioni, aggiungerle allo script.
- Palette di verità: `theme/colors.json` (usata dallo script); tenere sincronizzate eventuali variabili CSS se cambiano i colori.
- Maschere: `assets/icon-base.png`, `assets/G-mask.png`, `assets/drone-mask.png`. Sono usate con resize nello script; preferibile mantenere versioni 512x512 senza padding per qualità migliore.
- Google snippet: descrizione globale più corta; per sitelink (About/Gear) valutare descrizioni per-pagina più brevi se necessario.

## Prossimi passi suggeriti
- Aggiungere per-pagina metadata/description compatti (About, Gear) per sitelink Google.
- Eventuale logo SVG animato in-page (gradiente che scorre lungo la G) se forniamo path vettoriale della G.
- Valutare manifest PWA (`site.webmanifest`) che punti alle icone generate.
