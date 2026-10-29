# Digital Technology

Teaching materials and interactive learning resources for Grade 8 and Grade 9.

## First activity: Build a computer

Serve the repository to open [the activity](activities/build-a-computer/index.html):

```sh
cd /workspace/digitalTech
python3 -m http.server 8000
```

Open the server's root page. Any static host can serve this repository; there is no installation or build step. All fonts and artwork are local. No learner data, accounts, tracking, or network services are used. Progress lasts for the current page session; reloading starts a new build.

The desktop-first pixel-art visual novel covers input → processing → output → storage → communication. Learners choose components in any order within a category. Each opens a large discovery scene with a description before an explicit Add action. Components leave the inventory when added; internal components disappear into the tower. After startup, the completed build is celebrated with the illustrated home-screen backdrop. Learners compare HDD and SSD, start the completed desktop, then shrink it into a laptop and smartphone. Five optional knowledge checks reinforce the differences. The network and startup are simulations, and the assembly is conceptual rather than a physical build guide. Power delivery, cooling, operating-system installation, and compatibility are outside its scope.

### Content references

Copy is shortened and paraphrased from `Grade 8 Content.md`:

- Unit 1.1: computer systems, input/output examples, processing components, and secondary storage.
- The motherboard/component summary: CPU, RAM, and graphics card roles.
- Unit 1.1’s desktop/laptop/pocket-computer comparison, built-in laptop keyboard, and touchscreen description support the shrink sequence.

RAM is taught alongside processing as requested, with an explicit distinction between temporary primary memory and long-term secondary storage. The processing stage includes motherboard, CPU, and RAM; ROM and the system bus are excluded from this activity. A dedicated graphics card is optional enrichment. General introductory comparisons of upgradeability, integrated graphics, and drive cost are supplementary explanations rather than quotations from the textbook. Communication models sending a file, without adding unlisted required networking hardware.

### Design references

`assets/design-references/` contains the original **42-colour** Lospec500 GPL palette and the two approved reference sheets. The GPL file is the exact colour authority; the generated sheets are visual references. Hardware sprites render on actual 64×64 canvases with nearest-neighbour scaling and exact GPL colour mapping. The working palette adds pink, lilac, mint, peach, and cream accents from the original palette; see `computer-club.gpl`. Generated source artwork is retained under the activity’s `art/` folder. `art-sources.js` embeds the same image bytes so local canvas colour mapping needs no server or network request. An original chiptune is synthesised with Web Audio, with a music toggle and no external audio files. It begins only after a user gesture, pauses in hidden tabs, and all movement respects reduced-motion preferences. Silkscreen is self-hosted under the SIL Open Font License (see `activities/build-a-computer/fonts/OFL.txt`).

### Browser smoke check

With Playwright and Chromium installed and the server running:

```sh
python3 activities/build-a-computer/tests/smoke.py
```

An optional first argument overrides the activity URL. Set `CHROMIUM` to use a specific Chromium executable; otherwise the check finds `chromium` or uses Playwright's installed browser. The check exercises actual sprite dimensions and GPL pixels, discovery before adding, free component order, both drive choices, optional graphics, music, all five stages, startup and both shrink transitions, correct and incorrect answers, review, restart, reduced motion, and a narrow-screen overflow check. Screenshots are written to the system temporary directory.

## Reuse this as a template

The approved baseline is on **`template/pixel-art-presentations`**. See [TEMPLATE.md](TEMPLATE.md) for starting future products, the reusable files and assets, artwork conventions, validation, and offline ZIP packaging. Run `python3 scripts/package_activity.py activities/build-a-computer /tmp/computer-club.zip` to refresh embedded artwork and package the example.
