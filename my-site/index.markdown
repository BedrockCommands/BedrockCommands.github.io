---
layout: default
title: Home
---

<br>
<img src="/assets/images/banners/community-banner.png" width="100%" class="rounded-corners">

## Welcome

Welcome to the Bedrock Commands Community, the premier Discord server for Minecraft Bedrock Edition command enthusiasts! Recognized as the #1 Bedrock commands server, we are dedicated to fostering a collaborative environment where both beginners and experts can share knowledge, seek assistance, and enhance their command skills.

## What We Offer

**🤝 Expert Guidance**:<br>
Our community comprises seasoned command experts ready to provide support and answer your questions.

**📚 Educational Resources**:<br>
We maintain the comprehensive Bedrock Wiki, offering in-depth articles to help you master commands.

**💬 Active Discussions**:<br>
Engage in lively conversations about the latest command techniques, game updates, and creative ideas.

**🏆 Events and Challenges**:<br>
Participate in regular events and challenges designed to test and expand your command skills.

<div class="button-container">
  <!-- Join Server Button -->
  <div class="card">
    <div class="card-button-content">
      <h3 class="card-button-title">Join Server</h3>
      <svg class="go-to-link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <path d="M11 13l9 -9" />
      <path d="M15 4h5v5" />
    </svg>
    </div>
    <a href="https://discord.gg/invite/bedrock-commands-community-924894457894174740" 
    class="stretched-link" 
    target="_blank" 
    rel="noopener noreferrer">
    </a>
  </div>

  <!-- Share Server Button -->
  <div class="card">
    <div class="card-button-content">
      <h3 class="card-button-title">Share Server</h3>
      <svg class="go-to-link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </div>
    <button class="copy-link-button" onclick="copyToClipboard()">
    </button>
  </div>
</div>

<script>
  function copyToClipboard() {
    const link = "https://discord.gg/invite/bedrock-commands-community-924894457894174740"; // Replace with your desired link
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Link copied to clipboard!");
  }
</script>