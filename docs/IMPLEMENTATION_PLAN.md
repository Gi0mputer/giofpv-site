# Piani di Implementazione - Nuove Funzionalità

Questo documento traccia lo stato di avanzamento delle nuove funzionalità richieste in `NEXT_IDEAS.md`.

## 📦 Roadmap

### ✅ Fase 1: Visual Polish (Titoli & Sfondi Animati)
**Branch:** `feat/visual-animations`
**Stato:** ✅ Done
- [x] **Animazione Titoli "Liquid"**:
    - Animare gradiente `FPV` (Header).
    - Animare gradiente `Aerial & FPV` (About).
    - Animare gradiente `Backpack` (Gear).
    - Animare gradiente `Projects` (Work).
- [x] **Sfondo "Vivo"**:
    - Animare le bolle di sfondo (About, Gear, Contact, Work).
    - Movimento lento e organico (rimbalzo o orbita).

### ✅ Fase 2: Mobile Gallery UX (Swipe & Snap)
**Branch:** `feat/mobile-gallery-carousel`
**Stato:** ✅ Done
- [x] **Conversione Griglia Verticale**:
    - Trasformare la griglia `grid-cols-2` in lista `flex-row` su mobile.
    - Abilitare `overflow-x-auto` e `snap-x mandatory`.
- [x] **UI Hints**:
    - Sostituire sottotitolo con indicazione "Scorri ➔" o frecce animate.
    - Aggiungere padding per far vedere parzialmente il video successivo (invito allo scroll).

### 📅 Fase 3: Desktop Gallery (Carousel)
**Branch:** `feat/desktop-gallery-carousel`
**Stato:** 🔴 Todo
- [ ] **Layout Orizzontale**:
    - Mantenere o migliorare il layout a riga singola.
- [ ] **Controlli Navigazione**:
    - Aggiungere frecce laterali (Mouse Hover).
    - (Opzionale) Implementare Drag con libreria (es. Embla).

### 📅 Fase 4: Fullscreen Experience ("TikTok Mode")
**Branch:** `feat/fullscreen-player`
**Stato:** 🔴 Todo
- [ ] **UI Trigger**:
    - Pulsante discreto "Fullscreen" sulle card verticali.
- [ ] **Modal Player**:
    - Overlay a schermo intero (`z-50`).
    - Player video nativo o Youtube embed ottimizzato.
- [ ] **Logica Verticale**:
    - Scroll verticale (`snap-y`) per passare al video successivo.
    - Gestione Autoplay/Pause intelligente.

---

## 🛠️ Note Tecniche
- **Animazioni CSS**: Usare `globals.css` per definire keyframes riutilizzabili (`@keyframes floating`).
- **Performance**: Le animazioni devono usare `transform` e `opacity`, non `top/left`, per evitare repaint costosi.
