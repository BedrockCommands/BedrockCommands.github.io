---
layout: default
title: Raycasting
---

<br>

<div class="banner" data-year="2022">
        <div class="banner-inner">
            <img class="banner-logo" src="/assets/images/logo.png">
            <div class="banner-front">
                <span class="banner-game-title">Raycasting</span>
                <div class="tags">
                    <span class="tag">Function Pack</span>
                </div>
                <div class="card">
                    <h3 class="card-button-title">Download</h3>
                    <a href="https://github.com/BedrockCommands/developer-packs/releases/download/rc/Raycasting.FP.mcpack" 
                    class="stretched-link" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    </a>
                </div>
            </div>
        </div>
    </div>
<br>
This function pack is an editable raycasting template. It allows you to run your desired commands when your targets look at entities, blocks, or specific block faces.

## Contributors

- **[@MajestikButter](https://github.com/MajestikButter/)**

This work is licensed under the **[MIT License](https://opensource.org/license/mit)**.

## Usage Commands

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap">/execute as &lt;target&gt; run function wiki/raycast/initiate</code>
  </div>
  <p>
  Initiate raycast from the desired target.
  </p>
</div>

## Editable Files

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap folder">functions/wiki/raycast/on_hit/</code>
  </div>
  <p>
  All files in this folder are editable in the same way (commands will execute when the target looks at blocks or specific block faces).<br><strong>Note</strong>: Using <code>@s</code> here will execute as the caster (the target from whose sight the ray is being cast). If you want to target a different entity, you can use selectors like <code>@e</code> or <code>@p</code>.
  </p>
</div>

<div class="command-card">
  <div class="command-box">
    <button class="copy-button" onclick="copyCommand(this)">Copy</button>
    <code class="no-wrap file">functions/wiki/raycast/on_hit/entity.mcfunction</code>
  </div>
  <p>
  Commands in this file will run when the target is looking at an entity.<br><strong>Note</strong>: Using <code>@s</code> here will execute as the entity that was looked at, not the caster. If you want to target the caster, use <code>@p</code> instead.
  </p>
</div>