---
title: Cook-Off! | Contributing Guide
layout: default
description: >-
  Step by step contributing guide for builders.
image: /assets/images/projects/2025.Logo.png
color: "#FA6D0B"
---

## Step by Step Contributing Guide for Builders

<br>

1. Go to **[Github](<https://github.com>)**

2. Sign in to your Github account. If you don't have an account, simply click **Sign in with Google** for convenience.

3. Go to **[BCC Cook-Off! Repository](<https://github.com/BedrockCommands/Cook-Off>)**

4. Click on **Fork** button.

5. In the button dropdown, click **+ Create a new fork** option.

6. In the new page, click the green **Create fork** button at the bottom right.

7. Go to the **Worlds** folder.

8. Click **Add file** button in the top right corner.

9. Click **Upload files** option in the button drop down.

10. Click **Choose your files** link in the new page.

11. Select the `.mcworld` or `.mcstructure` file you want to contribute.

12. Scroll down and click the green **Commit changes** button in the bottom left.

13. Now click the **Contribute** button next to the 'Sync fork' button.

14. In the new page, write optional title and description. Then click the green **Create a pull request** button.

15. Wait few seconds and you will see a message to sign CLA.

16. Click the 3 dots on the CLA message. Then click **View Details**

17. Read the CLA, fill in the CLA fields, and you are done!

Note: You only need to create a fork and sign the CLA once. For any future contributions, these aren't required. Simply click the **Sync fork** button in your forked repository and continue with the same steps from no. 7 to 14. If you face any issues, please ping @zheaEvyline and @jeanmajid (together) in the #cook-off-project forum channel on Discord. You may also DM privately.


## Step by Step Contributing Guide for Devs

<br>

1. Go to **[Github](<https://github.com>)**

2. Sign in to your Github account. If you don't have an account, simply click **Sign in with Google** for convenience.

3. Go to **[BCC Cook-Off! Repository](<https://github.com/BedrockCommands/Cook-Off>)**

4. Click on **Fork** button.

5. In the button dropdown, click **+ Create a new fork** option.

6. In the new page, click the green **Create fork** button at the bottom right.

7. Open the 'Github Desktop' application. **[Download here](https://github.com/apps/desktop?ref_product=desktop&ref_type=engagement&ref_style=button)**.

8. Click **File** button in the top left corner.

9. Select `your_username/Cook-Off` and click the **Clone** button.

10. Click the **Fetch origin** at the top middle in the 'Github Desktop' application.
    - This step is important to ensure you get the most up to date repo. Fetch origin any time you notice there are changes from others.

11. Click **Show in Explorer** button in the prompts.

12. Copy the entire `Cook-Off/` folder to your `com.mojang/minecraftWorlds/` folder.
    - Note: Please do not get rid of the original folder as you will need to use it to push changes.

13. Open the 'Visual Studio Code' application. **[Download here](https://code.visualstudio.com/download)**.

14. Click **File** button in the top left corner.

15. Select the **Open Folder** option.

16. Navigate to `com.mojang/minecraftWorlds/` and select the `Cook-Off/` folder.

17. **You may now start making changes or adding new files** 🎊
    - To test if your code works as intended, simply launch Minecraft and load up a **Copy** of the "Cook-Off!" world to play-test.
    - Once satisfied, simply replace the original `GitHub/Cook-Off/` folder with your `com.mojang/minecraftWorlds/Cook-Off/` folder.
    - **IMPORTANT:** Strictly do not make changes to the world files in the root folder. Content such as `level.dat`, `level.dat_old`, or the `db/` folder must not be modified unless absolutely required.
    - You can also play-test without creating a Copy of the "Cook-Off!' world. However, instead of replacing the entire folder, only replace the `behavior_packs/` and `resource_packs/` folders inside individually to avoid making unnecessary changes to the world files.

18. Once done, open the 'GitHub Desktop' application again.

19. Enter Commit title and description (make sure to also include Discord username) and click the **Commit** button.

20. On your browser, open the forked `Cook-Off` repo in your GitHub profile.

21. Now click the **Contribute** button next to the 'Sync fork' button.

22. In the new page, write optional title and description. Then click the green **Create a pull request** button.

23. Wait few seconds and you will see a message to sign CLA.

24. Click the 3 dots on the CLA message. Then click **View Details**

25. Read the CLA, fill in the CLA fields, and you are done!

Note: You only need to create a fork and sign the CLA once. For any future contributions, these aren't required. Simply click the **Sync fork** button in your forked repository and continue with the same steps from no. 10 to 22. If you face any issues, please ping @zheaEvyline and @jeanmajid (together) in the #cook-off-project forum channel on Discord. You may also DM privately.