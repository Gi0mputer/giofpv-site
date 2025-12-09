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

## Windows notes

- PowerShell can block npm scripts because of execution policy. Quick fix: run `Set-ExecutionPolicy -Scope Process Bypass` before `npm run dev`. In alternativa, puoi impostare localmente `npm config set script-shell "C:\\Windows\\System32\\cmd.exe"` (non committare questa impostazione, su Vercel/Linux non serve).
- If you see "Port 3000 is in use" or `.next/dev/lock` errors, stop stale Node processes: `Get-NetTCPConnection -LocalPort 3000 | Select OwningProcess` then `Stop-Process -Id <PID>`. If needed, remove the leftover lock with `Remove-Item -Force .next/dev/lock`.

### Quick env check

On Windows/PowerShell, run:

```powershell
pwsh -ExecutionPolicy Bypass -File scripts/check-env.ps1
```

The script checks Node/npm presence/version, warns if ExecutionPolicy is Restricted, and reports if port 3000 or `.next/dev/lock` are occupied.

## Assets & docs
- Served assets: `public/` (favicons, logo PNG, profile pic, gear images, logo SVG if needed).
- Icon generation workspace: `public/icon-gen/` (generation scripts, source masks/base icons, and generated outputs/previews).
- Dev previews (non pubblicate): `dev/` (`palette-preview.html`, `g-logo-preview.html`).
- Project docs: `docs/PROJECT_REPORT.md`, `docs/DEBUG_DIAGNOSIS.txt`.
- Utility: `scripts/commit_fix.bat` (helper batch if needed on Windows).
