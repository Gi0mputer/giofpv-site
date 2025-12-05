# Simple environment check for GioFPV site (Windows-friendly).

param (
  [int]$Port = 3000
)

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$errors = @()
$warnings = @()

function Show-Step($label, $value) {
  Write-Host ("{0,-20} {1}" -f $label, $value)
}

# Node
try {
  $nodeVersionRaw = (& node -v 2>$null).Trim()
  if (-not $nodeVersionRaw) { throw "missing" }
  $nodeVersion = [version]($nodeVersionRaw.TrimStart("v"))
  $minNode = [version]"18.18.0"
  Show-Step "Node" $nodeVersionRaw
  if ($nodeVersion -lt $minNode) {
    $warnings += "Node >= $minNode consigliato (trovato $nodeVersionRaw)"
  }
} catch {
  $errors += "Node non trovato; installa Node >= 18.18"
}

# npm
try {
  $npmVersion = (& npm -v 2>$null).Trim()
  if (-not $npmVersion) { throw "missing" }
  Show-Step "npm" $npmVersion
} catch {
  $errors += "npm non trovato; verifica l'installazione di Node"
}

# npmrc script-shell
$npmrcPath = Join-Path $repoRoot ".npmrc"
if (Test-Path $npmrcPath) {
  $npmrcContent = Get-Content $npmrcPath -Raw
  Show-Step ".npmrc" $npmrcPath
  if ($npmrcContent -notmatch 'script-shell\s*=\s*"C:\\\\Windows\\\\System32\\\\cmd\.exe"') {
    $warnings += ".npmrc non forza cmd.exe; lancia `Set-ExecutionPolicy -Scope Process Bypass` prima di npm run dev"
  }
} else {
  $warnings += ".npmrc mancante; aggiungi script-shell per evitare i blocchi di PowerShell"
}

# Execution policy (process)
try {
  $policy = Get-ExecutionPolicy -Scope Process
  Show-Step "ExecPolicy" $policy
  if ($policy -eq "Restricted") {
    $warnings += "ExecutionPolicy è Restricted: usare `Set-ExecutionPolicy -Scope Process Bypass` prima di npm run dev"
  }
} catch {
  # ignore
}

# Port check
try {
  $conn = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
  if ($conn) {
    $owningPid = ($conn | Select-Object -First 1 -ExpandProperty OwningProcess)
    $procName = (Get-Process -Id $owningPid -ErrorAction SilentlyContinue).ProcessName
    $errors += "Porta $Port occupata da PID $owningPid ($procName). Stoppa il processo o cambia porta."
  } else {
    Show-Step "Porta libera" $Port
  }
} catch {
  $warnings += "Impossibile verificare la porta ${Port}: $($_)"
}

# .next lock
$lockPath = Join-Path $repoRoot ".next/dev/lock"
if (Test-Path $lockPath) {
  $warnings += "File lock presente: $lockPath (rimuovilo se non ci sono dev server attivi)"
}

Write-Host ""
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
  Write-Host "OK: ambiente pronto" -ForegroundColor Green
} else {
  if ($errors.Count -gt 0) {
    Write-Host "ERRORI:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host (" - {0}" -f $_) }
  }
  if ($warnings.Count -gt 0) {
    Write-Host "AVVISI:" -ForegroundColor Yellow
    $warnings | ForEach-Object { Write-Host (" - {0}" -f $_) }
  }
}
