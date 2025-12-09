# Logo "G" - Struttura e Ordine dei Segmenti

## Geometria della "G"
La "G" è composta da due curve (esterna e interna) connesse da due stanghette.

## ✅ ORDINE CORRETTO DEL PERCORSO

Seguendo la linea della "G" come una penna:

```
1️⃣ ARCO INTERNO (dal basso, senso ORARIO)
    ↓
2️⃣ STANGHETTA CORTA (in alto, da sinistra → destra)
    ↓
3️⃣ ARCO ESTERNO (senso ANTIORARIO)
    ↓
4️⃣ STANGHETTA GRANDE (centrale/drone, da destra → sinistra)
```

---

## 1️⃣ ARCO INTERNO (Senso ORARIO, dal basso)

#### grad-4: INIZIO - Dal basso a destra
- **Da**: (64.549, 66.951) - Parte dal basso a destra
- **A**: (-25.706, 89.377) - Va verso sinistra inferiore

#### grad-5: Sinistra inferiore → Sinistra centrale  
- **Da**: (-25.706, 89.377)
- **A**: (-90.256, 22.426) - Risale a sinistra

#### grad-6: Sinistra centrale → Sinistra superiore
- **Da**: (-90.256, 22.426)
- **A**: (-64.549, -66.951) - Continua a salire a sinistra

#### grad-7: Sinistra superiore → Destra superiore
- **Da**: (-64.549, -66.951)
- **A**: (25.706, -89.377) - Attraversa in alto

#### grad-8: Destra superiore → Stanghetta corta
- **Da**: (25.706, -89.377)
- **A**: (77.956, -50.714) - Arriva alla connessione in alto

---

## 2️⃣ STANGHETTA CORTA IN ALTO (grad-9)
- **Posizione**: Connessione in alto tra arco interno ed esterno
- **Direzione**: Da SINISTRA verso DESTRA
- **Coordinate**: da (78.456, -50.714) a (108.257, -50.714)
- **Nota**: Percorsa in direzione opposta rispetto alla definizione SVG!

---

## 3️⃣ ARCO ESTERNO (Senso ANTIORARIO)

#### grad-0: Destra superiore → Sinistra superiore
- **Da**: (108.757, -50.714) - Dopo la stanghetta corta
- **A**: (-50.714, -108.757) - Lato sinistro superiore

#### grad-1: Sinistra superiore → Sinistra inferiore
- **Da**: (-50.714, -108.757)
- **A**: (-108.757, 50.714) - Scende a sinistra

#### grad-2: Sinistra inferiore → Destra inferiore
- **Da**: (-108.757, 50.714)
- **A**: (50.714, 108.757) - Attraversa in basso

#### grad-3: Destra inferiore → Stanghetta grande
- **Da**: (50.714, 108.757)
- **A**: (119.836, 6.280) - Arriva alla stanghetta centrale

---

## 4️⃣ STANGHETTA GRANDE CENTRALE (grad-10) - **🚁 DRONE QUI!**
- **Posizione**: Stanghetta centrale a destra (dove sta il drone)
- **Direzione**: Da DESTRA verso SINISTRA
- **Coordinate**: da (118.836, 6.280) a (37.236, 6.280)
- **Nota**: È la stanghetta più lunga, dove l'arco esterno si chiude

---

## 🎨 Come Descrivere i Colori

Ora che conosci l'ordine, puoi descrivere:

### Esempio "Sunset Flow":
1. **ARCO INTERNO** (dal basso, ORARIO): Parte con colore A, arriva a colore B alla stanghetta corta
2. **STANGHETTA CORTA** (in alto): Colore B
3. **ARCO ESTERNO** (ANTIORARIO): Parte con colore B, arriva a colore C alla stanghetta grande
4. **STANGHETTA GRANDE/DRONE**: Colore C (dove sta il drone!)

### Per le tue 3 varianti:
Dimmi:
- Che colore vuoi all'**inizio** (ARCO INTERNO dal basso)?
- Che colore vuoi alla **STANGHETTA CORTA** (in alto)?
- Che colore vuoi alla **STANGHETTA GRANDE/DRONE** (centrale)?
- Come devono transitare i colori tra questi punti?
