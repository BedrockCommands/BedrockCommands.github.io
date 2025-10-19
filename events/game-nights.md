---
layout: default
title: Game Nights
---

<script>
    document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".banner-image").forEach(img => {
        img.addEventListener("click", function () {
            const currentSrc = this.src;
            const altSrc = this.getAttribute("data-alt-src");

            // Zoom out effect
            this.classList.add("zoom-out");

            setTimeout(() => {
                // Swap images after zoom out
                this.setAttribute("data-alt-src", currentSrc);
                this.src = altSrc;

                // Zoom in effect
                this.classList.remove("zoom-out");
                this.classList.add("zoom-in");

                setTimeout(() => {
                    this.classList.remove("zoom-in");
                }, 300); // Match transition duration
            }, 150);
        });
    });
});
</script>




<div class="gallery">

<div class="banner" data-year="2025">
        <div class="banner-inner">
            <div class="banner-front">
            <img class="banner-logo" src="/assets/images/banners/GameNight_7.Logo.jpg">
                <span class="banner-game-title">TNT TAG</span>
                <span class="banner-game-author">By @crunchycookie</span>
                <div class="tags">
                    <span class="tag">2025</span>
                    <span class="tag">August</span>
                </div>
                <img class="banner-image" 
     src="/assets/images/banners/GameNight_7.Screenie.png" 
     data-alt-src="/assets/images/banners/GameNight_7.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Download Map</h3>
                    <a href="https://www.mediafire.com/file/7mqlyq59zymywm3/lcTfNcT_Tagr_V1.0.mcworld/file" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>


<div class="banner" data-year="2025">
        <div class="banner-inner">
            <div class="banner-front">
                <span class="banner-game-title">Ice Boat Racing</span>
                <span class="banner-game-author">By @atutorialist & Team</span>
                <div class="tags">
                    <span class="tag">2025</span>
                    <span class="tag">January</span>
                </div>
                <img class="banner-image" 
     src="/assets/images/banners/GameNight_6.Screenie.png" 
     data-alt-src="/assets/images/banners/GameNight_6.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Download Map</h3>
                    <a href="https://www.mediafire.com/folder/a07ue9zy0r0b4/Ice+Boatin" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>


<div class="banner" data-year="2024">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/banners/GameNight_5.Logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Random Disasters</span>
                <span class="banner-game-author">By @spacebarninja</span>
                <div class="tags">
                    <span class="tag">2024</span>
                    <span class="tag">September</span>
                </div>
                <img class="banner-image" 
                src="/assets/images/banners/GameNight_5.Screenie.png" 
                data-alt-src="/assets/images/banners/GameNight_5.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Download Map</h3>
                    <a href="https://www.mediafire.com/file/necja5dt99qg7pz/Random_Disasters.mcworld/file" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>


<div class="banner" data-year="2024">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/banners/GameNight_4.Logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Devil at Sea: Chapter I</span>
                <span class="banner-game-author">By @.zruby</span>
                <div class="tags">
                    <span class="tag">2024</span>
                    <span class="tag">July</span>
                </div>
                <img class="banner-image" 
                src="/assets/images/banners/GameNight_4.Screenie.png" 
                data-alt-src="/assets/images/banners/GameNight_4.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Coming Soon</h3>
                    <a href="https://www.youtube.com/@ruby977" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>

<div class="banner" data-year="2023">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/banners/GameNight_2.Logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Doors Hotel</span>
                <span class="banner-game-author">By Builders Horizon</span>
                <div class="tags">
                    <span class="tag">2023</span>
                    <span class="tag">July</span>
                </div>
                <img class="banner-image" 
                src="/assets/images/banners/GameNight_3.Screenie.png" 
                data-alt-src="/assets/images/banners/GameNight_3.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">No Longer Available</h3>
                    <a href="https://bedrockexplorer.com/@builders-horizon/doors-hotel" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>


<div class="banner" data-year="2023">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/banners/GameNight_2.Logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Motel Fear</span>
                <span class="banner-game-author">By Builders Horizon</span>
                <div class="tags">
                    <span class="tag">2023</span>
                    <span class="tag">April</span>
                </div>
                <img class="banner-image" 
                src="/assets/images/banners/GameNight_2.Screenie.png" 
                data-alt-src="/assets/images/banners/GameNight_2.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Download Map</h3>
                    <a href="https://www.minecraft.net/en-us/marketplace/pdp?id=5b39abe8-4f99-4a63-bd3b-18f905dc9cdc" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>


<div class="banner" data-year="2022">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/banners/GameNight_1.Logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Xmas Festival 2022</span>
                <span class="banner-game-author">By Scarlet Dynasty</span>
                <div class="tags">
                    <span class="tag">2022</span>
                    <span class="tag">December</span>
                </div>
                <img class="banner-image" 
                src="/assets/images/banners/GameNight_1.Screenie.png" 
                data-alt-src="/assets/images/banners/GameNight_1.Thumbnail.png">
                <div class="card">
                    <h3 class="card-button-title">Download Map</h3>
                    <a href="https://scarlet-dynasty.github.io/maps/xmas-festival" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>



</div>