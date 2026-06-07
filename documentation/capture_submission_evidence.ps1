$ErrorActionPreference = "Continue"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$shotDir = Join-Path $root "documentation\screenshots"
$apiDir = Join-Path $root "documentation\evidence\api_snapshots"
New-Item -ItemType Directory -Force -Path $shotDir, $apiDir | Out-Null

$chromeCandidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)
$chrome = $chromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw "Chrome/Edge was not found for screenshot capture." }

function HtmlEscape($text) {
  if ($null -eq $text) { return "" }
  return [System.Net.WebUtility]::HtmlEncode([string]$text)
}

function Capture-Page($url, $fileName, $width = 1440, $height = 1600, $budgetMs = 10000) {
  $target = Join-Path $shotDir $fileName
  if (Test-Path $target) { Remove-Item $target -Force }
  $args = @(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=$width,$height",
    "--virtual-time-budget=$budgetMs",
    "--screenshot=$target",
    $url
  )
  & $chrome @args | Out-Null
  if (Test-Path $target) {
    Write-Output "CAPTURED $fileName"
  } else {
    Write-Output "FAILED $fileName"
  }
}

$backend = "https://aqi-predictor-api-cuec.onrender.com"
$frontend = "https://pearls-aqi.vercel.app"
$repo = "https://github.com/codewithsalty/aqi-predictor"

$endpoints = @(
  @{ name = "Health"; url = "$backend/health" },
  @{ name = "Live 3-Day Prediction"; url = "$backend/predict" },
  @{ name = "Latest Model Metrics"; url = "$backend/metrics/latest" },
  @{ name = "Latest Model Registry"; url = "$backend/models/latest" },
  @{ name = "Pipeline Health"; url = "$backend/pipeline/health" },
  @{ name = "Latest Data Quality Audit"; url = "$backend/quality/latest" }
)

$apiCards = New-Object System.Collections.Generic.List[string]
foreach ($endpoint in $endpoints) {
  $safeName = ($endpoint.name -replace '[^a-zA-Z0-9]+', '_').Trim('_').ToLower()
  $jsonPath = Join-Path $apiDir "$safeName.json"
  try {
    $response = Invoke-RestMethod -Uri $endpoint.url -Method Get -TimeoutSec 120
    $json = $response | ConvertTo-Json -Depth 20
    $json | Set-Content -Path $jsonPath -Encoding UTF8
    $apiCards.Add("<section class='card'><p class='eyebrow'>$($endpoint.name)</p><h2>$($endpoint.url)</h2><pre>$(HtmlEscape $json)</pre></section>") | Out-Null
  } catch {
    $message = "FAILED: $($_.Exception.Message)"
    $message | Set-Content -Path $jsonPath -Encoding UTF8
    $apiCards.Add("<section class='card failed'><p class='eyebrow'>$($endpoint.name)</p><h2>$($endpoint.url)</h2><pre>$(HtmlEscape $message)</pre></section>") | Out-Null
  }
}

$apiHtml = @"
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Pearls AQI API Evidence</title>
<style>
  body { margin: 0; font-family: Georgia, 'Times New Roman', serif; background: #edf7f7; color: #10202c; }
  .wrap { padding: 44px; max-width: 1280px; margin: 0 auto; }
  .hero { background: linear-gradient(135deg, #0b6b67, #256c9d); color: white; border-radius: 26px; padding: 34px 42px; box-shadow: 0 26px 70px rgba(17, 49, 66, .18); }
  .hero h1 { font-size: 54px; margin: 0 0 8px; line-height: .95; }
  .hero p { font-size: 18px; margin: 0; opacity: .9; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 24px; }
  .card { background: rgba(255,255,255,.92); border: 1px solid rgba(16,32,44,.08); border-radius: 22px; padding: 22px; box-shadow: 0 18px 50px rgba(17, 49, 66, .12); overflow: hidden; }
  .card.failed { background: #fff2f2; }
  .eyebrow { color: #64748b; font: 700 12px/1.2 Arial, sans-serif; letter-spacing: .16em; text-transform: uppercase; margin: 0 0 8px; }
  h2 { font: 700 18px/1.3 Arial, sans-serif; margin: 0 0 14px; color: #13202d; word-break: break-all; }
  pre { margin: 0; padding: 16px; background: #0d1724; color: #dceffc; border-radius: 16px; max-height: 420px; overflow: hidden; white-space: pre-wrap; font: 12px/1.45 Consolas, monospace; }
</style>
</head>
<body><main class="wrap"><section class="hero"><h1>Backend API Evidence</h1><p>Live Render API responses captured for the internship submission proof package.</p></section><section class="grid">$($apiCards -join "`n")</section></main></body>
</html>
"@
$apiHtmlPath = Join-Path $root "documentation\evidence\api_evidence.html"
$apiHtml | Set-Content -Path $apiHtmlPath -Encoding UTF8

$modelFiles = Get-ChildItem -File (Join-Path $root "backend\artifacts\models") -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object Name,Length,LastWriteTime
$edaTrend = Join-Path $root "backend\artifacts\eda\daily_aqi_trend.png"
$summary = Get-Content (Join-Path $root "backend\artifacts\eda\summary_stats.csv") -Raw -ErrorAction SilentlyContinue
$correlations = Get-Content (Join-Path $root "backend\artifacts\eda\correlations.csv") -Raw -ErrorAction SilentlyContinue
$shap = Get-Content (Join-Path $root "backend\artifacts\explainability\shap_day1_importance.json") -Raw -ErrorAction SilentlyContinue
$modelRows = ($modelFiles | ForEach-Object { "<tr><td>$($_.Name)</td><td>$([math]::Round($_.Length/1MB, 2)) MB</td><td>$($_.LastWriteTime)</td></tr>" }) -join "`n"
$artifactHtml = @"
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Pearls AQI Artifact Evidence</title>
<style>
  body { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(120deg,#f4fbfb,#f8f4ed); color: #122033; }
  .wrap { padding: 44px; max-width: 1260px; margin: 0 auto; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 52px; margin: 0 0 10px; }
  .lead { color: #5a6b7c; font-size: 18px; margin-bottom: 28px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
  .card { background: rgba(255,255,255,.92); border: 1px solid rgba(18,32,51,.08); border-radius: 22px; padding: 22px; box-shadow: 0 18px 50px rgba(18,32,51,.11); }
  .wide { grid-column: 1 / -1; }
  .eyebrow { color: #64748b; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  td, th { text-align: left; border-bottom: 1px solid #e5edf0; padding: 10px; }
  pre { margin: 0; padding: 16px; background: #0d1724; color: #dceffc; border-radius: 16px; max-height: 360px; overflow: hidden; white-space: pre-wrap; font: 12px/1.45 Consolas, monospace; }
</style>
</head>
<body><main class="wrap"><h1>Local ML Artifact Evidence</h1><p class="lead">EDA, explainability, and champion model files generated by the AQI training workflow.</p><section class="grid"><article class="card wide"><p class="eyebrow">Champion model joblib files</p><table><thead><tr><th>File</th><th>Size</th><th>Last updated</th></tr></thead><tbody>$modelRows</tbody></table></article><article class="card"><p class="eyebrow">EDA summary stats</p><pre>$(HtmlEscape $summary)</pre></article><article class="card"><p class="eyebrow">Correlation table</p><pre>$(HtmlEscape $correlations)</pre></article><article class="card wide"><p class="eyebrow">SHAP / feature importance artifact</p><pre>$(HtmlEscape $shap)</pre></article></section></main></body></html>
"@
$artifactHtmlPath = Join-Path $root "documentation\evidence\artifact_evidence.html"
$artifactHtml | Set-Content -Path $artifactHtmlPath -Encoding UTF8

if (Test-Path $edaTrend) {
  Copy-Item $edaTrend (Join-Path $shotDir "15_eda_daily_aqi_trend.png") -Force
  Write-Output "COPIED 15_eda_daily_aqi_trend.png"
}

$apiFileUrl = ([System.Uri](Resolve-Path $apiHtmlPath).Path).AbsoluteUri
$artifactFileUrl = ([System.Uri](Resolve-Path $artifactHtmlPath).Path).AbsoluteUri

Capture-Page "$frontend/" "01_frontend_home_desktop.png" 1440 1700 12000
Capture-Page "$frontend/dashboard" "02_frontend_dashboard_desktop.png" 1440 2200 14000
Capture-Page "$frontend/dashboard" "03_frontend_dashboard_mobile.png" 390 1800 14000
Capture-Page "$frontend/methodology" "04_frontend_methodology.png" 1440 1900 12000
Capture-Page "$frontend/about" "05_frontend_about_salman.png" 1440 1900 12000
Capture-Page "$backend/docs" "06_backend_fastapi_docs.png" 1440 1600 12000
Capture-Page $apiFileUrl "07_backend_api_evidence.png" 1440 2200 5000
Capture-Page $artifactFileUrl "08_local_artifact_evidence.png" 1440 1800 5000
Capture-Page $repo "09_github_repo_home.png" 1440 1700 12000
Capture-Page "$repo/actions" "10_github_actions_all_green.png" 1440 2000 12000
Capture-Page "$repo/actions/workflows/feature-pipeline.yml" "11_github_feature_pipeline_runs.png" 1440 2000 12000
Capture-Page "$repo/actions/workflows/training-pipeline.yml" "12_github_training_pipeline_runs.png" 1440 2000 12000
Capture-Page "$repo/blob/main/.github/workflows/feature-pipeline.yml" "13_feature_pipeline_yml_code.png" 1440 2100 12000
Capture-Page "$repo/blob/main/.github/workflows/training-pipeline.yml" "14_training_pipeline_yml_code.png" 1440 2100 12000
Capture-Page "$repo/blob/main/backend/app/api.py" "16_backend_api_code.png" 1440 2100 12000
Capture-Page "$repo/blob/main/backend/app/train.py" "17_backend_train_code.png" 1440 2100 12000
Capture-Page "$repo/blob/main/frontend/app/components/LiveDashboard.tsx" "18_frontend_dashboard_code.png" 1440 2100 12000
Capture-Page "$repo/blob/main/README.md" "19_readme_submission_proof.png" 1440 1800 12000

Get-ChildItem $shotDir -File | Sort-Object Name | Select-Object Name,Length,LastWriteTime | Format-Table -AutoSize
