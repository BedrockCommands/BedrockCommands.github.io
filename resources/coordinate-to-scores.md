---
layout: default
title: Coordinate to Scores
description: >-
  This function pack allows you to retrieve a player’s coordinates and store them on a scoreboard. It also enables teleportation to any coordinate specified by scoreboard values.
---

<br>

<div class="banner" data-year="2022">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Coordinate to Scores</span>
                <div class="tags">
                    <span class="tag">Function Pack</span>
                </div>
                <div class="card">
                    <h3 class="card-button-title">Download</h3>
                    <a href="https://github.com/BedrockCommands/developer-packs/releases/download/c2s/Coordinate_to_Scores.FP.mcpack" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>
<br>
This function pack allows you to retrieve a player's coordinates and store them on a scoreboard. It also enables teleportation to any coordinate specified by scoreboard values.

## Contributors

- Technique Shared by: @akiponggg0119  
- Commands Compilation: @gobblecrow  

This work is licensed under the **[MIT License](https://opensource.org/license/mit)**.

## Usage Commands

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/function wiki/scoreboard/players/get_coordinate/initiate</code>
  </div>
  <p>
  Retrieves your coordinates and stores them on the corresponding objectives:
  <code>wiki:x.axis</code>, <code>wiki:y.axis</code>, and <code>wiki:z.axis</code>.
  </p>
</div>

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/execute as &lt;target&gt; at @s run function wiki/scoreboard/players/get_coordinate/initiate</code>
  </div>
  <p>Retrieves the coordinates of selected or multiple targets.</p>
</div>

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/function wiki/teleport/initiate</code>
  </div>
  <p>
  Teleports you to the coordinate based on your <code>wiki:x.tp</code>, <code>wiki:y.tp</code>, and <code>wiki:z.tp</code> scoreboard values.
  </p>
</div>

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/execute as &lt;target&gt; at @s run function wiki/teleport/initiate</code>
  </div>
  <p>
  Teleports targets to coordinates based on their <code>wiki:x.tp</code>, <code>wiki:y.tp</code>, and <code>wiki:z.tp</code> scoreboard values.
  </p>
</div>