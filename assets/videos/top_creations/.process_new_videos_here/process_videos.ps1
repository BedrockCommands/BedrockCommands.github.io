$ffmpeg = "C:\ffmpeg\bin\ffmpeg.exe"
$files = Get-ChildItem *.mp4

if (!(Test-Path "processed")) {
    New-Item -ItemType Directory -Name "processed"
}

$targetSizeMB = 24
$audioBitrate = 128

foreach ($file in $files) {

    $baseName = $file.BaseName
    $outputVideo = "processed\$($file.Name)"
    $outputPoster = "processed\$($baseName).preview.jpg"

    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan

    # Get duration in seconds
    $duration = & $ffmpeg -i $file.FullName 2>&1 |
        Select-String "Duration" |
        ForEach-Object {
            if ($_ -match "Duration: (\d+):(\d+):(\d+\.\d+)") {
                [int]$h=$matches[1]
                [int]$m=$matches[2]
                [float]$s=$matches[3]
                $h*3600 + $m*60 + $s
            }
        }

    if (-not $duration) {
        Write-Host "Could not determine duration, skipping." -ForegroundColor Red
        continue
    }

    # Calculate bitrate to stay under size
    $targetBits = $targetSizeMB * 8 * 1024 * 1024
    $totalBitrate = $targetBits / $duration
    $videoBitrate = [int]($totalBitrate / 1000 - $audioBitrate)

    if ($videoBitrate -lt 300) {
        $videoBitrate = 300
    }

    Write-Host "Target video bitrate: $videoBitrate kbps"

    # PASS 1
    & $ffmpeg `
        -y `
        -i $file.FullName `
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
        -c:v libx264 `
        -profile:v high `
        -level:v 4.1 `
        -b:v ${videoBitrate}k `
        -pass 1 `
        -an `
        -f mp4 `
        NUL

    # PASS 2
    & $ffmpeg `
        -y `
        -i $file.FullName `
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
        -c:v libx264 `
        -profile:v high `
        -level:v 4.1 `
        -b:v ${videoBitrate}k `
        -pass 2 `
        -pix_fmt yuv420p `
        -movflags +faststart `
        -c:a aac `
        -b:a ${audioBitrate}k `
        $outputVideo

    # Poster frame
    & $ffmpeg `
        -y `
        -ss 2 `
        -i $file.FullName `
        -frames:v 1 `
        -q:v 2 `
        $outputPoster
}

Write-Host "Done! All videos capped under 25 MB." -ForegroundColor Green