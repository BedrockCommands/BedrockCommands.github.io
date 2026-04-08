$ffmpeg = "C:\ffmpeg\bin\ffmpeg.exe"
$files = Get-ChildItem *.mp4

if (!(Test-Path "processed")) { New-Item -ItemType Directory -Name "processed" }

foreach ($file in $files) {
    $baseName = $file.BaseName
    $outputVideo = "processed\$($file.Name)"
    $outputPoster = "processed\$($baseName).preview.jpg"

    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan

    & $ffmpeg -i $file.FullName -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -profile:v high -level:v 4.1 -crf 20 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k -y $outputVideo

    & $ffmpeg -i $file.FullName -ss 00:00:02.000 -vframes 1 -q:v 2 -y $outputPoster
}

Write-Host "Done! Check the 'processed' folder." -ForegroundColor Green