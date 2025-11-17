This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Come applicare queste modifiche al tuo progetto

Puoi integrare le modifiche dell'ultima PR in due modi principali:

1) **Merge diretto del branch**
- Aggiungi il remote con il branch aggiornato, ad esempio:
  ```bash
  git remote add upstream <url-del-repo-con-le-modifiche>
  git fetch upstream
  ```
- Entra nel tuo branch di lavoro e fai il merge del branch aggiornato (es. `work`):
  ```bash
  git checkout <tuo-branch>
  git merge upstream/work
  ```
- Risolvi eventuali conflitti, poi esegui i test e fai commit/push.

2) **Cherry-pick di uno o più commit specifici**
- Recupera i commit necessari con `git fetch` come sopra.
- Identifica gli hash dei commit da importare (`git log upstream/work`).
- Sul tuo branch esegui:
  ```bash
  git cherry-pick <hash-1> <hash-2> ...
  ```
- Risolvi eventuali conflitti, testa e fai commit/push.

3) **Applicazione di una patch (senza aggiungere il remote)**
- Esporta la patch dal branch aggiornato (ad esempio dalla PR):
  ```bash
  git format-patch -1 <hash-commit> --stdout > update.patch
  ```
- Nel tuo progetto applica il file:
  ```bash
  git apply update.patch
  ```
- Verifica la riuscita, risolvi conflitti se presenti, poi commit.

Dopo aver integrato le modifiche, esegui i test del progetto (ad esempio `npm run lint` e `npm run dev` per controllare che il sito si avvii) e procedi con il push sul tuo repository.
