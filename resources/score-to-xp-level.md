---
layout: default
title: Score to XP Level
---

<br>

<div class="banner" data-year="2022">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Score to XP Level</span>
                <div class="tags">
                    <span class="tag">Function Pack</span>
                </div>
                <div class="card">
                    <h3 class="card-button-title">Download</h3>
                    <a href="https://github.com/BedrockCommands/developer-packs/releases/download/s2xp/Score_to_XP_Level.mcaddon" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>
<br>
This function pack allows you to convert a selected player's score from a specified scoreboard objective into XP levels.

## Contributors

- **[@ZheaEvyline](https://github.com/zheaEvyline/)**

This work is licensed under the **[MIT License](https://opensource.org/license/mit)**.

## Usage Commands

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/tag &lt;target&gt; add wiki:score_to_xp_level</code>
  </div>
  <p>
  Enables score-to-XP level conversion for the selected target.
  </p>
</div>

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/playsound random.wiki.levelup</code>
  </div>
  <p>This pack mutes the <code>random.levelup</code> sound to prevent undesired sound effects from playing during the conversion. If you wish to use the level-up sound effect elsewhere in your project, you can use the <code>random.wiki.levelup</code> sound ID instead.</p>
</div>

## Editable Files

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap file">functions/wiki/scoreboard/players/score_to_xp_level.mcfunction</code>
  </div>
  <ul>
    <li>In this file, <code>wiki:n.main</code> is the objective where the required scoreboard data is stored, and <code>wiki:n.temp</code> is the temporary objective used to convert scores from <code>wiki:n.main</code> into XP levels for the selected players.</li>
    <li>You can rename <code>wiki:n.main</code> to match the name of your desired objective.</li>
    <li>Alternatively, if your text/code editor has a search-and-replace feature, you can replace all instances of <code>wiki:n.</code> with your desired objective name. For example, replacing it with <code>wiki:money.</code> will generate <code>wiki:money.main</code> and <code>wiki:money.temp</code>.</li>
    <li>You can also replace the <code>wiki:</code> namespace with your project's namespace if needed.</li>
  </ul>
</div>