---
layout: default
title: Jams
---

<div class="filters">
  <!-- Year Dropdown -->
  <div class="custom-dropdown" id="year-dropdown">
    <button class="dropdown-btn">Select Year</button>
    <ul class="dropdown-menu">
      <li><label><input type="checkbox" value="" checked> All Years</label></li>
      <li><label><input type="checkbox" value="2025"> 2025</label></li>
      <li><label><input type="checkbox" value="2024"> 2024</label></li>
    </ul>
  </div>
  <!-- Jam Dropdown -->
  <div class="custom-dropdown" id="jam-dropdown">
    <button class="dropdown-btn">Select Jam</button>
    <ul class="dropdown-menu">
      <li><label><input type="checkbox" value="" checked> All Jams</label></li>
      <li><label><input type="checkbox" value="Command Jam" checked> Command Jam</label></li>
      <li><label><input type="checkbox" value="Halloween Jam" checked> Halloween Jam</label></li>
      <li><label><input type="checkbox" value="Christmas Jam" checked> Christmas Jam</label></li>
      <li><label><input type="checkbox" value="Educational Jam" checked> Educational Jam</label></li>
    </ul>
  </div>
</div>




<script>
    document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".banner").forEach(banner => {
        banner.addEventListener("click", function () {
            this.classList.toggle("flip");
        });
    });
});
</script>

<div class="gallery">
<div class="banner" data-year="2024" data-jam="Christmas Jam">
        <div class="banner-inner">
            <div class="banner-front">
                <div class="tags">
                    <span class="tag">2024</span>
                    <span class="tag">December</span>
                    <span class="tag">Christmas Jam</span>
                </div>
                <img src="/assets/images/banners/Jam_Banner_2024.Dec.png" alt="Jam Banner 2024 December">
                <div class="rank-tags">
                    <span class="tag first-place">1st: @itzbeasty</span>
                    <span class="tag second-place">2nd: @thecrumbeler2</span>
                    <span class="tag third-place">3rd: @qh0l</span>
                </div>
            </div>
            <div class="banner-back">
                <p><strong>🎅 Theme: Santa's Workshop</strong></p>
                <p>Any creation representing Santa's workshop, showcasing its festive holiday spirit. Must include factory elements such as magical machinery, or gift management systems.</p>
                <p><strong>⭐ Participants:</strong></p>
                <p class="participants">
                1. 💎300 @itzbeasty<br>
                2. 💎240 @thecrumbeler2<br>
                3. 💎180 @qh0l<br>
                </p>
            </div>
        </div>
    </div>
    <div class="banner" data-year="2024" data-jam="Halloween Jam">
        <div class="banner-inner">
            <div class="banner-front">
                <div class="tags">
                    <span class="tag">2024</span>
                    <span class="tag">October</span>
                    <span class="tag">Halloween Jam</span>
                </div>
                <img src="/assets/images/banners/Jam_Banner_2024.Oct.png" alt="Jam Banner 2024 October">
                <div class="rank-tags">
                    <span class="tag first-place">1st: @dairychutoy35</span>
                    <span class="tag second-place">2nd: @califerr</span>
                    <span class="tag third-place">3rd: @ladnn00</span>
                </div>
            </div>
            <div class="banner-back">
                <p><strong>🔪 Theme: Survival Horror</strong></p>
                <p>Any creation clearly depicting horror elements (except gore outside of Vanilla MC) where the player must be allowed to die (does not apply to art and build submissions).</p>
                <p><strong>⭐ Participants:</strong></p>
                <p class="participants">
                1. 💎300 @dairychutoy35<br>
                2. 💎240 @califerr<br>
                3. 💎180 @ladnn00<br>
                </p>
            </div>
        </div>
    </div>
    <div class="banner" data-year="2024" data-jam="Command Jam">
        <div class="banner-inner">
            <div class="banner-front">
                <div class="tags">
                    <span class="tag">2024</span>
                    <span class="tag">August</span>
                    <span class="tag">Command Jam</span>
                </div>
                <img src="/assets/images/banners/Jam_Banner_2024.Aug.png" alt="Jam Banner 2024 August">
                <div class="rank-tags">
                    <span class="tag first-place">1st: @paperweightt & @jeanmajid</span>
                    <span class="tag second-place">2nd: @.zruby & @spacebarninja</span>
                    <span class="tag third-place">3rd: @charlietang.</span>
                </div>
            </div>
            <div class="banner-back">
                <p><strong>📦 Theme: Resourceful</strong></p>
                <p>Any command creation that includes at least two /playanimation commands and does not exceed a total of 15 commands in the system.</p>
                <p><strong>⭐ Participants:</strong></p>
                <p class="participants">
                1. 💎500 @paperweightt & @jeanmajid<br>
                2. 💎400 @.zruby & @spacebarninja<br>
                3. 💎300 @charlietang.<br>
                4. 💎200 @crepaspmkinpie<br>
                4. 💎200 @orangecash_<br>
                </p>
            </div>
        </div>
    </div>
</div>

