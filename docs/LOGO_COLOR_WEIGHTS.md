# 🎨 Sistema di Pesi per i Colori del Logo

## Concetto

Invece di distribuire i colori uniformemente (0% → 100%), puoi specificare quanto spazio dovrebbe occupare ogni colore chiave.

## Esempio: Base Uniforme vs. Con Pesi

### ✅ **Distribuzione Uniforme** (attuale)
```
Ciano    → Viola    → Rosa     → Arancione
0%         33%        66%        100%
|----------|----------|----------|
   33%        33%        34%
```

### 🎯 **Distribuzione con Pesi**
Esempio: Ciano 20%, Arancione 60%

```
Ciano → Viola  → Rosa → Arancione
0%      20%      40%    100%
|------|-------|-------|
  20%    20%      60%
```

---

## Come Funziona

### **Colori Chiave** (4 punti)
1. **Ciano** (#00e5ff)
2. **Viola** (#9e3eff)
3. **Rosa** (#ff3ea5)
4. **Arancione** (#ff9900)

### **Calcolo della Distribuzione**

Per una transizione da Ciano (A) a Arancione (B):

**Pesi**: `{ cyan: 30%, orange: 70% }`

Significa:
- Ciano occupa il **30%** del percorso
- **Punto medio** (Viola/Rosa): 30% + (70%-30%)/2 = **50%**
- Arancione occupa dal 50% al **100%** (quindi 50% di spazio)

---

## Configurazione per le 3 Varianti

### **V1: Ciano → Arancione** (Esempio: Più Arancione)
```json
{
  "start": "cyan",
  "end": "orange",
  "weights": {
    "cyan": 20,      // Ciano occupa solo il 20%
    "orange": 80     // Arancione occupa l'80%
  }
}
```

### **V2: Arancione → Ciano** (Esempio: Più Ciano)
```json
{
  "start": "orange",
  "end": "cyan",
  "weights": {
    "orange": 30,    // Arancione occupa il 30%
    "cyan": 70       // Ciano occupa il 70%
  }
}
```

### **V3: Ciano → Ciano** (Bilanciato)
```json
{
  "start": "cyan",
  "midpoint": "orange",
  "end": "cyan",
  "weights": {
    "cyan": 50,      // Ciano occupa il 50% (25% inizio + 25% fine)
    "orange": 50     // Arancione occupa il 50% (metà percorso)
  }
}
```

---

## Come Usare

Usa lo script `public/icon-gen/generate_logo_weighted.mjs` con i pesi desiderati:

```bash
node public/icon-gen/generate_logo_weighted.mjs
```

Modifica i pesi nello script per personalizzare le varianti!
